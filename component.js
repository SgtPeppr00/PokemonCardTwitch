const pokemonData = [
    { name: 'Pikachu', type: 'Electric', hp: 60, icon: '⚡', color: '#ffd700' },
    { name: 'Charizard', type: 'Fire', hp: 180, icon: '🔥', color: '#ff6b35' },
    { name: 'Blastoise', type: 'Water', hp: 160, icon: '💧', color: '#4facfe' },
    { name: 'Venusaur', type: 'Grass', hp: 170, icon: '🌿', color: '#43e97b' },
    { name: 'Mewtwo', type: 'Psychic', hp: 190, icon: '🔮', color: '#a66cff' },
    { name: 'Gengar', type: 'Ghost', hp: 110, icon: '👻', color: '#6b5b95' },
    { name: 'Dragonite', type: 'Dragon', hp: 150, icon: '🐉', color: '#f8b500' },
    { name: 'Gyarados', type: 'Water', hp: 140, icon: '🌊', color: '#0089ba' },
    { name: 'Alakazam', type: 'Psychic', hp: 100, icon: '🧠', color: '#9b59b6' },
    { name: 'Machamp', type: 'Fighting', hp: 130, icon: '💪', color: '#c44569' },
    { name: 'Lapras', type: 'Ice', hp: 120, icon: '❄️', color: '#81cfe0' },
    { name: 'Snorlax', type: 'Normal', hp: 150, icon: '😴', color: '#95afc0' }
];

function adjustColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

function showCard() {
    const randomPokemon = pokemonData[Math.floor(Math.random() * pokemonData.length)];
    showSpecificCard(randomPokemon);
    showNotification(`You pulled ${randomPokemon.name}!`);
}

function showSpecificCard(pokemon) {
    const card = document.getElementById('mainCard');
    const attacks = [
        { name: 'Thunder Shock', damage: 30, desc: 'Flip a coin. If heads, the Defending Pokemon is Paralyzed' },
        { name: 'Fire Blast', damage: 120, desc: 'Discard an Energy from this Pokemon' },
        { name: 'Hydro Pump', damage: 90, desc: 'Does 10 more damage for each Water Energy attached' },
        { name: 'Solar Beam', damage: 100, desc: 'Heal 30 damage from this Pokemon' },
        { name: 'Psychic', damage: 80, desc: 'Does 10 more damage for each Energy attached to opponent' }
    ];

    const attack1 = attacks[Math.floor(Math.random() * attacks.length)];
    const attack2 = attacks[Math.floor(Math.random() * attacks.length)];

    card.innerHTML = `
        <div class="card-shine"></div>
        <div class="card-header">
            <div class="card-name">${pokemon.name}</div>
            <div class="card-hp">HP ${pokemon.hp}</div>
        </div>
        <div class="card-image-area" style="background: linear-gradient(135deg, ${pokemon.color} 0%, ${adjustColor(pokemon.color, -40)} 100%);">
            ${pokemon.icon}
        </div>
        <div class="card-type">${pokemon.type} Type</div>
        <div class="card-attack">
            <div class="attack-name">${attack1.name} <span class="attack-damage">${attack1.damage}</span></div>
            <div class="attack-description">${attack1.desc}</div>
        </div>
        <div class="card-attack">
            <div class="attack-name">${attack2.name} <span class="attack-damage">${attack2.damage}</span></div>
            <div class="attack-description">${attack2.desc}</div>
        </div>
        <div class="card-footer">
            <div class="card-rarity">★★★ ${Math.random() > 0.5 ? 'Rare Holo' : 'Ultra Rare'}</div>
            <div class="card-number">${String(Math.floor(Math.random() * 150) + 1).padStart(3, '0')}/165</div>
        </div>
    `;

    card.style.animation = 'none';
    setTimeout(() => {
        card.style.animation = 'cardFlip 0.6s ease-out';
    }, 10);
}

function toggleFavorite() {
    showNotification('Card added to favorites! ❤️');
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerHTML = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
