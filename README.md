# dom

This module is particularly suited to single page websites which rely on toggling the CSS `display` value to and from `none` for their functionality.

It facilitates access to elements in the DOM of any HTML file that complies with the naming convention outlined below.

Typically elements in the DOM are assigned to variables with code such as this:

`const el = document.querySelector("#id-value")`

The `dom` module automates these assignments, saving time.

`dom` creates a JavaScript object property from every HTML element with an `id` attribute. The naming convention is best illustrated by some examples where the HTML is followed by the JavaScript property name in each case:

```
<div id="home_d"></div>
dom.els.home_d

<div id="my-form_d"></div>
dom.els.myForm_d

<div id="my-form_d">
    <button id="my-form_dOk_btn>OK</button>
</div>
dom.els.myForm_dOk_btn
```

In the last example it may seem superfluous to include "`my-form`" in the id value for the button. For the HTML file that is true because it can be clearly seen that the button is inside the div with an id value of "`my-form_d`". In a JavaScript file this would not be evident and it becomes useful for the button's name to include the name of the div that it is inside. The JavaScript file can be worked on with less frequent inspections of the HTML file.

`dom` contains three methods. One method called `dom.createElVars()` creates the properties described above from the HTML.

A further method, called `dom.showDivs()`, accepts an array of strings or a single string. These strings should be the names of `divs` to be displayed. The method first adds the value `hide` to all `div` elements and then removes it from those `div`s whose names were provided as strings to the method as its argument. CSS ensures that any `div` with a class name of `hide` is not displayed. This CSS within the `head` element of an HTML file is shown below:

```
<style>
    .hide {
        display: none;
    }
</style>
```

The third method, `dom.createMyEvents()`, adds a property to an object called `dom.myEvents` for every `div` element in the HTML that has an `id` value. The name of this property is the same as the `id` value except with `Event` appended to it. For example `home_d` becomes `home_dEvent`. The value of these properties is an instantiated `Event`. As an example: `home_dEvent: new Event('home_dEvent'),.

### `dom.els`

After `dom.createElVars()` has been called the resulting `dom` object will contain  its two methods plus a new property called `els`. The value of `els` is an object whose property keys are the names (outlined above) of HTML elements and their values are the elements:

```
{

    createElVars: function createElVars()....,

    els: {
        home_div: <div....,
        myForm_div: <div....,
        myForm_divOk_btn: <button....
    },

    showDivs: function showDivs()....,

}
```

### `dom.myEvents`

After `dom.createMyEvents()` has been called the resulting `dom` object will have a `Event` objects in `dom.myEvents` corresponding to each `div` in the HTML. These are useful because they enable code written in a JavaScript module dedicated to a particular `div` eg `home_d.js` which exports a function called `home_d` to be run by dispatching the event, `home_dEvent`, from code in any other module. In this way all the code relating a given `div` can be kept in the JavaScript module for that `div`.

If different code needs to run in different situations by dispatching events from other modules, `customEvents` can also be created within the application. These are not created in `dom.js` described here.
