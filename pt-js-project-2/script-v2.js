$(function() {
  // play sound on icon click
  $('.play').on('click', function(){
    $(this).next('audio').trigger('play');
  });

  // switch the language of the header onClick
  function translateHeader(){
    var translateHeaderIcon = $('.translate');
    $(translateHeaderIcon).on('click', function(){
      $('.flashcard_title_es').toggleClass('is-inactive');
      $('.flashcard_title_en').toggleClass('is-active');
    });
  };
  translateHeader();


  // todo -- change this to an aggregated array, store next flashcard function
  var correctAnswers = {
    flashcard_01: "soporific, sleepy, numbing",
    flashcard_02: "answer 01",
    flashcard_03: "answer 03"
  };

  // answer messages
  var correctMessage = "yay! thats correct" + "<br>";
  var incorrectMessage = "nope! thats incorrect" + "<br>";

  // if user picks the right answer
  function rightAnwser(){
    $( ".flashcard_message" ).append(correctMessage);
    loadNextFlashcard();
  };

  // if the user picks the wrong answer
  function wrongAnswer(){
    $( ".flashcard_message" ).append(incorrectMessage);
    $(this).next('label').addClass('is-incorrect');
    $("input:checked").removeAttr("checked");
  };

  //load next flashcard
  function loadNextFlashcard(){
    setTimeout(function request() {
      $('.flashcard').removeClass('is-active').addClass('is-inactive');
      $('.flashcard').next('.flashcard').removeClass('is-inactive').addClass('is-active');
    }, 2000);

  }


  function answerCheck(correctAnswers, userAnswer){
    if (userAnswer == correctAnswers) {
      rightAnwser();
    } else {
      wrongAnswer();
    }
  };


  function flashcards(card){
    $("input").on("click", function(){
      userAnswer = $("input[type='radio']:checked").val();
      answerCheck();
    });
  };

  flashcards(correctAnswers.flashcard_01);

});
