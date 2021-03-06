
const scoringRubrik = {
  'a': 1,
  'e': 1,
  'i': 1,
  'o': 1,
  'u': 1,
  'l': 1,
  'n': 1,
  'r': 1,
  's': 1,
  't': 1,
  'd': 2,
  'g': 2,
  'b': 3,
  'c': 3,
  'm': 3,
  'p': 3,
  'f': 4,
  'h': 4,
  'v': 4,
  'w': 4,
  'y': 4,
  'k': 5,
  'j': 8,
  'x': 8,
  'q': 10,
  'z': 10
};

const Scrabble = {
  score(w) {
    if (w == "" || w == null || typeof(w) !== 'string') {
      throw 'Must provide a sentence with valid characters'
    }

    let word = w.toLowerCase();

    let wordScore = 0;
    for (let letter of word) {
      if (Object.keys(scoringRubrik).includes(letter)) {
        wordScore += scoringRubrik[letter]
      } else {
        throw new Error('Enter valid letter.')
      }
    }
    switch(true) {
      case (word.length == 7):
      return wordScore + 50;
      case (word.length == 0):
      return null;
      case (word.length <= 6 && word.length >= 1):
      return wordScore;
      case (word.length > 7):
      throw 'Must be less than or equal to 7 letters';
    }
    // console.log('Length is ' + typeof(length) + ' and it is ' + length)
  },

  breakTie(incumbent, challenger) {
    if (incumbent.length == 7) {
      return incumbent;
    } else if (challenger.length == 7) {
      return challenger;
    } else if (challenger.length < incumbent.length) {
      return challenger;
    } else {
      return incumbent;
    }
  },

  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords === undefined || arrayOfWords.length === 0) {
      throw 'No words passed!';
    }

    let maxWord = arrayOfWords[0];
    let maxScore = this.score(arrayOfWords[0]);

    for (let word of arrayOfWords) {
      let score = this.score(word);
      if (score > maxScore) {
        maxScore = score;
        maxWord = word
      } else if (score == maxScore) {
        maxWord = this.breakTie(maxWord, word)
        maxScore = this.score(maxWord)
      }
    }
    return maxWord
  }
}

Scrabble.Player = class {
  constructor(name) {
    if (name.null) {
      throw 'Name required!';
    }
    this.name = name;
    this.plays = [];
  }

  totalScore() {
    let wordsPlayed = this.plays;
    let total = 0;

    for (let word of wordsPlayed) {
      total += Scrabble.score(word);
    }
    return total;
  }

  hasWon() {
    return this.totalScore() < 100 ? false: true;
  }

  play(word) {
    if (word.null || typeof(word) !== 'string') {
      throw 'Must be a valid word.';
    }

    if (this.hasWon()) {
      return false;
    } else {
      this.plays.push(word);
      return true;
    }
  }

  highestScoringWord() {
    let wordsPlayed = this.plays;
    let highestScoringWord = Scrabble.highestScoreFrom(wordsPlayed);

    return highestScoringWord;
  }

  highestWordScore() {
    // returns highest scoring word score
    let highestWord = this.highestScoringWord()
    return Scrabble.score(highestWord);
  }
};

module.exports = Scrabble;



// word.split().forEach(function(letter){
//   if (Object.keys(scoringRubrik).includes(letter)) {
//     wordScore += scoringRubrik[letter]
//   }
// });
// console.log(word);
