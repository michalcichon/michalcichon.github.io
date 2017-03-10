function foldMenu() {
    var menu = document.getElementById("menu");
    if (menu.className === "topnav") {
        menu.className += " responsive";
    } else {
        menu.className = "topnav";
    }
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


console.log("██╗  ██╗███████╗██╗     ██╗      ██████╗ \n██║  ██║██╔════╝██║     ██║     ██╔═══██╗\n███████║█████╗  ██║     ██║     ██║   ██║\n██╔══██║██╔══╝  ██║     ██║     ██║   ██║\n██║  ██║███████╗███████╗███████╗╚██████╔╝\n╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝ \n\n    ████████╗██╗  ██╗███████╗██████╗ ███████╗██╗\n    ╚══██╔══╝██║  ██║██╔════╝██╔══██╗██╔════╝██║\n       ██║   ███████║█████╗  ██████╔╝█████╗  ██║\n       ██║   ██╔══██║██╔══╝  ██╔══██╗██╔══╝  ╚═╝\n       ██║   ██║  ██║███████╗██║  ██║███████╗██╗\n       ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝\n\nThere is nothing special here but good to see you anyways!");
