

function calculateFitness() {
  var currentRecord = Infinity;
  //calculating fitness for each item in populationArray
  for (var i = 0; i < populationArray.length; i++) {
    var d = calculateDistance(vertices, populationArray[i]);

    if (d < trackDistance) {
      trackDistance = d;
      bestPath = populationArray[i];
    }

    if (d < currentRecord) {
      currentRecord = d;
      presentBestPath = populationArray[i];
    }
    //to make the fitness meaningful in percentage manner. like fitness of each population must be caluclated in %age.
    fitnessArray[i] = 1 / (pow(d, 8) + 1);
  }
}


//this function just make the fitness of all population items nearly 100% by using fitnessArray
//the fitness array contains the fitness score of each population item in its corresponding index

function normalizeFitness() {
  var sum = 0;
  for (var i = 0; i < fitnessArray.length; i++) {
    sum += fitnessArray[i];
  }
  for (var i = 0; i < fitnessArray.length; i++) {
    fitnessArray[i] = fitnessArray[i] / sum;;
  }
}

//generate new generation (new population) from the previous population
// by applying the mutate and crossover operations on tht population items

function nextGeneration() {
  var newPopulation = [];
  for (var i = 0; i < populationArray.length; i++) {
    var parentA = pickOne(populationArray, fitnessArray);
    var parentB = pickOne(populationArray, fitnessArray);
    var chromosomes = crossOver(parentA, parentB);
    mutate(chromosomes, mutationRate);
    newPopulation[i] = chromosomes;
  }
  populationArray = newPopulation;

}

//this function just improve our existing population 
//and this fucntion is taken from (Genetic Algorithm: Improved Pool Selection) video on youtube.

function pickOne(list, prob) {
  var index = 0;
  var r = random(1);

  while (r > 0) {
    r = r - prob[index];
    index++;
  }
  index--;
  return list[index].slice();
}

/*//our main Crossover function
we are trying to implement this crossover function but we are finding a bit difficulty in understanding 
this function therefore for the time being we are using an alternate crossover function defined in line no : 102
function crossOver(parentA, parentB) {
  var offSpring1=[];
  var offSpring2=[];
   //selected =offSpring1[i]
  for (var i = 0; i < parentB.length; i++) {
    offSpring1[i]=parentB[i];
    if(parentA.includes(offSpring1[i])){
      for(var k=0;k<parentA.length;k++){
        if(parentA[k]==offSpring2){
          offSpring1[i]=k;
        }
      }
    }
    else{
      if(parentB.includes(offSpring2[i])){
        for(var k=0;k<parentB.length;k++){
          if(parentB[k]==offSpring1){
            offSpring2[i]=k;
          }
        }
      }
    }
  }
  console.log(offSpring1);
  console.log(offSpring2);
}
*/




function crossOver(parentA, parentB) {
  var start = floor(random(parentA.length));
  var end = floor(random(start + 1, parentA.length));
  var neworder = parentA.slice(start, end);
  for (var i = 0; i < parentB.length; i++) {
    var city = parentB[i];
    if (!neworder.includes(city)) {
      neworder.push(city);
    }
  }
  return neworder;
}

//this function just simply takes mutation rate and chromosome as arguments and swap some indexes
// of chromosomes according to mutation rate
function mutate(chromosomes, mutationRate) {
  for (var i = 0; i < totalVertices; i++) {
    if (random(1) < mutationRate) {
      var firstIndex = floor(random(chromosomes.length));
      var secondIndex = (firstIndex + 1) % totalVertices;
      swap(chromosomes, firstIndex, secondIndex);
    }
  }
}