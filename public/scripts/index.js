const modeSelector = document.querySelector('#mode');

function toggleMode() {
    let defaultMode;
    if (localStorage.getItem('mode')) {
        defaultMode = localStorage.getItem('mode');
    } else {
        defaultMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    const selectedMode = modeSelector.options[modeSelector.selectedIndex].value;
    const mode = selectedMode === 'default' ? defaultMode : selectedMode;
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(mode);
    localStorage.setItem('mode', mode);
}

toggleMode();

modeSelector.addEventListener('input', toggleMode);
