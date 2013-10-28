/* address-book.js
 this is where you will add your JavaScript to complete Lab 5
 */

$(function() {
    sortObjArray(Employees.entries, "last");
    $(".sort-ui .btn").click(sortBy);
});

function sortBy(handler) {
    var sortMethod = $(this).attr("data-sortby");   // get the sort method from button
    sortObjArray(Employees.entries, sortMethod);    // sort & re-render
    
    $(".btn.active").removeClass("active");
    $(this).addClass("active");
}

function render(entries) {
    var template = $(".template");
    var book = $(".address-book");

    // Clear the address book
    book.hide();
    book.empty();

    // Loop through each entry
    $(entries).each(function(i, val) {
        var entry = template.clone();

        // Populate info
        entry.find(".first").html(val.first);
        entry.find(".last").html(val.last);
        entry.find(".title").html(val.title);
        entry.find(".dept").html(val.dept);
        entry.find(".pic").attr("src", val.pic);
        entry.find(".pic").attr("alt", "picture of " + val.first + " " + val.last);

        entry.removeClass("template");
        book.append(entry);
    });
    
    book.fadeIn(500);
}

/* sortObjArray()
 sorts an array of objects by a given property name
 the property values are compared using standard
 operators, so this will work for string, numeric,
 boolean, or date values

 objArray        array of objects to sort
 propName        property name to sort by

 returns undefined (array is sorted in place)
 */
function sortObjArray(objArray, propName) {
    if (!objArray.sort)
        throw new Error('The objArray parameter does not seem to be an array (no sort method)');

    //sort the array supplying a custom compare function
    objArray.sort(function(a, b) {

        //note: this compares only one property of the objects
        //see the optional step where you can add support for
        //a secondary sort key (i.e., sort by another property)
        //if the first property values are equal
        if (a[propName] < b[propName])
            return -1;
        else if (a[propName] === b[propName])
            return 0;
        else
            return 1;
    });

    render(Employees.entries);  // render after sort
} //sortObjArray()

