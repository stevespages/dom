# dom v0.1.0

## Overview

This module is particularly suited to single page websites which rely on controlling the visibility of HTML div elements.

This file exports a JavaScript module called `dom`. It is designed to be used in conjunction with a specific naming convention for HTML element ids and their corresponding JavaScript variable names. The `dom` module automatically creates a variable for any HTML element and this variable has the same name as the value of the element's id.

The `dom` module also provides a way for all the JavaScript code relating to a given HTML div to be placed in the same file. It is recommended that the name of this file be the same as the id of the div that it relates to. Additionally the JavaScript file should export a function which also has the same name. The mechanism for running the code related to a particular div involves the code relating to the div that is about to be hidden dispatching an event which will run the code for the div that is about to be displayed.

The same name is given to:

* an HTML div's id eg `menu_d`

* the JavaScript variable for that div eg `menu_d`

* the Javascript file relating to the div eg `menu_d.js`

* the function exported by that file eg `menu_d()`

In order for the code relating to a given HTML div element to be all together in the same file the code is all put inside event listeners. The `dom` object provides the means to dispatch an event with the information necessary for only the desired event listener's code to run.

Currently there is a  limitation that div elements with an id must not be nested inside other such elements.

# dom Versions

The main branch is the development branch and should not be used in production. The most recent tagged version (eg `dom vx.y.z` where x, y and z are integers) should be used unless you are restoring an old project that used an earlier version. The tagged versions can be obtained from the "Switch branches/tags" dropdown on the `dom` main GitHub page.

## The Naming Convention

For an HTML div element that displays a menu one might choose the word "menu" for the id. In which case the actual name used should be `menu_d` where the underscore denotes that the next lower case letters will signify the type of element (in this case d for div). Now the JavaScript variable pointing to this div element that is automatically created will be called `menu_d`. It is then recommended that any JavaScript code relating to this div is in a file called `menu_d.js` and that code should export a JavaScript function called `menu_d()`.

For elements inside the divs it is recommended that their ids should be named by appending to the name of the div's id. So, for example, a cancel button inside the `menu_d` div might be named `menu_dCancel_btn`. The capitalization of the C of cancel indicates where the element type (d for div) ends. If there was only one button inside the menu div it might be called `menu_d_btn`. If there is more than one then `menu_dCancel_btn` can clearly be distinguished from, for example, `menu_dCreateForm_btn`. This convention can generate long names but it is very good for keeping track of what is what in the code. The `dom` module will automatically create JavaScript variables to point to any HTML element with an id and the variable's name will be the same as the id. The ids should never contain a hyphen because JavaScript variable names are not allowed to contain hyphens.

Typically elements in the DOM are assigned to variables with code such as this:

`const el = document.querySelector("#id-value")`

The `dom` module automates these assignments, saving time, and reducing mistakes.

## Methods

### `dom.createElVars()`

This creates the JavaScript variables which point to the HTML elements. It adds them to an object called `els`. Thus in your JavaScript code you would be able to use the variable `dom.els.menu_dCancel_btn` without having to write the assignment code yourself.

It is best to call `dom.createElVars()` early on in your code, for example from `main.js` so that the variables are available when they are needed.

### `dom.showDivs()`

This accepts an array of strings or a single string. These strings should be the names of `divs` to be displayed. The method first adds the value `hide` to all `div` elements and then removes it from those `div`s whose names were provided as strings to the method as its argument. CSS ensures that any `div` with a class name of `hide` is not displayed. This CSS is required. It could be put in the `head` element of an HTML file as shown below:

`
    <style>
        .hide {
            display: none;
        }
    </style>
`

It is generally simpler to just have one div displayed at a time.


### `dom.createMyEvents()`

This adds a property to an object called `dom.myEvents` for every `div` element in the HTML that has an `id` value. The name of this property is the same as the `id` value except with `Event` appended to it. For example `home_d` becomes `home_dEvent`. The value of these properties is an instantiated `Event`. As an example: `home_dEvent: new Event('home_dEvent').

## Properties

### `dom.els`

This property contains the automatically created JavaScript variables relating to every HTML element with an id. It has been explained in the Methods section for `dom.createElVars`. 

### `dom.myEvents`

After `dom.createMyEvents()` has been called, the `dom` object will have a `myEvents` object containing `Event` objects corresponding to each `div` in the HTML. These are useful because they enable code relating to a given div to be all together in the same JavaScript file inside an event listener(s).

A module dedicated to a particular HTML div eg `home_d.js` which exports a function called `home_d()` can be run by dispatching the event, `home_dEvent`, from code within any other module.

### Tutorial

As a simple excercise which demonstrates how to use `dom` we will create a website with a single HTML file, `index.html`, with two `div`s in it. Each `div` has a button in it which when clicked hides the `div` it is in and opens the other `div`.

* Create a root directory for the project, perhaps called `testdom`

* Copy or download `dom` into the project directory. It is best to use the most recent tagged version of `dom`. If the directory is called `dom-v1-2-3` or similar you must remove the version part so the name of the directory is exactly `dom`.

* Create an `index.html` file in `testdom`

*  `index.html` should have a `script` element in the `head` section to link it to the JavaScript code.

* `index.html` should have two `div` elements in it with `id` values that conform to the naming conventions for `dom`. These two `div`s should each have a `p` element containg different text. The `id` values for the two `div`s used in this tutorial are `first_d` and `second_d`.

* In order for `dom` to hide `div`s they add a class called `hide` to all the `div` elements except the one which is displayed. It is necessary to have a CSS rule that hides (`display: none`) elements with a class of `hide` as can be seen in `index.html` below.

* The `index.html` file is shown below. This can be pasted into your `index.html` file.

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="module" src="./js/main.js"></script>
        <style>
            .hide {
                display: none;
            }
        </style>
        <title>Test dom</title>
    </head>
    <body>
        <h1>Test dom</h1>

        <div id="first_d">
            <p>This is inside divOne_d div</p>
        </div>

        <div id="second_d">
            <p>This is inside divTwo_d div</p>
        </div>

    </body>
    </html>

    ```

* Create a directory in the root directory called `js`

* Create a file called `main.js` inside the `js` directory

* Put `console.log("from main.js")` inside `main.js` 

* Navigate to this website from a browser and check "from main.js" appears in the console of the developer tools section for the website. If it does continue. If not debug what you have done!

* Create a directory called `d` (for div) inside the `js` directory

* Create a file called called `first_d.js` inside the `d` directory and export a function called `first_d()` from it initially leave the body of the function empty. The file's contents should be:

    ```javascript
    export function first_d() {

    }
    ```

* Create a file called `second_d.js` inside the `d` directory and do the same as before except the funtions will be called `second_d()`.

* Inside `./js/main.js` write an import statement for the `dom` module and for the modules created above.

* Also inside `./js/main.js` run the `dom.createElVars()` command which creates JavaScript variables for every HTML element with an `id` attribute in `index.html`. Also run `dom.consoleLogEls()` which will log a list of the names of all the created variables to the developer tools console in the browser.

* Now your `./js/main.js` file should look like this:

    ```javascript
    console.log("from main.js")

    // imports from /d
    import { first_d } from "./d/first_d.js";
    import { second_d } from "./d/second_d.js";

    // import dom
    import { dom } from "../../../dom/dom.js";

    dom.createElVars();
    dom.consoleLogEls();

    ```

* Now navigate to your project in a browser and look at the console in developer tools. You should see the names of the variables `dom` has created in addition to the "from main.js" string. If so continue otherwise go back and debug.

* In `./js/main.js` call the two imported functions supplying the imported `dom` object as arguments:

    ```javascript
    first_d(dom);
    second_d(dom);
    ```

* After this add the following line to the bottom of the `./js/main.js` file:

    ```javascript
    dom.changeDivTo("first_d", "START");
    ```

* Your `./js/main.js` file should now look like this:

    ```javascript
    // imports from /d
    import { first_d } from "./d/first_d.js";
    import { second_d } from "./d/second_d.js";

    // import dom
    import { dom } from "./dom.js";

    dom.createElVars();
    dom.consoleLogEls();

    first_d(dom);
    second_d(dom);

    ```

* Navigate to the website. It will still not be functional because the two JavaScript funtions, `first_d()` and `second_d` are currently empty. If the website appears normally and there are no errors in the developer console continue. Otherwise debug.

* The functions exported from JavaScript modules in the `./js/d` directory require the `dom` object as an argument, for example `first_d(dom)`. The `dom` object has a method called `changeDivTo(to, from, data)`. The `to` argument should be the name of the `id` of the div that should now become visible and the code for which should now run. The `from` argument should be the name of the `id` of the div currently visible and it is the code for this div which should be calling the function. The `data` function should be an object. When this function runs it adds a `from` dataset attribute to the element specified by the value of the `to` argument. It also adds a dataset attribute to this element for every property in the `data` argument object.

* In addition to the actions outlined above, `dom.changeDivTo()` also dispatches an event called `changeDiv`. All the `./js/d` module functions, eg `first_d()`, `second_d()` etc, have an event listener for this event. So they all fire when the event is dispatched. Only the event listener for the module specific to the `div` that was modifed by the `from` argument of `dom.changeDivTo()` will execute the code in the event handler. The other event handlers will return without doing anything.

* This is illustrated by the code for `second_d()` which is shown here:

    ```javascript
    export function second_d(dom) {

        const thisDiv = "second_d";

        document.addEventListener("changeDiv", () => {
            if (
                [
                    "first_d"
                ]
                .includes(dom.els[thisDiv].dataset.from)
            ){
                dom.changeDivToComplete(thisDiv);
            }
        })
    ```

    * The array in the `if` condition becomes a list of `div`s which can activate this `div` and run the code in the block after the `if` condition. Here we only have one `div`, `first_d`, in the list.

    * There can be any number of such `if` statements so different code can be run depending on which `div` the `dom.changeDivTo()` function was called in.

    * The `if` condition is satisfied if there is a value in it, for example `first_d`, which is the same as the value of the `from` data attribute added to the "`to`" div by `dom.changeDivTo()`.

    * The logic is somewhat complex but it is not strictly necessary to know it in order to use `dom` effectively.

    * We must call `dom.changeDivTo()` from `./js/main.js` when the website first loads. This will select the `div` which should be displayed when the website initially renders in the browser. Since this is not initiated from within a `div` the `from` attribute's value is set to the string, `START`. The value `START` has to be in the `if` condition of the first `div`'s code. As can be seen below.

    ```javascript
    // imports from /d
    import { first_d } from "./d/first_d.js";
    import { second_d } from "./d/second_d.js";

    // import dom
    import { dom } from "./dom.js";

    dom.createElVars();
    dom.consoleLogEls();

    first_d(dom);
    second_d(dom);

    changeDivTo("first_d", "START")

    ```
    * The JavaScript modules relating to each `div` such as `first_d.js` and `second_d.js` should also contain any code relevant to the respective `div`s they control For example we will add the following event listener to `first_d()`:

        ```javascript
        dom.els.first_dToSecond_btn.addEventListener("click", () => {
            dom.changeDivTo("second_d", "first_d");
        });
        ```

    * Similar code in `second_d` will enable control to pass from `second_d` to `first_d`.

    * The code should now be complete. All the files are shown below for convenience.

### Completed Tutorial Files

* The directory and file structure for the site:

    ```bash
    .
    ├── index.html
    └── js
        ├── d
        │   ├── first_d.js
        │   └── second_d.js
        ├── dom.js
        └── main.js

    ```

* The files can be seen below with the exception of `./js/dom.js` which can be seen at github.com/stevespages/dom

* `./index.html`

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="module" src="./js/main.js"></script>
        <style>
            .hide {
                display: none;
            }
        </style>
        <title>Test dom</title>
    </head>
    <body>
        <h1>Test dom</h1>

        <div id="first_d">
            <p>Inside first_d</p>
            <button id="first_dToSecond_btn">Go To Second Div</button>
        </div>

        <div id="second_d">
            <p>Inside second_d</p>
            <button id="second_dToFirst_btn">Go To First Div</button>
        </div>

    </body>
    </html>

    ```

* `./js/main.js`

    ```javascript
    console.log("from main.js")

    // imports from /d
    import { first_d } from "./d/first_d.js";
    import { second_d } from "./d/second_d.js";

    // import dom
    import { dom } from "./dom.js";

    dom.createElVars();
    dom.consoleLogEls();

    first_d(dom);
    second_d(dom);

    dom.changeDivTo("first_d", "START");

    ```

* `./js/d/first_d.js`

    ```javascript
    export function first_d(dom) {

        const thisDiv = "first_d";

        document.addEventListener("changeDiv", () => {
            if (
                [
                    "START",
                    "second_d"
                ]
                .includes(dom.els[thisDiv].dataset.from)
            ){
                dom.changeDivToComplete(thisDiv);
            }
        })

        dom.els.first_dToSecond_btn.addEventListener("click", () => {
            dom.changeDivTo("second_d", "first_d");
        })

    }

    ```

* `./js/d/second_d.js`

    ```javascript
    export function second_d(dom) {

        const thisDiv = "second_d";

        document.addEventListener("changeDiv", () => {
            if (
                [
                    "first_d"
                ]
                .includes(dom.els[thisDiv].dataset.from)
            ){
                dom.changeDivToComplete(thisDiv);
            }
        })

        dom.els.second_dToFirst_btn.addEventListener("click", () => {
            dom.changeDivTo("first_d", "second_d");;
        })
    
    }

    ```

## License

This project is licensed under the [GNU Affero General Public License v3.0](LICENSE).
