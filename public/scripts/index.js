const modeSelector = document.querySelector('#mode');

function toggleMode() {
    const defaultMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const selectedMode = modeSelector.options[modeSelector.selectedIndex].value;
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(selectedMode === 'default' ? defaultMode : selectedMode);
    // TODO: store users preference
}

toggleMode();

modeSelector.addEventListener('input', toggleMode);
