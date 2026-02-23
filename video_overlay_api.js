// ════════════════════════════════════════════════════
//  POKEMON TCG TOURNAMENT OVERLAY — JS
//  Twitch Video Overlay Extension
// ════════════════════════════════════════════════════

// ── Match State ─────────────────────────────────────
const state = {
    round: 3,
    bestOf: 3,
    currentTurn: 'p1',   // 'p1' or 'p2'

    p1: {
        name: 'ASH',
        tag: 'World Finalist',
        prizes: [true, false, false, false, false, false], // true = taken
        activeName: 'Pikachu',
        activeImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        hpCur: 30,
        hpMax: 110,
        deck: 28,
        hand: 7,
    },

    p2: {
        name: 'RED',
        tag: 'Kanto Champion',
        prizes: [true, true, false, false, false, false],
        activeName: 'Charizard',
        activeImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
        hpCur: 180,
        hpMax: 250,
        deck: 34,
        hand: 5,
    }
};

// ── Twitch Extension Init ────────────────────────────
function initTwitch() {
    if (window.Twitch && window.Twitch.ext) {
        window.Twitch.ext.onAuthorized(function(auth) {
            console.log('[TCG Overlay] Twitch authorized. Channel:', auth.channelId);
        });

        // Optional: receive state updates via PubSub from your EBS
        window.Twitch.ext.listen('broadcast', function(target, contentType, message) {
            try {
                const data = JSON.parse(message);
                if (data.type === 'STATE_UPDATE') {
                    applyStateUpdate(data.payload);
                }
            } catch(e) {
                console.warn('[TCG Overlay] Could not parse PubSub message', e);
            }
        });
    } else {
        console.log('[TCG Overlay] Running in local mode (no Twitch ext)');
    }
}

// ── Apply a state patch from PubSub / config ─────────
function applyStateUpdate(patch) {
    // Deep-merge patch into state
    if (patch.round    !== undefined) state.round    = patch.round;
    if (patch.currentTurn !== undefined) state.currentTurn = patch.currentTurn;
    if (patch.p1) Object.assign(state.p1, patch.p1);
    if (patch.p2) Object.assign(state.p2, patch.p2);
    render();
}

// ── Render ───────────────────────────────────────────
function render() {
    renderPlayer('p1', state.p1);
    renderPlayer('p2', state.p2);
    renderCenter();
    renderTurn();
}

function renderPlayer(id, data) {
    // Name / tag
    setText(`${id}-name`, data.name);
    setText(`${id}-tag`,  data.tag);

    // Avatar & active image
    setImg(`${id}-avatar img`, data.activeImg);
    setImg(`${id}-active-img`,  data.activeImg);

    // Active pokemon
    setText(`${id}-active-name`, data.activeName);

    // HP bar
    const pct = Math.max(0, Math.min(100, (data.hpCur / data.hpMax) * 100));
    const bar = document.getElementById(`${id}-hp-bar`);
    if (bar) {
        bar.style.width = pct + '%';
        bar.className = 'hp-bar-fill ' + hpClass(pct);
    }
    setText(`${id}-hp-cur`, data.hpCur);
    setText(`${id}-hp-max`, data.hpMax);

    // Prizes
    const prizeContainer = document.getElementById(`${id}-prizes`);
    if (prizeContainer) {
        const cards = prizeContainer.querySelectorAll('.prize-card');
        cards.forEach((card, i) => {
            card.classList.toggle('prize-taken', !!data.prizes[i]);
        });
    }

    // Counts
    setText(`${id}-deck`, data.deck);
    setText(`${id}-hand`, data.hand);
}

function renderCenter() {
    setText('round-num', state.round);
}

function renderTurn() {
    const isP1 = state.currentTurn === 'p1';
    const p1dot = document.getElementById('turn-p1-dot');
    const p2dot = document.getElementById('turn-p2-dot');
    const label = document.getElementById('turn-label');

    p1dot.classList.toggle('active-turn', isP1);
    p2dot.classList.toggle('active-turn', !isP1);

    if (label) {
        label.textContent = isP1
            ? (state.p1.name + "'s Turn")
            : (state.p2.name + "'s Turn");
    }
}

// ── Helpers ──────────────────────────────────────────
function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function setImg(selector, src) {
    // selector can be an id or "id img"
    const el = selector.includes(' ')
        ? document.querySelector('#' + selector.replace(' ', ' '))
        : document.getElementById(selector);
    if (el) el.src = src;
}

function hpClass(pct) {
    if (pct > 50) return 'hp-high';
    if (pct > 25) return 'hp-mid';
    if (pct > 10) return 'hp-low';
    return 'hp-critical';
}

// ── Boot ─────────────────────────────────────────────
function init() {
    initTwitch();
    render();
    console.log('%c ⚡ Pokemon TCG Tournament Overlay', 'font-size:16px; font-weight:bold; color:#D4AF37;');
    console.log('%c P1 (right) vs P2 (left) — Twitch Video Overlay', 'font-size:12px; color:#8B6F47;');
    console.log('%c Call applyStateUpdate({...}) to update live state', 'font-size:12px; color:#8B6F47;');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}