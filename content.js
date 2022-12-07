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

        if (/ *\d+\.\d+ *\/ *\d+\.\d+/.test(text)) {
            let numerator = parseFloat(text.split('/')[0].trim().match(/\d+\.\d+/)[0]);
			let denominator = parseFloat(text.split('/')[1].match(/\d+\.\d+/)[0]);

            if (numerator != denominator) {
				if (numerator == 0) {
					child.style.backgroundColor = RED;
				}
				else {
					child.style.backgroundColor = "#FFA07A";
				}
            }
        }
    }
}

