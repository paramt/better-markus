const RED = "#ff988c";

window.onload = function() {
    highlight(); 

    // call highlight() whenever codeviewer div changes
    codeholder = document.getElementById("codeviewer");

    observer = new MutationObserver(function() {
        highlight();
    });

    // make sure codeholder exists before running observer
    if(codeholder) { observer.observe(codeholder, {childList: true})};
}


function highlight() {
    const marksheet = document.getElementsByClassName("code_scroller")[0];

    if(!marksheet) return;

    for (const child of marksheet.children) {
        const text = child.children[0].innerHTML.replace(/&nbsp;/g, "");

        // skip header lines
        if(text.includes("earned/marks") || text.includes("span")) continue;

        if(text.includes("/")) {
            let numerator = text.slice(text.indexOf("/") - 4, text.indexOf("/"))
            let denominator = text.slice(text.indexOf("/") + 1, text.indexOf("/") + 5);

            if(text.indexOf(":") < text.indexOf("/")){
                numerator = text.slice(text.indexOf(":") + 1, text.indexOf("/"));
                denominator = text.slice(text.indexOf("/") + 1);
            } 

            if (numerator != denominator) {
                child.style.backgroundColor = RED;
            }
        }
    }
}

