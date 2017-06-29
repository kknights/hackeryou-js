$(document).ready(function(){


  var x = function(){
    return 'foo';
  }


  // select the body
  var body = $('body');
  console.log(body);

  // select all paragraphs
  var ps = $('p');
  console.log(ps);

  // Log "There are __ paragraph tags in this site"
  console.log('There are ' + ps.length + ' paragraphs on this page');

  // select all the heading 2 elements and log them
  var h2 = $('h2');
  console.log(`There are ${h2.length} h2s on the page`);

  // select all the links in the nav
  var navLinks = $('li a');

  // log how many links are in the nav
  console.log(`There are ${navLinks.length} nav links`);


  // There are 9 points in the first section of the website  (Web Typography CSS3 Techniques Advanced Styling...). Select all of these.
  var points = $('.learned li');

  // select the last point
  var lastPoint = points[points.length-1];

  // Select the sentence underneath "Work" that says "please take a second to check..."
  var workSentence = $('.desc');

  // skills and services is an unordered list, select it, but only it
  var skills = $('.skillMeter');

  // select all the skills inside the skill meter
  var skillItem = $('.skillMeter li');

  // select the even skills
  var skillEven = $('.skillMeter li:even');

  // select the odd skills
  var skillEven = $('.skillMeter li:odd');

  // select every other skill starting at the third one
  var everyThirdSkill = $('.skillMeter li:nth-child(3n+3)');

  // select all spans
  var spans = $('span');

  // select the "good" and "hero" spans in a single selector
  var goodHero = $('.good, .hero');

  // Select the link inside the h1 at the top of the page AND the "© Hacker You" at the bottom of the page
  var h1LinkAndCopyright = $('h1 a, .legal');

  // select all the section divs
  var sectionDivs = $('.section div');

  // select the process div
  var processDiv = $('.process div');

  // select "your name, your email and your message" in the contact form
  var formElements = $('input[type="text"], textarea');

  // select the "send message" input[type="text"]
  var sendButton = $('input[type="submit"]');

  // select all paragraphs in the footer
  var footerParagraphs = $('.footer p');

  // select all the process boxes
  var processBoxes = $('.processBox');

  // select all the work boxes
  var workBox = $('.block');

  // select all the titles inside of them
  var workBoxTitles = $('.block h4')
 
}); // END doc ready
