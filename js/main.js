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

// Case study and post images open full screen in a native <dialog>
document.addEventListener("click", function (e) {
    var lightbox = document.querySelector(".case-lightbox");
    if (!lightbox) return;
    var shot = e.target.closest(".case-shot img, .post-content img:not(.article-hero img)");
    if (shot) {
        lightbox.querySelector("img").src = shot.src;
        lightbox.querySelector("img").alt = shot.alt;
        lightbox.showModal();
    } else if (e.target.closest(".case-lightbox")) {
        lightbox.close();
    }
});
