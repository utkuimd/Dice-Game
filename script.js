'use strict'

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnThrow = document.querySelector('.btn--throw');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScores, activePlayer, playing, resetPlayer;

const init = function(){
    scores = [0,0];
    currentScores = 0;
    activePlayer = 0;
    playing = true;
    resetPlayer = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    document.getElementById(`name--0`).textContent = '1.Oyuncu';
    document.getElementById('name--1').textContent = '2.Oyuncu';
};

init();

const switchPlayer = function(){
    if(resetPlayer){
        player0El.classList.remove('player--active');
        resetPlayer = false;
    }
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScores = 0;

    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    activePlayer = activePlayer === 0 ? 1:0;
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');

};

btnThrow.addEventListener('click',function(){
    if(playing){
        if(resetPlayer){
            player0El.classList.add('player--active');
        }
        const dice = Math.trunc(Math.random() * 6) + 1; 
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        if(dice !== 1){
            currentScores += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScores;
        }
        else{
            currentScores += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScores;
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click',function(){
    if(playing){
        scores[activePlayer] += currentScores;
        //scores[1] = scores[1] + currentScores;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if(scores[activePlayer] >= 100){
            playing = false;
            diceEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.getElementById(`name--${activePlayer}`).textContent = 'WOW! wiNNER!';
        }
        else{
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click',init);