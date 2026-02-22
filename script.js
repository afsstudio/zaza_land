/* Game Constants */
const TILE_WIDTH = 640;
const TILE_HEIGHT = 360;
const ROWS = 5;
const COLS = 4;
const WORLD_WIDTH = COLS * TILE_WIDTH;
const WORLD_HEIGHT = ROWS * TILE_HEIGHT;
const CHAR_SPEED = 5; // Pixels per frame
const FOG_RADIUS_CHAR = 250;
const FOG_RADIUS_PAN = 350;

/* State */
let state = {
    char: { x: WORLD_WIDTH / 2 - 25, y: WORLD_HEIGHT / 2 - 40, vx: 0, vy: 0 },
    viewport: { x: 0, y: 0 },
    keys: { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false },
    dragging: false,
    dragStart: { x: 0, y: 0 },
    lastDrag: { x: 0, y: 0 },
    gold: [],
    collectedGold: 0,
    projects: [],
    regionsDiscovered: [false, false, false, false, false],
    isFollowing: true,
    unlockedSecrets: 0
};

/* Secret Content */
const secrets = [
    "Secret #1: I once designed a typeface based on my handwriting.",
    "Secret #2: I love restoring vintage furniture in my spare time.",
    "Secret #3: [Video Placeholder] Watch my design process.",
    "Secret #4: I collect vintage sci-fi comics.",
    "Secret #5: CONGRATULATIONS! You found all the gold!"
];

/* Elements */
const worldMap = document.getElementById('world-map');
const charEl = document.getElementById('character');
const fogCanvas = document.getElementById('fog-layer');
const fogCtx = fogCanvas.getContext('2d');
const minimapCanvas = document.getElementById('minimap');
const minimapCtx = minimapCanvas.getContext('2d');
const uiGold = document.getElementById('gold-counter');
const notifEl = document.getElementById('notification');
const tileContainer = document.getElementById('grid-container');

/* Initialization */
function init() {
    // Set canvas sizes
    fogCanvas.width = WORLD_WIDTH;
    fogCanvas.height = WORLD_HEIGHT;

    // Fill fog
    fogCtx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    fogCtx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    // Create Grid Tiles
    createTiles();

    // Spawn Collectibles & Projects
    spawnEntities();

    // Event Listeners
    setupInput();

    // Center viewport
    state.viewport.x = state.char.x - window.innerWidth / 2 + 25;
    state.viewport.y = state.char.y - window.innerHeight / 2 + 40;
    clampViewport();

    // Start Loop
    requestAnimationFrame(gameLoop);

    // Initial UI State
    updateSecretButtonState();
}

function createTiles() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const tile = document.createElement('div');
            tile.className = 'grid-tile';
            tile.style.width = `${TILE_WIDTH}px`;
            tile.style.height = `${TILE_HEIGHT}px`;
            tile.style.left = `${c * TILE_WIDTH}px`;
            tile.style.top = `${r * TILE_HEIGHT}px`;
            tile.style.position = 'absolute';
            // tile.innerText = ... (Text removed for cleaner look)
            tileContainer.appendChild(tile);
        }
    }
}

function spawnEntities() {
    // Gem Images
    const gemImages = [
        'Gems/Group_12.svg',
        'Gems/Group_13.svg',
        'Gems/Group_14.svg',
        'Gems/Group_15.svg'
    ];

    // Gems (1 per tile)
    for (let i = 0; i < 20; i++) {
        const r = Math.floor(i / COLS);
        const c = i % COLS;
        const x = c * TILE_WIDTH + Math.random() * (TILE_WIDTH - 100) + 50;
        const y = r * TILE_HEIGHT + Math.random() * (TILE_HEIGHT - 100) + 50;

        state.gold.push({ id: i, x, y, collected: false });

        const el = document.createElement('div');
        el.className = 'gold-pile';
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        el.id = `gold-${i}`;

        // Add Gem Image
        const img = document.createElement('img');
        img.src = gemImages[i % gemImages.length];
        el.appendChild(img);

        document.getElementById('collectibles').appendChild(el);
    }

    // Projects (Simplification: 5 projects)
    const projects = [
        { name: "KeyNavigator", description: "Work at KeyBank on navigation & wayfinding systems.", x: 400, y: 400 },
        { name: "Digital Adoption", description: "Driving user adoption of digital tools.", x: 1000, y: 600 },
        { name: "Digital Analytics", description: "Data-driven design & analytics work.", x: 1600, y: 1000 },
        { name: "PopTech", description: "Side projects & experiments.", x: 600, y: 1400 },
        { name: "Substack", description: "Writing & thought leadership.", x: 2000, y: 1500 }
    ];

    projects.forEach((p, i) => {
        state.projects.push(p);
        const el = document.createElement('div');
        el.className = 'project-marker';
        el.style.left = p.x + 'px';
        el.style.top = p.y + 'px';

        // Use Project SVG
        const img = document.createElement('img');
        img.src = 'Map_elements/Project.svg';
        img.alt = 'Project';
        el.appendChild(img);

        el.id = `project-${i}`;
        el.onclick = () => openModal(p);
        document.getElementById('project-markers').appendChild(el);
    });
}

function setupInput() {
    // Keyboard
    window.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();

        if (state.keys.hasOwnProperty(e.key) || state.keys.hasOwnProperty(e.code) || ['e', 'r'].includes(key)) {
            state.keys[e.key] = true;
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                state.isFollowing = true;
            }
            updateControlUI(e.key, true);
        }

        // Interaction E
        if (key === 'e') {
            checkProjectInteraction();
        }

        // Secret R
        if (key === 'r') {
            checkSecretInteraction();
        }
    });

    window.addEventListener('keyup', (e) => {
        if (state.keys.hasOwnProperty(e.key) || ['e', 'r'].includes(e.key.toLowerCase())) {
            state.keys[e.key] = false;
            updateControlUI(e.key, false);
        }
    });

    // Mouse Dragging (Panning)
    const container = document.getElementById('game-container');

    container.addEventListener('mousedown', (e) => {
        state.dragging = true;
        state.isFollowing = false; // Stop following character
        state.dragStart = { x: e.clientX, y: e.clientY };
        state.lastDrag = { x: state.viewport.x, y: state.viewport.y };
        container.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
        state.dragging = false;
        container.style.cursor = 'grab';
    });

    window.addEventListener('mousemove', (e) => {
        if (state.dragging) {
            const dx = e.clientX - state.dragStart.x;
            const dy = e.clientY - state.dragStart.y;
            state.viewport.x = state.lastDrag.x - dx;
            state.viewport.y = state.lastDrag.y - dy;

            // Constrain viewport
            clampViewport();
        }
    });

    // Touch support (basic)
    container.addEventListener('touchstart', (e) => {
        state.dragging = true;
        state.isFollowing = false;
        state.dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        state.lastDrag = { x: state.viewport.x, y: state.viewport.y };
    });

    container.addEventListener('touchmove', (e) => {
        if (state.dragging) {
            const dx = e.touches[0].clientX - state.dragStart.x;
            const dy = e.touches[0].clientY - state.dragStart.y;
            state.viewport.x = state.lastDrag.x - dx;
            state.viewport.y = state.lastDrag.y - dy;
            clampViewport();
            e.preventDefault();
        }
    });

    container.addEventListener('touchend', () => {
        state.dragging = false;
    });

    // UI Buttons (Click simulation)
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('touchstart', pressBtn); // Mobile
        btn.addEventListener('mousedown', pressBtn);  // Desktop

        function pressBtn(e) {
            e.preventDefault(); // Prevent ghost clicks
            const key = btn.dataset.key;
            state.keys[key] = true;
            state.isFollowing = true;

            if (key === 'e') checkProjectInteraction();
            if (key === 'r') checkSecretInteraction();
        }

        btn.addEventListener('touchend', releaseBtn);
        btn.addEventListener('mouseup', releaseBtn);

        function releaseBtn(e) {
            const key = btn.dataset.key;
            state.keys[key] = false;
        }
    });

    document.getElementById('about-btn').addEventListener('click', () => {
        openModal({ name: "About Me", description: "This is the portfolio of Aaron Simmons." });
    });

    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
        if (e.target.id === 'modal-overlay') closeModal();
    });
}

function updateControlUI(key, active) {
    // Map keys to IDs
    const map = {
        'ArrowUp': 'btn-up',
        'ArrowDown': 'btn-down',
        'ArrowLeft': 'btn-left',
        'ArrowRight': 'btn-right',
        'e': 'btn-e',
        'r': 'btn-r',
        'E': 'btn-e',
        'R': 'btn-r'
    };

    // Map IDs to File Base Names
    const fileMap = {
        'btn-up': 'Up_Arrow',
        'btn-down': 'Down_Arrow',
        'btn-left': 'Left_Arrow',
        'btn-right': 'Right_Arrow',
        'btn-e': 'E_Arrow',
        'btn-r': 'R_Arrow'
    };

    if (map[key]) {
        const id = map[key];
        const btn = document.getElementById(id);
        const baseName = fileMap[id];

        if (active) {
            btn.classList.add('active');
            // Swap to Selected Image
            btn.src = `Buttons_images/${baseName}.svg`;
        } else {
            btn.classList.remove('active');
            // Swap back to Unselected Image
            btn.src = `Buttons_images/${baseName}_unselected.svg`;
        }
    }
}

function clampViewport() {
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    state.viewport.x = Math.max(0, Math.min(state.viewport.x, WORLD_WIDTH - winW));
    state.viewport.y = Math.max(0, Math.min(state.viewport.y, WORLD_HEIGHT - winH));
}

function gameLoop() {
    // 1. Move Character
    let dx = 0;
    let dy = 0;
    if (state.keys.ArrowUp) dy -= CHAR_SPEED;
    if (state.keys.ArrowDown) dy += CHAR_SPEED;
    if (state.keys.ArrowLeft) dx -= CHAR_SPEED;
    if (state.keys.ArrowRight) dx += CHAR_SPEED;

    // Diagonal Normalization
    if (dx !== 0 && dy !== 0) {
        dx *= 0.707;
        dy *= 0.707;
    }

    state.char.x += dx;
    state.char.y += dy;

    // Clamp Character
    state.char.x = Math.max(0, Math.min(state.char.x, WORLD_WIDTH - 50));
    state.char.y = Math.max(0, Math.min(state.char.y, WORLD_HEIGHT - 80));

    // 2. Camera Follow
    if (state.isFollowing) {
        const targetX = state.char.x - window.innerWidth / 2 + 25;
        const targetY = state.char.y - window.innerHeight / 2 + 40;

        // Lerp
        state.viewport.x += (targetX - state.viewport.x) * 0.1;
        state.viewport.y += (targetY - state.viewport.y) * 0.1;

        clampViewport();
    }

    // 3. Update DOM Transforms
    worldMap.style.transform = `translate(${-state.viewport.x}px, ${-state.viewport.y}px)`;
    charEl.style.transform = `translate(${state.char.x}px, ${state.char.y}px)`;

    // Move Fog
    fogCanvas.style.transform = `translate(${-state.viewport.x}px, ${-state.viewport.y}px)`;

    // 4. Reveal Fog
    revealFog(state.char.x + 25, state.char.y + 40, FOG_RADIUS_CHAR);
    // Also reveal center of viewport (user dragging)
    revealFog(state.viewport.x + window.innerWidth / 2, state.viewport.y + window.innerHeight / 2, FOG_RADIUS_PAN);

    // 5. Update Minimap
    drawMinimap();

    // 6. Check Collisions (Gold)
    checkCollisions();

    requestAnimationFrame(gameLoop);
}

function revealFog(x, y, radius) {
    fogCtx.globalCompositeOperation = 'destination-out';
    fogCtx.beginPath();
    fogCtx.arc(x, y, radius, 0, Math.PI * 2);
    fogCtx.fill();
    fogCtx.globalCompositeOperation = 'source-over';

    // Check region discovery (simplified)
    const regionIdx = Math.floor(y / (WORLD_HEIGHT / 5));
}

function drawMinimap() {
    minimapCanvas.width = 150;
    minimapCanvas.height = 150;
    const ctx = minimapCtx;
    const scaleX = 150 / WORLD_WIDTH;
    const scaleY = 150 / WORLD_HEIGHT;

    // Clear Logic: We want to see the background image in CSS
    // So we just clear the rect.
    ctx.clearRect(0, 0, 150, 150);

    // Draw Viewport Rect
    ctx.strokeStyle = '#D3D3D3'; // Light Grey Stroke
    ctx.lineWidth = 2;
    ctx.strokeRect(state.viewport.x * scaleX, state.viewport.y * scaleY, window.innerWidth * scaleX, window.innerHeight * scaleY);

    // Draw Character Image
    const charImgElement = document.querySelector('#character img');
    if (charImgElement && charImgElement.complete) {
        // Draw image effectively as a dot but using the graphic
        // Scale it down significantly for the minimap
        const miniCharW = 15;
        const miniCharH = 25;
        const miniCharX = state.char.x * scaleX - miniCharW / 2;
        const miniCharY = state.char.y * scaleY - miniCharH / 2;

        ctx.drawImage(charImgElement, miniCharX, miniCharY, miniCharW, miniCharH);
    } else {
        // Fallback if image not loaded yet
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(state.char.x * scaleX, state.char.y * scaleY, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

function checkCollisions() {
    // Gold
    state.gold.forEach(g => {
        if (!g.collected) {
            const dist = Math.hypot(state.char.x - g.x, state.char.y - g.y);
            if (dist < 50) {
                collectGold(g);
            }
        }
    });
}

function checkProjectInteraction() {
    // Check if close to any project
    let nearbyProject = null;
    let minDist = 100; // Interaction radius

    state.projects.forEach(p => {
        const dist = Math.hypot(state.char.x - p.x, state.char.y - p.y);
        if (dist < minDist) {
            nearbyProject = p;
        }
    });

    if (nearbyProject) {
        openModal(nearbyProject);
    } else {
        // Optional: show feedback "Nothing to interact with"
        console.log("Too far from project");
    }
}

function checkSecretInteraction() {
    // Allow opening if at least 4 gold
    if (state.collectedGold >= 4) {
        // Determine which secrets are unlocked
        // 4 gold = 1 secret, 8 gold = 2 secrets...
        const unlockedCount = Math.floor(state.collectedGold / 4);
        const secretIndex = Math.min(unlockedCount, secrets.length) - 1;

        if (secretIndex >= 0) {
            openModal({
                name: "Secret Unlocked!",
                description: secrets[secretIndex] + `<br><br><small>Collect ${Math.max(0, (secretIndex + 2) * 4 - state.collectedGold)} more gold for the next secret.</small>`
            });
        }
    } else {
        // Feedback if not enough gold
        const needed = 4 - state.collectedGold;
        openModal({
            name: "Locked",
            description: `You need ${needed} more gold to unlock a secret!`
        });
    }
}

function collectGold(g) {
    g.collected = true;
    state.collectedGold++;
    uiGold.innerText = `${state.collectedGold}/20`;

    const el = document.getElementById(`gold-${g.id}`);
    if (el) el.remove(); // Remove from DOM

    // Check unlock
    updateSecretButtonState();
}

function updateSecretButtonState() {
    const btnR = document.getElementById('btn-r');
    if (state.collectedGold >= 4) {
        btnR.style.opacity = '1';
        btnR.style.filter = 'drop-shadow(0 0 5px gold)';
    } else {
        btnR.style.opacity = '0.5';
        btnR.style.filter = 'none';
    }
}

function openModal(data) {
    document.getElementById('modal-body').innerHTML = `<h2>${data.name}</h2><p>${data.description || "Coming soon..."}</p>`;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
}

// Start
init();
