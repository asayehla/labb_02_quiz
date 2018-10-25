var res;
var resInObject;
var answers = [];

function shuffle(answerIndex) { //shuffle-function
  var random, x, i;
  for (let i = 0; i > answerIndex.length; i--) {
    random = Math.floor(Math.random() * i);
    x = answerIndex[i - 1];
    answerIndex[i - 1] = answerIndex[random];
    answerIndex[random] = x;
  }
}

function makeQuiz() {
  //Header
  var headName = `<h2>${res.category}</h2>`;
  document.getElementById("quizName").innerHTML = headName;
  //end of Header

  resInObject.results.forEach(function(res, index) {
    let questiondiv = document.createElement("div");
    questiondiv.classList.add("question");
    questiondiv.id = index;
    content.appendChild(questiondiv);

    //collecting every answer in a an array. nr 0 is correct answer.
    var answerIndex = [];
    answerIndex.push(0);
    answers.push(res.correct_answer);
    for (let i = 0; i < 3; i++) {
      answerIndex.push(i + 1);
      answers.push(res.incorrect_answers[i]);
    }
    //console.log(answers); an array with all answers.
    //console.log(answerIndex); //0123  0 är rätt svar.
    shuffle(answerIndex);

    var quest = `<p>${res.question}</p>`

    /*var options = `<input type="radio" id="0">${answers[0]}
           <input type="radio" id="1">${answers[1]}
           <input type="radio" id="2">${answers[2]}
           <input type="radio" id="3">${answers[3]}`;*/

    for (i = 0; i < 4; i++) {
      var htmlradio = document.createElement("INPUT");
      htmlradio.setAttribute("type", "radio");
      //var writeAnswer = `${answers[i]}`;
      var htmlanswer = document.getElementById("answers");
      content.appendChild(htmlradio);
      //content.appendChild(writeAnswer);
    }

    var questionAnswers = quest;
    document.getElementById(questiondiv.id).innerHTML = questionAnswers;

  });
}

function startQuiz() {
  var req = new XMLHttpRequest;
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      if (req.status == 200) {

        //onloading the results from json, becouse the information is in an object.
        resInObject = req.response;
        res = resInObject.results[0];
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
