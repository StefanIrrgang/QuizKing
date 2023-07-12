let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Wer hat die besten Locken?",
        "answer_1": "Rudi Völler",
        "answer_2": "Santa Claus",
        "answer_3": "Buggs Bunny",
        "answer_4": "Nikolaus",
        "right_answer": 1
    },
    {
        "question": "Wo steht der Eifelturm?",
        "answer_1": "Berlin",
        "answer_2": "Paris",
        "answer_3": "Wien",
        "answer_4": "Prag",
        "right_answer": 2
    },
    {
        "question": "Welches Bier kommt aus Bayern?",
        "answer_1": "Astra",
        "answer_2": "Erdinger",
        "answer_3": "Veltins",
        "answer_4": "Becks",
        "right_answer": 2
    }
];

let currentQuestion = 0;
let rightQuestion = 0;

let AUDIO_SUCCESS = new Audio('audio/correct.mp3');
let AUDIO_FAIL = new Audio('audio/wrong.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        document.getElementById('endScreen').style = '';
        document.getElementById('questionBody').style = 'display: none;';
        document.getElementById('amountOfQuestions').innerHTML = questions.length;
        document.getElementById('amountRightQuestions').innerHTML = rightQuestion;
        document.getElementById('headerimage').src = 'img/trophy.png';
    } else {
        let question = questions[currentQuestion];
        let percent = Math.round((currentQuestion + 1) / questions.length * 100);
        document.getElementById('progressBar').innerHTML = `${percent}%`;
        document.getElementById('progressBar').style = `width: ${percent}%`;

        document.getElementById('question-number').innerHTML = currentQuestion + 1;
        document.getElementById('questiontext').innerHTML = question['question'];
        document.getElementById('answer_1').innerHTML = question['answer_1'];
        document.getElementById('answer_2').innerHTML = question['answer_2'];
        document.getElementById('answer_3').innerHTML = question['answer_3'];
        document.getElementById('answer_4').innerHTML = question['answer_4'];
    }
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) {
        console.log('Korrekt!');
        AUDIO_SUCCESS.play();
        rightQuestion++;
        document.getElementById(selection).parentNode.classList.add('bg-success');
    } else {
        console.log('Falsch!')
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
    resetButtons();
}

function resetButtons() {
    document.getElementById('next-button').disabled = true;
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartQuiz() {
    document.getElementById('headerimage').src = '/img/pencil.jpg';
    document.getElementById('endScreen').style = 'display: none;';
    document.getElementById('questionBody').style = '';
    currentQuestion = 0;
    rightQuestion = 0;
    init();
}