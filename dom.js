// dom v0.1.0

export const dom = {

    changeDiv: new Event("changeDiv"),

    changeDivTo: function (to, from, data) {
        this.els[to].dataset.from = from;
        if (data) {
            for (const [key, value] of Object.entries(data)) {
                this.els[to].dataset[key] = value;
            }
        }
        document.dispatchEvent(this.changeDiv);
    },

    changeDivToComplete: function (to) {
        this.els[to].dataset.from = "";
        this.showDiv(to);
    },

    consoleLogEls: function() {
        console.log("***********");
        console.log("dom.els:");

        for (const [key, value] of Object.entries(this.els)) {
            const spaces = generateSpacesFromUnderscores(key);
            if (value.dataset.codeComment) {
                console.log(spaces, key, "//" + value.dataset.codeComment);
            } else {
                console.log(spaces,key);
            }
        }
       
        console.log("***********");
        function generateSpacesFromUnderscores(string) {
            const numberOfUnderscores = string.split("_").length - 1;
            let spaces = "";
            for (let i = 0; i < numberOfUnderscores; i++) {
                spaces += "  ";
            };
            return spaces;
        }
    },

    createElVars: function () {
        const ids = document.querySelectorAll('[id]')
        Array.from(ids).forEach(el => {
            this.els[toCamelCase(el.id)] = el;
        });
        // this function converts hyphenated names to camel case names
        function toCamelCase(hypenatedName){
             return hypenatedName.replace(
                /-([a-z])/g,
                // hyphen (first part of the match) is not used used
                function (hyphen, letterAfterHyphen) {
                    return letterAfterHyphen.toUpperCase();
                }
            );
        }
    },

    els: {},
    
    myEvents: {},

    showDiv: function (divsToShow) {
        // divsToShow can be a string or an array of strings. These strings
        // should be the ids of divs to show. If it is a string this is
        // converted to an array with that string as its only element:
        let divsToShowArray = [];
        if (typeof divsToShow === "string") {
            divsToShowArray.push(divsToShow);
        } else {
            if (Array.isArray(divsToShow)) {
                divsToShowArray = divsToShow;
            } else {
                // if it is an array you should check all elements are strings
                throw new Error("divsToShow is not a string or an array")
            }
        }
        Object.keys(this.els).forEach(elKey => {
            if (this.els[elKey].tagName === "DIV") {
                this.els[elKey].classList.add("hide");
            }
        })
        divsToShowArray.forEach(divToShow => {
            this.els[divToShow].classList.remove("hide");
        })
    },

    switchDiv: function (dom, thisDivId, validReferrerIds, funcToRun) {
        document.addEventListener("changeDiv", () => {
            if (validReferrerIds.includes(this.els[thisDivId].dataset.from)) {
                this.changeDivToComplete(thisDivId);
                if (funcToRun) {
                    funcToRun();
                }
            }
        })
    }

}
