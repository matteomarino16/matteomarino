 // ==============================================
// INIZIALIZZAZIONE AL CARICAMENTO PAGINA
// ==============================================
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initSmoothScroll();
    initParallaxEffects();
    initSkillsAnimation();
    initScrollParallax();
});

// ==============================================
// CREAZIONE PARTICELLE ANIMATE
// ==============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Proprietà randomiche per ogni particella
        const size = Math.random() * 4 + 2;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const animationDuration = Math.random() * 4 + 4;
        const animationDelay = Math.random() * 2;
        
        // Applica gli stili
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.animationDuration = animationDuration + 's';
        particle.style.animationDelay = animationDelay + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ==============================================
// SMOOTH SCROLL PER NAVIGATION
// ==============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==============================================
// EFFETTI PARALLAX PER LE CARD
// ==============================================
function initParallaxEffects() {
    // Effetto parallax al movimento del mouse
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.project-card, .skill-card');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = (rect.left + rect.width / 2) / window.innerWidth;
            const cardY = (rect.top + rect.height / 2) / window.innerHeight;
            
            const deltaX = (mouseX - cardX) * 5;
            const deltaY = (mouseY - cardY) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${deltaY}deg) rotateY(${deltaX}deg)`;
        });
    });

    // Reset transform quando il mouse esce dalla card
    document.querySelectorAll('.project-card, .skill-card').forEach(card => {
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// ==============================================
// ANIMAZIONE SKILLS PROGRESS BARS
// ==============================================
function initSkillsAnimation() {
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        });
    }, observerOptions);

    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

// ==============================================
// PARALLAX SCROLL PER HEADER
// ==============================================
function initScrollParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        const parallaxSpeed = 0.5;
        
        if (header) {
            header.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ==============================================
// GESTIONE RESPONSIVE PARTICELLE
// ==============================================
function handleResize() {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        // Rimuovi le particelle esistenti
        particlesContainer.innerHTML = '';
        // Ricrea le particelle con le nuove dimensioni
        createParticles();
    }
}

// Ascolta il resize della finestra
window.addEventListener('resize', debounce(handleResize, 250));

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

// Funzione debounce per ottimizzare le performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Funzione per ottenere un numero random in un range
function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// ==============================================
// EFFETTI AGGIUNTIVI OPZIONALI
// ==============================================

// Effetto typing per il titolo (opzionale)
function typeWriterEffect(element, text, speed = 100) {
    if (!element) return;
    
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Effetto contatore animato per le skills (opzionale)
function animateCounter(element, target, duration = 2000) {
    if (!element) return;
    
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '%';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '%';
        }
    }
    
    updateCounter();
}

// ==============================================
// GESTIONE TEMA SCURO/CHIARO (OPZIONALE)
// ==============================================
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');
    
    // Salva la preferenza in localStorage
    const isLight = body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Carica il tema salvato
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

// ==============================================
// PERFORMANCE MONITORING
// ==============================================
function logPerformance() {
    if (window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Tempo di caricamento pagina: ${loadTime}ms`);
    }
}

// Log delle performance al caricamento completo
window.addEventListener('load', logPerformance);

// ==============================================
// GESTIONE ERRORI
// ==============================================
window.addEventListener('error', function(e) {
    console.error('Errore JavaScript:', e.error);
    // Qui potresti inviare l'errore a un servizio di logging
});

// ==============================================
// ACCESSIBILITY ENHANCEMENTS
// ==============================================
function enhanceAccessibility() {
    // Aggiungi skip links per la navigazione da tastiera
    const skipLink = document.createElement('a');
    skipLink.href = '#portfolio';
    skipLink.textContent = 'Salta al contenuto principale';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #667eea;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    // Mostra il link quando riceve focus
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Aggiungi attributi ARIA per le animazioni
    const animatedElements = document.querySelectorAll('.project-card, .skill-card');
    animatedElements.forEach(el => {
        el.setAttribute('aria-label', 'Elemento interattivo del portfolio');
    });
}

// ==============================================
// LAZY LOADING PER IMMAGINI (SE PRESENTI)
// ==============================================
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// ==============================================
// GESTIONE FOCUS PER NAVIGAZIONE DA TASTIERA
// ==============================================
function initKeyboardNavigation() {
    // Gestione focus visibile per elementi interattivi
    const focusableElements = document.querySelectorAll('a, button, .project-card, .skill-card');
    
    focusableElements.forEach(element => {
        element.addEventListener('focusin', () => {
            element.style.outline = '2px solid #667eea';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('focusout', () => {
            element.style.outline = 'none';
        });
    });
    
    // Navigazione con frecce per le card
    document.addEventListener('keydown', (e) => {
        const activeElement = document.activeElement;
        const cards = Array.from(document.querySelectorAll('.project-card, .skill-card'));
        const currentIndex = cards.indexOf(activeElement);
        
        if (currentIndex === -1) return;
        
        let nextIndex;
        switch(e.key) {
            case 'ArrowRight':
                nextIndex = (currentIndex + 1) % cards.length;
                break;
            case 'ArrowLeft':
                nextIndex = currentIndex - 1 < 0 ? cards.length - 1 : currentIndex - 1;
                break;
            case 'ArrowDown':
                nextIndex = Math.min(currentIndex + 2, cards.length - 1);
                break;
            case 'ArrowUp':
                nextIndex = Math.max(currentIndex - 2, 0);
                break;
            default:
                return;
        }
        
        e.preventDefault();
        cards[nextIndex].focus();
    });
}

// ==============================================
// PRELOADER (OPZIONALE)
// ==============================================
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner"></div>
            <p>Caricamento Portfolio...</p>
        </div>
    `;
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .preloader-content {
            text-align: center;
            color: white;
        }
        .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(102, 126, 234, 0.3);
            border-top: 3px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(preloader);
    
    // Rimuovi il preloader quando tutto è caricato
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
                style.remove();
            }, 500);
        }, 1000);
    });
}

// ==============================================
// ANALYTICS E TRACKING (PLACEHOLDER)
// ==============================================
function initAnalytics() {
    // Traccia click sui progetti
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const projectTitle = e.target.closest('.project-card').querySelector('.project-title').textContent;
            console.log(`Click su progetto: ${projectTitle}`);
            // Qui potresti inviare l'evento a Google Analytics o altro servizio
        });
    });
    
    // Traccia scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', debounce(() => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            console.log(`Scroll depth: ${scrollPercent}%`);
        }
    }, 500));
}

// ==============================================
// EASTER EGGS E EFFETTI SPECIALI
// ==============================================
function initEasterEggs() {
    // Konami Code easter egg
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateSpecialMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    // Click multipli sul logo per modalità party
    let clickCount = 0;
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('click', () => {
            clickCount++;
            if (clickCount >= 5) {
                activatePartyMode();
                clickCount = 0;
            }
            setTimeout(() => clickCount = 0, 2000);
        });
    }
}

function activateSpecialMode() {
    document.body.style.filter = 'hue-rotate(180deg)';
    console.log('🎉 Modalità speciale attivata!');
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 5000);
}

function activatePartyMode() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'];
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach(particle => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        particle.style.boxShadow = `0 0 20px ${randomColor}`;
    });
    
    console.log('🎊 Party mode attivato!');
    
    setTimeout(() => {
        particles.forEach(particle => {
            particle.style.background = 'rgba(102, 126, 234, 0.6)';
            particle.style.boxShadow = 'none';
        });
    }, 10000);
}

// ==============================================
// INIZIALIZZAZIONE COMPLETA
// ==============================================
document.addEventListener('DOMContentLoaded', function() {
    // Funzioni principali
    createParticles();
    initSmoothScroll();
    initParallaxEffects();
    initSkillsAnimation();
    initScrollParallax();
    
    // Funzioni aggiuntive
    enhanceAccessibility();
    initLazyLoading();
    initKeyboardNavigation();
    initAnalytics();
    initEasterEggs();
    
    // Preloader (decomenta se vuoi usarlo)
    // initPreloader();
    
    console.log('🚀 Portfolio caricato con successo!');
});