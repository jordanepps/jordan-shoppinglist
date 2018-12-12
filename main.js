const STORE = [
  { name: 'apples', checked: false },
  { name: 'oranges', checked: false },
  { name: 'milk', checked: true },
  { name: 'bread', checked: false }
];

function handleNewItemSubmit() {
  //Get and save the user value from the input
  $('#js-shopping-list-form').on('submit', e => {
    e.preventDefault();
    //Save value to STORE
    const item = { name: $('#shopping-list-entry').val(), checked: false };
    STORE.push(item);
    //Render updated shopping list
    $('#shopping-list-entry').val('');
    renderShoppingList();
  });
}

function handleItemCheckClicked() {
  //Determine which item user clicked on
  $('.shopping-list').on('click', '.shopping-item-toggle', e => {
    //Get value of shopping list item clicked on
    const itemIndex = $(e.target)
      .closest('li')
      .data('item-index');
    //change boolean value of item in STORE

    //Render updated shopping list

    STORE[itemIndex].checked = !STORE[itemIndex].checked;
    renderShoppingList();
  });
}

function handleDeleteItemClicked() {
  //Determine which item user clicked on
  $('.shopping-list').on('click', '.shopping-item-delete', e => {
    const itemIndex = $(e.target)
      .closest('li')
      .data('item-index');
    //Remove correct item  from STORE
    STORE.splice(itemIndex, 1);
    //Render updated shopping list
    renderShoppingList();
  });
}

function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${
        item.checked ? 'shopping-item__checked' : ''
      }">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">${
              item.checked ? 'uncheck' : 'check'
            }</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');
  const items = shoppingList.map((item, index) =>
    generateItemElement(item, index)
  );
  return items.join('');
}

function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);

  // insert that HTML into the DOM
  $('.shopping-list').html(shoppingListItemsString);
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
