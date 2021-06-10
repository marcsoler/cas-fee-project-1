import NoteService from '../services/note-service.js';

class NoteController {
    constructor() {
        this.modeSelector = document.querySelector('#mode');
        this.createBtn = document.querySelector('#create');
        this.popup = document.querySelector('#popup');
        this.closePopupBtn = document.querySelector('#close-popup');
        this.notes = new NoteService();
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
    }

    renderNotes() {
        // Todo
        // for (const note of this.notes.all) {
        //    console.log(note);
        // }
    }

    init() {
        this.toggleMode();
        this.registerEvents();
        this.renderNotes();
    }
}

new NoteController().init();
