// set up arrays of object labels
let arrDimAge = ["ageLT20", "age2029", "age3039", "age4049", "age5059", "age6069", "age7079", "age8089", "age90"];
let arrDimEth = ["ethnicityasian", "ethnicityblack", "ethnicitycaucasian", "ethnicityhispanic", "ethnicityindian", 
"ethnicitymiddleeastern", "ethnicitymixedrace", "ethnicitynativeamerican", "ethnicityotherethnicity"];
let arrDimHair = ["hairbald", "hairblack", "hairblond", "hairbrown", "hairgrey", "hairmixedcolor", "hairred", "hairblank"];

// assign chosen variables
let strChosenAdj = "sexy";
let arrX = arrDimAge;

// populate arrays to be used by graph
let arrY = [];
arrData.forEach(objRow=>{
	if(objRow.adj == strChosenAdj){
		arrX.forEach(str=>arrY.push(objRow[str]));
	}
});

// debugs
console.log('arrChosenDim: ' + arrX);
console.log('arrY: ' + arrY);

// set trace var
let objSettings = {
  x: arrX,
  y: arrY,
  name: "Bucket",
  type: "bar",
  orientation: "v"
};

// Apply the group bar mode to the layout
let layout = {
  title: "DataMate Query Results",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", [objSettings], layout);