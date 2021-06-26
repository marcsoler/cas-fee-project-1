import {noteService} from '../services/note-service.js';

class NoteController {
    constructor() {
        this.modeSelector = document.querySelector('#mode');
        this.createBtn = document.querySelector('#create');
        this.popup = document.querySelector('#popup');
        this.closePopupBtn = document.querySelector('#close-popup');
        this.filterButtons = document.querySelectorAll('.filter-button');
        this.showFinishedBtn = document.querySelector('#show-finished');
        this.notesContainer = document.querySelector('#notes-container');
        this.noteForm = document.querySelector('#note-form');
        this.noteTemplate = document.querySelector('#note-template');
        this.noteRenderer = Handlebars.compile(this.noteTemplate.innerHTML);
        this.currentSortField = undefined;
        this.currentSortOrder = undefined;
        this.showFinished = false;
    }

    toggleMode() {
        let defaultMode;
        if (localStorage.getItem('mode')) {
            defaultMode = localStorage.getItem('mode');
        } else {
            defaultMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        const selectedMode = this.modeSelector.options[this.modeSelector.selectedIndex].value;
        const mode = selectedMode === 'default' ? defaultMode : selectedMode;
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(mode);
        localStorage.setItem('mode', mode);
    }

    openPopup() {
        document.body.classList.add('has-popup');
        this.popup.classList.add('is-open');
    }

    closePopup() {
        this.noteForm.reset();
        this.noteForm.querySelector('#noteId').value = '';
        document.body.classList.remove('has-popup');
        this.popup.classList.remove('is-open');
    }

    registerEvents() {
        this.modeSelector.addEventListener('input', () => this.toggleMode());
        this.createBtn.addEventListener('click', () => this.openPopup());
        this.closePopupBtn.addEventListener('click', () => this.closePopup());
        this.noteForm.addEventListener('submit', (event) => this.submitNote(event));
        this.filterButtons.forEach((e) => {
            e.addEventListener('click', (event) => this.sortNotes(event));
        });
        this.showFinishedBtn.addEventListener('click', () => this.toggleShowFinished());
    }

    async submitNote(event) {
        event.preventDefault();
        const formData = this.noteForm.elements;
        if (formData.noteId.value.length > 0) {
            const noteId = formData.noteId.value;
            await noteService.updateNote(noteId, formData);
        } else {
            await noteService.createNote(formData);
        }
        this.closePopup();
        await this.loadNotes();
        await this.renderNotes();
    }

    async renderNotes() {
        if (!this.notes) {
            await this.loadNotes();
        }
        // this.notes = this.notes.filter((n) => (n.finished === this.showFinished));
        console.log(this.notes);
        this.notesContainer.innerHTML = this.noteRenderer(this.notes);
        document.querySelectorAll('.done-note').forEach((note) => note.addEventListener('click', (e) => this.markAsDone(e)));
        document.querySelectorAll('.edit-note').forEach((note) => note.addEventListener('click', (e) => this.editNote(e)));
        document.querySelectorAll('.delete-note').forEach((note) => note.addEventListener('click', (e) => this.deleteNote(e)));
    }

    async markAsDone(event) {
        const noteId = event.target.closest('li').dataset.note;
        await noteService.setAsDone(noteId);
        await this.loadNotes();
        await this.renderNotes();
    }

    editNote(event) {
        const noteId = event.target.closest('li').dataset.note;
        const note = this.notes.find((n) => (noteId === n.id));

        console.log(new Date(note.duedate).toISOString().substring(0, 10));
        this.popup.querySelector('#noteId').value = note.id;
        this.popup.querySelector('#title').value = note.title;
        this.popup.querySelector('#description').value = note.description;
        this.popup.querySelector('#importance').value = note.importance;
        this.popup.querySelector('#duedate').value = new Date(note.duedate).toISOString().substring(0, 10);
        this.openPopup();
    }

    async deleteNote(event) {
        event.preventDefault();
        if (confirm('Are you sure?')) {
            const noteId = event.target.closest('li').dataset.note;
            await noteService.deleteNote(noteId);
            await this.loadNotes();
            await this.renderNotes();
        }
    }

    async loadNotes() {
        this.notes = await noteService.getNotes();
    }

    sortNotes(e) {
        this.currentSortField = e.target.dataset.sortBy;
        switch (this.currentSortOrder) {
            case 'desc':
                this.currentSortOrder = 'asc';
                break;
            default:
                this.currentSortOrder = 'desc';
                break;
        }
        this.filterButtons.forEach((button) => {
            button.classList.remove('arrow-asc', 'arrow-desc');
        });
        e.target.classList.add(`arrow-${this.currentSortOrder}`);
        this.notes.sort((a, b) => ((a.importance.toLowerCase() > b.importance.toLowerCase()) ? 1 : ((b.importance.toLowerCase() > a.importance.toLowerCase()) ? -1 : 0)));
        this.notes = this.currentSortOrder === 'asc' ? this.notes : this.notes.reverse();
        this.renderNotes();
    }

    toggleShowFinished() {
        if (!this.showFinished) {
            this.showFinished = true;
            this.showFinishedBtn.classList.add('is-active');
        } else {
            this.showFinished = false;
            this.showFinishedBtn.classList.remove('is-active');
        }

        this.renderNotes();
    }

    registerHandlebarHelpers() {
        Handlebars.registerHelper('showImportance', (importance) => {
            let html = `<span class="stars stars-${importance}">`;
            while (importance > 0) {
                html += '<span class="star">&#128498;</span>';
                --importance;
            }
            html += '</span>';
            return html;
        });
        Handlebars.registerHelper('formatDate', (date) => {
            if (date instanceof Date) {
                return date.toLocaleString('de-CH').split(',')[0];
            }
            return new Date(date).toLocaleString('de-CH').split(',')[0];
        });
        Handlebars.registerHelper('br', (content) => {
            content = Handlebars.Utils.escapeExpression(content);
            content = content.replace(/(\r\n|\n|\r)/gm, '<br>');
            return new Handlebars.SafeString(content);
        });
    }

    init() {
        this.toggleMode();
        this.registerHandlebarHelpers();
        this.registerEvents();
        this.renderNotes();
    }
}

new NoteController().init();
