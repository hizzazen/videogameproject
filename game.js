// BETTER THAN YESTERDAY - game.js
// Shared state + card database

const Game = {

  save(data) {
    localStorage.setItem('lifeRoguelike', JSON.stringify(data));
  },

  load() {
    const raw = localStorage.getItem('lifeRoguelike');
    return raw ? JSON.parse(raw) : null;
  },

  init() {
    return {
      character: {
        name: 'Hero',
        gender: 'male',
        hair: 0,
        skin: 0,
        armour: 0
      },
      selectedTasks: [],
      completedTasks: [],
      currentTaskIndex: 0,
      cards: [],
      playerHP: 100,
      bossHP: 100,
      boss: 'toad',
      fightOutcome: null,
      reward: null
    };
  },

  get() {
    return this.load() || this.init();
  },

  update(changes) {
    const state = this.get();
    const updated = Object.assign(state, changes);
    this.save(updated);
    return updated;
  },

  reset() {
    localStorage.removeItem('lifeRoguelike');
  },

  // Pick a random card from the pool
  pickCard(taskId, outcome) {
    const pool = CARDS[taskId]?.[outcome];
    if (!pool || pool.length === 0) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }

};

// CARD DATABASE
const CARDS = {

  // 1. COOK A MEAL
  cook: {
    good: [
      {
        id: 'cook_good_attack',
        name: "Searing Blade",
        type: 'attack',
        emoji: '⚔️',
        flavour: 'Hot pan. Hotter temper. The boss is not ready.',
        effectText: 'Deal 38 damage. Take 10 damage.',
        effect: { damage: 38, selfDmg: 10 }
      },
      {
        id: 'cook_good_heal',
        name: "Well Fed",
        type: 'heal',
        emoji: '💚',
        flavour: 'A real meal. A real hero. Restored and dangerous.',
        effectText: 'Deal 35 damage. Restore 20 HP.',
        effect: { damage: 35, heal: 20 }
      },
      {
        id: 'cook_good_block',
        name: "Master Chef's Guard",
        type: 'block',
        emoji: '🛡️',
        flavour: 'Three Michelin stars. Zero mercy. Impenetrable technique.',
        effectText: 'Deal 35 damage. Block 12 damage.',
        effect: { damage: 35, block: 12 }
      }
    ],
    bad: [
      {
        id: 'cook_bad_attack',
        name: "IT'S BURNT",
        type: 'attack',
        emoji: '⚔️',
        flavour: 'Gordon Ramsay is weeping somewhere.',
        effectText: 'Deal 10 damage. Take 18 damage.',
        effect: { damage: 10, selfDmg: 18 }
      },
      {
        id: 'cook_bad_heal',
        name: "Soggy Attempt",
        type: 'heal',
        emoji: '💚',
        flavour: 'You ate it anyway. It was fine. Kind of.',
        effectText: 'Deal 8 damage. Restore 5 HP.',
        effect: { damage: 8, heal: 5 }
      },
      {
        id: 'cook_bad_block',
        name: "Sad Spatula",
        type: 'block',
        emoji: '🛡️',
        flavour: 'It refused to attack. Can you blame it?',
        effectText: 'Deal 8 damage. Block 10 damage.',
        effect: { damage: 8, block: 10 }
      }
    ]
  },

  // 2. CLEAN YOUR ROOM
  clean: {
    good: [
      {
        id: 'clean_good_attack',
        name: "Vacuum of Doom",
        type: 'attack',
        emoji: '⚔️',
        flavour: "You didn't just clean. You annihilated.",
        effectText: 'Deal 38 damage. Take 10 damage.',
        effect: { damage: 38, selfDmg: 10 }
      },
      {
        id: 'clean_good_heal',
        name: "Fresh Start",
        type: 'heal',
        emoji: '💚',
        flavour: 'Clean sheets. Clean slate. Clean hero.',
        effectText: 'Deal 35 damage. Restore 20 HP.',
        effect: { damage: 35, heal: 20 }
      },
      {
        id: 'clean_good_block',
        name: "Organised Assault",
        type: 'block',
        emoji: '🛡️',
        flavour: 'Everything in its place. Including pain.',
        effectText: 'Deal 35 damage. Block 12 damage.',
        effect: { damage: 35, block: 12 }
      }
    ],
    bad: [
      {
        id: 'clean_bad_attack',
        name: "Sock of Mystery",
        type: 'attack',
        emoji: '⚔️',
        flavour: 'Origin unknown. Smell devastating.',
        effectText: 'Deal 12 damage. Take 20 damage.',
        effect: { damage: 12, selfDmg: 20 }
      },
      {
        id: 'clean_bad_heal',
        name: "Dusty Swing",
        type: 'heal',
        emoji: '💚',
        flavour: 'You found the weapon under three layers of clothes.',
        effectText: 'Deal 8 damage. Restore 5 HP.',
        effect: { damage: 8, heal: 5 }
      },
      {
        id: 'clean_bad_block',
        name: "Pile Toss",
        type: 'block',
        emoji: '🛡️',
        flavour: 'You threw the mess at the boss. Surprisingly effective.',
        effectText: 'Deal 10 damage. Block 10 damage.',
        effect: { damage: 10, block: 10 }
      }
    ]
  },

  // 3. EXERCISE
  exercise: {
    good: [
      {
        id: 'exercise_good_attack',
        name: "Power Set",
        type: 'attack',
        emoji: '⚔️',
        flavour: 'Your muscles remembered. The boss did not expect this.',
        effectText: 'Deal 38 damage. Take 8 damage.',
        effect: { damage: 38, selfDmg: 8 }
      },
      {
        id: 'exercise_good_heal',
        name: "Runner's High",
        type: 'heal',
        emoji: '💚',
        flavour: 'The endorphins hit. Everything is possible.',
        effectText: 'Deal 35 damage. Restore 20 HP.',
        effect: { damage: 35, heal: 20 }
      },
      {
        id: 'exercise_good_block',
        name: "Iron Guard",
        type: 'block',
        emoji: '🛡️',
        flavour: 'Stance locked. Core engaged. Terrifying.',
        effectText: 'Deal 35 damage. Block 15 damage.',
        effect: { damage: 35, block: 15 }
      }
    ],
    bad: [
      {
        id: 'exercise_bad_attack',
        name: "Pulled Something",
        type: 'attack',
        emoji: '⚔️',
        flavour: 'You stretched for approximately four seconds.',
        effectText: 'Deal 8 damage. Take 22 damage.',
        effect: { damage: 8, selfDmg: 22 }
      },
      {
        id: 'exercise_bad_heal',
        name: "Half a Lap",
        type: 'heal',
        emoji: '💚',
        flavour: 'You walked briskly. That counts. Probably.',
        effectText: 'Deal 10 damage. Restore 5 HP.',
        effect: { damage: 10, heal: 5 }
      },
      {
        id: 'exercise_bad_block',
        name: "Resting Block Face",
        type: 'block',
        emoji: '🛡️',
        flavour: "You didn't move much. You did look focused though.",
        effectText: 'Deal 8 damage. Block 12 damage.',
        effect: { damage: 8, block: 12 }
      }
    ]
  },

  // 4. STUDY
  study: {
    good: [
      {
        id: 'study_good_attack',
        name: "Focus Strike",
        type: 'attack',
        emoji: '⚔️',
        flavour: 'The cursor blinked. You blinked back. You won.',
        effectText: 'Deal 38 damage. Take 8 damage.',
        effect: { damage: 38, selfDmg: 8 }
      },
      {
        id: 'study_good_heal',
        name: "Deep Work",
        type: 'heal',
        emoji: '💚',
        flavour: 'Phone in another room. You became someone slightly frightening.',
        effectText: 'Deal 35 damage. Restore 20 HP.',
        effect: { damage: 35, heal: 20 }
      },
      {
        id: 'study_good_block',
        name: "Citation Shield",
        type: 'block',
        emoji: '🛡️',
        flavour: 'You backed every claim. Unassailable. Untouchable.',
        effectText: 'Deal 35 damage. Block 15 damage.',
        effect: { damage: 35, block: 15 }
      }
    ],
    bad: [
      {
        id: 'study_bad_attack',
        name: "Tab Spiral",
        type: 'attack',
        emoji: '⚔️',
        flavour: '37 tabs. One was useful. You closed it by mistake.',
        effectText: 'Deal 10 damage. Take 20 damage.',
        effect: { damage: 10, selfDmg: 20 }
      },
      {
        id: 'study_bad_heal',
        name: "Highlight Everything",
        type: 'heal',
        emoji: '💚',
        flavour: 'The whole page is yellow now. This is fine.',
        effectText: 'Deal 8 damage. Restore 5 HP.',
        effect: { damage: 8, heal: 5 }
      },
      {
        id: 'study_bad_block',
        name: "Comfort Reread",
        type: 'block',
        emoji: '🛡️',
        flavour: 'You read the intro again. Very safe. Very slow.',
        effectText: 'Deal 10 damage. Block 8 damage.',
        effect: { damage: 10, block: 8 }
      }
    ]
  },

  // 5. WIND-DOWN
  winddown: {
    good: [
      {
        id: 'winddown_good_attack',
        name: "Lights Out",
        type: 'attack',
        emoji: '⚔️',
        flavour: 'You were asleep by 10. The boss did not see it coming.',
        effectText: 'Deal 38 damage. Take 5 damage.',
        effect: { damage: 38, selfDmg: 5 }
      },
      {
        id: 'winddown_good_heal',
        name: "Full Rest",
        type: 'heal',
        emoji: '💚',
        flavour: 'The most powerful move in the game. Genuinely.',
        effectText: 'Deal 35 damage. Restore 25 HP.',
        effect: { damage: 35, heal: 25 }
      },
      {
        id: 'winddown_good_block',
        name: "Evening Ritual",
        type: 'block',
        emoji: '🛡️',
        flavour: 'Tea. Dim lights. Zero screens. Impenetrable.',
        effectText: 'Deal 35 damage. Block 14 damage.',
        effect: { damage: 35, block: 14 }
      }
    ],
    bad: [
      {
        id: 'winddown_bad_attack',
        name: "Doom Scroll",
        type: 'attack',
        emoji: '⚔️',
        flavour: 'Just five more minutes. That was three hours ago.',
        effectText: 'Deal 8 damage. Take 22 damage.',
        effect: { damage: 8, selfDmg: 22 }
      },
      {
        id: 'winddown_bad_heal',
        name: "Accidental Nap",
        type: 'heal',
        emoji: '💚',
        flavour: "You didn't mean to sleep. It's been 47 minutes.",
        effectText: 'Deal 10 damage. Restore 8 HP.',
        effect: { damage: 10, heal: 8 }
      },
      {
        id: 'winddown_bad_block',
        name: "Blue Light Special",
        type: 'block',
        emoji: '🛡️',
        flavour: 'You put on night mode. On every device. This is fine.',
        effectText: 'Deal 8 damage. Block 12 damage.',
        effect: { damage: 8, block: 12 }
      }
    ]
  }

};