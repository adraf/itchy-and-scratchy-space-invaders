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

// Use a Class for player!
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
// -character has 2 deep but full height on the left //
// -bombs have middle of grid moving right to left and up and down /
// -enemy character has 1 deep full height on the right
// ----
const grid = document.querySelector('.game-grid')
const cells = []
const bombs = []
let bombCell
// const gameCell = document.querySelectorAll('.bomb')
const width = 16
const height = 11
const cellCount = width * height
// finds middle to start with odd numbers
const startplayerPos = Math.floor(height / 2) * width
let currentPlayerPos = startplayerPos
// sets amount of bombs to start game with
const bombsHeightAmount = 9
const bombsWidthAmount = 3
// TODO fix to get central somehow no matter board size
const startBombPos = bombsHeightAmount * bombsWidthAmount
let currentBombPos = startBombPos


function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    // assigns numbers to all cells
    cell.innerText = i
    // means you can keep a reference later on
    cell.id = i
    // creates grid
    cell.style.width = `${100 / width}%`
    cell.style.height = `${100 / height}%`
    grid.append(cell)
    // means you can have an array to work with []
    cells.push(cell)
  }
  addPlayer(currentPlayerPos)
  addBombs(currentBombPos)
}
createGrid()

// player character
// -no key or key up, stop and bobbing in place animation
// -key down running up and down animation - keyframes

// add player
function addPlayer() {
  cells[currentPlayerPos].classList.add('player')
}
// stops player repeating on move
function removePlayer() {
  cells[currentPlayerPos].classList.remove('player')
}

//add one bomb
// function addBombs() {
//   cells[currentBombPos].classList.add('bomb')
//   cells[currentBombPos + width].classList.add('bomb')
// }

// add all bombs

function addBombs() {
  for (let i = currentBombPos; i < width * bombsHeightAmount + startBombPos; i++) {
    // TODO tidy up
    if ((i % width === width - 2) || (i % width === width - 3) || (i % width === width - 4)) {
      // if () {
      
      bombCell = cells[i]
      bombCell.classList.add('bomb')  
      bombs.push(bombCell)    
    }
  }
}

// width - (bombsWidthAmount + 1) to allow for extra row / then to nextElementSibling, repeat bombsWidth amount times - 1, then skip by 'width' amount and repeat
// ((height - bombsHeightAmount) / 2) + to attempt at center

function removeBombs() {
  for (let i = 0; i < cellCount; i++) {
    bombCell = cells[i]
    bombCell.classList.remove('bomb')
  }
}

// console.log((bombs[0].nextElementSibling.innerHTML))

bombs.forEach(function(bomb) {
  if (bomb.classList.contains('bomb') === true) {
    currentBombPos -= width
    // console.log(bomb.id)
  }
  addBombs()
})

function keyPress(event) {
  const key = event.code
  removePlayer()
  // stop scratchy going up off the page
  if (key === 'ArrowUp' && currentPlayerPos >= width) {
    currentPlayerPos -= width
  } else if (key === 'ArrowDown' && currentPlayerPos + width < cells.length) {
    currentPlayerPos += width
  } else if (key === 'ArrowLeft' && currentPlayerPos % width !== 0) {
    currentPlayerPos--
  } else if (key === 'ArrowRight' && currentPlayerPos % width !== (width - width + 1)){
    currentPlayerPos++
  }
  addPlayer()
}



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
document.addEventListener('keyup', keyPress)

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
