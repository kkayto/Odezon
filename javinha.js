const CAROUSEL_GAP = 20;

function getVisibleCards() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 900) return 2;
    if (window.innerWidth <= 1200) return 3;
    return 4;
}

const carouselStates = Array.from(document.querySelectorAll('.carousel-section'))
    .map((section) => {
        const track = section.querySelector('.carousel-track');
        const viewport = section.querySelector('.carousel');
        const cards = Array.from(section.querySelectorAll('.card-product'));
        const dotsContainer = section.querySelector('.dots');
        const prevButton = section.querySelector('.nav-btn.prev');
        const nextButton = section.querySelector('.nav-btn.next');

        if (!track || !viewport || !cards.length || !dotsContainer || !prevButton || !nextButton) {
            return null;
        }

        return {
            section,
            track,
            viewport,
            cards,
            dotsContainer,
            prevButton,
            nextButton,
            currentIndex: 0,
        };
    })
    .filter(Boolean);

function getTotalSlides(state) {
    return Math.max(1, Math.ceil(state.cards.length / getVisibleCards()));
}

function buildDots(state) {
    const totalSlides = getTotalSlides(state);
    state.dotsContainer.innerHTML = '';

    for (let index = 0; index < totalSlides; index += 1) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot';
        dot.setAttribute('aria-label', `Ir para pagina ${index + 1}`);
        dot.addEventListener('click', () => {
            state.currentIndex = index;
            updateCarousel(state);
        });
        state.dotsContainer.appendChild(dot);
    }
}

function updateCarousel(state) {
    const visibleCards = getVisibleCards();
    const totalSlides = getTotalSlides(state);

    state.section.style.setProperty('--visible-cards', visibleCards);

    if (state.currentIndex > totalSlides - 1) {
        state.currentIndex = totalSlides - 1;
    }

    const cardWidth = state.cards[0].getBoundingClientRect().width;
    const rawOffset = state.currentIndex * visibleCards * (cardWidth + CAROUSEL_GAP);
    const maxOffset = Math.max(0, state.track.scrollWidth - state.viewport.clientWidth);
    const offset = Math.min(rawOffset, maxOffset);

    state.track.style.transform = `translateX(-${offset}px)`;

    Array.from(state.dotsContainer.children).forEach((dot, index) => {
        dot.classList.toggle('active', index === state.currentIndex);
    });

    state.prevButton.disabled = state.currentIndex === 0;
    state.nextButton.disabled = state.currentIndex === totalSlides - 1;
}

function moveCarousel(state, direction) {
    const totalSlides = getTotalSlides(state);
    state.currentIndex += direction;

    if (state.currentIndex < 0) state.currentIndex = 0;
    if (state.currentIndex > totalSlides - 1) state.currentIndex = totalSlides - 1;

    updateCarousel(state);
}

carouselStates.forEach((state) => {
    buildDots(state);
    updateCarousel(state);

    state.prevButton.addEventListener('click', () => moveCarousel(state, -1));
    state.nextButton.addEventListener('click', () => moveCarousel(state, 1));
});

window.addEventListener('resize', () => {
    carouselStates.forEach((state) => {
        buildDots(state);
        updateCarousel(state);
    });
});

const produtos = [
    {
        imagem: "https://m.media-amazon.com/images/I/51qKk5of8kL.jpg",
        nome: "Fone Bluetooth",
        preco: "R$ 199,90",
        detalhe: "Sem fio, bateria de 20h e microfone embutido."
    },
    {
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc865Pxgp3wIXKUF4vR1RznZTa2PGj3ZVVFg&s",
        nome: "Cafeteira Compacta",
        preco: "R$ 289,90",
        detalhe: "Ideal para cozinhas pequenas e uso diario."
    },
    {
        imagem: "https://www.saga.co.uk/helix-contentlibrary/exceptional/2023/01/tracker-vs-smartwatch.jpg?la=en&h=711&w=1263&hash=8A0A88CFABE7695846F71163B568B70D",
        nome: "Smartwatch",
        preco: "R$ 349,90",
        detalhe: "Monitoramento diario e notificacoes no pulso."
    },
    {
        imagem: "https://sc04.alicdn.com/kf/Hc828f748822b46619786db41cfef149b3.png",
        nome: "Caixa de Som Portatil",
        preco: "R$ 259,90",
        detalhe: "Bluetooth, resistente a respingos e som potente."
    },
    {
        imagem: "https://cdn.thewirecutter.com/wp-content/media/2026/03/BEST-PERSONAL-BLENDER-2048px-3044-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024",
        nome: "Liquidificador Compacto",
        preco: "R$ 179,90",
        detalhe: "Ideal para sucos, vitaminas e pequenas receitas."
    },
    {
        imagem: "https://m.media-amazon.com/images/I/71Rq87vIzFL.jpg",
        nome: "Mochila Executiva",
        preco: "R$ 149,90",
        detalhe: "Compartimentos internos para notebook e acessorios."
    },
    {
        imagem: "https://m.media-amazon.com/images/I/71fDtuc05VL.jpg_BO30,255,255,255_UF750,750_SR1910,1000,0,C_QL100_.jpg",
        nome: "Air Fryer 4L",
        preco: "R$ 399,90",
        detalhe: "Cozimento rapido com menos oleo e painel facil."
    },
    {
        imagem: "https://m.media-amazon.com/images/I/71rnk1yMjZL._AC_UF894,1000_QL80_.jpg",
        nome: "Teclado Mecanico",
        preco: "R$ 279,90",
        detalhe: "Iluminacao RGB e teclas macias para produtividade."
    },
    {
        imagem: "https://m.media-amazon.com/images/I/614SCFCMBzL.jpg_BO30,255,255,255_UF750,750_SR1910,1000,0,C_QL100_.jpg",
        nome: "Aspirador Vertical",
        preco: "R$ 329,90",
        detalhe: "Leve, pratico e facil de guardar no dia a dia."
    },
    {
        imagem: "https://m.media-amazon.com/images/I/71H5xioarqL._AC_UF1000,1000_QL80_.jpg",
        nome: "Jogo de Panelas",
        preco: "R$ 459,90",
        detalhe: "Conjunto antiaderente com 5 pecas para sua cozinha."
    }
];

function renderProdutos() {
    const painel = document.querySelector('#painel-compra');
    if (!painel) return;

    painel.innerHTML = produtos.map((produto) => `
        <article class="card-compra">
            <img src="${produto.imagem}" alt="${produto.nome}" class="produto-img">
            <h3 class="produto-titulo">${produto.nome}</h3>
            <p class="produto-preco">${produto.preco}</p>
            <p class="produto-detalhe">${produto.detalhe}</p>
            <button class="btn-compra">Ver Detalhes</button>
        </article>
    `).join('');
}

renderProdutos();
