// * Timeline
// Monday - basic game mechanics /
// -bombs 'aliens' move /
// --can connect with a weapon /
// --can be removed /
// -can move player character /
// -points occur /
// -can take hits
// -can log loss of % to life /
// -start button

// Tuesday - buttons
// -start button
// -reset buttons
// -pause buttons
// -can log health to bar /
// -can log points to points /

// Wednesday - modals
// -start modal
// -game over modal
// -side (krusty) burger menu for pause

// Thursday - animation
// -key frame animations /
// -nice to have's of enemy character

// * Key Terms
// bomb = "alien"/"space invader"
// weapon = player projectile

// * Elements

// start button
// pause button
// restart button
// health bar /
// points /
// instructions button

// weapons /
// character /
// enemy character
// bombs /

// * Variables


// * Executions

// Use a Class for player! X
// take a hit - function/if else
// -remove health percentage from health bar - see fundraiser project /
// -animation - add and remove classes/keyframes /
// --~character degredation past milestone percentages

// land a hit /
// -remove bomb replace class with deadbomb to keep formation /
// -animation - keyframes/gif placeholder for MVP /
// --~add weapon progress to progress bar for power ups

// fire (throw weapon)
// -on keyup of space bar /
// -animation of weapon (mallet) with css keyframes (on key down? maybe not - try and see) /
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
// --currentpos to cell row length unless (if) bomb and weapon in same class (else) then blow bomb up and replace with 'deadbomb' class /
// -weapon will have quicker setInterval to track across screen quicker /
// -if bomb and weapon are in same classList then remove bomb /
// -multiple weapons can be flying. /
// ----
// if (cell.classList.contains('enemy' && 'weapon')) {
//   cell.classList.remove('enemyImg')
//   cell.classList.add('explosionGif')
// }


// ! bombs tracking across screen towards player character (scratchy)
// -need to keep track of all rows and columns X
// --add class to cell when bomb present /
// --when bomb removed add 'deadbomb' class to keep space /
// ! --when a bomb/many bombs (contains class) at top or bottom of column connect with border, move left towards player
// --will have it's own set interval speed /
// -- have end point to set off game over /
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
const width = 16
const height = 11
const cellCount = width * height
// finds middle to start with odd numbers
const startplayerPos = Math.floor(height / 2) * width
let currentPlayerPos = startplayerPos
const startEnemyPos = 95
let currentEnemyPos = startEnemyPos
// sets amount of bombs to start game with
const bombsHeightAmount = 9
const bombsWidthAmount = 3
let bombs = [28, 29, 30, 44, 45, 46, 60, 61, 62, 76, 77, 78, 92, 93, 94, 108, 109, 110, 124, 125, 126, 140, 141, 142, 156, 157, 158]
const endZone = [0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160]

let currentWeaponPos = startplayerPos
let pointsCounter = document.querySelector('#points-readout')
const healthProgress = document.querySelector('#health-bar')
const startBtn = document.querySelector('#startBtn')
const points = 20 
 
// ! start button not restart - change names
startBtn.addEventListener('click', function(event) {
  // stops space bar from reclicking button, moves focus away from button
  event.target.blur()
  createGrid()
  bombAnimation()
})


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
  addEnemy(currentEnemyPos)
  addEndZone()
  // don't need, otherwise it overwrites player
  // addWeapon(currentWeaponPos)
}
createGrid()

function addBombs() {
  bombs.forEach(bomb => {
    cells[bomb].classList.add('bomb')
  })
}

function removeBombs() {
  bombs.forEach(bomb => {
    cells[bomb].classList.remove('bomb')
  })
}

function addEndZone() {
  endZone.forEach(zone => {
    cells[zone].classList.add('endZone')
  })
}

// player character
// -on key or key up, stop and bobbing in place animation /
// -key down running up and down animation /

// add player
function addPlayer() {
  cells[currentPlayerPos].classList.add('player')
}
// stops player repeating on move
function removePlayer() {
  cells[currentPlayerPos].classList.remove('player')
}
//add weapon to screen on firing
function addWeapon(position) {
  cells[position].classList.add('weapon')
}
// removes weapon/stops weapon repeating on move
function removeWeapon(position) {
  cells[position].classList.remove('weapon')
}
// adds in player running gif
function addPlayerRun() {
  cells[currentPlayerPos].classList.add('playerRun')
}
//removes player running gif
function removePlayerRun() {
  cells[currentPlayerPos].classList.remove('playerRun')
}

function addEnemy() {
  cells[currentEnemyPos].classList.add('enemy')
}
function removeEnemyRun() {
  cells[currentEnemyPos].classList.remove('enemy')
}

let bombMovement
let direction = 'down'
function bombAnimation() {
  addBombs()
  bombMovement = setInterval(() => {
    removeBombs()
    //movedown
    if (direction === 'down') {
    //check for boundary
      const cont = bombs.every(bomb => {
        return bomb + width < cellCount
      })
      bombs = bombs.map(bomb => {
        // is bomb + width (moving down) less than the border, if yes move down again otherwise go left
        return cont ? bomb + width : bomb - 1
      })
      if (!cont) {
        direction = 'up'
      } 
    } else {
      const cont = bombs.every(bomb => {
        return bomb - width >= 0
      })
      bombs = bombs.map(bomb => {
        return cont ? bomb - width : bomb - 1
      })
      if (!cont) {
        direction = 'down'
      }
    } 
    addBombs()
    endBombs()
  }, 400)
}
bombAnimation()

// blows bombs up when they reach end point of grid and stops movement
function endBombs() {
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i]
    if ((cell.classList.contains('endZone') || cell.classList.contains('player')) && cell.classList.contains('bomb')) {
      clearInterval(bombMovement)
      cell.classList.add('kaboom')
      cell.classList.add('deadBomb')
      cell.classList.remove('bomb')
      // removes explosion gif after 1 second
      setTimeout(function() {
        cell.classList.remove('kaboom')
      }, 1000)
      if (cell.classList.contains('player')) {
        cell.classList.add('playerSkeleton')
        cell.classList.remove('player')
      }
    }
  }
}

function controlPlayer(event) {
  const key = event.code
  removePlayerRun()
  removePlayer()
  removeWeapon(currentWeaponPos)
  // stop scratchy going up off the page
  if (key === 'ArrowUp' && currentPlayerPos >= width) {
    currentPlayerPos -= width
    currentWeaponPos -= width
  } else if (key === 'ArrowDown' && currentPlayerPos + width < cells.length) {
    currentPlayerPos += width
    currentWeaponPos += width
  // * decided to keep to 1 column for player
  }
  addPlayer()
}

// player runs on key down, then stops on key up - some functionality filters into addPlayer function
function playerRun(event) {
  const key = event.code
  removePlayer()
  addPlayerRun()
  // ! key down is currently any key
  // stop scratchy going up off the page
  if (key === 'ArrowUp' && currentPlayerPos >= width) {
    currentPlayerPos
  } else if (key === 'ArrowDown' && currentPlayerPos + width < cells.length) {
    currentPlayerPos
  }
}

// ! launching multiple weapons breaks setInterval trajectory
function findLaunchPoint(event) {
  const fire = event.code
  let launchPoint
  if (fire === 'Space') {
    launchPoint = Number(cells[currentWeaponPos].id)
    startWeaponTrajectory(launchPoint)
  }
}

function startWeaponTrajectory(launchPoint) {
  const countAcross = setInterval(() => {
    launchPoint++
    //remove trajectory
    cells[launchPoint].previousSibling.classList.remove('weapon')
    addWeapon(launchPoint)
    explosion(launchPoint, countAcross)
    if (launchPoint === currentWeaponPos + width - 1) {
      clearInterval(countAcross)
      removeWeapon(launchPoint)
      console.log('end of the line')
    }
  }, 300)
}

// blows up bombs andremoves/assigns classes to cells
function explosion(launchPoint, countAcross) {
  if (cells[launchPoint].classList.contains('bomb') && cells[launchPoint].classList.contains('weapon')) {
    clearInterval(countAcross)
    cells[launchPoint].classList.add('kaboom')
    cells[launchPoint].classList.add('deadBomb')
    cells[launchPoint].classList.remove('bomb')
    // finds bomb array and deletes exploded bomb from array
    const findBomb = bombs.find(bomb => bomb === Number(cells[launchPoint].id))
    bombs = bombs.filter(item => item !== findBomb)
    // adds points for hit
    pointsCounter.innerText = Number(pointsCounter.innerText) + points
    removeWeapon(launchPoint)
    // removes explosion gif after 1 second
    setTimeout(function() {
      cells[launchPoint].classList.remove('kaboom')
    }, 1000)
  }
}

function getEnemyLaunchPoint(){
  const randomTime = setInterval(() => {
    let enemyLaunchPoint
    const runNumber = Math.floor(Math.random() * height) * width - 1
    if (runNumber > 0) {
      // console.log(runNumber)
      // console.log(cells[runNumber].id)
      enemyLaunchPoint = Number(cells[runNumber].id)
      // console.log(enemyLaunchPoint)
      startEnemyWeapon(enemyLaunchPoint)
    }
  }, 3000)
}
// getEnemyLaunchPoint()

function startEnemyWeapon(enemyLaunchPoint) {
  const countReturn = setInterval(() => {
    console.log(enemyLaunchPoint--)
    cells[enemyLaunchPoint].nextSibling.classList.remove('weapon')
    addWeapon(enemyLaunchPoint)
    if (enemyLaunchPoint === endZone) {
      clearInterval(countReturn)
      removeWeapon(enemyLaunchPoint)
      console.log('end of the line')
    } 
  }, 800)

}

// let runTime
// function randomEnemyRun() {
//   const runNumber = Math.floor(Math.random() * height)
//   runTime = setInterval(() => {
//     if (currentEnemyPos >= width) {
//       currentEnemyPos -= (width * runNumber)
//     } else if (currentEnemyPos >= width) {
//       currentEnemyPos += (width * runNumber)
//     }
//   }, 400)
// }
// randomEnemyRun()



// ! Change from event listener - this is placeholder to make sure functionality works
let lostOngoing = 100
// const button = document.querySelector('button')
// button.addEventListener('click', 
function playerDamage() {
  // ! needs the if statement to function
  // if(player classlist cotains bomb) {
  const oneHit = 20
  lostOngoing = lostOngoing -= oneHit
  healthProgress.style.flexBasis = `${lostOngoing}%`
  // }
}
// )
// playerDamage()




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

// key press events
// -space bar to fire
// -up, down, left, right
document.addEventListener('keyup', controlPlayer)
document.addEventListener('keyup', findLaunchPoint)
document.addEventListener('keydown', playerRun)

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
