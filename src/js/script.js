document.addEventListener("DOMContentLoaded", () => {
  const hamburguer = document.querySelector(".hamburguer");
  const navMenu = document.getElementById("nav-menu");

  if (hamburguer && navMenu) {
    hamburguer.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
});

// SlideShow
const imagens = [
  'src/assets/enchente1.jpg',
  'src/assets/enchente2.jpg',
  'src/assets/enchente3.jpg'
];

let index = 0;
const tempo = 3000;

function slideShow() {
  const imagemElement = document.getElementById("image");
  if (imagemElement) {
    imagemElement.src = imagens[index];
    index = (index + 1) % imagens.length;
    setTimeout(slideShow, tempo);
  }
}

window.addEventListener('load', slideShow);

// Trocar de Cor
function trocar(cor){
  document.body.style.background = cor;
}

// Quiz
let currentQuestion = 0;
let quizCards;
let startBtn;
let nextBtns;
let finishBtn;
let startCard;

window.onload = () => {
  quizCards = document.querySelectorAll('.quiz-card');
  startBtn = document.getElementById('start-btn');
  finishBtn = document.getElementById('finish-btn');
  startCard = document.querySelector('.start-card');
  nextBtns = document.querySelectorAll('.next-btn');

  startBtn.addEventListener('click', startQuiz);

  nextBtns.forEach(btn => {
    btn.addEventListener('click', nextQuestion);
  });

  finishBtn.addEventListener('click', endQuiz);
};

function startQuiz() {
  startCard.style.display = 'none';
  currentQuestion = 0;
  showQuestion(currentQuestion);
  // Rolagem automática removida
  // window.scrollTo({ top: quizCards[0].offsetTop, behavior: 'smooth' });
}

function showQuestion(index) {
  quizCards.forEach((card, i) => {
    card.style.display = i === index ? 'block' : 'none';
  });
}

function nextQuestion() {
  if (currentQuestion < quizCards.length - 1) {
    currentQuestion++;
    showQuestion(currentQuestion);
    // Rolagem automática removida
    // window.scrollTo({ top: quizCards[currentQuestion].offsetTop, behavior: 'smooth' });
  }
}

function endQuiz() {
  alert('Quiz finalizado! Obrigado por participar.');
  // Aqui você pode adicionar lógica para mostrar o resultado ou reiniciar o quiz
  location.reload();
}
