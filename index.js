const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let score1 =0;
let score2 =0;



class Palka {
  constructor({ position }) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 0,
    }
    this.width = 10;
    this.height = 150;
  }

  draw() {
    c.fillStyle = 'black';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();

    if (
      this.position.y + this.velocity.y > 0 &&
      this.position.y + this.height + this.velocity.y < canvas.height
    )
      this.position.y += this.velocity.y;
  }
}

class Mic {
  constructor({ position }) {
    this.position = position;

    const speed = 4;
    const direction = {
      x: Math.random() - 0.5 >= 0 ? -speed : speed,
      y: Math.random() - 0.5 >= 0 ? -speed : speed,
    }
    this.velocity = {
      x: direction.x,
      y: direction.y,
    }

    this.width = 20;
    this.height = 20;
  }

  draw() {
    c.fillStyle = 'Red';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw()
    const rightSide = this.position.x + this.width + this.velocity.x;
    const leftSide = this.position.x + this.velocity.x;
    const bottomSide = this.position.y + this.height;
    const topSide = this.position.y;

    
    // kolize první palky
    if (
      leftSide <= palka1.position.x + palka1.width &&
      bottomSide >= palka1.position.y &&
      topSide <= palka1.position.y + palka1.height
    ) {
      this.velocity.x = -this.velocity.x;
    } 
    // kolize druhe palky
    if (
      rightSide >= palka2.position.x &&
      bottomSide >= palka2.position.y &&
      topSide <= palka2.position.y + palka2.height
    ) {
      this.velocity.x = -this.velocity.x;
    }

    if (
      this.position.y + this.height + this.velocity.y >= canvas.height ||
      this.position.y + this.velocity.y <= 0
    ) {
      this.velocity.y = -this.velocity.y;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const palka1 = new Palka({
  position: {
    x: 10,
    y: 100,
  },
})

const palka2 = new Palka({
  position: {
    x: canvas.width - 10 * 2,
    y: 100,
  },
})

const mic = new Mic({
  position: {
    x: canvas.width / 2,
    y: canvas.height / 2,
  },
})

function animace() {
  requestAnimationFrame(animace);
  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height);
 palka1.update();
  palka2.update();

  mic.update();
}

animace()

addEventListener('keydown', (event) => {
  const speed = 5
  switch (event.key) {
    case 'w':
     palka1.velocity.y = -speed
      break
    case 's':
      
     palka1.velocity.y = speed
      break
    case 'ArrowUp':
      palka2.velocity.y = -speed
      break
    case 'ArrowDown':
      palka2.velocity.y = speed
      break
  }
})