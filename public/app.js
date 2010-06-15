function anigram(phrase, anagram) {
  var letterSpacing = 35;
  var fontSize = '40px';
  var leftMargin = 150;
  var topMargin = 150;
  var lineSpacing = 100;
  var moveTime = 1000;
  var highlightTime = 100;

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
      anagramLetter.animate({'fill': '#f00'}, highlightTime, moveLetter);
    }
  }

  function moveLetter() {
    var x = leftMargin + letterSpacing * anagramPos;
    var y = topMargin + lineSpacing;
    var attrs = {
      'rotation': anagramPos <= anagramLetter.pos ? -360 : 360,
      'along': makePath(anagramLetter.origX, anagramLetter.origY, x, y)
    }
    anagramLetter.animate(attrs, moveTime, unhighlightLetter);
  }

  function unhighlightLetter() {
    anagramPos += 1;
    anagramLetter.moved = true;
    anagramLetter.animate({'fill': '#000'}, highlightTime, highlightLetter);
  }

  for (var i=0; i < characters.length; i++) {
    if (letter != ' ') {
      var x = leftMargin + letterSpacing * i;
      var y = topMargin;
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

