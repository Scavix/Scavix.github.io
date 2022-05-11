let ptron;
let training=[];
let count=0;
let x,y;
function setup(){
  let answer
  createCanvas(500,500);
  ptron = new Perceptron(3);
  for(let i=0;i<2000;i++) {
    x=random(-width/2,width/2);
    y=random(-height/2,height/2);
    answer = 1;
    if(y<f(x))
      answer = -1;
    training[i]=new Trainer(x,y,answer);
  }
}

function draw() {
  background(255);
  translate(width/2,height/2);
  ptron.train(training[count].inputs, training[count].answer);
  count=(count+1)%training.length;
  let guess;
  for(let i=0;i<count;i++) {
    stroke(0);  
    guess=ptron.feedforward(training[i].inputs);
    if(guess > 0)
      noFill();
    else
      fill(0);
    ellipse(training[i].inputs[0], training[i].inputs[1], 8, 8);
  }
}

class Perceptron{
  constructor(n){
    this.c=0.01;
    this.weights=[];
    for (let i=0;i<n;i++) {
      this.weights.push(random(-1,1));
    }
  }
  
  feedforward(inputs){
    let sum=0;
    for (let i=0;i<this.weights.length;i++) {
      sum+=inputs[i]*this.weights[i];
    }
    return this.activate(sum);
  }
  
  activate(tmp){
    if(tmp>0)
      return +1;
    else
      return -1;
  }
  
  train(inputs,desired){
    let guess=this.feedforward(inputs);
    let error=desired-guess;
    for (let i=0;i<this.weights.length;i++) {
      this.weights[i]+=this.c*error*inputs[i];
    }
  }
}

class Trainer {
  constructor(x,y,a) {
    this.inputs=[];
    this.inputs.push(x);
    this.inputs.push(y);
    this.inputs.push(1);
    this.answer=a;
  }
}

function f(x) {
  return 2*x+1;
}