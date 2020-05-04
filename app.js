//Variables
const start = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const phrases = ['KeepGoing', 'OneMore', 'NeverStop', 'YouAreDoingGreat', 'YouCanDoIt'];
const ul = document.getElementById('phrase').firstElementChild;
const triesList = document.getElementsByClassName('tries');
const mainHead = document.getElementById("title");
let lives = 5;

const randomPhrase = () => {
    return phrases[Math.floor(Math.random() * phrases.length)];
};

const addPhraseToDisplay = () => {
    let phrase = randomPhrase();
    for (let i = 0; i < phrase.length; i++) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(phrase[i]));
        if (phrase[i] !== " ") {
            li.setAttribute("class", "letter");
        };
        ul.appendChild(li);
    };
};

const checkWin = () => {
    if (lives == 0) {
        overlay.setAttribute('class', 'lose');
        overlay.style.display = 'flex';
        mainHead.firstChild.nodeValue = "You Lose. Play again?";
        reset();
        return;
    };
    let liList = document.getElementsByClassName('letter');
    for (let i = 0; i < liList.length; i++) {
        if (liList[i].classList.contains('show') === false) {
            return;
        };
    };
    overlay.setAttribute('class', 'win');
    mainHead.firstChild.nodeValue = "You Won! Play again?";
    reset();
    overlay.style.display = 'flex';
};


const reset = () => {
    lives = 5;
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    };
    const buttons = document.querySelectorAll("BUTTON");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].removeAttribute('disabled');
        buttons[i].setAttribute('class', ' ');
    };
    for (let y = 0; y < triesList.length; y++) {
        triesList[y].firstChild.src = 'images/liveHeart.png';
    };
};

const checkLetter = (guess) => {
    let correctLetter = null;
    let liList = document.getElementsByClassName('letter');
    for (let i = 0; i < liList.length; i++) {
        if (liList[i].innerHTML.toUpperCase() === guess.toUpperCase()) {
            let correct = liList[i].innerHTML;
            liList[i].setAttribute("class", "letter show");
            correctLetter = liList[i].innerHTML;
        };
    };
    if (correctLetter != null) {
        return correctLetter;
    };
    return null;
};


start.addEventListener('click', () => {
    overlay.style.display = 'none';
    addPhraseToDisplay();
})

document.addEventListener('click', (e) => {
    if (event.target.tagName == 'BUTTON') {
        e.target.setAttribute('class', 'chosen');
        e.target.setAttribute('disabled', 'true');
        let guess = event.target.innerHTML;
        let letterfound = checkLetter(guess);
        if (letterfound == null) {
            lives -= 1;
            triesList[lives].firstChild.src = 'images/lostHeart.png';
        };
        checkWin();
    };
});