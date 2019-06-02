//logic for swapping two elements of array 'a' as : swap(a[i],a[j])
function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

//calculation a distance for a particulr chromosome (path)
function calculateDistance(vertices, chromosomes) {
  var total_distance= 0;

  for (var i = 0; i < chromosomes.length - 1; i++) {
    //calculating distance between two cities in a particular chromosome
    //finding vertex A
    var vertexAIndex = chromosomes[i];
    var vertexA = vertices[vertexAIndex];
    //finding vertex B
    var vertexBIndex = chromosomes[i + 1];
    var vertexB = vertices[vertexBIndex];
    //calculating distance between vertex A and B through square root formula.
    var d = dist(vertexA.x, vertexA.y, vertexB.x, vertexB.y);
    //adding in the total distance
    total_distance =total_distance+d;

  }
  return total_distance;
}

function drawPath(vertices,path){
	//setting up virtual pen to draw the best graph
	stroke('#3E363F');
	strokeWeight(4);
	noFill();
	beginShape();

	//drawing graph accordingly

	for (var i = 0; i < path.length; i++) {
	  var n = path[i];
	  vertex(vertices[n].x, vertices[n].y);
	  ellipse(vertices[n].x, vertices[n].y, 12, 12);
	}
	endShape();

	translate(0, height / 2);
}