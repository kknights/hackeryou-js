$(function() {

  // select the body
  $('body');

  // select all paragraphs 
  var ps = $('p');
  
  // Log "There are __ paragraph tags in this site"
  "There are " + ps.length + " paragraph tags in this site";

  // select all the heading 2 elements and log them
  $('h2');

  // select all the links in the nav 
  var navLinks = $('.nav a');

  // log how many links are in the nav
  "There are " + navLinks.length + " links in the nav";

  // There are 9 points in the first second of the website  (Web Typography CSS3 Techniques Advanced Styling...). Select all of these.
  $('ul.leanred li');

  // select the last point
  $('ul.learned li:last-child');
  
  // Select the sentence underneath "Work" that says "please take a second to check..."
  $('p.desc');

  // skills and services is an unordered list, select it, but only it
  $('ul.skillMeter');

  // select all the skills inside the skill meter
  $('ul.skillMeter li');

  // select the even skills
  $('ul.skillMeter li:odd'); // what?!

  // select the odd skills
  $('ul.skillMeter li:even'); // Weird eh

  // select every other skill starting at the thrid one
  $('ul.skillMeter li:nth-child(2n+3');

  // select all spans
  $('span');

  // select the "good" and "hero" spans in a single selector
  $('.good, .hero');

  // Select the link inside the h1 at the top of the page AND the "© Hacker You" at the bottom of the page
  $('h1 a, p.legal');

  // select all the section divs
  $('.section');

  // select the process div
  $('.process');

  // select "your name, your email and your message" in the contact form
  $('input[type="text"],input[type="email"], textarea');

  // select the "send message" input[type="text"]

  $('input[type=submit]');

  // select all paragraphs in the footer

  $('.footer p');

  // select all the process boxes 
  $('.processBox');

  // select all the work boxes
  $('.block');

  // select all the titles inside of them
  $('.block h3');


});
