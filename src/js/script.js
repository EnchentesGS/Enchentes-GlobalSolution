document.addEventListener("DOMContentLoaded", function () {
  // Menu Hamburguer
  const hamburguer = document.getElementById("hamburguer");
  const navMenu = document.getElementById("nav-menu");

  if (hamburguer && navMenu) {
    hamburguer.addEventListener("click", function () {
      navMenu.classList.toggle("ativo");
    });
  }

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

  slideShow();

  // Trocar de Cor
  window.trocar = function(cor) {
    document.body.style.background = cor;
  };

  // Quiz – só roda se os elementos existirem
  const quizCards = document.querySelectorAll('.quiz-card');
  const startBtn = document.getElementById('start-btn');
  const finishBtn = document.getElementById('finish-btn');
  const startCard = document.querySelector('.start-card');
  const nextBtns = document.querySelectorAll('.next-btn');

  if (
    quizCards.length > 0 &&
    startBtn &&
    finishBtn &&
    startCard &&
    nextBtns.length > 0
  ) {
    let currentQuestion = 0;

    startBtn.addEventListener('click', startQuiz);
    finishBtn.addEventListener('click', endQuiz);
    nextBtns.forEach(btn => {
      btn.addEventListener('click', nextQuestion);
    });

    function startQuiz() {
      startCard.style.display = 'none';
      currentQuestion = 0;
      showQuestion(currentQuestion);
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
      }
    }

    function endQuiz() {
      alert('Quiz finalizado! Obrigado por participar.');
      location.reload();
    }
  }
});
