# `dom`

This JavaScript module facilitates access to elements in the DOM of any HTML file that incorporates the module. Normally for each element in the DOM which JavaScript needs to manipulate it is necessary to assign the element to a variable for example with the following code:

`const el = document.querySelector("#id-value")`

The `dom` module automates this saving time and also helping to ensure that a strict naming convention for elements is maintained.

`dom` creates a JavaScript object property from every HTML element with an `id` attribute. The name of the property is the same as the value of the `id` except that hyphens are removed and the letter following a hyphen is converted to uppercase. The value of the properties are the elements themselves.

`dom` also contains two methods. One method called `dom.createElVars()` creates the properties described above from the HTML.

The other method, called `dom.showDivs()`, accepts an array of the names of `div`s. The method adds the value `hide` to all the `div` elements and then removes it from those `div`s whose names were in the array passed to the method as its argument.

## An example of a `dom` object

After `dom.createElVars()` has been called the resulting `dom` object would have the following form:

```
{

    createElVars: function createElVars()....,

    els: {
        homeCancelBtn: <button....,
        homeDiv: <div....,
        homeInp: <inp....,
        homeOKBtn: <button....
    },

    showDiv: function showDiv()....,

}
```

