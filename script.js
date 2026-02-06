// Dark Mode Toggle
const toggleBtn = document.createElement('button');
toggleBtn.className = 'theme-toggle';
toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
toggleBtn.setAttribute('aria-label', 'Toggle Theme');
document.body.appendChild(toggleBtn);

const setIcon = () => {
    toggleBtn.innerHTML = document.body.classList.contains('light-theme')
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
};

if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.body.classList.add('light-theme');
}
setIcon();

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    setIcon();
});
