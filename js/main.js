'use strict';

var _env = require('./env.js');

var body = document.querySelector('body');
var button = document.querySelector('.button');
var word = document.createElement('h1'); //displays word one time from the global scope
var definition = document.createElement('p');

var randomWord = function randomWord() {
  fetch('https://random-word-api.herokuapp.com//word?number=1').then(function (response) {
    return response.json();
  }).then(function (response) {
    word.textContent = response; //textContent is a more secured version of innerHTML
    body.appendChild(word);
    randomDefinition(word);
  }).catch(function (err) {
    console.log(err);
  });

  var randomDefinition = function randomDefinition(word) {
    fetch('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word.textContent + '?key=' + _env.info.key).then(function (response) {
      return response.json();
    }).then(function (response) {
      console.log(response[0].shortdef[0]);
      definition.textContent = 'Definition: ' + response[0].shortdef[0];
      body.appendChild(definition);
    }).catch(function (err) {
      console.log(err);
    });
  };

  button.addEventListener('click', function () {
    randomWord();
  });
};