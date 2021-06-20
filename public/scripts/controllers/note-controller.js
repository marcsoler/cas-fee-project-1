import {noteService} from '../services/note-service.js';

class NoteController {
    constructor() {
        this.modeSelector = document.querySelector('#mode');
        this.createBtn = document.querySelector('#create');
        this.popup = document.querySelector('#popup');
        this.closePopupBtn = document.querySelector('#close-popup');
        this.notesList = document.querySelector('#notes-list');
        this.noteForm = document.querySelector('#note-form');
        this.noteTemplate = document.querySelector('#note-template');
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
        document.body.classList.add('has-popup');
        localStorage.setItem('mode', mode);
    }

    openPopup() {
        this.popup.classList.add('is-open');
    }

    closePopup() {
        this.popup.classList.remove('is-open');
    }

    registerEvents() {
        this.modeSelector.addEventListener('input', () => this.toggleMode());
        this.createBtn.addEventListener('click', () => this.openPopup());
        this.closePopupBtn.addEventListener('click', () => this.closePopup());
        this.noteForm.addEventListener('submit', (event) => this.submitNote(event));
    }

    async submitNote(event) {
        event.preventDefault();
        const formData = this.noteForm.elements;
        await noteService.createNote(formData);
        this.closePopup();
        await this.renderNotes();
    }

    async renderNotes() {
        const noteRenderer = Handlebars.compile(this.noteTemplate.innerHTML);
        this.notesList.innerHTML = noteRenderer(await noteService.getNotes());
    }

    init() {
        this.toggleMode();
        this.registerEvents();
        this.renderNotes();
    }
}

new NoteController().init();
