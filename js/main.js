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
    refreshLightModeButton();
}

function setYearInFooter() {
    var currentTime = new Date();
    document.getElementById('currentYear').innerHTML = currentTime.getFullYear();
}

function toggleDarkmode() {
    var c = getCookie("darkmode")
    if (c == 1) {
        document.cookie = `darkmode=0`
    } else {
        document.cookie = `darkmode=1`
    }
    window.location.reload(true);
}

function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded .split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
}

function addDarkmodeCSS() {
    var timestamp = new Date().getTime();
    var element = document.createElement("link");
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", "/css/darkmode.min.css?t="+timestamp);
    document.getElementsByTagName("head")[0].appendChild(element);
}

function refreshLightModeButton() {
    var c = getCookie("darkmode")
    if (c == 1) {
        document.getElementById('light-mode-button').innerHTML = "☀ Light mode";
        addDarkmodeCSS();
    } else {
        document.getElementById('light-mode-button').innerHTML = "☀ Dark mode";
    }
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
