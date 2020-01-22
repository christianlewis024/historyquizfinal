// const auth = require("registry-auth-token");





// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// const currentUser = document.getElementsByName("username");
// const getUsername = document.querySelector('')














function submitScore() {
    db.collection("scores").doc().set({
        score: score,
        name: ('fill')


    })
}







// const getUsername = document.querySelector('#account-details.username')
// const accountDetails = document.querySelector('#account-details');
// const signupForm = document.querySelector('#signup-form')
// const getUsername = document.querySelector('#signup-form');
// getUsername{

// }
// // const getUsername = firebase.auth().currentUser;
// var user = firebase.auth().currentUser;
// var name, email, photoUrl, uid, emailVerified;

// if (user != null) {
//     name = user.displayName;
//     email = user.email;
//     photoUrl = user.photoURL;
//     emailVerified = user.emailVerified;
//     uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
//     // this value to authenticate with your backend server, if
//     // you have one. Use User.getToken() instead.
// }

// if (getUsername == true) {
//     name = user.username;
//     email = user.email;
// }
// const getUsername = (user) => {
//     if (user) {
//         db.collection('users').doc(user.uid).get().then(doc => {
//             accountDetails.innerHTML = html;
//         })
//     }
// }

// var user = firebase().currentUser;
// var name, email, photoUrl, uid, emailVerified;

// if (user) {
//     name = user.username;
//     email = user.email;
//     photoUrl = user.photoURL;
//     emailVerified = user.emailVerified;
//     uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
//     // this value to authenticate with your backend server, if
//     // you have one. Use User.getToken() instead.
// }

// const signupForm = document.querySelector('#signup-form');
// const getUsername = db.collection('users').doc('currentUserID').get().then((user) => {
//     if (user.exists) {
//         console.log(user.data())
//     }
// });
// const getUsername = db.collection('uid');

// const getUsername = db.collection('users').doc(users.uid).get().then();
// db.collection('users').get(user.uid).get()
// });
// const getUsername = db.collection('users').doc(user.uid).get().then(doc => {
//     const html = `
// <div>Logged in as ${user.email}</div>
// <div>${doc.data().bio}</div>
// <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
// `;
//     accountDetails.innerHTML = html;
// });
// create our questions
let questions = [
    {   // QUESTION #1
        question: "What was the name of George Washington's home?",
        imgSrc: "img/georgefrown.jfif",
        choiceA: "Monticello",
        choiceB: "Montecito",
        choiceC: "Mount Vernon",
        choiceD: "The White House",
        correct: "C"
    }, { // QUESTION #2
        question: "On February 22, 1732 George Washington was born here:",
        imgSrc: "img/georgefrown.jfif",
        choiceA: "Philadelphia, PA",
        choiceB: "Bristol, England",
        choiceC: "Mount Vernon, VA",
        choiceD: "Pope's Creek, VA",
        correct: "D"
    },
    {   // QUESTION #3
        question: "Starting as a 16-year old, Washington was engaged in this valuable profession:",
        imgSrc: "img/georgefrown.jfif",
        choiceA: "Lawyer",
        choiceB: "Surveyor",
        choiceC: "Ship Captain",
        choiceD: "Gunsmith",
        correct: "B"
    }, { // QUESTION #4
        question: "During his lifetime Washington visited just one location outside of the continental United States. Where did he go?",
        imgSrc: "img/georgefrown.jfif",
        choiceA: "London",
        choiceB: "Paris",
        choiceC: "Bermuda",
        choiceD: "Barbados",
        correct: "D"
    }, { // QUESTION #5
        question: "in 1754, Washington led an attack that sparked this global conflict:",
        imgSrc: "img/georgefrown.jfif",
        choiceA: "The French & Indian War",
        choiceB: "The Revolutionary War",
        choiceC: "The War of 1812",
        choiceD: "The Napoleonic Wars",
        correct: "A"
    }, { // QUESTION #6
        question: "In 1759 George Washington married this woman:",
        imgSrc: "img/georgefrown.jfif",
        choiceA: "Sally Fairfax",
        choiceB: "Mary Ball",
        choiceC: "Martha Dandridge Custis",
        choiceD: "Dolley Paine Todd",
        correct: "C"
    }, { // QUESTION #7
        question: "George Washington's Mount Vernon home is built above this river:",
        imgSrc: "img/georgefrown.jfif",
        choiceA: "The Rappahannock",
        choiceB: "The Ohio",
        choiceC: "The James",
        choiceD: "The Potomac",
        correct: "D"
    }, { // QUESTION #8
        question: "Washington suffered from this physical ailment all his adult life:",
        imgSrc: "img/georgefrown.jfif",
        choiceA: "Arthritis",
        choiceB: "Dislocated ankle",
        choiceC: "Dental troubles",
        choiceD: "Small Pox",
        correct: "C"
    }, { // QUESTION #9
        question: "After crossing the icy Delaware River on the night of December 25, 1776, Washington and his army fought in this battle:",
        imgSrc: "img/georgefrown.jfif",
        choiceA: "The Battle of Trenton",
        choiceB: "The Battle of Brandywine",
        choiceC: "The Battle of Yorktown",
        choiceD: "The Battle of Germantown",
        correct: "A"
    }, { // QUESTION #10
        question: "During the cold winter of 1777-1778 Washington and the Continental Army camped here: ",
        imgSrc: "img/georgefrown.jfif",
        choiceA: "Morristown, NJ",
        choiceB: "Brandywine, PA",
        choiceC: "Germantown, PA",
        choiceD: "Valley Forge, PA",
        correct: "D"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 12; // 12s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
        submitScore();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// submit the score 

// function submitScore() {
//     db.collection("scores").doc().set({
//         score: score,
//         name: accountDetails['username'].value


//     })
// }

// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
        (scorePerCent >= 60) ? "img/4.png" :
            (scorePerCent >= 40) ? "img/3.png" :
                (scorePerCent >= 20) ? "img/2.png" :
                    "img/1.png";

    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}

// function saveScore() {
//     // // Get name from input box
//     // let name = document.getElementById('name').value;

//     // Make sure name has a value, if not send alert.
//     if (score >= 0) {
//         // Add a new document in collection "scores"
//         db.collection("scores").doc().set({

//             score: score
//         })


// ^ needs to close above


// const createForm = document.querySelector('#create-form');
// createForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     db.collection('guides').add({
//         title: createForm.title.value,
//         content: createForm.content.value
//     })

















