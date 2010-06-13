function anigram(phrase, anagram) {
  var letterSpacing = 35;
  var fontSize = '40px';

  // Creates canvas 320 × 200 at 10, 50
  var paper = Raphael(20, 20, 1000, 200);

  var remaining = anagram;
  var characters = phrase.match(/./g);
  var letters = [];
  var anagramPos = 0;
  var anagramLetter = null;

  function findLetter(character) {
    for (var i=0; i < letters.length; i++) {
      var letter = letters[i];
      if (!letter.moved && letter.character == character) return letter;
    }
  }

  function highlightLetter() {
    if (remaining[anagramPos] == ' ') anagramPos++;
    character = remaining[anagramPos];
    anagramLetter = findLetter(character);
    if (anagramLetter) {
      anagramLetter.animate({'fill': '#f00'}, 100, moveLetter);
    }
  }

  function moveLetter() {
    anagramLetter.animate({'x': 150 + letterSpacing * anagramPos, 'y': 150}, 1000, unhighlightLetter);
  }

  function unhighlightLetter() {
    anagramPos += 1;
    anagramLetter.moved = true;
    anagramLetter.animate({'fill': '#000'}, 100, highlightLetter);
  }

  for (var i=0; i < characters.length; i++) {
    if (letter != ' ') {
      var letter = paper.text(150 + letterSpacing * i, 50, characters[i]);
      letter.attr('font-family', 'Andale Mono, Courier New, courier, monospace');
      letter.attr('font-size', fontSize);
      letter.character = characters[i];
      letter.pos = i;
      letter.moved = false;
      letters.push(letter);
    }
  }

  highlightLetter();
}

