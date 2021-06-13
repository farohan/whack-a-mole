const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole'); //selecting everything
  let lastHole;
  let timeUp = false;
  let score = 0; //declaring everything

  function randomTime(min, max) { //function for finding random time for moles to peep
    return Math.round(Math.random() * (max - min) + min);
  }

  function randomHole(holes) { //function for finding random holes
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx]; //makes array of holes
    if (hole === lastHole) { //checks if same hole as last time
      console.log('Same hole as before/last time.');
      return randomHole(holes);
    }
    lastHole = hole;
    return hole; //sets lastHole to hole
  }

  function peep() { //function for moles to peep out of their holes
    const time = randomTime(200, 1000); //using random time function
    const hole = randomHole(holes);
    hole.classList.add('up'); //connecting between CSS and JS
    setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peep(); //In CSS: top: 0; therefore making them peep
    }, time);
  }

  function startGame() { //function is connected to HTML button
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 100000) //setting time limit -> 100 seconds
  }

  function whack(e) {
    if(!e.isTrusted) return; //for cheaters!
    score++; //incrementing score
    this.parentNode.classList.remove('up'); //making mole go down
    scoreBoard.textContent = score; //adding to scoreBoard
  }

  moles.forEach(mole => mole.addEventListener('click', whack)); //setting event listeners on the moles (mole.svg)

