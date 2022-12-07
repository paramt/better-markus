const RED = "#ff988c";
const ORANGE = "#FFA07A"

window.onload = function() {
    highlight(); 

    // call highlight() whenever codeviewer div changes
    codeholder = document.getElementById("codeviewer");

    observer = new MutationObserver(function() {
        highlight();
    });
	
	observer2 = new MutationObserver(function() {
        setAvg();
    });

    // make sure codeholder exists before running observer
    if(codeholder) { 
		observer.observe(codeholder, {childList: true})
		observer2.observe(codeholder, {childList: true})
	};
	
	const panes = document.getElementById("panes-content");
	// let url = chrome.runtime.getURL("./widgets/markbox.html");
	var markbox = document.createElement("div");
	markbox.setAttribute("id", "assignmentAvg");
	// let markbox_text = fetch(url).then(response => response.text())
								// .then(data=>{markbox.innerHTML = data.trim();})
								
	panes.prepend(markbox);
}

function setAvg() {
	const marksheet = document.getElementsByClassName("code_scroller")[0];
    if(!marksheet) return 0;

	for (const child of marksheet.children) {
		const text = child.children[0].innerHTML.replace(/&nbsp;/g, "");
		if (text.startsWith("Totalmarksearned")) {
			let numerator = parseFloat(text.split('/')[1].trim().match(/\d+\.\d+/)[0]);
			let denominator = parseFloat(text.split('/')[2].match(/\d+\.\d+/)[0]);
			document.getElementById("assignmentAvg").innerHTML = "<div style='font-size: 1em'><b>Assignment Average: " + ((numerator/denominator)*100).toString() + "</b></div>";
		}
	}
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
					child.style.backgroundColor = ORANGE;
				}
            }
        }
    }
}

