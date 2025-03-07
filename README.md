# `dom`

This module is particularly suited to single page websites which rely on toggling the CSS `display` value to and from `none` for their functionality.

It facilitates access to elements in the DOM of any HTML file that complies with the naming convention outlined below.

Typically elements in the DOM are assigned to variables with code such as this:

`const el = document.querySelector("#id-value")`

The `dom` module automates these assignments, saving time.

`dom` creates a JavaScript object property from every HTML element with an `id` attribute. The naming convention is best illustrated by some examples where the HTML is followed by the JavaScript property name in each case:

```
<div id="home_div"></div>
home_div

<div id="my-form_div"></div>
myForm_div

<div id="my-form_div">
    <button id="my-form_div-ok_btn>OK</button>
</div>
myForm_divOk_btn
```

In the last example it may seem superfluous to include "`my-form`" in the id value for the button. For the HTML file that is true because it can be clearly seen that the button is inside the div with an id value of "`my-form_div`". In a JavaScript file this would not be evident and it becomes useful for the button's name to include the name of the div that it is inside. The JavaScript file can be worked on with less frequent inspections of the HTML file.

`dom` contains two methods. One method called `dom.createElVars()` creates the properties described above from the HTML.

The other method, called `dom.showDivs()`, accepts an array of the names of `divs` to be displayed. The method first adds the value `hide` to all `div` elements and then removes it from those `div`s whose names were in the array passed to the method as its argument. CSS ensures that any `div` with a class name of `hide` is not displayed. The CSS within the `head` element of an HTML file is shown below:

```
<style>
    .hide {
        display: none;
    }
</style>
```

## `dom.els`

After `dom.createElVars()` has been called the resulting `dom` object will contain  its two methods plus a new property called `els`. The value of `els` is an object whose property keys are the names (outlined above) of HTML elements and their values are the elements:

```
{

    createElVars: function createElVars()....,

    els: {
        homeCancelBtn: <button....,
        homeDiv: <div....,
        homeInp: <inp....,
        homeOKBtn: <button....
    },

    showDivs: function showDivs()....,

}
```
