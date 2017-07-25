  // Create a referece to firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDwSZis0M6r1vf6QL1EX4HWi588kNevQ5s",
    authDomain: "hackeryou-88892.firebaseapp.com",
    databaseURL: "https://hackeryou-88892.firebaseio.com",
    storageBucket: "hackeryou-88892.appspot.com",
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  var chat = database.ref('/chat');

  // C.R.E.A.M -  cache your elements
  var messageField = $('#messageInput');
  var nameField = $('#nameInput');
  var messageList = $('.messages');

  // Listen for the form submit
  $('.chat').on('submit',function(e) {

    // stop the form from submitting
    e.preventDefault();

    // create a message object
    var message = {
      name : nameField.val(),
      text : messageField.val()
    }
    // Save Data to firebase
    chat.push(message);
    // clear message field
    messageField.val('');

  });

  // Add a callback that is triggered for each chat message
  // this is kind of like an Ajax request
  chat.limitToLast(10).on('child_added', function (data) {

    // Get data from returned
    var data = data.val();
    var username = data.name || 'anonymous';
    var message = data.text;

    // Create an element
    var nameElement = $('<strong>').text(username);
    var messageElement = $('<li>').text(message).prepend(nameElement);

    // Add the message to the DOM
    messageList.append(messageElement)

    //SCROLL TO BOTTOM OF MESSAGE LIST
    messageList[0].scrollTop = messageList[0].scrollHeight;
  });
