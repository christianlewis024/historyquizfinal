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

    db.collection("scores6")
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
    question: "Where was Alexander Hamilton born?",
    imgSrc: "img/hamilton.jpg",
    choiceA: "Scottland",
    choiceB: "Wales",
    choiceC: "New York",
    choiceD: "The Caribbean",
    correct: "D"
  },
  {
    // QUESTION #2
    question:
      "When living in The Caribbean, young Hamilton notably wrote about what event?",
    imgSrc: "img/hamilton.jpg",
    choiceA: "A fire that killed his family",
    choiceB: "A smallpox outbreak",
    choiceC: "A hurricane",
    choiceD: "A rebellion",
    correct: "C"
  },
  {
    // QUESTION #3
    question: "What college did Alexander Hamilton actually attend?",
    imgSrc: "img/hamilton.jpg",
    choiceA: "Collge of New Jersey",
    choiceB: "Kings College",
    choiceC: "College of William & Mary",
    choiceD: "Never went to college",
    correct: "B"
  },
  {
    // QUESTION #4
    question: "What was Hamilton's role in Washington's cabinet?",
    imgSrc: "img/hamilton.jpg",
    choiceA: "Secretary of War",
    choiceB: "Secretary of the Treasury",
    choiceC: "Vice President",
    choiceD: "Secretary of State",
    correct: "B"
  },
  {
    // QUESTION #5
    question: "Hamilton, Madison, and John Jay wrote 85 essays called:",
    imgSrc: "img/hamilton.jpg",
    choiceA: "US Constitution",
    choiceB: "Declaration of Independence",
    choiceC: "Bill of Rights",
    choiceD: "Federalist Papers",
    correct: "D"
  },
  {
    // QUESTION #6
    question: "What was Hamilton's role during the Quasi war?",
    imgSrc: "img/hamilton.jpg",
    choiceA: "Inspector General of the Army",
    choiceB: "Artillery captain",
    choiceC: "Was not alive during Quasi war",
    choiceD: "Diplomat in France",
    correct: "A"
  },
  {
    // QUESTION #7
    question: "What year did Hamilton die?",
    imgSrc: "img/hamilton.jpg",
    choiceA: "1799",
    choiceB: "1804",
    choiceC: "1812",
    choiceD: "1813",
    correct: "B"
  },
  {
    // QUESTION #8
    question:
      "Who's quote about Hamilton? 'O I have read his Heart in his wicked Eyes many a time. The very devil is in them.' ",
    imgSrc: "img/hamilton.jpg",
    choiceA: "Elizabeth Hamilton",
    choiceB: "Thomas Jefferson",
    choiceC: "Abigail Adams",
    choiceD: "Aaron Burr",
    correct: "C"
  },
  {
    // QUESTION #9
    question: "Where does the duel between Hamilton and Burr take place?",
    imgSrc: "img/hamilton.jpg",
    choiceA: "New York, NY",
    choiceB: "International Waters",
    choiceC: "Weehawken, NJ",
    choiceD: "Lawn in front of The White House",
    correct: "C"
  },
  {
    // QUESTION #10
    question: "What battle did Hamilton's horse get shot from under him?",
    imgSrc: "img/hamilton.jpg",
    choiceA: "Bunker Hill",
    choiceB: "Brandywine",
    choiceC: "Monmouth",
    choiceD: "Yorktown",
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
