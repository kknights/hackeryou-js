$(function(){
  // Create a referece to firebase
  var config = {
    apiKey: "AIzaSyCvu_rPg2p3ZchbtwedUvMLCYhGH2v0vO0",
    authDomain: "hackeryouchat.firebaseapp.com",
    databaseURL: "https://hackeryouchat.firebaseio.com",
    projectId: "hackeryouchat",
    storageBucket: "hackeryouchat.appspot.com",
    messagingSenderId: "278981451985"
  };

  firebase.initializeApp(config);
  var database = firebase.database();
  var chat = database.ref('/chat');

  var $messageInput = $('#messageInput');

  $('.chat').on('submit', function(e){
    e.preventDefault();
    var message = $messageInput.val();
    var userName = $('#nameInput').val();

    chat.push ({
      name: userName,
      text: message
    });

    $messageInput.val('');
    console.log(userName, message);

    chat.limitToLast(10).on('child_added', function(){



    })
  })

})
