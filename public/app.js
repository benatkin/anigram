function anigram(phrase, anagram) {
  var letterSpacing = 35;
  var fontSize = '40px';

  // Creates canvas 320 × 200 at 10, 50
  var paper = Raphael(20, 20, 1000, 500);

  var remaining = anagram;
  var characters = phrase.match(/./g);
  var letters = [];
  var anagramPos = 0;
  var anagramLetter = null;

  function makePath(x1, y1, x2, y2) {
    x1 = x1 * 1.0;
    y1 = y1 * 1.0;
    x2 = x2 * 1.0;
    y2 = y2 * 1.0;
    var vx = x2 - x1;
    var vy = y2 - y1;
    var ax, ay, bx, by;
    ax = x1 + vx * 0.0 + vy * 0.5;
    ay = y1 + vx * -0.5 + vy * 0.0;
    bx = x2 + vx * 0.0 + vy * 0.5;
    by = y2 + vx * -0.5 + vy * 0.0;
    return 'M' + x1 + ' ' + y1 + 'C' + ax + ' ' + ay + ' ' + bx + ' ' + by + ' ' + x2 + ' ' + y2;
  }

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
    var x = 150 + letterSpacing * anagramPos;
    var y = 250;
    var rotation = anagramPos <= anagramLetter.pos ? -360 : 360;
    //var path = 'M' + anagramLetter.origX + ',' + anagramLetter.origY + 'L' + x + ',' + y;
    var along = makePath(anagramLetter.origX, anagramLetter.origY, x, y);
    //paper.path(along);
    var attrs = {
      'rotation': rotation,
      'along': along
    }
    anagramLetter.animate(attrs, 1000, unhighlightLetter);
  }

  function unhighlightLetter() {
    anagramPos += 1;
    anagramLetter.moved = true;
    anagramLetter.animate({'fill': '#000'}, 100, highlightLetter);
  }

  for (var i=0; i < characters.length; i++) {
    if (letter != ' ') {
      var x = 250 + letterSpacing * i;
      var y = 150;
      var letter = paper.text(x, y, characters[i]);
      letter.attr('font-family', 'Andale Mono, Courier New, courier, monospace');
      letter.attr('font-size', fontSize);
      letter.character = characters[i];
      letter.pos = i;
      letter.origX = x;
      letter.origY = y;
      letter.moved = false;
      letters.push(letter);
    }
  }

  highlightLetter();
}

