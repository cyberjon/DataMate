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


function adjectiveChange(adj) {
  console.log(adj);

  return adj;
}

function traitChange(trait) {
  return trait;
}