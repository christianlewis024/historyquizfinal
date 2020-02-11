

//listen for auth status changes
auth.onAuthStateChanged(user => {
    console.log(user)
    if (user) {
        db.collection('guides').onSnapshot(snapshot => {
            setupUI(user);
        }, err => console.log(err.message));
    } else {
        setupUI();

    }
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user & add firestore data
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value,
            username: signupForm['username'].value,
            email: signupForm['signup-email'].value
        });

    }).then(() => {
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});
// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });

});

// const auth = require("registry-auth-token");

// Testing below //
// Testing below //
// Testing below //


// var user = firebase.auth().currentUser;
// var name, email;

// if (user != null) {

//     name = user.username;
//     email = user.email;
//     function submitScore() {
//         db.collection("scores").doc().set({
//             score: score,
//             name: name || email

//         })
//     }
// }



function submitScore() {
    var user = firebase.auth().currentUser;
    var name, email;

    if (user) {
        name = user.username;
        email = user.email;

        db.collection("scores3").doc().set({
            score: score,
            name: name || email

        })
    }
}


// // select all elements

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

// // from discord //
// // Authentication / user information is automatically added to the request.
// const uid = context.auth.uid;
// const name = context.auth.token.name || null;
// const picture = context.auth.token.picture || null;
// const email = context.auth.token.email || null;

// // from discord //



// const currentUser = document.getElementsByName("username");
// const getUsername = document.querySelector('')
// const user = auth.currentUser;
// const name, email, photoUrl, uid, emailVerified;

// if (user) {
//     name = user.username;
//     email = user.email;
//     photoUrl = user.photoURL;
//     emailVerified = user.emailVerified;
//     uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
//     // this value to authenticate with your backend server, if
//     // you have one. Use User.getToken() instead.
// }

// const getUsername = user.email

// DocumentReference.get().then(function (doc) {
//     if (doc && doc.exists) {
//         const myData = doc.data();

//     }
// })



// function submitScore() {
//     db.collection("scores").doc().set({
//         score: score,
//         name: myData

//     })
// }

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
        question: "Who took command of British Forces in North America directly after Thomas Gage?",
        imgSrc: "img/bunkerhill.jpg",
        choiceA: "Lord North",
        choiceB: "William Howe",
        choiceC: "Richard Howe",
        choiceD: "Benjamin Lincoln",
        correct: "B"
    }, { // QUESTION #2
        question: "Where did most of the fighting of Bunker Hill actually take place?",
        imgSrc: "img/bunkerhill.jpg",
        choiceA: "Bunker Hill",
        choiceB: "Nob Hill",
        choiceC: "Hank's Hill",
        choiceD: "Breed's Hill",
        correct: "D"
    },
    {   // QUESTION #3
        question: "How many attempts did it take for the British to take Breed's Hill?",
        imgSrc: "img/bunkerhill.jpg",
        choiceA: "1",
        choiceB: "2",
        choiceC: "3",
        choiceD: "4",
        correct: "C"
    }, { // QUESTION #4
        question: "Which side suffered greater casualties in the battle of Bunker Hill?",
        imgSrc: "img/bunkerhill.jpg",
        choiceA: "British",
        choiceB: "American",
        choiceC: "Even",
        choiceD: "French",
        correct: "A"
    }, { // QUESTION #5
        question: "Who's quote is this? 'I wish we could sell them another hill at the same price'",
        imgSrc: "img/bunkerhill.jpg",
        choiceA: "Nathanael Greene",
        choiceB: "George Washington",
        choiceC: "Israel Putnam",
        choiceD: "George III",
        correct: "A"
    }, { // QUESTION #6
        question: "Which British controlled fort did Benedict Arnold and Ethan Allen take?",
        imgSrc: "img/bunkerhill.jpg",
        choiceA: "Fort Knox",
        choiceB: "Fort McHenry ",
        choiceC: "Fort Sumter ",
        choiceD: "Fort Ticonderoga",
        correct: "D"
    }, { // QUESTION #7
        question: "Which lake is Fort Ticonderoga nearest?",
        imgSrc: "img/bunkerhill.jpg",
        choiceA: "Lake Erie",
        choiceB: "Lake Champlain",
        choiceC: "Lake Ticonderoga ",
        choiceD: "Lake Mead",
        correct: "B"
    }, { // QUESTION #8
        question: "In the Quebec campaign, who was the British general in charge in Canada?",
        imgSrc: "img/bunkerhill.jpg",
        choiceA: "Michael Bolton",
        choiceB: "Banastre Tarleton",
        choiceC: "Guy Carleton",
        choiceD: "Charles Stanton",
        correct: "C"
    }, { // QUESTION #9
        question: "Which American general attacked and occupied Montreal?",
        imgSrc: "img/bunkerhill.jpg",
        choiceA: "Richard Montgomery",
        choiceB: "Henry Knox",
        choiceC: "Nathanael Greene",
        choiceD: "Friedrich Wilhelm von Steuben",
        correct: "A"
    }, { // QUESTION #10
        question: "What injury did Benedict Arnold recieve in the Quebec campaign?",
        imgSrc: "img/bunkerhill.jpg",
        choiceA: "Amputated feet from frostbite",
        choiceB: "Stabbed in left eye",
        choiceC: "Hanged to death",
        choiceD: "Shot in the leg",
        correct: "D"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15; // 15s
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
















