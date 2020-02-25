//listen for auth status changes
auth.onAuthStateChanged(user => {
  console.log(user);
  if (user) {
    db.collection("guides").onSnapshot(
      snapshot => {
        setupUI(user);
      },
      err => console.log(err.message)
    );
  } else {
    setupUI();
  }
});

// signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", e => {
  e.preventDefault();

  // get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  // sign up the user & add firestore data
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return db
        .collection("users")
        .doc(cred.user.uid)
        .set({
          bio: signupForm["signup-bio"].value,
          username: signupForm["username"].value,
          email: signupForm["signup-email"].value
        });
    })
    .then(() => {
      // close the signup modal & reset form
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    });
});
// logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", e => {
  e.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  // get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});

function submitScore() {
  var user = firebase.auth().currentUser;
  var name, email;

  if (user) {
    name = user.username;
    email = user.email;

    db.collection("scores5")
      .doc()
      .set({
        score: score,
        name: name || email
      });
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

// create our questions
let questions = [
  {
    // QUESTION #1
    question:
      "How many people were on the commitee to write the Declaration of Independence?",
    imgSrc: "img/declarationcongress.jpg",
    choiceA: "1",
    choiceB: "2",
    choiceC: "3",
    choiceD: "5",
    correct: "D"
  },
  {
    // QUESTION #2
    question:
      "When did congress officialy vote to declare independence from Britain?",
    imgSrc: "img/declarationcongress.jpg",
    choiceA: "July 1st, 1776",
    choiceB: "July 2nd, 1776",
    choiceC: "July 3rd, 1776",
    choiceD: "July 4th, 1776",
    correct: "B"
  },
  {
    // QUESTION #3
    question: "What are the first words of the Delcaration of Independence?",
    imgSrc: "img/declarationcongress.jpg",
    choiceA: "We hold these truths to be self-evident",
    choiceB: "We the People of the United States...",
    choiceC: "When in the Course of human events...",
    choiceD: "In the early ages of the world...",
    correct: "C"
  },
  {
    // QUESTION #4
    question:
      "In the New York campaign, Americans built 2 forts named Fort Washington and ____",
    imgSrc: "img/declarationcongress.jpg",
    choiceA: "Fort Lee",
    choiceB: "Fort Arnold",
    choiceC: "Fort Necessity",
    choiceD: "Fort Moultrie",
    correct: "A"
  },
  {
    // QUESTION #5
    question: "South of Brooklyn, the Americans forgot to cover a pass named:",
    imgSrc: "img/declarationcongress.jpg",
    choiceA: "Cuban Pass",
    choiceB: "Jamaica Pass",
    choiceC: "Season Pass",
    choiceD: "Trenton Pass",
    correct: "B"
  },
  {
    // QUESTION #6
    question: "South of Brooklyn, an strong retreat was organized by ____",
    imgSrc: "img/declarationcongress.jpg",
    choiceA: "Benedict Arnold",
    choiceB: "Lafayette",
    choiceC: "James Grant",
    choiceD: "William Alexander",
    correct: "D"
  },
  {
    // QUESTION #7
    question: "What title did William Alexander go by?",
    imgSrc: "img/declarationcongress.jpg",
    choiceA: "Baron von Steuben",
    choiceB: "Prince William",
    choiceC: "Lord Stirling",
    choiceD: "Marquis de Lafayette",
    correct: "C"
  },
  {
    // QUESTION #8
    question: "Who won the battle of Long Island?",
    imgSrc: "img/declarationcongress.jpg",
    choiceA: "Washington's army",
    choiceB: "Howe's army",
    choiceC: "Tie",
    choiceD: "Both sides fled",
    correct: "B"
  },
  {
    // QUESTION #9
    question:
      "In the New York campaign, which foreign group of mercenaries were fighting under the British?",
    imgSrc: "img/declarationcongress.jpg",
    choiceA: "Hessians",
    choiceB: "Russians",
    choiceC: "Italians",
    choiceD: "Dutch",
    correct: "A"
  },
  {
    // QUESTION #10
    question:
      "Bonus Question! What type of wood was Fort Moultrie in Charleston made out of?",
    imgSrc: "img/declarationcongress.jpg",
    choiceA: "Cork oak",
    choiceB: "Eucalyptus wood",
    choiceC: "Palmetto wood",
    choiceD: "Ironwood",
    correct: "C"
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
    count++;
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

// score render
function scoreRender() {
  scoreDiv.style.display = "block";

  // calculate the amount of question percent answered by the user
  const scorePerCent = Math.round((100 * score) / questions.length);

  // choose the image based on the scorePerCent
  let img =
    scorePerCent >= 80
      ? "img/5.png"
      : scorePerCent >= 60
      ? "img/4.png"
      : scorePerCent >= 40
      ? "img/3.png"
      : scorePerCent >= 20
      ? "img/2.png"
      : "img/1.png";

  scoreDiv.innerHTML = "<img src=" + img + ">";
  scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}
