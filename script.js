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

const setIcon = () => {
    toggleBtn.innerHTML = document.body.classList.contains('light-theme')
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
};

if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.body.classList.add('light-theme');
}
setIcon();

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    setIcon();
});

// Language Toggle
const translations = {
    pt: {
        subtitle: 'Software Developer & Automation',
        bio: 'Desenvolvedor focado em criar soluções eficientes e automatizar processos.<br>Especialista em <strong>Python</strong>, <strong>JavaScript</strong> e resolução de problemas técnicos complexos.',
        projectsTitle: 'Projetos em Destaque',
        ragdocsDesc: 'Pipeline de <strong>RAG</strong> para documentos com ingestão assíncrona: upload → fila (<strong>RabbitMQ</strong>) → workers de parsing/chunking/embedding → busca vetorial em <strong>Postgres + pgvector</strong>. Respostas do LLM com citação da página de origem.',
        subhuntDesc: 'Ferramenta completa para legendas: <strong>CLI</strong> para terminal e <strong>GUI Nativa</strong> (Toga) para macOS/Windows. Integração com OpenSubtitles e busca por Hash/Metadata.',
        vagahunterDesc: 'Plataforma Fullstack de monitoramento de vagas. Utiliza <strong>Web Scraping</strong> para agregar oportunidades e <strong>IA (Gemini 2.0)</strong> para analisar o "match" da vaga com o perfil do candidato automaticamente.',
        npmDesc: 'API para rastrear o crescimento de pacotes NPM. Coleta downloads, versões e estrelas do GitHub automaticamente com jobs diários via <strong>BullMQ</strong>. Armazena séries temporais e permite comparar métricas entre pacotes.',
        chatbotDesc: 'Chatbot de IA para suporte ao cliente via <strong>WhatsApp Business API</strong>. Usa <strong>OpenAI</strong> para gerar respostas, com roteamento de intenções, consulta de catálogo de produtos, rastreamento de pedidos e fila de atendimento humano.',
        simple3dDesc: 'Engine de renderização 3D construída do zero com Vanilla JS. Sem bibliotecas externas, apenas matemática pura e HTML5 Canvas.',
        viewGithub: 'Ver no GitHub',
        code: 'Código',
        footer: '&copy; 2026 Gabriel Mello. Construído com código limpo.'
    },
    en: {
        subtitle: 'Software Developer & Automation',
        bio: 'Developer focused on creating efficient solutions and automating processes.<br>Specialist in <strong>Python</strong>, <strong>JavaScript</strong> and solving complex technical problems.',
        projectsTitle: 'Featured Projects',
        ragdocsDesc: 'Document <strong>RAG</strong> pipeline with async ingestion: upload → queue (<strong>RabbitMQ</strong>) → parsing/chunking/embedding workers → vector search in <strong>Postgres + pgvector</strong>. LLM answers with source-page citations.',
        subhuntDesc: 'Complete subtitle tool: <strong>CLI</strong> for terminal and <strong>Native GUI</strong> (Toga) for macOS/Windows. OpenSubtitles integration with Hash/Metadata search.',
        vagahunterDesc: 'Fullstack job monitoring platform. Uses <strong>Web Scraping</strong> to aggregate opportunities and <strong>AI (Gemini 2.0)</strong> to automatically analyze job-candidate match.',
        npmDesc: 'API to track NPM package growth. Collects downloads, versions and GitHub stars automatically with daily jobs via <strong>BullMQ</strong>. Stores time series and enables comparing metrics across packages.',
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

function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerHTML = t[key];
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
    applyLanguage(currentLang === 'pt' ? 'en' : 'pt');
});
