const root = document.documentElement;
const toggleGroup = document.querySelector('.toggle-group');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Tema: claro (osso) por padrão, escuro (oliva) opcional
const themeBtn = document.createElement('button');
themeBtn.className = 'theme-toggle';
themeBtn.setAttribute('aria-label', 'Toggle Theme');
toggleGroup.appendChild(themeBtn);

const setIcon = () => {
    themeBtn.innerHTML = root.classList.contains('dark') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
};
setIcon();

themeBtn.addEventListener('click', () => {
    try { localStorage.setItem('theme', root.classList.toggle('dark') ? 'dark' : 'light'); } catch (e) { root.classList.toggle('dark'); }
    setIcon();
});

// Idioma
const translations = {
    pt: {
        navWork: 'Projetos',
        navAbout: 'Sobre',
        navContact: 'Contato',
        bio: 'Desenvolvedor de software. Coloco <strong>IA</strong> pra trabalhar de verdade (LLMs, RAG, agentes) e automatizo o que dá pra automatizar, em <strong>Python</strong> e <strong>TypeScript</strong>.',
        contact: 'Fale comigo',
        presenceLabel: 'Agora no meu GitHub',
        presenceNote: 'Meu último commit público, atualizado a cada visita e desenhado do jeito que o meu plugin <a href="#claude-discord-presence">claude-discord-presence</a> desenha no Discord.',
        presenceStates: { typing: 'Programando', building: 'Em pausa', sleeping: 'Dormindo' },
        presenceFallback: ['Programando', 'claude-discord-presence (main)', 'Rich Presence pro Claude Code'],
        ago: 'último commit há',
        days: n => n === 1 ? 'último commit há 1 dia' : `último commit há ${n} dias`,
        workTitle: 'Projetos',
        presenceFact: 'Plugin do Claude Code',
        presenceDesc: 'Discord Rich Presence para o <strong>Claude Code</strong>. Plugin <strong>zero dependências</strong> que fala IPC direto com o Discord, funciona no WSL2 via daemon no Windows, agrega várias sessões e não expõe prompts nem comandos.',
        cozyDesc: 'Uma estrada sem fim, sem pressa, com a sua música tocando na central multimídia do carro. Cena 3D em <strong>Three.js</strong> em que a paisagem respira junto com o som, analisado ao vivo com a <strong>Web Audio API</strong>. Toca do <strong>Spotify</strong> ou de arquivos locais.',
        cozyStack: 'Three.js · Web Audio API · Spotify Web API · código ainda fechado',
        openApp: 'Abrir o app',
        cuboTitle: 'Treino de Cubo Mágico',
        cuboFact: '119 casos',
        cuboDesc: 'Treino de reconhecimento de <strong>F2L, OLL e PLL</strong> com um cubo 3D desenhado em SVG do zero e animação de giro de camada. Casos difíceis voltam mais vezes. <strong>PWA</strong> que funciona offline e sincroniza entre aparelhos via <strong>Supabase</strong>.',
        lanceDesc: 'Xadrez no navegador contra o <strong>Stockfish 19</strong>, com revisão de cada partida: precisão pela fórmula pública do <strong>Lichess</strong>, a classificação de cada lance e a melhor sequência. Também revisa partidas coladas como PGN ou buscadas no Lichess e no Chess.com.',
        ragdocsDesc: 'Pipeline de <strong>RAG</strong> para documentos com ingestão assíncrona: upload, fila no <strong>RabbitMQ</strong>, workers de parsing, chunking e embedding, e busca vetorial em <strong>Postgres + pgvector</strong>. Respostas do LLM com citação da página de origem.',
        bonziFact: 'Windows · um .exe',
        bonziDesc: 'O <strong>BonziBuddy</strong> de volta à área de trabalho, com os sprites, animações e sons originais, e sem nada de malicioso: sem rede, sem propaganda. Reimplementa o motor de animação do <strong>Microsoft Agent</strong> em WPF, fala com a voz do Windows e canta Daisy Bell nota a nota via SSML.',
        chat1: 'Oi! Cadê meu pedido 1042?',
        chat2: 'Seu pedido 1042 saiu para entrega hoje às 9h. Previsão: amanhã até as 18h. Quer o link de rastreio?',
        chat3: 'Quero falar com uma pessoa.',
        chat4: 'Claro. Passei sua conversa para a equipe, alguém responde aqui mesmo em instantes.',
        chatbotDesc: 'Chatbot de IA para suporte ao cliente via <strong>WhatsApp Business API</strong>. Usa <strong>OpenAI</strong> para gerar respostas, com roteamento de intenções, consulta de catálogo, rastreamento de pedidos e fila de atendimento humano.',
        viewGithub: 'Ver no GitHub',
        code: 'Código',
        aboutTitle: 'O que eu faço',
        aboutLead: 'Gosto de software que roda sozinho e de IA que mostra de onde tirou a resposta.',
        about1t: 'IA aplicada',
        about1d: 'LLMs, RAG e agentes ligados a dados de verdade, com a resposta citando a fonte. Foi assim no rag-docs e no chatbot de suporte.',
        about2t: 'Automação',
        about2d: 'Filas, workers, scrapers, jobs agendados e integrações com APIs que rodam sem ninguém olhando.',
        about3t: 'Ferramentas',
        about3d: 'CLIs, plugins e apps pequenos, sem dependência sobrando: do plugin do Claude Code ao Bonzi.',
        footerTitle: 'Bora conversar?',
        sendMail: 'Mandar e-mail'
    },
    en: {
        navWork: 'Work',
        navAbout: 'About',
        navContact: 'Contact',
        bio: 'Software developer. I put <strong>AI</strong> to real work (LLMs, RAG, agents) and automate whatever can be automated, in <strong>Python</strong> and <strong>TypeScript</strong>.',
        contact: 'Get in touch',
        presenceLabel: 'Right now on my GitHub',
        presenceNote: 'My latest public commit, refreshed on every visit and drawn the way my <a href="#claude-discord-presence">claude-discord-presence</a> plugin draws it on Discord.',
        presenceStates: { typing: 'Coding', building: 'On a break', sleeping: 'Sleeping' },
        presenceFallback: ['Coding', 'claude-discord-presence (main)', 'Rich Presence for Claude Code'],
        ago: 'last commit',
        days: n => n === 1 ? 'last commit 1 day ago' : `last commit ${n} days ago`,
        workTitle: 'Work',
        presenceFact: 'Claude Code plugin',
        presenceDesc: 'Discord Rich Presence for <strong>Claude Code</strong>. <strong>Zero-dependency</strong> plugin that speaks Discord IPC directly, works on WSL2 via a Windows-side daemon, merges multiple sessions and never leaks prompts or commands.',
        cozyDesc: 'An endless road, no rush, with your music playing on the car\'s dashboard screen. A <strong>Three.js</strong> scene where the landscape breathes with the sound, analysed live with the <strong>Web Audio API</strong>. Plays from <strong>Spotify</strong> or local files.',
        cozyStack: 'Three.js · Web Audio API · Spotify Web API · source not public yet',
        openApp: 'Open the app',
        cuboTitle: 'Cube Algorithm Trainer',
        cuboFact: '119 cases',
        cuboDesc: 'Recognition trainer for <strong>F2L, OLL and PLL</strong> with a 3D cube drawn in SVG from scratch and animated layer turns. Hard cases come back more often. Offline-ready <strong>PWA</strong> that syncs across devices via <strong>Supabase</strong>.',
        lanceDesc: 'Chess in the browser against <strong>Stockfish 19</strong>, with a review of every game: accuracy from <strong>Lichess</strong>\'s public formula, a grade for every move and the best line. It also reviews games pasted as PGN or fetched from Lichess and Chess.com.',
        ragdocsDesc: 'Document <strong>RAG</strong> pipeline with async ingestion: upload, a <strong>RabbitMQ</strong> queue, parsing, chunking and embedding workers, and vector search in <strong>Postgres + pgvector</strong>. LLM answers cite the page they came from.',
        bonziFact: 'Windows · one .exe',
        bonziDesc: '<strong>BonziBuddy</strong> back on the desktop, with the original sprites, animations and sounds, minus the malware: no network, no ads. Reimplements the <strong>Microsoft Agent</strong> animation engine in WPF, talks with the Windows voice and sings Daisy Bell note by note via SSML.',
        chat1: 'Hi! Where is my order 1042?',
        chat2: 'Order 1042 went out for delivery today at 9am. Expected tomorrow by 6pm. Want the tracking link?',
        chat3: 'I want to talk to a person.',
        chat4: 'Sure. I passed your conversation to the team, someone will reply right here shortly.',
        chatbotDesc: 'AI customer support chatbot on the <strong>WhatsApp Business API</strong>. Uses <strong>OpenAI</strong> for replies, with intent routing, catalog lookup, order tracking and a human handoff queue.',
        viewGithub: 'View on GitHub',
        code: 'Code',
        aboutTitle: 'What I do',
        aboutLead: 'I like software that runs on its own and AI that shows where its answer came from.',
        about1t: 'Applied AI',
        about1d: 'LLMs, RAG and agents wired to real data, with answers that cite their source. That is how rag-docs and the support chatbot work.',
        about2t: 'Automation',
        about2d: 'Queues, workers, scrapers, scheduled jobs and API integrations that run without anyone watching.',
        about3t: 'Tools',
        about3d: 'CLIs, plugins and small apps with no dependency to spare: from the Claude Code plugin to Bonzi.',
        footerTitle: 'Let\'s talk',
        sendMail: 'Send an email'
    }
};

function getDefaultLang() {
    const browserLang = (navigator.language || '').toLowerCase();
    return browserLang.startsWith('pt') ? 'pt' : 'en';
}

let currentLang;
try { currentLang = localStorage.getItem('lang'); } catch (e) {}
currentLang = currentLang || getDefaultLang();

const langBtn = document.createElement('button');
langBtn.className = 'lang-toggle';
langBtn.setAttribute('aria-label', 'Toggle Language');
toggleGroup.appendChild(langBtn);

function applyLanguage(lang, animate) {
    currentLang = lang;
    root.lang = lang === 'pt' ? 'pt-BR' : 'en';
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!t[key]) return;
        el.innerHTML = t[key];
        if (animate) { el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap'); }
    });
    langBtn.textContent = lang === 'pt' ? 'EN' : 'PT';
    try { localStorage.setItem('lang', lang); } catch (e) {}
    renderPresence();
}

langBtn.addEventListener('click', () => applyLanguage(currentLang === 'pt' ? 'en' : 'pt', true));

// Status ao vivo: o último push público no GitHub, no formato do claude-discord-presence
const presence = {
    card: document.querySelector('[data-presence]'),
    title: document.querySelector('[data-p-title]'),
    repo: document.querySelector('[data-p-repo]'),
    msg: document.querySelector('[data-p-msg]'),
    timeRow: document.querySelector('[data-p-time-row]'),
    time: document.querySelector('[data-p-time]'),
    video: document.querySelector('[data-p-video]'),
    state: null,
    mood: 'typing'
};

const pad = n => String(n).padStart(2, '0');

function renderPresence() {
    const t = translations[currentLang];
    const s = presence.state;
    if (!s) {
        [presence.title.textContent, presence.repo.textContent, presence.msg.textContent] = t.presenceFallback;
        return;
    }
    const secs = Math.max(0, Math.floor((Date.now() - s.at) / 1000));
    const mood = secs < 3 * 3600 ? 'typing' : secs < 48 * 3600 ? 'building' : 'sleeping';
    if (mood !== presence.mood) {
        presence.mood = mood;
        const name = mood === 'typing' ? 'clawd-typing' : mood === 'building' ? 'clawd-building' : 'clawd-sleeping';
        presence.video.poster = `assets/${name}.jpg`;
        presence.video.src = `assets/${name}.mp4`;
        if (!reduceMotion) presence.video.play().catch(() => {});
    }
    presence.title.textContent = t.presenceStates[mood];
    presence.repo.textContent = `${s.repo} (${s.branch})`;
    presence.msg.textContent = s.msg;
    presence.time.textContent = secs < 86400
        ? `${t.ago} ${pad(Math.floor(secs / 3600))}:${pad(Math.floor(secs / 60) % 60)}:${pad(secs % 60)}${currentLang === 'en' ? ' ago' : ''}`
        : t.days(Math.floor(secs / 86400));
    presence.timeRow.hidden = false;
    if (s.url) presence.card.href = s.url;
}

async function loadPresence() {
    // ponytail: 2 chamadas sem token por visita; o limite do GitHub é 60/h por IP, cache de 5 min na sessão
    let s;
    try { s = JSON.parse(sessionStorage.getItem('presence2') || 'null'); } catch (e) {}
    if (!s || Date.now() - s.fetched > 5 * 60 * 1000) {
        const repos = await (await fetch('https://api.github.com/users/gabrielhom/repos?sort=pushed&per_page=5')).json();
        const repo = repos.find(r => !r.fork && r.name !== 'gabrielhom.github.io');
        const commits = await (await fetch(`https://api.github.com/repos/gabrielhom/${repo.name}/commits?per_page=1`)).json();
        s = {
            repo: repo.name,
            branch: repo.default_branch,
            msg: commits[0].commit.message.split('\n')[0],
            at: Date.parse(commits[0].commit.committer.date),
            url: commits[0].html_url,
            fetched: Date.now()
        };
        try { sessionStorage.setItem('presence2', JSON.stringify(s)); } catch (e) {}
    }
    presence.state = s;
    renderPresence();
    setInterval(renderPresence, 1000);
}

applyLanguage(currentLang);
loadPresence().catch(() => {});  // sem rede ou sem cota: fica o card estático

// Vídeos: sem autoplay para quem pede menos movimento
if (reduceMotion) document.querySelectorAll('video').forEach(v => { v.removeAttribute('autoplay'); v.pause(); });

// Bonzi: chega surfando quando o painel aparece, acena, pisca de vez em quando e reage ao clique.
// Mesmo algoritmo do Microsoft Agent: quadros com duração, ramificação aleatória com peso e caminho de saída.
const stage = document.querySelector('[data-bonzi]');
if (stage && !reduceMotion && 'IntersectionObserver' in window) {
    let agent, anim, idx, prev, exiting, timer, onEnd;
    const layers = [0, 1].map(() => {
        const d = document.createElement('div');
        d.className = 'bonzi-layer';
        stage.appendChild(d);
        return d;
    });

    const draw = f => {
        if (!f.i || !f.i.length) f = agent.anims.RestPose.frames[0];
        layers.forEach((l, i) => {
            const im = f.i[i];
            l.style.visibility = im ? 'visible' : 'hidden';
            if (im) l.style.backgroundPosition = `${im[0] / (agent.atlas[0] - agent.size[0]) * 100}% ${im[1] / (agent.atlas[1] - agent.size[1]) * 100}%`;
        });
    };

    const next = () => {
        const f = anim.frames[idx];
        if (exiting && f.x != null) return f.x;
        if (f.b) {
            let r = Math.random() * 100;
            for (const [frame, weight] of f.b) { if (r <= weight) return frame; r -= weight; }
        }
        return idx + 1;
    };

    const finish = () => { const done = onEnd; onEnd = null; if (done) done(); };

    const step = () => {
        const last = idx >= anim.frames.length - 1;
        // animações com saída: o último quadro é só um marcador; dali o Agent volta pelo exitBranch do quadro anterior
        if (last && anim.exit && !exiting && prev != null) {
            exiting = true;
            if (anim.frames[prev].x == null) return finish();
            idx = anim.frames[prev].x;
            return step();
        }
        const f = anim.frames[idx];
        // o Show começa com quadros vazios: o Bonzi ainda não chegou
        if (anim === agent.anims.Show && (!f.i || !f.i.length)) layers.forEach(l => { l.style.visibility = 'hidden'; });
        else draw(f);
        if (last) return finish();
        timer = setTimeout(() => { prev = idx; idx = Math.min(next(), anim.frames.length - 1); step(); }, Math.max(10, f.d));
    };

    const play = (name, done) => { clearTimeout(timer); anim = agent.anims[name]; idx = 0; prev = null; exiting = false; onEnd = done; step(); };
    const idle = () => { timer = setTimeout(() => play('Blink', idle), 3000 + Math.random() * 5000); };

    const io = new IntersectionObserver(async entries => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        try { agent = await (await fetch('assets/bonzi-agent.json')).json(); } catch (e) { return; }
        stage.classList.add('is-live');
        play('Show', () => play('Wave', idle));
        stage.addEventListener('click', () => play(Math.random() < 0.5 ? 'Pleased' : 'Wave', idle));
    }, { threshold: 0.5 });
    io.observe(stage);
}

// Entradas: uma vez, quando a seção aparece
const revealTargets = document.querySelectorAll('.panel, [data-reveal]');
if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
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
