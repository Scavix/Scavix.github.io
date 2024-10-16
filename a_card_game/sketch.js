let fruits, flowers;
let images = [];
let cards = [];
let game;
let emptyCard;
let lvlPerCard = 3;
let moving = false;
let movingCard;
let movingToField;

function preload() {
  fruits = loadJSON("fruits.json");
  flowers = loadJSON("flowers.json");
  emptyCard = loadImage("asset/empty.png");
}

function setup() {
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  for (let i = 0; i < fruits.l.length; i++) {
    for (let j = 1; j <= lvlPerCard; j++) {
      images.push(loadImage("asset/" + fruits.l[i].name + j + ".png"));
    }
  }
  for (let i = 0; i < flowers.l.length; i++) {
    images.push(loadImage("asset/" + flowers.l[i].name + ".png"));
  }
  for (let i = 0; i < fruits.l.length; i++) {
    for (let j = 1; j <= lvlPerCard; j++) {
      cards.push(new Card(fruits.l[i].name, i, images[i + j - 1]));
    }
  }
  for (let i = 0; i < flowers.l.length; i++) {
    cards.push(new Card(flowers.l[i].name, -1, images[fruits.l.length * lvlPerCard + i - 1]));
  }
  game = new Game();
  game.start();
  game.printSituation();
}

function draw() {
  background(220);
  game.show();
}

class Card {
  constructor(name, lvl, image, xsize, ysize) {
    this.name = name;
    this.image = image;
    this.xsize = xsize;
    this.ysize = ysize;
    this.ad = 2 * lvl;
    this.health = 3 * lvl;
    this.lvl = lvl;
    if (name == "banana") {
      this.type = Types.Banana;
      this.ad += 2;
      this.health -= 2;
    }
    else if (name == "apple") {
      this.type = Types.Apple;
      this.ad -= 1;
      this.health += 1;
    }
    else if (name == "cherry") {
      this.type = Types.Cherry;
      this.ad += 1;
      this.health -= 1;
    }
    else if (name == "pear") {
      this.type = Types.Pear;
      this.ad -= 2;
      this.health += 2;
    }
    else if (name == "rose") {
      this.type = Types.Rose;
      this.ad = 2;
      this.health = -1;
    }
    else if (name == "iris") {
      this.type = Types.Iris;
      this.health = 1;
      this.ad = 0;
    }
    else if (name == "orchid") {
      this.type = Types.Orchid;
      this.ad = 1;
      this.health = 0;
    }
    else if (name == "daffodil") {
      this.type = Types.Daffodil;
      this.ad = -1;
      this.health = 2;
    }
  }
}

class Hand {
  constructor() {
    this.cards = [];
  }
  addCard(card) {
    this.cards.push(card);
  }
  removeCard(cardIndex) {
    this.cards.splice(cardIndex, 1);
  }
}

class Deck {
  constructor() {
    this.cards = [];
  }
  addCard(card) {
    this.cards.push(card);
  }
  removeCard(card) {
    this.cards.splice(this.cards.indexOf(card), 1);
  }
}

class Field {
  constructor() {
    this.cards = [];
    this.fieldSize = 3;
  }
  addCard(card) {
    this.cards.push(card);
  }
  addCardToIndex(card, index) {
    this.cards.splice(index, 0, card);
  }
  removeCard(card) {
    this.cards.splice(this.cards.indexOf(card), 1);
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.hand = new Hand();
    this.deck = new Deck();
    this.field = new Field();
  }
}

class Game {
  constructor() {
    this.players = [];
    this.turn = true;
  }
  addPlayer(player) {
    this.players.push(player);
  }
  removePlayer(player) {
    this.players.splice(this.players.indexOf(player), 1);
  }
  start() {
    for (let i = 0; i < 2; i++) {
      this.addPlayer(new Player("Player " + (i + 1) + ""));
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        this.players[j].hand.addCard(cards[Math.floor(Math.random() * cards.length)]);
      }
    }
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < 2; j++) {
        this.players[j].deck.addCard(cards[Math.floor(Math.random() * cards.length)]);
      }
    }
    /*for (let i = 0; i < this.players[0].field.fieldSize; i++) {
      for (let j = 0; j < 2; j++) {
        this.players[j].field.addCard(new Card("empty", -1, emptyCard));
      }
    }*/
  }
  show() {
    let dim = width / (this.players[0].field.fieldSize + 2);
    for (let i = 0; i < this.players[0].field.fieldSize + 2; i++) {
      line(0, dim * i, width, dim * i);
      line(dim * i, 0, dim * i, height);
      if (i == 0) {
        for (let j = 0; j < this.players[1].hand.cards.length; j++) {
          image(this.players[1].hand.cards[j].image, dim * (j + 1), dim * i, dim, dim);
        }
      }
      if (i == 1) {
        for (let j = 0; j < this.players[1].field.fieldSize; j++) {
          if(this.players[1].field.cards[j]!=null){
            image(this.players[1].field.cards[j].image, dim * (j + 1), dim * i, dim, dim);
          }
          else{
            image(emptyCard, dim * (j + 1), dim * i, dim, dim);
          }
        }
      }
      if (i == 3) {
        for (let j = 0; j < this.players[0].field.fieldSize; j++) {
          if(this.players[0].field.cards[j]!=null){
            image(this.players[0].field.cards[j].image, dim * (j + 1), dim * i, dim, dim);
          }
          else{
            image(emptyCard, dim * (j + 1), dim * i, dim, dim);
          }
        }
      }
      if (i == 4) {
        for (let j = 0; j < this.players[0].hand.cards.length; j++) {
          image(this.players[0].hand.cards[j].image, dim * (j + 1), dim * i, dim, dim);
        }
      }
    }
  }
  printSituation() {
    console.log("------Player 1------");
    console.log("Hand: ");
    console.log(this.players[0].hand.cards);
    console.log("Field: ");
    console.log(this.players[0].field.cards);
    console.log("------Player 2------");
    console.log("Hand: ");
    console.log(this.players[1].hand.cards);
    console.log("Field: ");
    console.log(this.players[1].field.cards);
  }
  nextTurn() {
    this.turn = !this.turn;
  }
}

class Types {
  static Fruits = 0;
  static Flowers = 1;
}

class FruitTypes {
  static Banana = 0;
  static Apple = 1;
  static Cherry = 2;
  static Pear = 3;
}

class FlowerTypes {
  static Rose = 0;
  static Iris = 1;
  static Orchid = 2;
  static Daffodil = 3;
}

function mouseClicked() {
  if (moving) {
    if (spotfield()) {
      moveCard();
      moving = false;
      game.printSituation();
      game.nextTurn();
      console.log("------Selecting------");
    }
  }
  else {
    if (spotcard()) {
      moving = true;
      console.log("------Moving------");
    }
  }
}

function spotcard() {
  if (game.turn) {
    if (mouseX >= width / 5 &&
      mouseY >= height / 5 * 4 &&
      mouseX <= width / 5 * 4 &&
      mouseY <= height / 5 * 5) {
      if (mouseX <= width / 5 * 2) {
        console.log("Card index " + 0);
        movingCard = 0;
        return true;
      }
      else if (mouseX <= width / 5 * 3) {
        console.log("Card index " + 1);
        movingCard = 1;
        return true;
      }
      else {
        console.log("Card index " + 2);
        movingCard = 2;
        return true;
      }
    }
  }
  else {
    if (mouseX >= width / 5 &&
      mouseY >= height / 5 * 0 &&
      mouseX <= width / 5 * 4 &&
      mouseY <= height / 5 * 1) {
      if (mouseX <= width / 5 * 2) {
        console.log("Card index " + 0);
        movingCard = 0;
        return true;
      }
      else if (mouseX <= width / 5 * 3) {
        console.log("Card index " + 1);
        movingCard = 1;
        return true;
      }
      else {
        console.log("Card index " + 2);
        movingCard = 2;
        return true;
      }
    }
  }
}

function spotfield() {
  if (game.turn) {
    if (mouseX >= width / 5 &&
      mouseY >= height / 5 * 3 &&
      mouseX <= width / 5 * 4 &&
      mouseY <= height / 5 * 4) {
      if (mouseX <= width / 5 * 2) {
        console.log("Field index " + 0);
        movingToField = 0;
        return true;
      }
      else if (mouseX <= width / 5 * 3) {
        console.log("Field index " + 1);
        movingToField = 1;
        return true;
      }
      else {
        console.log("Field index " + 2);
        movingToField = 2;
        return true;
      }
    }
  }
  else {
    if (mouseX >= width / 5 &&
      mouseY >= height / 5 * 1 &&
      mouseX <= width / 5 * 4 &&
      mouseY <= height / 5 * 2) {
      if (mouseX <= width / 5 * 2) {
        console.log("Field index " + 0);
        movingToField = 0;
        return true;
      }
      else if (mouseX <= width / 5 * 3) {
        console.log("Field index " + 1);
        movingToField = 1;
        return true;
      }
      else {
        console.log("Field index " + 2);
        movingToField = 2;
        return true;
      }
    }
  }
}

function moveCard() {
  if (game.turn) {
    //console.log("Moving card " + movingCard + "[" + game.players[0].hand.cards[movingCard].name + "]" + " to field " + movingToField);
    game.players[0].field.addCardToIndex(game.players[0].hand.cards[movingCard], movingToField);
    game.players[0].hand.removeCard(movingCard);
  }
  else {
    //console.log("Moving card " + movingCard + "[" + game.players[0].hand.cards[movingCard].name + "]" + " to field " + movingToField);
    game.players[1].field.addCardToIndex(game.players[1].hand.cards[movingCard], movingToField);
    game.players[1].hand.removeCard(movingCard);
  }
}