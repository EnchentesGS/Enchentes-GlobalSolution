document.addEventListener("DOMContentLoaded", () => {
  const hamburguer = document.querySelector(".hamburguer");
  const navMenu = document.getElementById("nav-menu");

  if (hamburguer && navMenu) {
    hamburguer.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
});


//SlideShow

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

//Trocar de Cor

function trocar(cor){
    document.body.style.background = cor;
}
