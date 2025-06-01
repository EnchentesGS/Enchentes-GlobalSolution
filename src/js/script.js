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

  // --- LOGIN E ÁREA DO USUÁRIO ---

  const nomeSalvo = localStorage.getItem('nomeUsuario');
  const formLogin = document.getElementById('form-login');
  const mensagem = document.getElementById('mensagem');
  const botaoSair = document.getElementById('btnSair') || document.getElementById('logout-btn');
  const nomeUsuarioSpan = document.getElementById('nomeUsuario');

  // Detectar qual página está aberta
  const paginaAtual = window.location.pathname.split("/").pop();

  // Se estiver na página de login
  if (paginaAtual === 'login.html') {
    // Se já estiver logado, redireciona para usuário
    if (nomeSalvo) {
      window.location.href = 'usuario.html';
      return;
    }

    if (formLogin) {
      formLogin.addEventListener('submit', function (e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const endereco = document.getElementById('endereco').value.trim();

        if (nome && email && endereco) {
          localStorage.setItem('nomeUsuario', nome);
          if (mensagem) {
            mensagem.textContent = 'Login realizado com sucesso!';
            mensagem.className = 'mensagem sucesso';
          }
          setTimeout(() => {
            window.location.href = 'usuario.html';
          }, 1000);
        } else {
          if (mensagem) {
            mensagem.textContent = 'Por favor, preencha todos os campos.';
            mensagem.className = 'mensagem error';
          }
        }
        formLogin.reset();
      });
    }
  }

  // Se estiver na página do usuário
  else if (paginaAtual === 'usuario.html') {
    // Se não estiver logado, redireciona para login
    if (!nomeSalvo) {
      window.location.href = 'login.html';
      return;
    }

    // Mostrar nome do usuário
    if (nomeUsuarioSpan) {
      nomeUsuarioSpan.textContent = nomeSalvo;
    }

    // Exibir mensagem de boas-vindas, se houver elemento mensagem
    if (mensagem) {
      mensagem.textContent = `Bem-vindo(a), ${nomeSalvo}`;
      mensagem.className = 'mensagem sucesso';
    }

    // Botão sair
    if (botaoSair) {
      botaoSair.addEventListener('click', () => {
        localStorage.removeItem('nomeUsuario');
        window.location.href = 'login.html';
      });
    }
  }

});
