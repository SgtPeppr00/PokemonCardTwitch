// ════════════════════════════════════════════════════
//  POKEMON TCG TOURNAMENT OVERLAY — JS
// ════════════════════════════════════════════════════

const POKEMON = {
    pikachu:   { name: 'Pikachu',   hp: 60,  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' },
    charizard: { name: 'Charizard', hp: 250, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png' },
    blastoise: { name: 'Blastoise', hp: 200, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png' },
    venusaur:  { name: 'Venusaur',  hp: 190, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png' },
    mewtwo:    { name: 'Mewtwo',    hp: 230, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png' },
    gengar:    { name: 'Gengar',    hp: 130, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png' },
    dragonite: { name: 'Dragonite', hp: 220, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png' },
    lucario:   { name: 'Lucario',   hp: 150, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png' },
    eevee:     { name: 'Eevee',     hp: 60,  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png' },
    snorlax:   { name: 'Snorlax',   hp: 320, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png' },
    gyarados:  { name: 'Gyarados',  hp: 180, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png' },
    alakazam:  { name: 'Alakazam',  hp: 120, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png' },
};

const matchData = {
    p1: {
        active: POKEMON.pikachu,
        bench: [POKEMON.charizard, POKEMON.blastoise, POKEMON.venusaur, POKEMON.lucario, POKEMON.eevee],
    },
    p2: {
        active: POKEMON.mewtwo,
        bench: [POKEMON.gengar, POKEMON.dragonite, POKEMON.snorlax, POKEMON.gyarados, POKEMON.alakazam],
    }
};

function renderBench(player) {
    const data = matchData[player];

    const activeEl = document.getElementById(`active-${player}`);
    if (activeEl) activeEl.innerHTML = buildCardHTML(data.active);

    const benchEl = document.getElementById(`bench-${player}-cards`);
    if (benchEl) {
        benchEl.innerHTML = data.bench
            .map(p => `<div class="bench-card">${buildCardHTML(p)}</div>`)
            .join('');
    }
}

function buildCardHTML(pokemon) {
    return `
        <div class="card-inner">
            <img class="card-sprite" src="${pokemon.img}" alt="${pokemon.name}">
            <div class="card-overlay-info">
                <span class="card-name-tag">${pokemon.name}</span>
                <span class="card-hp-tag">${pokemon.hp} HP</span>
            </div>
        </div>
    `;
}

function applyStateUpdate(patch) {
    if (patch.p1) Object.assign(matchData.p1, patch.p1);
    if (patch.p2) Object.assign(matchData.p2, patch.p2);
    renderBench('p1');
    renderBench('p2');
}

function init() {
    if (window.Twitch?.ext) {
        window.Twitch.ext.onAuthorized(auth => {
            console.log('[TCG Overlay] Authorized. Channel:', auth.channelId);
        });
        window.Twitch.ext.listen('broadcast', (target, contentType, message) => {
            try {
                const data = JSON.parse(message);
                if (data.type === 'STATE_UPDATE') applyStateUpdate(data.payload);
            } catch(e) {}
        });
    }
    renderBench('p1');
    renderBench('p2');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}