// Pokemon Card Overlay - Standalone Demo

// Sample Pokemon data
const samplePokemon = [
    {
        name: 'Pikachu',
        species: 'Electric Mouse Pokemon',
        type: 'Electric',
        level: 25,
        rarity: 'Rare Holo',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        stats: { hp: 35, attack: 55, defense: 40, spAttack: 50, spDefense: 50, speed: 90 },
        abilities: [
            { name: 'Static', description: 'May paralyze opponents on contact' },
            { name: 'Lightning Rod', description: 'Draws in all Electric-type moves to boost Sp. Attack' }
        ]
    },
    {
        name: 'Charizard',
        species: 'Flame Pokemon',
        type: 'Fire',
        level: 36,
        rarity: 'Holo Rare',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
        stats: { hp: 78, attack: 84, defense: 78, spAttack: 109, spDefense: 85, speed: 100 },
        abilities: [
            { name: 'Blaze', description: 'Powers up Fire-type moves when HP is low' },
            { name: 'Solar Power', description: 'Boosts Sp. Atk in harsh sunlight but loses HP' }
        ]
    },
    {
        name: 'Blastoise',
        species: 'Shellfish Pokemon',
        type: 'Water',
        level: 36,
        rarity: 'Rare',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
        stats: { hp: 79, attack: 83, defense: 100, spAttack: 85, spDefense: 105, speed: 78 },
        abilities: [
            { name: 'Torrent', description: 'Powers up Water-type moves when HP is low' },
            { name: 'Rain Dish', description: 'Gradually restores HP in rain' }
        ]
    },
    {
        name: 'Mewtwo',
        species: 'Genetic Pokemon',
        type: 'Psychic',
        level: 70,
        rarity: 'Ultra Rare',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
        stats: { hp: 106, attack: 110, defense: 90, spAttack: 154, spDefense: 90, speed: 130 },
        abilities: [
            { name: 'Pressure', description: 'Forces opponents to expend more PP' },
            { name: 'Unnerve', description: 'Makes opponents too nervous to eat Berries' }
        ]
    },
    {
        name: 'Venusaur',
        species: 'Seed Pokemon',
        type: 'Grass',
        level: 32,
        rarity: 'Rare',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
        stats: { hp: 80, attack: 82, defense: 83, spAttack: 100, spDefense: 100, speed: 80 },
        abilities: [
            { name: 'Overgrow', description: 'Powers up Grass-type moves when HP is low' },
            { name: 'Chlorophyll', description: 'Boosts Speed stat in harsh sunlight' }
        ]
    },
    {
        name: 'Gengar',
        species: 'Shadow Pokemon',
        type: 'Ghost',
        level: 25,
        rarity: 'Holo Rare',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
        stats: { hp: 60, attack: 65, defense: 60, spAttack: 130, spDefense: 75, speed: 110 },
        abilities: [
            { name: 'Cursed Body', description: 'May disable moves that hit the Pokemon' },
            { name: 'Levitate', description: 'Gives immunity to Ground-type moves' }
        ]
    },
    {
        name: 'Dragonite',
        species: 'Dragon Pokemon',
        type: 'Dragon',
        level: 55,
        rarity: 'Ultra Rare',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
        stats: { hp: 91, attack: 134, defense: 95, spAttack: 100, spDefense: 100, speed: 80 },
        abilities: [
            { name: 'Inner Focus', description: 'Prevents the Pokemon from flinching' },
            { name: 'Multiscale', description: 'Reduces damage when HP is full' }
        ]
    },
    {
        name: 'Lucario',
        species: 'Aura Pokemon',
        type: 'Fighting',
        level: 30,
        rarity: 'Rare Holo',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png',
        stats: { hp: 70, attack: 110, defense: 70, spAttack: 115, spDefense: 70, speed: 90 },
        abilities: [
            { name: 'Steadfast', description: 'Boosts Speed when the Pokemon flinches' },
            { name: 'Inner Focus', description: 'Prevents the Pokemon from flinching' }
        ]
    }
];

let currentPokemonIndex = 0;

// Type icons
const typeIcons = {
    'Electric': '⚡',
    'Fire': '🔥',
    'Water': '💧',
    'Grass': '🌿',
    'Psychic': '🔮',
    'Fighting': '👊',
    'Dark': '🌙',
    'Dragon': '🐉',
    'Fairy': '✨',
    'Steel': '⚙️',
    'Normal': '⭐',
    'Ghost': '👻',
    'Ice': '❄️',
    'Poison': '☠️',
    'Rock': '🪨',
    'Ground': '🌍',
    'Bug': '🐛',
    'Flying': '🦅'
};

// Initialize overlay
function initOverlay() {
    const closeBtn = document.getElementById('overlayClose');
    const overlay = document.getElementById('cardOverlay');
    const backdrop = document.querySelector('.overlay-backdrop');
    
    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            nextPokemon();
        });
    }
    
    // Click backdrop to cycle through Pokemon
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            nextPokemon();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            nextPokemon();
        } else if (e.key === 'ArrowLeft') {
            previousPokemon();
        } else if (e.key === 'Escape') {
            // Optional: could hide overlay
        }
    });
    
    // Show first Pokemon
    showPokemon(currentPokemonIndex);
}

function showPokemon(index) {
    const pokemon = samplePokemon[index];
    
    // Update image
    const img = document.getElementById('overlayCardImage');
    if (img) {
        img.src = pokemon.imageUrl;
        img.alt = pokemon.name;
    }
    
    // Update name and species
    document.getElementById('overlayCardName').textContent = pokemon.name;
    
    // Update stats
    document.getElementById('overlayStat1').textContent = pokemon.stats.hp;
    document.getElementById('overlayStat2').textContent = pokemon.stats.attack;
    document.getElementById('overlayStat3').textContent = pokemon.stats.defense;
    document.getElementById('overlayStat4').textContent = pokemon.stats.spAttack;
    document.getElementById('overlayStat5').textContent = pokemon.stats.spDefense;
    document.getElementById('overlayStat6').textContent = pokemon.stats.speed;
    
    // Update type
    const typeIcon = typeIcons[pokemon.type] || '⭐';
    const typeEl = document.getElementById('overlayType');
    if (typeEl) {
        typeEl.innerHTML = `
            <span class="type-icon">${typeIcon}</span>
            <span class="type-name">${pokemon.type}</span>
        `;
        console.log('Updated type to:', pokemon.type);
    }
    
    // Update abilities
    const abilitiesEl = document.getElementById('overlayAbilities');
    if (abilitiesEl && pokemon.abilities) {
        abilitiesEl.innerHTML = pokemon.abilities.map(ability => `
            <div class="ability-item">
                <span class="ability-name">${ability.name}</span>
                <span class="ability-desc">${ability.description}</span>
            </div>
        `).join('');
        console.log('Updated abilities');
    }
    
    // Animate in
    const frame = document.querySelector('.overlay-frame');
    if (frame) {
        frame.style.animation = 'none';
        setTimeout(() => {
            frame.style.animation = 'overlayScale 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }, 10);
    }
}

function showTab(tabName) {
    const statsSec = document.getElementById('statsSection');
    const abilitiesSec = document.getElementById('abilitiesSection');
    const tabStats = document.getElementById('tabStats');
    const tabAbilities = document.getElementById('tabAbilities');

    if (tabName === 'stats') {
        statsSec.style.display = 'block';
        abilitiesSec.style.display = 'none';
        tabStats.classList.add('active');
        tabAbilities.classList.remove('active');
    } else {
        statsSec.style.display = 'none';
        abilitiesSec.style.display = 'block';
        tabStats.classList.remove('active');
        tabAbilities.classList.add('active');
    }
}

function nextPokemon() {
    currentPokemonIndex = (currentPokemonIndex + 1) % samplePokemon.length;
    showPokemon(currentPokemonIndex);
}

function previousPokemon() {
    currentPokemonIndex = (currentPokemonIndex - 1 + samplePokemon.length) % samplePokemon.length;
    showPokemon(currentPokemonIndex);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOverlay);
} else {
    initOverlay();
}

// Show instructions after 1 second
setTimeout(() => {
    console.log('%c🎮 Pokemon Card Overlay Demo', 'font-size: 20px; font-weight: bold; color: #FFCB05;');
    console.log('%c→ Click anywhere to see next Pokemon', 'font-size: 14px; color: #D4AF37;');
    console.log('%c← Use arrow keys to navigate', 'font-size: 14px; color: #D4AF37;');
    console.log('%c✕ Click X button for next card', 'font-size: 14px; color: #D4AF37;');
}, 1000);