const app = {};

app.getSentiment = (searchTerm) => {
  $.ajax({
    url: 'http://sentiment.vivekn.com/api/text/',
    type: 'POST',
    data: {
      txt: searchTerm
    }
  }).then((res) => {
    const sentiment = res.result.sentiment;
    if (sentiment === 'Positive'){
      app.fetchData('dolphins', 'dolphins');
    } else if (sentiment === 'Negative'){
      app.fetchData('puppies', 'happiness');
    } else {
      app.fetchData('meh', 'intelligence');
    }
  });
};

app.fetchData = (gifTerm, quoteTerm) => {
  Promise.all([app.getGif(gifTerm), app.getQuote(quoteTerm)])
  .then(function(res){
    const gif = res[0].data[0].images.downsized.url;
    const quote = res[1][0].words;
    app.displayRes(gif, quote);
  });
};


app.getGif = (term) => {
  return $.ajax({
    url: 'https://api.giphy.com/v1/gifs/search',
    data: {
      api_key: 'c5dcdf1aa9c1404d9230e4823e4558dc',
      q: term,
      limit: 1
    }
  });
};

app.getQuote = (type) => {
  return $.ajax({
    url: `http://www.dontpanic.space/api/v1/quotes/tag/${type}`
  });
};


app.displayRes = (gif, quote) => {
  const image = $('<img>').attr('src', gif);
  const text = $('<p>').text(quote);

  $('#response').append(image, text);
}

app.init = () => {
  $('form#collect').on('submit', (e) => {
    e.preventDefault();
    const message = $('input#feelings').val();
    app.getSentiment(message);
  });
};

$(function() {
  app.init();
});
