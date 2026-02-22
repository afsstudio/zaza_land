# Zaza Land - Build Prompt

Create an interactive portfolio world called "Zaza Land" - a game-like exploration experience inspired by unexplored RPG world maps.

## Core Concept
A scrollable world map made up of 20 tiles (4x5 grid, each tile 16:9 ratio) with fog-of-war mechanics. Users explore by dragging/panning to uncover hidden regions and discover projects.

## Visual Style
- Hand-drawn aesthetic (use uploaded comic images as tile backgrounds and style inspiration)
- Black and white linework with organic, sketchy qualities
- Handwritten font style (use a hand-drawn web font like "Indie Flower", "Shadows Into Light", or "Permanent Marker")
- Clickable elements have a shimmery, liquid, animated quality
- Small gold pile collectibles scattered throughout (pixelated/8-bit style)

## Navigation & Controls
**Two-finger drag or spacebar+hold to pan** across the world map
- Smooth dragging with momentum/easing
- The world should feel larger than the viewport

**On-screen keyboard-style controls:**
- Arrow keys (↑↓←→) for directional movement of character
- "E" key to interact with discovered projects
- "R" key to view collected secrets (unlocks every 4 gold pieces)

**Character:**
- Small black and white animated walking figure
- Carries a backpack and walking stick
- Walks in the direction of arrow key inputs
- Idle animation when stationary

## UI Elements
**Upper right corner:**
- Circular minimap showing explored vs unexplored areas
- "About" button below minimap → opens modal with 4-sentence bio + contact info

## Fog of War Exploration
- Map starts mostly obscured/darkened
- Areas reveal as user drags/pans or character walks there
- When new regions are uncovered, show a discovery animation with region name:
  1. KeyNavigator
  2. Digital Adoption
  3. Digital Analytics
  4. PopTech
  5. Substack

## Interactive Elements
**Clickable Project Markers:**
- Shimmery/liquid animated quality
- Click to open 3-column modal format
- Content TBD (placeholder text for now)

**Gold Collectibles:**
- One gold pile per grid tile (20 total)
- Click to collect with satisfying animation
- Counter shows collected/total
- Every 4 collected unlocks "R" key to reveal a secret fact/video modal

## Technical Notes
- Use the uploaded comic images as background textures for the 20 world tiles
- Ensure smooth performance despite complex interactions
- State management for: fog-of-war progress, gold collected, regions discovered
- Responsive design that works on desktop (primary) and touch devices

## Starting Instructions
Generate the initial world structure with:
1. The 4x5 grid layout (20 tiles at 16:9 each)
2. Pan/drag navigation
3. Basic fog-of-war that reveals on pan
4. Minimap in upper right
5. Character that can be moved with arrow controls
6. Placeholder UI for controls (E/R buttons, arrow keys)
7. At least 2-3 clickable project markers with modal popup
8. 5-8 gold piles to test collection mechanic

Use placeholder backgrounds for tiles initially - I'll refine with my comic images in follow-up prompts.