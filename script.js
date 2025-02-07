const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal"); 
const playAgainBtn = document.querySelector(".play-again");  

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = ()=>{
    // Ressetting all game variable and UI components
    correctLetters = [];
    wrongGuessCount = 0;
    wordDisplay.innerHTML = currentWord.split("").map(()=> ` <li class="letter"></li>`).join("");
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    gameModal.classList.remove("show");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);    
}


const getRandomWord = ()=>{

    // selecting rndm wrd and hint from the wordList

    const {word, hint} = wordList[Math.floor(Math.random()*wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) =>{
    // After 500ms of game complete. Showing modal with relevant details
    setTimeout(()=>{
        const modalText = isVictory ? `You found the word : ` : `The correct word was : `;
        gameModal.querySelector("img").src = `Images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats !' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText}<b> ${currentWord} </b>`;
        gameModal.classList.add("show");
    }, 500);
}

const initGame = (button, clickedLetter) =>{
    // checking if clickedWord is exist on the word or not
    if(currentWord.includes(clickedLetter)){
       [...currentWord].forEach((letter, index) =>{
        if(letter === clickedLetter){
            correctLetters.push(letter);
            wordDisplay.querySelectorAll("li")[index].innerText = letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
       })
    } else {
        //if clicked letter doesn't exist then update the wrong guessCount and hangman Image
       wrongGuessCount++; 
       hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    //calling gameOver function if any these condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

// Creating keyboard buttons and adding event listners
for(let i =97; i<=122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}
playAgainBtn.addEventListener("click", getRandomWord)
getRandomWord();