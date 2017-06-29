$(function() {

  const flashcard_01 = $('.flashcard01');
  const flashcard_02 = $('.flashcard02');
  const flashcard_03 = $('.flashcard03');

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


  // flashcard 01
  const flashcard01 = function(){

    $("input").on( "click", function() {
      var inputValue = $( "input:checked" ).val();

      if( $("#option2:checked").length > 0){

        $(this).next('label').addClass('is-correct');
        $( ".flashcard_message" ).append("😸 Felicidades! '" + inputValue + "' es correcto!" + "<br>");
        $("input:not(#option2)").attr('disabled',true).css('cursor', 'not-allowed');
        $('.flashcard_next').addClass('is-active');

        let loadNextFlashcard = setTimeout(function request() {
          flashcard02();
        }, 2000);

      } else {
        $( ".flashcard_message" ).append("😿 Lo siento, pero '" + inputValue + "' es incorrecto" + "<br>");
        $(this).next('label').addClass('is-incorrect');
        $("input:checked").removeAttr("checked");
      }
    })
  };
  flashcard01();


  // flashcard 2
  const flashcard02 = function(){

    $(flashcard_01).addClass('is-inactive');
    $(flashcard_02).removeClass('is-inactive');

    let conjugateEs = [{
      yo: "acecho",
      tu: "acechas",
      él: "acecha",
      ella: "acecha",
      Usted: "acecha",
      nosotros: "acechamos",
      vosotros: "acecheis",
      ellos: "acechan",
      ellas: "acechan",
      Ustedes: "acechan"
    }];

    let conjugateEn = [{
      i: "stalk",
      you: "stalk",
      he: "stalks",
      she: "stalks",
      You: "stalk",
      we: "stalk",
      you: "stalk",
      they: "stalk",
      You: "stalk"
    }];

    console.log(conjugateEs);
    console.log(conjugateEn);

  };






});
