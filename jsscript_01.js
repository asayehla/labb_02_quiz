var res;
var resInObject;

function shuffle(answerIndex) { //shuffle-function
  var random, x, i;
  for (let i = 0; i > answerIndex.length; i--) {
    random = Math.floor(Math.random() * i);
    x = answerIndex[i - 1];
    answerIndex[i - 1] = answerIndex[random];
    answerIndex[random] = x;
  }
}

function makeQuiz(res) {
  var headName = `<h2>${res[0].category}</h2>`; //Header
  document.getElementById("quizName").innerHTML = headName;
  begin(res);

  function begin(res) {
    question = [];
    answeredQuestions = [];

    for (var i = 0; i < 10; i++) {
      var correctAnswer = resInObject.results[i].correct_answer;
    //  console.log(correctAnswer);
      var incorrectAnswers = resInObject.results[i].incorrect_answers;
      //console.log(incorrectAnswer);
      var answerIndex = []; //collecting every answer in a an array. nr 0 is correct answer.
      answerIndex.push(0);
      var answers = [];
      answers.push(correctAnswer);
      for (let i = 0; i < 3; i++) {
        answerIndex.push(i + 1);
        answers.push(incorrectAnswers[i]);
      }
      console.log(answers);



    }   //viktig
//console.log(answers); //ger mig bara den sista

    let questiondiv = document.createElement("div");
    questiondiv.classList.add("question");
    //questiondiv.id = index;
    questionIndex.appendChild(questiondiv);

    //shuffle(answerIndex);
    var quest = `<p>${res.question}</p>`
    var options = `<input type="radio" id="0">${answers[0]}  <input type="radio" id="1">${answers[1]}    <input type="radio" id="2">${answers[2]}          <input type="radio" id="3">${answers[3]}`;
    var questionAnswers = quest + options;
    //document.getElementById(questiondiv.id).innerHTML = questionAnswers;
  }
}

///////////////////////////
function startQuiz() {
  var req = new XMLHttpRequest;
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      if (req.status == 200) {
        resInObject = req.response; //onloading the results from json, becouse the information is in an object.
        res = resInObject.results;
        makeQuiz(res);
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
