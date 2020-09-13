// Challenge 01: Your Age in Days

function ageInDays() {
  var birthYear = prompt('What year were you born... Good friend?');
  var ageInDayss = (2020 - birthYear) * 365;
  var h1 = document.createElement('h1');
  var textAnswer = document.createTextNode('You are ' + ageInDayss + ' days old.');
  h1.setAttribute('id', 'ageInDays');
  h1.appendChild(textAnswer);
  document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
  document.getElementById('ageInDays').remove();
}

// Challenge 02: Cat Genarator

function genarateCat() {
  var image = document.createElement('img');
  image.src = 'images/cat.png';
  var div = document.getElementById('flex-cat-gen');
  div.appendChild(image);
}

// Challenge 03: Rock, Paper, Scissors

function rpsGame(yourChoice) {
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randToRpsInt());
  console.log(botChoice);
  var results = decideWinner(humanChoice, botChoice);
  console.log(results);
  var message = finalMessage(results);
  console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    'rock': {
      'scissors': 1,
      'rock': 0.5,
      'paper': 0
    },
    'paper': {
      'rock': 1,
      'paper': 0.5,
      'scissors': 0
    },
    'scissors': {
      'paper': 1,
      'scissors': 0.5,
      'rock': 0
    }
  };

  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

function finalMessage([yourChoice, computerChoice]) {
  if (yourChoice === 0) {
    return {
      'message': 'You lost!',
      'color': 'red'
    };
  } else if (yourChoice === 0.5) {
    return {
      'message': 'You tied!',
      'color': 'yellow'
    };
  } else {
    return {
      'message': 'You won!',
      'color': 'green'
    };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, message) {
  var imageDatabase = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src
  };

  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  var humanDiv = document.createElement('div');
  var botDiv = document.createElement('div');
  var messageDiv = document.createElement('div');

  humanDiv.innerHTML = `<img src='${imageDatabase[humanImageChoice]}'>`;
  botDiv.innerHTML = `<img src='${imageDatabase[botImageChoice]}'>`;
  messageDiv.innerHTML = `<h1 style='color: ${message['color']}; font-size: 60px; padding-top: 30px;'>${message['message']}</h1>`;

  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

// Challenge 04: Change the color of ALl Buttons

var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = [];
for (var i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === 'red') {
    buttonRed();
  } else if (buttonThingy.value === 'green') {
    buttonGreen();
  } else if (buttonThingy.value === 'reset') {
    buttonColorReset();
  } else if (buttonThingy.value === 'random') {
    randomColors();
  }
}

function buttonRed() {
  for (var i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-danger');
  }
}

function buttonGreen() {
  for (var i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success');
  }
}

function buttonColorReset() {
  for (var i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function randomColors() {
  var choices = ['btn-success', 'btn-danger', 'btn-primary', 'btn-warning'];
  for (var i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[Math.floor(Math.random() * 4)]);
  }
}

// Challenge 05: Blackjack

var blackjackGame = {
  'you': {
    'scoreSpan': '#your-blackjack-result',
    'div': '#your-box',
    'score': 0
  },
  'dealer': {
    'scoreSpan': '#dealer-blackjack-result',
    'div': '#dealer-box',
    'score': 0
  },
  'card': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
  'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'K': 10, 'Q': 10, 'A': [1, 11] },
  'wins': 0,
  'losses': 0,
  'draws': 0,
  'isStand': false,
  'turnsOver': false
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

function blackjackHit() {
  if (blackjackGame['isStand'] === false) {
    var card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['card'][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  if (blackjackGame['turnsOver'] === true) {
    blackjackGame['isStand'] = false;
    var yourImages = document.querySelector('#your-box').querySelectorAll('img');
    var dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (var i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }

    for (var i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color = '#fff';
    document.querySelector('#dealer-blackjack-result').style.color = '#fff';

    document.querySelector('#blackjack-result').textContent = "Let's play";
    document.querySelector('#blackjack-result').style.color = 'black';
    blackjackGame['turnsOver'] = true;
  }
}

function updateScore(card, activePlayer) {
  if (card === 'A') {
    if (activePlayer['score'] + blackjackGame['cardsMap']['A'][1] <= 21) {
      activePlayer['score'] += 11;
    } else {
      activePlayer['score']++;
    }
  } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
  } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
  blackjackGame['isStand'] = true;

  while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
    var card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }

  if (DEALER['score'] > 15) {
    blackjackGame['turnsOver'] = true;
    var winner = computeWinner();
    showResult(winner);
  }
}

function computeWinner() {
  var winner;
  if (YOU['score'] <= 21) {
    if ((YOU['score'] > DEALER['score']) || (DEALER['score'] > 21)) {
      winner = YOU;
      blackjackGame['wins']++;
    } else if (YOU['score'] < DEALER['score']) {
      winner = DEALER;
      blackjackGame['losses']++;
    } else if (YOU[score] === DEALER[score]) {
      blackjackGame['draws']++;
    }
  } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
    winner = DEALER;
    blackjackGame['losses']++;
  } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
    blackjackGame['draws']++;
  }

  console.log('Winner is: ' + winner);
  return winner;
}

function showResult(winner) {
  var message, messageColor;
  if (blackjackGame['turnsOver'] === true) {
    if (winner === YOU) {
      message = 'You won!';
      document.querySelector('#wins').textContent = blackjackGame['wins'];
      messageColor = 'green';
      winSound.play();
    } else if (winner === DEALER) {
      message = 'You lost!';
      document.querySelector('#loses').textContent = blackjackGame['losses'];
      messageColor = 'red';
      lossSound.play();
    } else {
      message = 'You drew!';
      document.querySelector('#draws').textContent = blackjackGame['draws'];
      messageColor = 'black';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
  }
}