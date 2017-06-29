// DOM Ready
$(document).ready(function() {

  // cache `.full` for later reference
  var fullDiv = $('.gallery .full');

  // bind all `.previews` anchor tags with a click event handler
  $('.gallery .previews a').on('click', function(e) {

    //prevent default action
    e.preventDefault();

    // cache the item being clicked for later reference
    var clickedThumb = $(this);

    // create an image element in the DOM
    var $img = $('<img>').attr('src', clickedThumb.data('full'));

    // remove `selected` class from all anchors using `clickedThumb` and traversing upwards
    clickedThumb.parent().find('a').removeClass('selected');

    // add class `selected` to the item being clicked
    clickedThumb.addClass('selected');

    // empty the `.full` div and `append` our newly created `$img`
    fullDiv.empty().append($img.hide().fadeIn('slow'));
  });

  // add delegated-event `click` to `.full` div
  fullDiv.on('click', 'img', function(e) {
    // open a `fancybox` using the contained image
    $.fancybox.open($(this).attr('src'));
  });

});