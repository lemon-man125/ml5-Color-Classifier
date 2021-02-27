let brain;

let trained = false;

let labelText;

let rInput;
let gInput;
let bInput;

let guessButton;
let pickRandom;

let textColor;

let randomColor = false;

let pickRandomButton;


function setup() {
  createCanvas(400, 400);
  background(0);

  const options = {
    // dataUrl: 'color.csv',
    // inputs: ['R', 'G', 'B'],
    // outputs: ["Color"],
    task: 'classification',
//    learningRate: 1.2,
    debug: true
  }
  brain = ml5.neuralNetwork(options);

  const dataProps = {
    model: 'data/model.json',
    metadata: 'data/model_meta.json',
    weights: 'data/model.weights.bin'
  }

  brain.load(dataProps, loadedModel)

  rInput = createInput('');
  gInput = createInput('');
  bInput = createInput('');

  guessButton = createButton("Guess");
  guessButton.mousePressed(classifyColor);

  pickRandomButton = createButton("Pick Random");
  pickRandomButton.mousePressed(() => {
    randomColor = true;
    classifyColor();
    randomColor = false;
  })
}

// function mousePressed() {
//   if (trained && key == 's') {
//     brain.save();
//   }
// }

function loadedModel() {
  print('Data has loaded!');
  trained = true;
}

function classifyColor() {
  let r;
  let g;
  let b;
  if (!randomColor) {
    r = parseInt(rInput.value());
    g = parseInt(gInput.value());
    b = parseInt(bInput.value());
  } else {
    r = floor(random(255));
    g = floor(random(255));
    b = floor(random(255)); 
  }
  // print(r, g, b);
  const inputs = {
    R: r,
    G: g,
    B: b
  }
  background(r, g, b);
  brain.classify(inputs, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    const label = results[0].label;
    const percent = `${nf(results[0].confidence * 100, 2, 2)}%`;
    labelText = `I guess that the color of the canvas is ${label}\nand I am ${percent} sure!`;
  })
}


// function trainModel() {
//   brain.normalizeData();
//   const options = {
//     epochs: 500,
//   }
//   brain.train(options, () => {
//     print("Done for you manly man of a man you siry bobby");
//     trained = true;
//   })
// }

function draw() {
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(labelText, width/2, 50);  
}
