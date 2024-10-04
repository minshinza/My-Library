var shoppingFormEl = $('#shopping-form');
var shoppingListEl = $('#shopping-list');

function handleFormSubmit(event) {
    event.preventDefault();

    var shoppingItem = $('input[name="shopping-input"]').val();

    if (!shoppingItem) {
        console.log ('No shopping item filled out in form!');
        return;
    }

    var shoppingListItemEl = $(
        '<li class="flex-row justify-space-between align-center p-2 bg-light text-dark">'
    );
    shoppingListItemEl.text(shoppingItem);

    shoppingListItemEl.append (
        '<button class="btn btn-danger btn-small delete-item-btn">Remove<button>'
    );
    shoppingListEl.append(shoppingListItemEl);

    $('input[name=shopping-input"]').val('');
}
function handleRemoveItem(event) {
    var btnClicked = $ (event.target);
    
    btnClicked.parent('li').remove();
}
shoppingListEl.on('click', '.delete-item-btn', handleRemoveItem);
shoppingFormEl.on('submit', handleFormSubmit);