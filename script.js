// Toggle Group Container
const toggleGroup = document.createElement('div');
toggleGroup.className = 'toggle-group';
document.body.appendChild(toggleGroup);

// Dark Mode Toggle
const toggleBtn = document.createElement('button');
toggleBtn.className = 'theme-toggle';
toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
toggleBtn.setAttribute('aria-label', 'Toggle Theme');
toggleGroup.appendChild(toggleBtn);

const root = document.documentElement;
const setIcon = () => {
    toggleBtn.innerHTML = root.classList.contains('light')
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
};

setIcon();

toggleBtn.addEventListener('click', () => {
    localStorage.setItem('theme', root.classList.toggle('light') ? 'light' : 'dark');
    setIcon();
});

// Language Toggle
const translations = {
    pt: {
        subtitle: 'Software Developer · Automation & AI',
        bio: 'Desenvolvedor focado em automatizar processos e colocar <strong>IA</strong> pra trabalhar de verdade: <strong>LLMs</strong>, <strong>RAG</strong>, agentes e integrações.<br>Especialista em <strong>Python</strong> e <strong>TypeScript</strong>.',
        contact: 'Fale comigo',
        projectsTitle: 'Projetos em Destaque',
        presenceDesc: 'Discord Rich Presence para o <strong>Claude Code</strong>. Plugin <strong>zero dependências</strong> que fala IPC direto com o Discord, funciona no WSL2 via daemon no Windows, agrega várias sessões e não expõe prompts nem comandos.',
        cuboTitle: 'Treino de Cubo Mágico',
        cuboDesc: 'Treino de reconhecimento de <strong>F2L, OLL e PLL</strong> (119 casos) com um cubo 3D desenhado em SVG do zero e animação de giro de camada. Casos difíceis voltam mais vezes. <strong>PWA</strong> que funciona offline e sincroniza entre aparelhos via <strong>Supabase</strong>.',
        ragdocsDesc: 'Pipeline de <strong>RAG</strong> para documentos com ingestão assíncrona: upload → fila (<strong>RabbitMQ</strong>) → workers de parsing/chunking/embedding → busca vetorial em <strong>Postgres + pgvector</strong>. Respostas do LLM com citação da página de origem.',
        bonziDesc: 'O <strong>BonziBuddy</strong> de volta à área de trabalho, com os sprites, animações e sons originais, e sem nada de malicioso: sem rede, sem propaganda. Reimplementa o motor de animação do <strong>Microsoft Agent</strong> em WPF, fala com a voz do Windows e canta Daisy Bell nota a nota via SSML.',
        vagahunterDesc: 'Plataforma Fullstack de monitoramento de vagas. Utiliza <strong>Web Scraping</strong> para agregar oportunidades e <strong>IA (Gemini 2.0)</strong> para analisar o "match" da vaga com o perfil do candidato automaticamente.',
        chatbotDesc: 'Chatbot de IA para suporte ao cliente via <strong>WhatsApp Business API</strong>. Usa <strong>OpenAI</strong> para gerar respostas, com roteamento de intenções, consulta de catálogo de produtos, rastreamento de pedidos e fila de atendimento humano.',
        simple3dDesc: 'Engine de renderização 3D construída do zero com Vanilla JS. Sem bibliotecas externas, apenas matemática pura e HTML5 Canvas.',
        viewGithub: 'Ver no GitHub',
        code: 'Código',
        footer: '&copy; 2026 Gabriel Mello. Construído com código limpo.'
    },
    en: {
        subtitle: 'Software Developer · Automation & AI',
        bio: 'Developer focused on automating processes and putting <strong>AI</strong> to real work: <strong>LLMs</strong>, <strong>RAG</strong>, agents and integrations.<br>Specialist in <strong>Python</strong> and <strong>TypeScript</strong>.',
        contact: 'Get in touch',
        projectsTitle: 'Featured Projects',
        presenceDesc: 'Discord Rich Presence for <strong>Claude Code</strong>. <strong>Zero-dependency</strong> plugin that speaks Discord IPC directly, works on WSL2 via a Windows-side daemon, merges multiple sessions and never leaks prompts or commands.',
        cuboTitle: 'Cube Algorithm Trainer',
        cuboDesc: 'Recognition trainer for <strong>F2L, OLL and PLL</strong> (119 cases) with a 3D cube drawn in SVG from scratch and animated layer turns. Hard cases come back more often. Offline-ready <strong>PWA</strong> that syncs across devices via <strong>Supabase</strong>.',
        ragdocsDesc: 'Document <strong>RAG</strong> pipeline with async ingestion: upload → queue (<strong>RabbitMQ</strong>) → parsing/chunking/embedding workers → vector search in <strong>Postgres + pgvector</strong>. LLM answers with source-page citations.',
        bonziDesc: '<strong>BonziBuddy</strong> back on the desktop, with the original sprites, animations and sounds, minus the malware: no network, no ads. Reimplements the <strong>Microsoft Agent</strong> animation engine in WPF, talks with the Windows voice and sings Daisy Bell note by note via SSML.',
        vagahunterDesc: 'Fullstack job monitoring platform. Uses <strong>Web Scraping</strong> to aggregate opportunities and <strong>AI (Gemini 2.0)</strong> to automatically analyze job-candidate match.',
        chatbotDesc: 'AI-powered customer support chatbot via <strong>WhatsApp Business API</strong>. Uses <strong>OpenAI</strong> for reply generation, with intent routing, product catalog lookup, order tracking, and human handoff queue.',
        simple3dDesc: '3D rendering engine built from scratch with Vanilla JS. No external libraries, just pure math and HTML5 Canvas.',
        viewGithub: 'View on GitHub',
        code: 'Code',
        footer: '&copy; 2026 Gabriel Mello. Built with clean code.'
    }
};

function getDefaultLang() {
    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    return browserLang.startsWith('pt') ? 'pt' : 'en';
}

let currentLang = localStorage.getItem('lang') || getDefaultLang();

function applyLanguage(lang, animate) {
    currentLang = lang;
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!t[key]) return;
        el.innerHTML = t[key];
        if (animate) { el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap'); }
    });
    langBtn.textContent = lang === 'pt' ? 'EN' : 'PT';
    localStorage.setItem('lang', lang);
}

const langBtn = document.createElement('button');
langBtn.className = 'lang-toggle';
langBtn.setAttribute('aria-label', 'Toggle Language');
toggleGroup.appendChild(langBtn);

applyLanguage(currentLang);

langBtn.addEventListener('click', () => {
    applyLanguage(currentLang === 'pt' ? 'en' : 'pt', true);
});

// Reveal once on scroll. Cards in the same row arrive one column apart; tags follow their card.
document.querySelectorAll('.card').forEach((card, i) => {
    card.style.setProperty('--d', `${(i + 1) % 2 * 90}ms`);
    card.querySelectorAll('.tags span').forEach((tag, j) => tag.style.setProperty('--n', j));
});

const revealTargets = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
        }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    revealTargets.forEach(el => io.observe(el));
} else {
    revealTargets.forEach(el => el.classList.add('is-in'));
}
