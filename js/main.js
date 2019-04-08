var menuScrollPosition = 0;

function getScrollPosition() {
    return window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
}

function foldMenu() {
    var menu = document.getElementById("menu");
    menuScrollPosition = getScrollPosition();
    if (menu.className === "topnav") {
        menu.className += " responsive";
    } else {
        menu.className = "topnav";
    }
}

function closeMenuIfOpened() {
    var menu = document.getElementById("menu");
    menu.className = "topnav";
}

function init() {
    setYearInFooter();
}

function setYearInFooter () {
    var currentTime = new Date();
    document.getElementById('currentYear').innerHTML = currentTime.getFullYear();
}

var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        init();
    }
}, 10);

window.addEventListener("scroll", function (event) {
    var scroll = getScrollPosition()
    if (Math.abs(scroll - menuScrollPosition) > 250) {
        closeMenuIfOpened();
    }
});

console.log("██╗  ██╗███████╗██╗     ██╗      ██████╗ \n██║  ██║██╔════╝██║     ██║     ██╔═══██╗\n███████║█████╗  ██║     ██║     ██║   ██║\n██╔══██║██╔══╝  ██║     ██║     ██║   ██║\n██║  ██║███████╗███████╗███████╗╚██████╔╝\n╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝ \n\n    ████████╗██╗  ██╗███████╗██████╗ ███████╗██╗\n    ╚══██╔══╝██║  ██║██╔════╝██╔══██╗██╔════╝██║\n       ██║   ███████║█████╗  ██████╔╝█████╗  ██║\n       ██║   ██╔══██║██╔══╝  ██╔══██╗██╔══╝  ╚═╝\n       ██║   ██║  ██║███████╗██║  ██║███████╗██╗\n       ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝\n\nThere is nothing special here but good to see you anyways!");
