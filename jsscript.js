var quizObject;
var correctAnswers = [];

function startQuiz() {
  var req = new XMLHttpRequest;
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      if (req.status == 200) {
        quizObject = req.response.results;
        makeQuiz();
      }
    }
  };
  req.open("GET", "https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple");
  req.responseType = 'json';
  req.send();
}
document.addEventListener('DOMContentLoaded', function() {
  startQuiz();
});

function makeQuiz() {
    //write out the category for the quiz
  var headName = `<h2>${quizObject[0].category}</h2>`; //Header
  document.getElementById("quizName").innerHTML = headName;

  for (var i = 0; i < 10; i++) {
    var correctAnswer = quizObject[i].correct_answer;
    var incorrectAnswers = quizObject[i].incorrect_answers;
    incorrectAnswers.push(correctAnswer);

//sends to a function that randomize the answers
    var shuffledList = shuffle(incorrectAnswers);

    // Find the correct answer from the shuffled list and store the index in the array with correct answers
    for (var index = 0; index < shuffledList.length; index++) {
      if (shuffledList[index] === correctAnswer) {
        correctAnswers[i] = index;
      }
    }

    let questiondiv = document.createElement("div");
    questiondiv.classList.add("question");
    questiondiv.setAttribute("id", "question_" + i);
    questionIndex.appendChild(questiondiv);

    var question = `<p>${quizObject[i].question}</p>`
    var options =
    ` <div><input type="radio" name="question_${i}" id="answer_${i}_0">${shuffledList[0]}</div>
      <div><input type="radio" name="question_${i}" id="answer_${i}_1">${shuffledList[1]}</div>
      <div><input type="radio" name="question_${i}" id="answer_${i}_2">${shuffledList[2]}</div>
      <div><input type="radio" name="question_${i}" id="answer_${i}_3">${shuffledList[3]}</div>`;

    var questionAnswers = question + options;
    questiondiv.innerHTML = questionAnswers;
  }
}

function validateAnswers() {
var validated = 0;

  for (let i = 0; i < 10; i++) {
    var correctAnswerIndex = correctAnswers[i];
    var correctElement = document.getElementById("answer_" + i + "_" + correctAnswerIndex);
    var ratt = document.getElementById("answer_" + i + "_" + correctAnswerIndex).parentElement;


    if (correctElement.checked == true) {
      ratt.style.color = "green";
      validated ++;

    } else {
    ratt.style.color = "red";
    }

result.innerHTML="You got " + validated + "/10" + " answers right!";

  }
}

//Takes an array as input and returns a new array with the same values, but in randomized order
function shuffle(array) {
  var currentIndex = array.length - 1;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a random number between 0 and current index
    randomIndex = Math.floor(Math.random() * currentIndex);

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;

    //its the final count down!
    currentIndex -= 1;
  }

  return array;
}

/////////////////
