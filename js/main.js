var menuScrollPosition = 0;

function getScrollPosition() {
    return window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
}

function setMenuOpen(open) {
    document.getElementById("site-nav").classList.toggle("open", open);
    document.querySelector(".nav-toggle").setAttribute("aria-expanded", open);
}

function foldMenu() {
    menuScrollPosition = getScrollPosition();
    setMenuOpen(!document.getElementById("site-nav").classList.contains("open"));
}

function closeMenuIfOpened() {
    setMenuOpen(false);
}

window.addEventListener("scroll", function (event) {
    var scroll = getScrollPosition()
    if (Math.abs(scroll - menuScrollPosition) > 250) {
        closeMenuIfOpened();
    }
});

function toggleTheme() {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    document.documentElement.dataset.theme = next;
    var g = document.querySelector('iframe.giscus-frame');
    if (g) g.contentWindow.postMessage({ giscus: { setConfig: { theme: next === 'dark' ? 'dark_dimmed' : 'light' } } }, 'https://giscus.app');
}
