// script.js

// Función para mostrar más información
function verMais(produto) {
    alert('Mais informações sobre: ' + produto);
}

// Evento para el formulario de contacto
document.getElementById("formContato").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
    this.reset();
});

// Sistema de carrito con localStorage
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Actualizar contador en el header
function atualizarContador() {
    const contador = document.getElementById('contador-carrinho');
    contador.textContent = carrinho.length;
}

// Añadir producto al carrito
function adicionarAoCarrinho(produto, preco, produtor) {
    carrinho.push({
        nome: produto,
        preco: preco,
        produtor: produtor,
        id: Date.now() + Math.random() // ID único
    });
    atualizarCarrinho();
}

// Actualizar visualización del carrito
function atualizarCarrinho() {
    const carrinhoDiv = document.getElementById("carrinho-itens");
    const totalSpan = document.getElementById("total");

    if (carrinho.length === 0) {
        carrinhoDiv.innerHTML = "<p>Nenhum item no carrinho.</p>";
        totalSpan.innerText = "0.00";
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarContador();
        return;
    }

    let html = "<ul>";
    let total = 0;

    carrinho.forEach((item, index) => {
        html += `
        <li>
            ${item.nome} (${item.produtor}) - R$ ${item.preco.toFixed(2)}
            <button onclick="removerItem(${index})">Remover</button>
        </li>`;
        total += item.preco;
    });

    html += "</ul>";
    carrinhoDiv.innerHTML = html;
    totalSpan.innerText = total.toFixed(2);
    
    // Guardar en localStorage y actualizar contador
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarContador();
}

// Remover item del carrito
function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Vaciar carrito
function limparCarrinho() {
    carrinho = [];
    atualizarCarrinho();
}

// Carrusel de beneficios (única implementación)
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar carrito desde localStorage
    atualizarCarrinho();
    
    // Configuración del carrusel
    const carouselList = document.getElementById('carousel-list');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    // Función para mover el carrusel
    const moveToSlide = (index) => {
        if (index < 0) index = slides.length - 1;
        else if (index >= slides.length) index = 0;

        currentIndex = index;
        const offset = -currentIndex * 100;
        carouselList.style.transform = `translateX(${offset}%)`;
    };

    // Eventos para botones
    prevBtn.addEventListener('click', () => moveToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => moveToSlide(currentIndex + 1));

    // Autoplay
    setInterval(() => moveToSlide(currentIndex + 1), 5000);
});



// Hero Slider
document.addEventListener('DOMContentLoaded', function() {
  const slidesContainer = document.querySelector('.slides-container');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const dotsContainer = document.querySelector('.slider-dots');
  let currentIndex = 0;
  let slideInterval;

  // Crear indicadores de paginación
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.slider-dot');

  // Función para cambiar de slide
  function goToSlide(index) {
    currentIndex = index;
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Actualizar indicadores activos
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  // Función para siguiente slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
  }

  // Función para slide anterior
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(currentIndex);
  }

  // Event listeners
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Autoplay
  function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 1000);
  }

  function stopAutoPlay() {
    clearInterval(slideInterval);
  }

  startAutoPlay();

  // Pausar autoplay al interactuar
  slidesContainer.addEventListener('mouseenter', stopAutoPlay);
  slidesContainer.addEventListener('mouseleave', startAutoPlay);
  prevBtn.addEventListener('mouseenter', stopAutoPlay);
  nextBtn.addEventListener('mouseenter', stopAutoPlay);
  dotsContainer.addEventListener('mouseenter', stopAutoPlay);
});
