# Zaza Land - Figma Make Guidelines & Specifications

This document contains detailed specifications for refining the Zaza Land portfolio experience. Use these guidelines in follow-up prompts to iterate on specific features.

---

## 🎨 Visual Design System

### Color Palette
- **Primary:** Black and white with grayscale shading
- **Accent:** Gold/yellow for collectibles (#FFD700 or similar)
- **Fog of War:** Dark overlay with 70-80% opacity
- **Revealed Areas:** Full color/brightness from comic backgrounds
- **Clickables:** Subtle shimmer/glow effect (iridescent quality)

### Typography
**Primary Font Options (hand-drawn style):**
- Indie Flower
- Shadows Into Light
- Permanent Marker
- Caveat
- Architects Daughter

**Font Usage:**
- Headings: 24-32px
- Body: 16-18px
- UI Labels: 14px
- Region Names: 36-48px (discovery announcements)

### Animation Principles
- **Easing:** Use cubic-bezier for smooth, natural motion
- **Duration:** 200-400ms for interactions, 800-1200ms for transitions
- **Character Movement:** 8-12 frame walk cycle, looping
- **Gold Collection:** Pop/bounce effect (scale 1 → 1.3 → 0 with fade)
- **Shimmer Effect:** Continuous subtle wave animation on interactive elements

---

## 🗺️ World Map Structure

### Grid Layout
- **Total Tiles:** 20 (arranged 4 columns × 5 rows)
- **Tile Aspect Ratio:** 16:9
- **Tile Dimensions:** Suggested 640px × 360px (scales responsively)
- **Total World Size:** 2560px wide × 1800px tall
- **Viewport:** Should show ~2-3 tiles at a time (requires panning to explore)

### Regional Boundaries
The 20 tiles are distributed across 5 regions (4 tiles each):

**Region 1: KeyNavigator** (Tiles 1-4)
- Description: Work at KeyBank on navigation & wayfinding systems
- Visual Theme: TBD based on comic aesthetic
- Projects: 4 clickable elements

**Region 2: Digital Adoption** (Tiles 5-8)
- Description: Driving user adoption of digital tools
- Visual Theme: TBD
- Projects: 4 clickable elements

**Region 3: Digital Analytics** (Tiles 9-12)
- Description: Data-driven design & analytics work
- Visual Theme: TBD
- Projects: 4 clickable elements

**Region 4: PopTech** (Tiles 13-16)
- Description: Side projects & experiments
- Visual Theme: TBD
- Projects: 4 clickable elements

**Region 5: Substack** (Tiles 17-20)
- Description: Writing & thought leadership
- Visual Theme: TBD
- Projects: 4 clickable elements

---

## 🎮 Interaction Mechanics

### Navigation System

**Method 1: Drag to Pan**
- Two-finger drag on trackpad
- Single-finger drag with spacebar held
- Smooth momentum/inertia on release
- Boundary constraints (can't pan beyond world edges)

**Method 2: Character Movement**
- Arrow keys move character in 8 directions (N, NE, E, SE, S, SW, W, NW)
- Character walks at ~100px/second
- Viewport follows character with smooth camera tracking
- Walking reveals fog of war in character's vicinity

### Fog of War System

**Reveal Mechanics:**
- Circular reveal radius around pan center (~300px)
- Circular reveal radius around character (~200px)
- Revealed areas stay revealed (persistent state)
- Progressive reveal as viewport moves

**Discovery Notifications:**
- Trigger when 50%+ of region tiles are revealed
- Animated popup: Region name + decorative border
- Display for 3-4 seconds, then fade
- Can be dismissed early with click/tap
- Only shows once per region per session

### Collectible System

**Gold Pile Placement:**
- Exactly 1 gold pile per tile (20 total)
- Randomized position within each tile (but not too close to edges)
- Only visible once fog of war is lifted
- Visual: Small pixelated gold coin stack (8-bit style)

**Collection Behavior:**
- Click/tap to collect
- Bounce animation + particle effect
- Add to counter (display: "Gold: 12/20")
- Persistent state across session

**Secret Unlock System:**
- Every 4 gold collected enables "R" key
- Visual indicator: "R" button glows/pulses when unlocked
- Pressing "R" shows modal with:
  - Secret fact about you (text)
  - OR embedded video
  - "Close" button
- Can trigger multiple times (at 4, 8, 12, 16, 20 gold)
- Each unlock shows different content

### Clickable Project Elements

**Visual Treatment:**
- Shimmery, liquid-like quality (animated gradient or wave effect)
- Glow on hover
- Scale slightly on hover (1 → 1.05)
- Distinct from gold collectibles

**Interaction:**
- Click/tap to open modal
- Modal layout: 3-column responsive grid
- Content structure:
  - Column 1: Project title, dates, role
  - Column 2: Description, challenges, solutions
  - Column 3: Images, outcomes, links
- Modal has semi-transparent dark overlay behind it
- Close button (X) in top-right corner
- Click outside modal to close

---

## 🧍 Character Design & Animation

### Character Specifications
- **Size:** ~40-60px tall
- **Style:** Simple black and white line art (stick figure or minimal chibi)
- **Elements:**
  - Backpack (on back)
  - Walking stick (in hand)
  - Simple facial features (optional dots for eyes)

### Animation States
1. **Idle:** Gentle bob/breathing animation
2. **Walking (8 directions):**
   - 4-6 frame cycle per direction
   - Legs alternate, walking stick plants
   - Backpack bounces slightly
3. **Collecting Gold:** Brief celebration gesture (arms up)

---

## 🧭 UI Components

### Minimap (Upper Right)
- **Size:** 120-150px diameter circle
- **Content:**
  - Simplified top-down view of 4×5 grid
  - Explored tiles: lighter/visible
  - Unexplored: dark/hidden
  - Character position: small dot/marker
  - Current viewport: semi-transparent rectangle
- **Border:** Decorative hand-drawn circle border
- **Update:** Real-time as exploration progresses

### About Button
- **Position:** Directly below minimap (10-15px spacing)
- **Size:** ~100px wide × 36px tall
- **Style:** Hand-drawn button with text "About"
- **Click Action:** Opens modal with:
  - 4-sentence bio (placeholder: "I'm a Principal AI Designer at KeyBank...")
  - Contact info: Email, LinkedIn, Portfolio link
  - Same modal design as project modals
  - Close button

### On-Screen Controls
- **Position:** Bottom center or bottom left
- **Layout:**
  ```
  ↑
  ← ↓ →    [E] [R]
  ```
- **Styling:**
  - Mechanical keyboard key appearance
  - Black keycaps with white legends
  - Subtle shadow for depth
  - Keys press down visually when activated
- **Functionality:**
  - Arrows: Move character (can hold for continuous movement)
  - E: Interact (triggers project modals when near clickable)
  - R: View secrets (only active when gold threshold met)

### Gold Counter
- **Position:** Top left or near controls
- **Display:** "Gold: 12/20" or coin icon + "12/20"
- **Style:** Hand-drawn text bubble or label
- **Update:** Animates when gold collected (number pops/scales)

---

## 📱 Responsive Behavior

### Desktop (Primary Target)
- Viewport: 1920×1080 or 1440×900
- Shows 2-3 tiles visible at once
- Spacebar + drag for panning
- All keyboard controls functional
- Hover states on interactive elements

### Tablet
- Viewport: 768×1024 to 1024×768
- Two-finger drag/pinch for pan/zoom
- Touch controls replace keyboard (on-screen buttons)
- Tap to interact instead of "E" key

### Mobile (Secondary)
- Viewport: 375×667 to 414×896
- Single-finger drag to pan
- Minimap toggles to overlay (not always visible)
- Simplified animations for performance

---

## 🛠️ Technical Implementation Notes

### State Management
Track the following across user session:
- **Fog of War:** Boolean array for 20 tiles (revealed/hidden)
- **Gold Collection:** Boolean array for 20 gold piles (collected/not collected)
- **Regions Discovered:** Boolean array for 5 regions
- **Character Position:** {x, y} coordinates
- **Viewport Position:** {x, y} coordinates

### Performance Considerations
- Use CSS transforms for panning (GPU acceleration)
- Lazy-load project modal content
- Limit particle effects on mobile
- Use `will-change` CSS property for animated elements
- Debounce fog-of-war calculations

### Accessibility
- Keyboard navigation fully functional without mouse
- ARIA labels on interactive elements
- Focus indicators on clickable items
- Alt text for decorative elements
- Reduced motion option (disable animations)

---

## 📝 Content Placeholders

Until real content is provided, use these placeholders:

### Project Modals
**Title:** Project Name
**Description:** Lorem ipsum dolor sit amet, consectetur adipiscing elit. Detailed description of the challenge, approach, and outcomes.
**Images:** Placeholder rectangles (grey boxes with "Image")
**Links:** "View Case Study" (non-functional placeholder)

### About Modal
**Bio:** "I'm a Principal AI Designer at KeyBank, specializing in [area]. With a background in [background], I focus on creating [type of work]. My approach combines [methodology] to deliver [outcomes]."
**Contact:**
- Email: email@example.com
- LinkedIn: linkedin.com/in/username
- Portfolio: portfolio.com

### Secret Facts (R Key Unlocks)
At 4 gold: "Secret #1: [Fun fact about designer]"
At 8 gold: "Secret #2: [Fun fact about designer]"
At 12 gold: "Secret #3: [Video embed placeholder]"
At 16 gold: "Secret #4: [Fun fact about designer]"
At 20 gold: "Secret #5: CONGRATULATIONS! [Special message]"

---

## 🔄 Iteration Strategy for Figma Make

When refining the prototype, use these focused prompts:

1. **Improving Fog of War:** "Make the fog of war reveal smoother with a gradual fade-in effect. Increase reveal radius to 350px around character."

2. **Character Animation:** "Add a simple 4-frame walk cycle to the character. When arrow keys are pressed, animate the character walking in that direction."

3. **Gold Collection:** "Make gold collection feel more satisfying. Add a bounce animation, sparkle particles, and a 'ping' sound effect when collected."

4. **Shimmer Effect:** "The clickable project markers should have a continuous subtle shimmer effect - like light reflecting off liquid or glass."

5. **Modal Improvements:** "Make the project modals 3-column responsive layout. On mobile, stack columns vertically."

6. **Minimap Functionality:** "The minimap should show explored vs unexplored areas in real-time. Add character position as a dot."

7. **Region Discovery:** "When 50% of a region is uncovered, show an animated announcement with the region name."

---

## ✅ Testing Checklist

Before finalizing, verify:

- [ ] All 20 tiles are properly laid out in 4×5 grid
- [ ] Panning works smoothly with spacebar+drag
- [ ] Character responds to all arrow key directions
- [ ] Fog of war reveals progressively
- [ ] All 5 regions trigger discovery notifications
- [ ] All 20 gold piles are collectible
- [ ] Secret modals unlock at 4, 8, 12, 16, 20 gold
- [ ] "E" key opens project modals
- [ ] "R" key opens secret modals (when unlocked)
- [ ] About button opens bio modal
- [ ] Minimap updates in real-time
- [ ] Clickable elements have shimmer effect
- [ ] All modals can be closed
- [ ] State persists throughout session
- [ ] Responsive on desktop, tablet, mobile
- [ ] Performance is smooth (60fps)

---

**End of Guidelines**

Use this document as a reference when iterating on Zaza Land in Figma Make. Start with the initial prompt, then progressively refine features using specific sections from these guidelines.
