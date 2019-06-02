// vertices in array (as we can say Cities to travle in Travelling Salesman Problem)
var vertices = [];

//the total no of vertices(cities) to travel
var totalVertices = 12;


//the required input to solve problem through Genetic Algorithm 

//the total no of population elements we will create in our solution
var populationSize = 100;

//the actual population array containing population items
var populationArray = [];

//the actual fitness array containing the fitness score of each population item in its corresponding index
var fitnessArray = [];


//this is the rate by which the mutation function will swap two indexes and decides with how much probability we need to swap indexes value
var mutationRate=0.01;

//just a temp variable to hold the calculated distance
//and initialized with infinitt because first of every new calculated distance will be less then infinity
var trackDistance= Infinity;

//hold the best path of all combination we have tried
var bestPath;

//hold the present best path
var presentBestPath;

//var statusP;


//just setting up all the required vertices
//also setting up chromosomes (which is an array of City objects which represents a path (order) through the cities)
function setup() {
  //setting up display window
  createCanvas(1500,700);
  var chromosomes = [];
  for (var i = 0; i < totalVertices; i++) {
    var v = createVector(random(width), random(height / 2));
    vertices[i] = v;
    chromosomes[i] = i; //order in which the cities are visited
  }

  //this for loops generates the initial population of random order
  for (var i = 0; i < populationSize; i++) {
    populationArray[i] = shuffle(chromosomes);
  }
  //statusP = createP('').style('font-size', '32pt');
}

function draw() {
  background('#95AFBA');

  // calling all Genetic Algorithm Functions

  //Step 1: Calculate Fitness for each item in Population
  calculateFitness();

  //Setp 2: ADJUST Fitness in the measn of 100 % for all population items 
  //in such way that by summing up all fitnesses we get 100% 
  normalizeFitness();

  //produce next generation (means new population)
  nextGeneration();

  //drawing best graph

  drawPath(vertices,bestPath);

  //drawing current best graph
  drawPath(vertices,presentBestPath);

}



