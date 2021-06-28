// TO-DO:
// 1. eventListeners for buttons
//      timer starts when start button is clicked
// 2. Objects set for each question
//      toggle between each for each question
// 3. localStorage for high scores
//      a place for the user to put their initials and have them stored alongside their score
// 4. if statements for correct and incorrect answers
//      and displaying if that answer was right or wrong on the page
//      Time subtracted from timer when answers are incorrect
// 5. Score is calculated from number of correct answers

var startButton = document.getElementById("start");
var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var timerElement = document.getElementById("timer");


var quizQuestions = [
    {
        question: "How do you begin a comment line on a JavaScript file?",
        answers: {
            a: "Comment:",
            b: "//",
            c: "/*",
            d: "^^",
        },
        correctAnswer: "b",
    },
    {
        question: "Which marks the end of a JavaScript statement?",
        answers: {
            a: "semicolon",
            b: "colon",
            c: "comma",
            d: "no end notation needed",
        },
        correctAnswer: "a",
    },
    {
        question: "When you want JavaScript to run on your page, where do you put the JavaScript script tag in the HTML file?",
        answers: {
            a: "After the ending body tag",
            b: "At the end of the body, before the body ends",
            c: "Under the CSS link in the page head",
            d: "Before each section where JavaScript is used",
        },
        correctAnswer: "b",
    },
    {
        question: "In a for loop, what does the letter 'i' stand for?",
        answers: {
            a: "The loop's ending condition",
            b: "The loop's starting condition",
            c: "The integer value of the loop's current position in the specified range",
            d: "The set number of times the loop will run",
        },
        correctAnswer: "c",
    },
    {
        question: "Which of these is NOT a JavaScript variable type",
        answers: {
            a: "String",
            b: "Boolean",
            c: "Word",
            d: "Undefined",
        },
        correctAnswer: "c",
    },
    
];

function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeElement.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            }
        }, 1000);
    }

function buildQuiz() {
    setTime;
    var output = [];
    quizQuestions.forEach(
        (currentQuestion, questionNumber) => {
            var answers = [];

            for (letter in currentQuestion.answers){
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers" ${answers.join('')} </div>`
            );
        }
    );
    quizContainer.innerHTML = output.join('');
};

function showResults() {
    var answerContainers = quizContainer.querySelectorAll('.answers');
    var numberCorrect = 0

    quizQuestions.forEach( (currentQuestion, questionNumber) => {
        var answerContainer = answerContainers[questionNumber];
        var selector = `input[name=question${questionNumber}]:checked`;
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            numberCorrect++;
            answerContainers[questionNumber].style.color = "green";
        } else {
            secondsLeft-10;
            answerContainers[questionNumber].style.color = "red";
        }
    }); 
    resultsContainer.innerHTML = `${numberCorrect} out of ${quizQuestions.length}`;
}


startButton.addEventListener('click', buildQuiz);