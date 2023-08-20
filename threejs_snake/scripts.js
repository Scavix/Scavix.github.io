// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-10, 10, 10, -10);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(
  Math.min(window.innerWidth, window.innerHeight),
  Math.min(window.innerWidth, window.innerHeight)
);

document.getElementById("container").appendChild(renderer.domElement);

// Snake variables
const snake = [{ x: 0, y: 0 }];
const food = {
  x: Math.floor(Math.random() * 21 - 10),
  y: Math.floor(Math.random() * 21 - 10),
};

// Create snake and food sprites
const snake_textureLoader = new THREE.TextureLoader();
const snake_texture = snake_textureLoader.load("snake_texture.png");
const snakeMaterial = new THREE.SpriteMaterial({ map: snake_texture });
const snakeSprites = [];
snake.forEach((segment) => {
  const snakeSprite = new THREE.Sprite(snakeMaterial);
  snakeSprite.position.set(segment.x, segment.y, 0);
  scene.add(snakeSprite);
  snakeSprites.push(snakeSprite);
});

const food_textureLoader = new THREE.TextureLoader();
const food_texture = food_textureLoader.load("food_texture.png");
const foodMaterial = new THREE.SpriteMaterial({ map: food_texture });
const foodSprite = new THREE.Sprite(foodMaterial);
foodSprite.position.set(food.x, food.y, 0);
scene.add(foodSprite);

camera.position.z = 5;

// Handle keyboard input
let direction = new THREE.Vector2(1, 0); // Initial direction (right)

// Handle keyboard input
const handleKeyPress = (event) => {
  const keyCode = event.keyCode;

  // Arrow keys
  if (keyCode === 37 && direction.x !== 1) {
    direction.set(-1, 0); // Left
  } else if (keyCode === 38 && direction.y !== -1) {
    direction.set(0, 1); // Up
  } else if (keyCode === 39 && direction.x !== -1) {
    direction.set(1, 0); // Right
  } else if (keyCode === 40 && direction.y !== 1) {
    direction.set(0, -1); // Down
  }
};

// Update snake's position and check for collision
const updateSnake = () => {
  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  // Check if the new head collides with the snake body
  if (isCollisionWithSelf(newHead)) {
    return false;
  }

  // Check if the new head collides with the walls
  if (newHead.x > 10 || newHead.x < -10 || newHead.y > 10 || newHead.y < -10) {
    return false;
  }

  // Update snake's position
  snake.unshift(newHead);
  snake.pop();

  return true;
};

// Check if the new head collides with the snake body
const isCollisionWithSelf = (newHead) => {
  for (let i = 1; i < snake.length; i++) {
    if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
      return true;
    }
  }
  return false;
};

document.addEventListener("keydown", handleKeyPress);

const handleGameOver = () => {
  alert("Game Over!");
  window.location.reload();
};

// Animation loop
const animate = () => {
  setTimeout(() => {
    requestAnimationFrame(animate);  

    // Check for collision with food and update its position
    if (snake[0].x === food.x && snake[0].y === food.y) {
      food.x = Math.floor(Math.random() * 21 - 10);
      food.y = Math.floor(Math.random() * 21 - 10);
      foodSprite.position.set(food.x, food.y, 0);
      snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
      snakeSprites.push(new THREE.Sprite(snakeMaterial));
      scene.add(snakeSprites[snakeSprites.length - 1]);
    }

    // Update snake's position and sprite
    if (!updateSnake()) {
      handleGameOver();
    }
    snakeSprites.forEach((sprite, index) => {
      sprite.position.set(snake[index].x, snake[index].y, 0);
    });
    renderer.render(scene, camera);
  }, 200);
};

animate();
