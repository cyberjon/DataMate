// set up arrays of object keys
let arrDimAge = ["ageLT20", "age2029", "age3039", "age4049", "age5059", "age6069", "age7079", "age8089", "age90"];
let arrDimEth = ["ethnicityasian", "ethnicityblack", "ethnicitycaucasian", "ethnicityhispanic", "ethnicityindian", 
"ethnicitymiddleeastern", "ethnicitymixedrace", "ethnicitynativeamerican", "ethnicityotherethnicity"];
let arrDimHair = ["hairbald", "hairblack", "hairblond", "hairbrown", "hairgrey", "hairmixedcolor", "hairred", "hairblank"];

// set up arrays of object labels
let arrLblAge = ["<20", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90+"];
let arrLblEth = ["Asian", "Black", "Caucasian", "Hispanic", "Indian", 
"Middle Eastern", "Mixed Race", "Native American", "Other Ethnicity"];
let arrLblHair = ["Bald", "Black", "Blond(e)", "Brown", "Grey", "Mixed Color", "Red", "(Blank)"];

// assign chosen variables
// let strChosenAdj = "honest";
let arrX = arrDimEth;

// populate arrays to be used by graph
let arrY = [];
arrData.forEach(objRow=>{
	if(objRow.adj == getData(strChosenAdj)){
		arrX.forEach(str=>arrY.push(objRow[str]));
	}
});

// set label
let arrLbl = [];
if(arrX == arrDimAge){arrLbl = arrLblAge;}
if(arrX == arrDimEth){arrLbl = arrLblEth;}
if(arrX == arrDimHair){arrLbl = arrLblHair;}
console.log('arrLbl: ' + arrLbl);

  

// debugs
console.log('arrChosenDim: ' + arrX);
console.log('arrY: ' + arrY);

// set trace var
let objSettings = {
  x: arrLbl,
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

function getData(strChosenAdj) {
  console.log(strChosenAdj);
  return strChosenAdj;
}

