// set up arrays of object labels
let arrDimAge = ["ageLT20", "age2029", "age3039", "age4049", "age5059", "age6069", "age7079", "age8089", "age90"];
let arrDimEth = ["ethnicityasian", "ethnicityblack", "ethnicitycaucasian", "ethnicityhispanic", "ethnicityindian", 
"ethnicitymiddleeastern", "ethnicitymixedrace", "ethnicitynativeamerican", "ethnicityotherethnicity"];
let arrDimHair = ["hairbald", "hairblack", "hairblond", "hairbrown", "hairgrey", "hairmixedcolor", "hairred", "hairblank"];

//let arrX = arrDimEth;
//default plot
let arrdefaultX = arrDimEth;
let arrdefaultY = [];
  arrData.forEach(objRow=>{
    if(objRow.adj == "curvy"){
      arrdefaultX.forEach(str=>arrdefaultY.push(objRow[str]));
    }
  });

let defaultData = [{
  x : arrdefaultX,
  y : arrdefaultY,
  type: 'bar'
}]

Plotly.react("plot", defaultData);


function defineXaxis(trait) {
  let arrDimAge = ["ageLT20", "age2029", "age3039", "age4049", "age5059", "age6069", "age7079", "age8089", "age90"];
  let arrDimEth = ["ethnicityasian", "ethnicityblack", "ethnicitycaucasian", "ethnicityhispanic", "ethnicityindian", "ethnicitymiddleeastern", "ethnicitymixedrace", "ethnicitynativeamerican", "ethnicityotherethnicity"];
  let arrDimHair = ["hairbald", "hairblack", "hairblond", "hairbrown", "hairgrey", "hairmixedcolor", "hairred", "hairblank"];
  let arrX = [];
  
  //console.log(trait);
  if (trait === "ethnicity") {
    arrX = arrDimEth;
  } else if (trait === "hair") {
    arrX = arrDimHair;
  } else if (trait === "age") {
    arrX = arrDimAge;
  } else {
    arrX = arrDimEth;
  }

  //console.log(arrX);
  return arrX;
}


function arrFilteradj(adj) {
// assign chosen variables
  let strChosenAdj = adj;
  console.log(strChosenAdj);
  console.log(defineXaxis());
  


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

  buildPlots(arrX, arrY);
}

function buildPlots(arrTraits, arrAdjectives) {
  // set trace var
  let objSettings = {
    x: arrTraits,
    y: arrAdjectives,
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

}*/
function adjectiveChange(adj) {
  console.log(adj);
  //arrFilteradj(adj);

  return adj;
}

function traitChange(trait) {
  console.log(trait);
  console.log(defineXaxis(trait));
  let arrX = defineXaxis(trait);

  console.log(arrX);
  console.log(adjectiveChange());

  
    // assign chosen variables
  let strChosenAdj = adjectiveChange();
  console.log(strChosenAdj);
  console.log(defineXaxis());
      
    
    
      // populate arrays to be used by graph
  let arrY = [];
  arrData.forEach(objRow=>{
    if(objRow.adj == strChosenAdj){
      arrX.forEach(str=>arrY.push(objRow[str]));
    }
  });
    
      // debug
  console.log('arrChosenDim: ' + arrX);
  console.log('arrY: ' + arrY);
    
  buildPlots(arrX, arrY);
}
    
    
function buildPlots(arrTraits, arrAdjectives) {
      // set trace var
      let objSettings = {
        x: arrTraits,
        y: arrAdjectives,
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
    
    }

  

