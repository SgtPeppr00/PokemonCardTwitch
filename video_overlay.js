// ════════════════════════════════════════════════════
//  POKEMON TCG TOURNAMENT OVERLAY — JS
// ════════════════════════════════════════════════════

// ── Card Detail ───────────────────────────────────────
function showDetail(player, pokemon) {
    const placeholder = document.querySelector(`#detail-${player} .detail-placeholder`);
    const content     = document.getElementById(`detail-${player}-content`);
    const img         = document.getElementById(`detail-${player}-img`);
    const name        = document.getElementById(`detail-${player}-name`);
    const hp          = document.getElementById(`detail-${player}-hp`);

    img.src          = pokemon.img;
    name.textContent = pokemon.name;
    hp.textContent   = pokemon.hp + ' HP';

    placeholder.classList.add('hidden');
    content.classList.remove('hidden');
    content.classList.add('visible');
}

function closeDetail(player) {
    const placeholder = document.querySelector(`#detail-${player} .detail-placeholder`);
    const content     = document.getElementById(`detail-${player}-content`);

    content.classList.remove('visible');
    content.classList.add('hidden');
    placeholder.classList.remove('hidden');
}

// ── Twitch ────────────────────────────────────────────
function applyStateUpdate(patch) {
    // Reserved for future PubSub state updates
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
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}