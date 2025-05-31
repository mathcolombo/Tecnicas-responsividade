 document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mobileMenu.classList.add('hidden');
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    const breakpoints = [
        { name: 'Mobile Extra Pequeno', min: 0, max: 480, color: 'bg-red-500' },
        { name: 'Mobile Pequeno (Paisagem)', min: 481, max: 600, color: 'bg-orange-500' },
        { name: 'Tablet Pequeno (Retrato)', min: 601, max: 768, color: 'bg-amber-500' },
        { name: 'Tablet Grande (Paisagem)', min: 769, max: 1024, color: 'bg-yellow-500' },
        { name: 'Laptops e Desktops Pequenos', min: 1025, max: 1280, color: 'bg-lime-500' },
        { name: 'Desktops Grandes', min: 1281, max: 1440, color: 'bg-green-500' },
        { name: 'Telas Extra Grandes', min: 1441, max: Infinity, color: 'bg-teal-500' },
    ];
    
    const breakpointIndicator = document.getElementById('breakpoint-indicator');
    const breakpointName = document.getElementById('breakpoint-name');
    const windowWidthEl = document.getElementById('window-width');

    function updateBreakpointIndicator() {
        const width = window.innerWidth;
        windowWidthEl.textContent = width;
        const currentBreakpoint = breakpoints.find(bp => width >= bp.min && width <= bp.max);

        if(currentBreakpoint) {
            breakpointName.textContent = currentBreakpoint.name;
            breakpointIndicator.className = 'sticky top-[70px] z-40 mb-12 p-4 rounded-lg text-center font-bold text-white transition-all duration-300 ' + currentBreakpoint.color;
        }
    }

    window.addEventListener('resize', updateBreakpointIndicator);
    updateBreakpointIndicator();

    const layoutDemoContainer = document.getElementById('layout-demo-container');
    const flexboxBtn = document.getElementById('flexbox-btn');
    const gridBtn = document.getElementById('grid-btn');
    const explanationText = document.getElementById('explanation-text');

    const explanations = {
        flexbox: 'Com Flexbox, os itens são dispostos em uma única linha (ou coluna). A propriedade `flex-wrap` permite que eles quebrem para a próxima linha quando o espaço acaba. Ótimo para componentes como menus e galerias.',
        grid: 'Com CSS Grid, definimos uma grade bidimensional de linhas e colunas. Isso nos dá controle preciso sobre o posicionamento dos itens em ambos os eixos, ideal para o layout geral da página.'
    };

    function applyFlexbox() {
        layoutDemoContainer.className = 'bg-gray-200/50 p-4 rounded-lg min-h-[300px] flex flex-wrap gap-4 items-start justify-center transition-all duration-500';
        flexboxBtn.classList.add('active');
        gridBtn.classList.remove('active');
        explanationText.textContent = explanations.flexbox;
    }

    function applyGrid() {
        layoutDemoContainer.className = 'bg-gray-200/50 p-4 rounded-lg min-h-[300px] grid grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-500';
        gridBtn.classList.add('active');
        flexboxBtn.classList.remove('active');
        explanationText.textContent = explanations.grid;
    }

    flexboxBtn.addEventListener('click', applyFlexbox);
    gridBtn.addEventListener('click', applyGrid);
    applyFlexbox();

    const frameworksData = [
        { name: 'Bootstrap', type: 'CSS Framework', approach: 'Mobile-first, Baseado em componentes', pros: 'Sistema de grid de 12 colunas, vasto conjunto de componentes UI pré-estilizados, ampla documentação e comunidade.', famous: 'Spotify, LinkedIn' },
        { name: 'Tailwind CSS', type: 'CSS Framework', approach: 'Utility-first, Mobile-first', pros: 'Controle granular com classes de baixo nível, breakpoints personalizáveis, otimização de tamanho com PurgeCSS.', famous: 'Usado por muitas startups e projetos modernos.' },
        { name: 'Foundation', type: 'CSS Framework', approach: 'Mobile-first, Baseado em componentes', pros: 'Sistema de grid flexível e personalizável, focado em projetos de nível empresarial e acessibilidade.', famous: 'Menos prevalente hoje, mas historicamente importante.' },
        { name: 'React', type: 'JS Library', approach: 'UI declarativa, Baseado em componentes', pros: 'Reutilização de componentes, Virtual DOM para performance, ecossistema robusto, se integra perfeitamente com qualquer abordagem CSS.', famous: 'Facebook, Netflix, Instagram' },
        { name: 'Vue.js', type: 'JS Framework', approach: 'Progressivo, Reativo, Baseado em componentes', pros: 'Curva de aprendizado suave, reatividade de dados, integração fácil, flexível para Single Page Apps (SPAs).', famous: 'Alibaba, GitLab (parcialmente)' },
    ];

    const frameworksGrid = document.getElementById('frameworks-grid');
    frameworksData.forEach(fw => {
        const card = document.createElement('div');
        card.className = 'card-bg p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer transform hover:scale-105 transition-transform';
        card.innerHTML = `
            <h3 class="text-xl font-bold mb-2">${fw.name}</h3>
            <p class="text-gray-500 text-sm mb-3">${fw.approach}</p>
            <p class="text-gray-700">${fw.pros.split('.')[0]}.</p>
        `;
        
        card.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4';
            modal.innerHTML = `
                <div class="bg-fdfaf7 rounded-lg p-8 max-w-lg w-full relative transform scale-95 transition-transform duration-300">
                        <button class="absolute top-4 right-4 text-2xl font-bold">&times;</button>
                        <h3 class="text-2xl font-bold mb-2">${fw.name}</h3>
                        <p class="text-sm font-semibold highlight-text mb-4">${fw.type} | ${fw.approach}</p>
                        <p class="mb-4 text-gray-700">${fw.pros}</p>
                        <p class="text-sm text-gray-600"><strong>Usado por:</strong> ${fw.famous}</p>
                </div>
            `;
            document.body.appendChild(modal);
            
            setTimeout(() => {
                modal.querySelector('div').classList.remove('scale-95');
            }, 10);

            modal.querySelector('button').addEventListener('click', () => {
                modal.querySelector('div').classList.add('scale-95');
                setTimeout(() => modal.remove(), 300);
            });
                modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.querySelector('div').classList.add('scale-95');
                    setTimeout(() => modal.remove(), 300);
                }
            });
        });
        frameworksGrid.appendChild(card);
    });
    
    const challengesData = [
        { title: 'Layouts Fixos e Imagens Desproporcionais', content: '<strong>Solução:</strong> Use unidades relativas (%, vw) e layouts flexíveis com Flexbox ou Grid. Para imagens, aplique `max-width: 100%` e use os atributos `srcset` e `<picture>` para servir tamanhos adequados.' },
        { title: 'Botões e Links Pequenos ou Inacessíveis', content: '<strong>Solução:</strong> Garanta que os alvos de toque tenham um tamanho mínimo (cerca de 44x44 pixels) e espaçamento adequado para evitar toques acidentais em dispositivos móveis.' },
        { title: 'Velocidade de Carregamento Lenta em Mobile', content: '<strong>Solução:</strong> Comprima imagens agressivamente, minimize CSS e JavaScript, utilize cache do navegador e implemente "lazy loading" para recursos que não são imediatamente visíveis.' },
        { title: 'Conteúdo Ausente entre Versões', content: '<strong>Solução:</strong> Evite ocultar conteúdo em telas menores (`display: none;`). Em vez disso, reorganize-o. A priorização do Mobile-First ajuda a garantir que apenas o conteúdo essencial seja incluído desde o início para todos.' },
        { title: 'Quebras de Layout em Resoluções Intermediárias', content: '<strong>Solução:</strong> Teste em uma ampla gama de larguras, não apenas em breakpoints de dispositivos comuns. A abordagem de "breakpoints orientados ao conteúdo" resolve isso, adicionando breakpoints onde o design quebra, não onde um novo dispositivo começa.' },
    ];

    const challengesAccordion = document.getElementById('challenges-accordion');
    challengesData.forEach(item => {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'card-bg border border-gray-200 rounded-lg shadow-sm';
        accordionItem.innerHTML = `
            <button class="w-full text-left p-6 flex justify-between items-center">
                <h4 class="text-lg font-semibold">${item.title}</h4>
                <span class="transform transition-transform duration-300 text-xl">▼</span>
            </button>
            <div class="accordion-content px-6">
                <div class="pb-6 text-gray-700">${item.content}</div>
            </div>
        `;
        challengesAccordion.appendChild(accordionItem);

        const button = accordionItem.querySelector('button');
        const content = accordionItem.querySelector('.accordion-content');
        const arrow = accordionItem.querySelector('span');
        button.addEventListener('click', () => {
            const isOpen = content.style.maxHeight;
            if (isOpen) {
                content.style.maxHeight = null;
                arrow.style.transform = 'rotate(0deg)';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                arrow.style.transform = 'rotate(-180deg)';
            }
        });
    });
});