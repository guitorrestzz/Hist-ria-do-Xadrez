// Variáveis globais
let isPreloaderActive = true;
let isMenuOpen = false;

// Esperar pelo carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Remover preloader após carregamento
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        isPreloaderActive = false;
        
        // Animar elementos da hero section
        animateHeroElements();
    }, 1500);
    
    // Configurar navegação
    setupNavigation();
    
    // Configurar animações de scroll
    setupScrollAnimations();
    
    // Configurar interações de hover
    setupHoverEffects();
    
    // Configurar menu responsivo
    setupResponsiveMenu();
});

// Animar elementos da hero section
function animateHeroElements() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroText = document.querySelector('.hero-text');
    const heroButtons = document.querySelector('.hero-buttons');
    
    const timeline = gsap.timeline();
    
    timeline
        .from(heroTitle, { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
        .from(heroSubtitle, { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from(heroText, { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from(heroButtons, { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.4');
}

// Configurar navegação
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');
    
    // Navegação suave ao clicar nos links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Fechar menu móvel se estiver aberto
            if (isMenuOpen) {
                toggleMobileMenu();
            }
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - header.offsetHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Destacar link ativo durante o scroll
    window.addEventListener('scroll', () => {
        // Mudar estilo do header ao rolar
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Atualizar link ativo
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    });
}

// Configurar animações de scroll
function setupScrollAnimations() {
    // Animar seções ao entrar na viewport
    const sections = document.querySelectorAll('section:not(.hero)');
    
    sections.forEach(section => {
        gsap.from(section.querySelector('.section-header'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // Animar itens da timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.1
        });
    });
    
    // Animar cards de teorias
    const theoryCards = document.querySelectorAll('.theory-card');
    
    theoryCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            ease: 'power3.out',
            delay: index * 0.2
        });
    });
    
    // Animar cards de curiosidades
    const curiosityCards = document.querySelectorAll('.curiosity-card');
    
    curiosityCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: 'power3.out',
            delay: index * 0.1
        });
    });
    
    // Animar citação
    const quoteSection = document.querySelector('.quote-section');
    
    gsap.from(quoteSection.querySelector('blockquote'), {
        scrollTrigger: {
            trigger: quoteSection,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out'
    });
}

// Configurar efeitos de hover
function setupHoverEffects() {
    // Efeito parallax nas peças de xadrez decorativas
    const heroSection = document.querySelector('.hero');
    const chessPieces = document.querySelectorAll('.chess-piece-decoration');
    
    heroSection.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        chessPieces.forEach(piece => {
            const speedFactor = parseFloat(piece.getAttribute('data-speed') || 20);
            const moveX = mouseX * speedFactor;
            const moveY = mouseY * speedFactor;
            
            gsap.to(piece, {
                x: moveX,
                y: moveY,
                duration: 1,
                ease: 'power1.out'
            });
        });
    });
    
    // Adicionar atributos de velocidade para o efeito parallax
    chessPieces.forEach((piece, index) => {
        piece.setAttribute('data-speed', 10 + (index * 5));
    });
}

// Configurar menu responsivo
function setupResponsiveMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
            toggleMobileMenu();
        }
    });
    
    // Função para alternar o menu móvel
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevenir scroll quando o menu estiver aberto
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }
}

// Adicionar interatividade aos cards de teoria
document.addEventListener('DOMContentLoaded', () => {
    const theoryCards = document.querySelectorAll('.theory-card');
    
    theoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const theoryType = card.getAttribute('data-theory');
            highlightTheory(theoryType);
        });
        
        card.addEventListener('mouseleave', () => {
            resetTheoryHighlights();
        });
    });
    
    function highlightTheory(theoryType) {
        theoryCards.forEach(card => {
            if (card.getAttribute('data-theory') === theoryType) {
                card.style.transform = 'translateY(-15px) scale(1.05)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                card.style.zIndex = '2';
            } else {
                card.style.opacity = '0.7';
                card.style.transform = 'scale(0.95)';
            }
        });
    }
    
    function resetTheoryHighlights() {
        theoryCards.forEach(card => {
            card.style.transform = '';
            card.style.boxShadow = '';
            card.style.opacity = '';
            card.style.zIndex = '';
        });
    }
});

// Adicionar interatividade à linha do tempo
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item.querySelector('.timeline-content'), {
                scale: 1.03,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
                duration: 0.3
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('.timeline-content'), {
                scale: 1,
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                duration: 0.3
            });
        });
    });
});
