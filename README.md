# dom

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

* Create a root directory for the project, perhaps called `testdom`

* Copy or download `dom` into the project directory. It is best to use the most recent tagged version of `dom`. If the directory is called `dom-v1-2-3` or similar you must remove the version part so the name of the directory is exactly `dom`.

* Create an `index.html` file in `testdom`

*  `index.html` should have a `script` element in the `head` section to link it to the JavaScript code.

* `index.html` should have two `div` elements in it with `id` values that conform to the naming conventions for `dom`. These two `div`s should each have a `p` element containg different text. The `id` values for the two `div`s used in this tutorial are `first_d` and `second_d`.

* An example of suitable `index.html` file is shown below. This can be pasted into your `index.html` file.

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

* Inside `./js/main.js` write import statement for the `dom` module and for the modules created above.

* Also inside `./js/main.js` run the `dom.createElVars()` command which creates JavaScript variables for every HTML element with an `id` attribute in `index.html`. Also run `dom.consoleLogEls()` which will log a list of the names of all the created variables to the developer tools console in the browser.

* Now your `./js/main.js` file should look like this:

    ```javascript
    // imports from /d
    import { first_d } from "./d/first_d.js";
    import { second_d } from "./d/second_d.js";
    ```


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="module" src="./js/main.js"></script>
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

### `./js/main.js`


