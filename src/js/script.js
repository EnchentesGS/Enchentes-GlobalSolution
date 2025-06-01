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

  // --- LOGIN, CADASTRO E ÁREA DO USUÁRIO ---

  const escolhaContainer = document.getElementById('escolha-container');
  const loginContainer = document.getElementById('login-container');
  const cadastroContainer = document.getElementById('cadastro-container');

  const btnLogin = document.getElementById('btn-login');
  const btnCadastrar = document.getElementById('btn-cadastrar');
  const btnVoltarLogin = document.getElementById('voltar-escolha');
  const btnVoltarCadastro = document.getElementById('voltar-escolha-cad');

  // Mostrar login
  if (btnLogin) {
    btnLogin.addEventListener('click', () => {
      escolhaContainer.classList.add('hidden');
      loginContainer.classList.remove('hidden');
      cadastroContainer.classList.add('hidden');
    });
  }

  // Mostrar cadastro
  if (btnCadastrar) {
    btnCadastrar.addEventListener('click', () => {
      escolhaContainer.classList.add('hidden');
      cadastroContainer.classList.remove('hidden');
      loginContainer.classList.add('hidden');
    });
  }

  // Voltar para escolha da tela de login
  if (btnVoltarLogin) {
    btnVoltarLogin.addEventListener('click', () => {
      loginContainer.classList.add('hidden');
      escolhaContainer.classList.remove('hidden');
    });
  }

  // Voltar para escolha da tela de cadastro
  if (btnVoltarCadastro) {
    btnVoltarCadastro.addEventListener('click', () => {
      cadastroContainer.classList.add('hidden');
      escolhaContainer.classList.remove('hidden');
    });
  }

  // Cadastro
  const formCadastro = document.getElementById('form-cadastro');
  const mensagemCadastro = document.getElementById('mensagem-cadastro');

  if (formCadastro) {
    formCadastro.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = document.getElementById('nome-cad').value.trim();
      const email = document.getElementById('email-cad').value.trim();
      const endereco = document.getElementById('endereco-cad').value.trim();

      if (!nome || !email || !endereco) {
        mensagemCadastro.textContent = 'Por favor, preencha todos os campos.';
        mensagemCadastro.className = 'mensagem error';
        return;
      }

      // Verificar se o email já está cadastrado
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const existe = usuarios.some(u => u.email === email);

      if (existe) {
        mensagemCadastro.textContent = 'Email já cadastrado. Use outro email ou faça login.';
        mensagemCadastro.className = 'mensagem error';
        return;
      }

      // Adicionar novo usuário
      usuarios.push({ nome, email, endereco });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      mensagemCadastro.textContent = 'Cadastro realizado com sucesso! Agora faça login.';
      mensagemCadastro.className = 'mensagem sucesso';

      formCadastro.reset();

      // Após 2 segundos, ir para tela de login
      setTimeout(() => {
        cadastroContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
        mensagemCadastro.textContent = '';
      }, 2000);
    });
  }

  // Login
  const formLogin = document.getElementById('form-login');
  const mensagemLogin = document.getElementById('mensagem');

  if (formLogin) {
    formLogin.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const endereco = document.getElementById('endereco').value.trim();

      if (!nome || !email || !endereco) {
        mensagemLogin.textContent = 'Por favor, preencha todos os campos.';
        mensagemLogin.className = 'mensagem error';
        return;
      }

      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const usuarioEncontrado = usuarios.find(u => u.email === email);

      if (!usuarioEncontrado) {
        mensagemLogin.textContent = 'Usuário não encontrado. Cadastre-se primeiro.';
        mensagemLogin.className = 'mensagem error';
        return;
      }

      if (
        usuarioEncontrado.nome !== nome ||
        usuarioEncontrado.endereco !== endereco
      ) {
        mensagemLogin.textContent = 'Dados incorretos. Tente novamente.';
        mensagemLogin.className = 'mensagem error';
        return;
      }

      // Login bem-sucedido: salvar o nome do usuário para uso na área do usuário
      localStorage.setItem('nomeUsuario', nome);

      mensagemLogin.textContent = 'Login realizado com sucesso!';
      mensagemLogin.className = 'mensagem sucesso';

      formLogin.reset();

      // Redirecionar para área do usuário
      setTimeout(() => {
        window.location.href = 'usuario.html';
      }, 1000);
    });
  }

  // --- ÁREA DO USUÁRIO E LOGOUT ---
  // Apenas mudamos aqui para garantir que funciona corretamente:

  const nomeSalvo = localStorage.getItem('nomeUsuario');
  const botaoSair = document.getElementById('logout-btn');
  const nomeUsuarioSpan = document.getElementById('nomeUsuario');
  const mensagem = document.getElementById('mensagem');

  if (window.location.href.includes('usuario.html')) {
    if (!nomeSalvo) {
      window.location.href = 'login.html';
      return;
    }

    if (nomeUsuarioSpan) {
      nomeUsuarioSpan.textContent = nomeSalvo;
    }

    if (mensagem) {
      mensagem.textContent = `Bem-vindo(a), ${nomeSalvo}`;
      mensagem.className = 'mensagem sucesso';
    }

    if (botaoSair) {
      botaoSair.addEventListener('click', () => {
        localStorage.removeItem('nomeUsuario');
        window.location.href = 'login.html';
      });
    }
  }

  // Se estiver na página de login, redireciona se já estiver logado
  if (window.location.href.includes('login.html') && nomeSalvo) {
    window.location.href = 'usuario.html';
    return;
  }
});
