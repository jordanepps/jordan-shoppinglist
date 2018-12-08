function createLi(value) {
  return $(
    `<li><span class="shopping-item">${value}</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button><button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>`
  );
}

function handleCheckClick(e) {
  //grab the closest li to the target
  const li = $(e.target).closest('li');
  //find the span with shopping-item class and toggle class
  li.find('.shopping-item').toggleClass('shopping-item__checked');
}

function handleDeleteClick(e) {
  //grab cloest li to target and remove it
  const li = $(e.target).closest('li');
  li.remove();
}

$(function() {
  $('#js-shopping-list-form').on('submit', function(e) {
    //prevent form from reloading page
    e.preventDefault();
    //Get value from the input
    const value = $('#shopping-list-entry').val();
    //Get access to shopping list ul
    //append a new li with input value
    $('.shopping-list').append($(createLi(value)));
    //clear value in input
    $('#shopping-list-entry').val('');
  });

  $('.shopping-list').on('click', '.shopping-item-toggle', function(e) {
    handleCheckClick(e);
  });

  $('.shopping-list').on('click', '.shopping-item-delete', function(e) {
    handleDeleteClick(e);
  });
});
