// * Timeline
// Monday - basic game mechanics
// -bombs 'aliens' move
// --can connect with a weapon
// --can be removed
// -can move player character
// -points occur
// -can take hits
// -can log loss of % to life
// -start button

// Tuesday - buttons
// -start button
// -reset buttons
// -pause buttons
// -can log health to bar
// -can log points to points

// Wednesday - modals
// -start modal
// -game over modal
// -side (krusty) burger menu for pause

// Thursday - animation
// -key frame animations
// -nice to have's of enemy character

// * Key
// bomb = "alien"/"space invader"
// weapon = player projectile

// Options
// Google Fonts
// -Luckiest Guy
// -Bangers
// -Slackey
// -Oregano
// -Satisfy
// -Cookie

// * Elements

// start button
// pause button
// restart button
// health bar
// points 
// instructions button

// weapons
// character
// enemy character
// bombs

// * Variables


// * Executions

// take a hit - function/if else
// -remove health percentage from health bar - see fundraiser project
// -animation - add and remove classes/keyframes
// --~character degredation past milestone percentages

// land a hit
// -remove bomb replace class with deadbomb to keep formation
// -animation - keyframes/gif placeholder for MVP
// --~add weapon progress

// fire (throw weapon)
// -on keyup of space bar
// -animation of weapon (mallet) with css keyframes (on key down? maybe not - try and see)
// ----
// weapon {
// animation-name: spin;
// animation-duration: 4000ms;
// animation-iteration-count: infinite;
// animation-timing-function: linear;
// }
// @keyframes spin {
//   from {
//       transform:rotate(0deg);
//   }
//   to {
//       transform:rotate(360deg);
//   }
// }
// ----
// ! track progress across row (cell.row?)
// --currentpos to cell row length unless (if) bomb and weapon in same class (else) then blow bomb up and replace with 'deadbomb' class
// -weapon will have quicker setInterval to track across screen quicker
// -if bomb and weapon are in same classList then remove bomb
// -multiple weapons can be flying.
// ----
// if (cell.classList.contains('enemy' && 'weapon')) {
//   cell.classList.remove('enemyImg')
//   cell.classList.add('explosionGif')
// }


// player character
// -no key or key up, stop and bobbing in place animation
// -key down running up and down animation - keyframes

// ! bombs tracking across screen towards player character (scratchy)
// -need to keep track of all rows and columns
// --add class to cell when bomb present
// --when bomb removed add 'deadbomb' class to keep space
// ! --when a bomb/many bombs (contains class) at top or bottom of column connect with border, move left towards player
// --will have it's own set interval speed
// -- have end point to set off game over
// --~increase speed slightly as moves closer
// --~increase speed if multiple levels
// --~enemy character throw extra bombs at intervals from random locations. Can an image pass over a background image?

// enemy character (if there's time)
// -random run up and down and random stops
// - ability to throw bombs at intervals
// - could take damage, needs 3 hits, extra points

// intro to game modal
// window event
// -contains:
// --title
// --instructions/rules
// --keys to press
// --- up, down, left, right, space to fire
// --point system
// --- 50 points per bomb
// ---~ if we have enemy character would take 3 hits to kill, 100 points a hit
// --current high score
// --- pull from Local Storage
// --start game button
// --- uses same function for start button

// game over
// -when health gets to 0
// - when enemies reach end point
// -window event
// -modal pop up with final score 
// --- const final score from innerText and add to innerText in modal
// -have play again button - same functionality as reset button
// --- event listener on button
// - wipe scores, reset health, reset players and enemies
// -display high score
// --- const highscore and add to innerText
// --~include how many bombs you hit?
// -exit button - prompts intro to game modal


// * Grid

// ! set up a game grid 11H x 15W
// -character has 2 deep but full height on the left
// -bombs have middle of grid moving right to left and up and down
// -enemy character has 1 deep full height on the right
// ----
// const grid = document.querySelector('.grid')
// const cells = []
// const width = 15
// const cellCount = width * width
// function createGrid() {
//   for (let i = 0; i < cellCount; i++) {
//     const cell = document.createElement('div')
//     // assigns numbers to all cells
//     cell.innerText = i
//     // means you can keep a reference later on
//     cell.id = i
//     // creates grid
//     cell.style.width = `${100 / width}%`
//     cell.style.height = `${100 / width}%`
//     grid.append(cell)
//     // means you can have an array to work with []
//     cells.push(cell)
//   }
// }
//// on page load
// createGrid()

// * Events

// start game button
// -on intro to game modal
// -on game over modal
// -resets points to 0
// -health bar to full (animation on load)
// -resets bombs
// -start at level 1
// -un-disables pause and reset buttons
// -character starts in the middle
// --~start 3,2,1 for player
// --~enemy character starts in middle

// ! pause button - nice to have
// -stops everything in current state - characters, bombs, weapons, disable buttons
// -pause button becomes unpause/play on button. Change inner text of button.
// -opens overlay menu?

// restart button
// -same functions as start button.

// keypress events
// -space bar to fire
// -up, down, left, right

// instructions button
// -same as pause button
// -pop out burger menu, 1/3 to 1/2 of screen, has same info as intro to game modal

// * Page Load

// create grid
// ! local storage high scores - nice to have
// intro to game modal - window event
// favicon



// * Instructions

// Welcome to the Itchy and Scratchy Battle Royale
// The aim of the game is to destroy as much as Itchy can throw at you before you become Poochie chow
// 