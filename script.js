// ===== MATERIAL DESIGN 3 COMPONENTS INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes do Material Design
    initializeMaterialComponents();
    
    // Inicializar funcionalidades customizadas
    initializeCustomFeatures();
});

function initializeMaterialComponents() {
    // Inicializar botões
    const buttons = document.querySelectorAll('.mdc-button');
    buttons.forEach(button => {
        new mdc.ripple.MDCRipple(button);
    });
    
    // Inicializar campos de texto
    const textFields = document.querySelectorAll('.mdc-text-field');
    textFields.forEach(field => {
        new mdc.textField.MDCTextField(field);
    });
    
    // Inicializar top app bar
    const topAppBar = document.querySelector('.mdc-top-app-bar');
    if (topAppBar) {
        new mdc.topAppBar.MDCTopAppBar(topAppBar);
    }
}

function initializeCustomFeatures() {
    // Smooth scroll para links de navegação
    initializeSmoothScroll();
    
    // Animações de scroll
    initializeScrollAnimations();
    
    // Formulário de contato
    initializeContactForm();
    
    // Botões de ação
    initializeActionButtons();
    
    // Navegação responsiva
    initializeResponsiveNavigation();
    
    // Menu mobile
    initializeMobileMenu();
    
    // Indicador de scroll da hero
    initializeScrollIndicator();
}

// ===== SMOOTH SCROLL =====
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.mdc-top-app-bar').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.servico-card, .diferencial-item, .stat-card, .region-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.querySelector('.mdc-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulário
            if (validateForm()) {
                // Simular envio
                showFormSuccess();
            }
        });
    }
}

function validateForm() {
    const requiredFields = ['nome', 'email', 'telefone', 'empresa', 'mensagem'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        
        if (!value) {
            showFieldError(field, 'Este campo é obrigatório');
            isValid = false;
        } else if (fieldId === 'email' && !isValidEmail(value)) {
            showFieldError(field, 'E-mail inválido');
            isValid = false;
        } else if (fieldId === 'telefone' && !isValidPhone(value)) {
            showFieldError(field, 'Telefone inválido');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\(\)\-\+]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function showFieldError(field, message) {
    const textField = field.closest('.mdc-text-field');
    if (textField) {
        textField.classList.add('mdc-text-field--invalid');
        
        // Remover mensagem de erro anterior
        const existingError = textField.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Adicionar nova mensagem de erro
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#d32f2f';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '4px';
        errorElement.textContent = message;
        
        textField.appendChild(errorElement);
    }
}

function clearFieldError(field) {
    const textField = field.closest('.mdc-text-field');
    if (textField) {
        textField.classList.remove('mdc-text-field--invalid');
        
        const errorElement = textField.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

function showFormSuccess() {
    // Criar modal de sucesso
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="success-content">
            <span class="material-icons success-icon">check_circle</span>
            <h3>Mensagem Enviada!</h3>
            <p>Obrigado pelo contato. Retornaremos em breve!</p>
            <button class="mdc-button mdc-button--raised close-modal">
                <span class="mdc-button__label">Fechar</span>
            </button>
        </div>
    `;
    
    // Adicionar estilos
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const successContent = modal.querySelector('.success-content');
    successContent.style.cssText = `
        background: white;
        padding: 32px;
        border-radius: 8px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
        animation: slideUp 0.3s ease;
    `;
    
    const successIcon = modal.querySelector('.success-icon');
    successIcon.style.cssText = `
        font-size: 64px;
        color: #4CAF50;
        margin-bottom: 16px;
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(modal);
    
    // Event listener para fechar
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Limpar formulário
    const form = document.querySelector('.mdc-form');
    form.reset();
    
    // Adicionar animações CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// ===== ACTION BUTTONS =====
function initializeActionButtons() {
    // Botão de cotação no header
    const cotacaoBtn = document.getElementById('cotacao-btn');
    if (cotacaoBtn) {
        cotacaoBtn.addEventListener('click', function() {
            const contatoSection = document.querySelector('#contato');
            if (contatoSection) {
                const headerHeight = document.querySelector('.mdc-top-app-bar').offsetHeight;
                const targetPosition = contatoSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Botões do hero
    const heroButtons = document.querySelectorAll('.hero-btn-primary, .hero-btn-secondary');
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('hero-btn-primary')) {
                // Scroll para contato
                const contatoSection = document.querySelector('#contato');
                if (contatoSection) {
                    const headerHeight = document.querySelector('.mdc-top-app-bar').offsetHeight;
                    const targetPosition = contatoSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            } else {
                // Scroll para serviços
                const servicosSection = document.querySelector('#servicos');
                if (servicosSection) {
                    const headerHeight = document.querySelector('.mdc-top-app-bar').offsetHeight;
                    const targetPosition = servicosSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== RESPONSIVE NAVIGATION =====
function initializeResponsiveNavigation() {
    // Atualizar link ativo baseado na posição do scroll
    window.addEventListener('scroll', debounce(function() {
        updateActiveNavLink();
        
        // Atualizar progresso do header
        const header = document.querySelector('.header-progress');
        if (header) {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            header.style.width = scrollPercent + '%';
        }
        
        // Atualizar background do header baseado no scroll
        const topAppBar = document.querySelector('.mdc-top-app-bar');
        if (topAppBar) {
            if (window.pageYOffset > 50) {
                topAppBar.style.background = 'linear-gradient(135deg, rgba(13, 71, 161, 0.98) 0%, rgba(21, 101, 192, 0.98) 100%)';
            } else {
                topAppBar.style.background = 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)';
            }
        }
    }, 10));
}

// ===== MOBILE MENU =====
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navigation = document.querySelector('.mdc-top-app-bar__navigation');
    
    console.log('Mobile menu init - Button:', mobileMenuBtn, 'Navigation:', navigation);
    
    if (mobileMenuBtn && navigation) {
        mobileMenuBtn.onclick = function() {
            console.log('Menu clicked!');
            
            if (navigation.style.display === 'block') {
                navigation.style.display = 'none';
                mobileMenuBtn.textContent = 'menu';
            } else {
                navigation.style.display = 'block';
                navigation.style.position = 'fixed';
                navigation.style.top = '60px';
                navigation.style.left = '0';
                navigation.style.right = '0';
                navigation.style.background = '#1565C0';
                navigation.style.padding = '16px';
                navigation.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                navigation.style.zIndex = '9999';
                navigation.style.flexDirection = 'column';
                mobileMenuBtn.textContent = 'close';
            }
        };
    }
}

// ===== SCROLL INDICATOR =====
function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const empresaSection = document.querySelector('#empresa');
            if (empresaSection) {
                const headerHeight = document.querySelector('.mdc-top-app-bar').offsetHeight;
                const targetPosition = empresaSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
        
        // Esconder indicador quando scrollar
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            if (scrollTop > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '0.7';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
}

// ===== UTILITY FUNCTIONS =====
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

// ===== SCROLL EFFECTS =====
window.addEventListener('scroll', debounce(function() {
    const header = document.querySelector('.mdc-top-app-bar');
    const progressBar = document.querySelector('.header-progress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
               // Adicionar sombra ao header quando scrollar
           if (scrollTop > 10) {
               header.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
               header.style.background = 'linear-gradient(135deg, rgba(13, 71, 161, 0.98) 0%, rgba(21, 101, 192, 0.98) 100%)';
           } else {
               header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
               header.style.background = 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)';
           }
    
    // Atualizar barra de progresso
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
    
    // Adicionar classe ativa ao link da seção atual
    updateActiveNavLink();
}, 10));

// ===== ACTIVE NAVIGATION =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollTop = window.pageYOffset;
    const headerHeight = document.querySelector('.mdc-top-app-bar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('nav-active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('nav-active');
                }
            });
        }
    });
}

// ===== LAZY LOADING =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
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
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== PERFORMANCE OPTIMIZATION =====
// Preload de recursos críticos
function preloadCriticalResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
        'https://fonts.googleapis.com/icon?family=Material+Icons'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// ===== ANALYTICS (PLACEHOLDER) =====
function initializeAnalytics() {
    // Aqui você pode adicionar Google Analytics ou outras ferramentas
    console.log('Analytics initialized');
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// ===== SEO OPTIMIZATION FUNCTIONS =====

// Função para rastrear visualizações de página (SEO)
function trackPageViews() {
    const pageData = {
        title: document.title,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language
    };
    
    // Aqui você pode integrar com Google Analytics, Google Tag Manager, etc.
    console.log('Page view tracked:', pageData);
    
    // Enviar dados para Google Analytics (exemplo)
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: pageData.title,
            page_location: pageData.url
        });
    }
}

// Função para melhorar acessibilidade
function enhanceAccessibility() {
    // Adicionar skip links para navegação por teclado
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #1565C0;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Adicionar IDs para navegação
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tudo
    initializeMaterialComponents();
    initializeCustomFeatures();
    initializeLazyLoading();
    preloadCriticalResources();
    initializeAnalytics();
    
    // Inicializar otimizações de SEO
    trackPageViews();
    enhanceAccessibility();
    
    console.log('Saraiva Transportes - Site carregado com sucesso!');
}); 