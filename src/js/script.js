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

  // Quiz 

  const quizCards = document.querySelectorAll('.quiz-card');
const startBtn = document.getElementById('start-btn');
const finishBtn = document.getElementById('finish-btn');
const startCard = document.querySelector('.start-card');
const nextBtns = document.querySelectorAll('.next-btn');
const resultadoContainer = document.querySelector('.quiz-result');

if (
  quizCards.length > 0 &&
  startBtn &&
  finishBtn &&
  startCard &&
  nextBtns.length > 0 &&
  resultadoContainer
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
    document.querySelector('.quiz-container').style.display = 'block';
    resultadoContainer.style.display = 'none';
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
    // Esconde todas as perguntas e o container do quiz
    quizCards.forEach(card => card.style.display = 'none');
    document.querySelector('.quiz-container').style.display = 'none';

    // Calcula quantas respostas corretas o usuário marcou
    let totalCorrect = 0;

    quizCards.forEach(card => {
      const inputs = card.querySelectorAll('input[type="radio"]');
      inputs.forEach(input => {
        if (input.checked && input.dataset.correct === 'true') {
          totalCorrect++;
        }
      });
    });

    // Atualiza a mensagem de resultado
    const mensagem = resultadoContainer.querySelector('.mensagem-resultado');
    mensagem.textContent = `Você acertou ${totalCorrect} de ${quizCards.length} perguntas!`;

    // Mostra o container de resultado
    resultadoContainer.style.display = 'block';
  }

  // Destacar opção selecionada
  document.querySelectorAll('.quiz-options').forEach(grupo => {
    grupo.querySelectorAll('input[type="radio"]').forEach(input => {
      input.addEventListener('change', () => {
        grupo.querySelectorAll('label').forEach(label => {
          label.classList.remove('selecionado');
        });
        input.parentElement.classList.add('selecionado');
      });
    });
  });
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
      const senha = document.getElementById('senha-cad').value.trim();
      const telefone = document.getElementById('telefone-cad').value.trim();

      const rua = document.getElementById('rua-cad').value.trim();
      const numero = document.getElementById('numero-cad').value.trim();
      const bairro = document.getElementById('bairro-cad').value.trim();
      const cidade = document.getElementById('cidade-cad').value.trim();
      const estado = document.getElementById('estado-cad').value.trim();
      const cep = document.getElementById('cep-cad').value.trim();

      if (!nome || !email || !senha || !telefone || !rua || !numero || !bairro || !cidade || !estado || !cep) {
        mensagemCadastro.textContent = 'Por favor, preencha todos os campos.';
        mensagemCadastro.className = 'mensagem error';
        return;
      }

      const endereco = { rua, numero, bairro, cidade, estado, cep };

      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const existe = usuarios.some(u => u.email === email);

      if (existe) {
        mensagemCadastro.textContent = 'Email já cadastrado. Use outro email ou faça login.';
        mensagemCadastro.className = 'mensagem error';
        return;
      }

      usuarios.push({ nome, email, senha, telefone, endereco });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      mensagemCadastro.textContent = 'Cadastro realizado com sucesso! Agora faça login.';
      mensagemCadastro.className = 'mensagem sucesso';

      formCadastro.reset();

      setTimeout(() => {
        cadastroContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
        mensagemCadastro.textContent = '';
      }, 2000);
    });
  }

  // Login

  const formLogin = document.getElementById('form-login');
const mensagemLogin = document.getElementById('mensagem-login'); // ajuste para o id correto

if (formLogin) {
  formLogin.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email-login').value.trim();
    const senha = document.getElementById('senha-login').value.trim();

    if (!email || !senha) {
      mensagemLogin.textContent = 'Por favor, preencha todos os campos.';
      mensagemLogin.className = 'mensagem error';
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuarioEncontrado) {
      mensagemLogin.textContent = 'Email ou senha incorretos.';
      mensagemLogin.className = 'mensagem error';
      return;
    }

    // Salvar nome do usuário para área privada
    localStorage.setItem('nomeUsuario', usuarioEncontrado.nome);

    mensagemLogin.textContent = 'Login realizado com sucesso!';
    mensagemLogin.className = 'mensagem sucesso';

    formLogin.reset();

    setTimeout(() => {
      window.location.href = 'usuario.html';
    }, 1000);
  });
}


  // --- ÁREA DO USUÁRIO E LOGOUT ---
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

    // Exibir endereço do usuário cadastrado
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioAtual = usuarios.find(u => u.nome === nomeSalvo);

    const localizacaoElement = document.getElementById('localizacaoUsuario');

    if (usuarioAtual && localizacaoElement) {
      const end = usuarioAtual.endereco;
      localizacaoElement.textContent = `${end.rua}, ${end.numero} - ${end.bairro}, ${end.cidade} - ${end.estado}, CEP: ${end.cep}`;
    }
  }

  // Redireciona para a área do usuário se já estiver logado e tentar acessar login.html
  if (window.location.href.includes('login.html') && nomeSalvo) {
    window.location.href = 'usuario.html';
    return;
  }
});
