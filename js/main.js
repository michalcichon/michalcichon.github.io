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
