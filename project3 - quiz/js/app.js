const questionTitle = document.getElementById('title');
const answersElement = document.getElementById('answers');
const actionBtn = document.getElementById('action_btn');

function fetchQuestions() {
  return fetch('./questions.json')
    .then((res) => res.json())
    .then((data) => {
      let questions = data.questions;
      let questionsCount = questions.length;
      let currentQuestion = 0;
      let score = 0;

      displayQuestion(questions[currentQuestion]);

      actionBtn.addEventListener('click', function() {
        let answers = document.getElementsByClassName('answer');

        for (let i = 0; i < answers.length; i++) {
          let question = questions[currentQuestion];

          if (answers[i].checked && answers[i].value === question.correct) {
            answers[i].parentNode.classList.add('correct');
            score++;
          } else if (
            answers[i].checked &&
            answers[i].value !== question.correct
          ) {
            answers[i].parentNode.classList.add('incorrect');
          }

          answers[i].disabled = true;
        }

        currentQuestion++;

        let nextBtn = document.getElementById('next_btn');
        nextBtn.classList.remove('hide');
        this.classList.add('hide');

        nextBtn.addEventListener('click', function() {
          if (currentQuestion === questionsCount) {
            document.getElementById('question').classList.add('hide');
            document.getElementById('scores').classList.remove('hide');
            document.getElementById('score').innerHTML =
              score + '/' + questionsCount;
            return;
          }
          displayQuestion(questions[currentQuestion]);
          actionBtn.classList.remove('hide');
          this.classList.add('hide');
        });
      });
    });
}

function displayQuestion(question) {
  questionTitle.innerHTML = '';
  answersElement.innerHTML = '';

  let title = document.createTextNode(question.title);
  questionTitle.appendChild(title);

  question.answers.forEach((answer) => {
    let label = document.createElement('label');

    let answerInput = document.createElement('input');
    answerInput.setAttribute('type', 'radio');
    answerInput.setAttribute('name', 'answer');
    answerInput.setAttribute('value', answer.id);
    answerInput.classList.add('answer');

    let answerTitle = document.createTextNode(answer.answer);
    label.appendChild(answerInput);
    label.appendChild(answerTitle);

    answersElement.appendChild(label);
  });
}

fetchQuestions();
