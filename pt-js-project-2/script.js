var flashcards = {};
var userAnswer;
var $flashcardItem = $('.flashcard');
var $flashcardMessage = $('.flashcard_message');
var correctMessage = "yay! thats correct" + "<br>";
var incorrectMessage = "nope! thats incorrect" + "<br>";
// get the current card
var $activeCard = $('.is-active');
var currentCard = $($activeCard[0]).data('card');


// todo: make the questions and answers in an array
var correctAnswers = {
  card_01: 'soporific, sleepy; numbing',
  card_02: 'to stalk, to lie in wait for',
  card_03: 'a grasshopper'
};

// 0. get the user answer on input click,
flashcards.getUserAnswer = function(){
  $("input").on("click", function(){
    userAnswer = $("input[type='radio']:checked").val();
    flashcards.answerCheck();
  });
};

// 1. check to see if the user answer matches the correct answer
flashcards.answerCheck = function(){
  if (userAnswer == correctAnswers[currentCard]) {
    flashcards.rightAnwser();
  } else {
    flashcards.wrongAnswer();
  }
};

// 2. if answer is correct, display message and load next card
flashcards.rightAnwser = function(){
  $flashcardMessage.append(correctMessage);
  flashcards.loadNextFlashcard();
};

// 3. change is-active states and load next flashcard
flashcards.loadNextFlashcard = function(){
  setTimeout(function request() {
    $($activeCard).removeClass('is-active').addClass('is-inactive');
    $($activeCard).next($flashcardItem).removeClass('is-inactive').addClass('is-active');

    // grab the newly active card
    $activeCard = $('.is-active');
    currentCard = $($activeCard[0]).data('card');
    flashcards.answerCheck();

    // remove the message
    $($flashcardItem).find($flashcardMessage).empty();
  }, 2000);
};


// 4. if the user picks the wrong answer
flashcards.wrongAnswer = function(){
  $flashcardMessage.append(incorrectMessage);
  $("input:checked").removeAttr("checked");
};


// SCRIPT INIT
// ============================
flashcards.init = function(){
  flashcards.getUserAnswer();

  $('.play').on('click', function(){
    $(this).next('audio').trigger('play');
  });

  var translateHeaderIcon = $('.translate');
  $(translateHeaderIcon).on('click', function(){
    $('.flashcard_title_es').toggleClass('is-inactive');
    $('.flashcard_title_en').toggleClass('is-active');
  });

  $('#page-reload').click(function(e) {
    e.preventDefault();
    location.reload();
  });
};


$(function() {
  flashcards.init();
});
