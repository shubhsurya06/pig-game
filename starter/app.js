/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, isGamePlaying, lastDice, finalScore, dice2;

// Start the game
init();

document.querySelector('.btn-roll').addEventListener('click', function(){
	
	if (isGamePlaying){
		// 1. generate random no till 6
		dice = Math.floor(Math.random() * 6) + 1;
		dice2 = Math.floor(Math.random() * 6) + 1;

		// 2. Display the result
		//this is first dice
		var diceDom1 = document.querySelector('.dice')
		diceDom1.style.display = 'block';
		diceDom1.src = 'dice-' + dice + '.png';

		// this is second dice
		var diceDom2 = document.querySelector('.dice1')
		diceDom2.style.display = 'block';
		diceDom2.src = 'dice-' + dice2 + '.png';

    	// check if any one of dice is 1, then player looses his CURRENT Score
		if (dice !== 1 && dice2 !== 1) {
			// Add score
			roundScore += dice + dice2;
			document.getElementById('current-' + activePlayer).textContent = roundScore;
		}
		else {
			// Next Player's turn
			nextPlayer();
		}

		/* 3. updating round scores and set to 0 IF dice is 1.
		if (dice === 6 && lastDice === 6){
			// player looses score
			scores[activePlayer] = 0;
			document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
			nextPlayer();
		}
		
		// if dice 1 is equal to 1, then player looses his current score
		if(dice !== 1) {
			// Add score
			roundScore += dice + dice2;
			document.getElementById('current-' + activePlayer).textContent = roundScore;
		}
		else {
			// Next Player's turn
			nextPlayer();
		}

		lastDice = dice;
		*/
	}
	
});

document.querySelector('.btn-hold').addEventListener('click', function(){

	if(isGamePlaying){
		// When click on Hold button, set the CURRENT value to GLOBAL
		scores[activePlayer] += roundScore;

		// change the UI
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

		var input = document.querySelector('.final-score ').value;

		if(input){
			finalScore = input;
		}
		else{
			finalScore = 50;
		}

		// Check if player won the game
		if (scores[activePlayer] >= finalScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.dice1').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			isGamePlaying = false;
		} else {
			// change the current player
			nextPlayer();
		}
	}

});

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	// set both player's current value to 0
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	// change the active class
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice1').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	isGamePlaying = true;

	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice1').style.display = 'none';

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	document.querySelector('.player-0-panel').classList.add('active');

	document.querySelector('.final-score ').value = null;
}