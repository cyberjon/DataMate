d3.json("Summ_adj.json").then(function(defaultData) {
    let dictdefault = defaultData[0];
    let defaultX = [];
    let defaultY = [];
    console.log(dictdefault);
    Object.entries(dictdefault).forEach(([key, value]) => {
        if (key.includes("ethnicity")) {
            defaultX.push(key);
            defaultY.push(value);
        }
    })
    let defaultBar = [{
        x:defaultX,
        y:defaultY,
        type: 'bar'
    }];

    let defaultLayout = {
        title : "DataMate Query Results"
    }

    Plotly.newPlot("plot", defaultBar, defaultLayout);
})

    



function filterTableadj(word) {
    d3.json("Summ_adj.json").then(function(adjData) {
        console.log(adjData);
        adjData.forEach(function(data) {
            Object.entries(data).forEach(([key, value]) => {
                if (key === "adj" & value === word) {
                    console.log(data);
                    buildPlots(data);
                } 
            })
        })


    })
}


function adjectiveChange(word) {
    filterTableadj(word);
    return word;
}

function buildPlots(data) {
    
    let arrEthnicity = [];
    let arrcount = [];
    Object.entries(data).forEach(([key, value]) => {
        if (key.includes("ethnicity")) {
            arrEthnicity.push(key);
            arrcount.push(parseInt(value));
            //console.log(key);
        }
    })
    //console.log(arrcount);
    //console.log(arrEthnicity);

    ethnicityData = [{
        y : arrcount,
        x : arrEthnicity,
        type: 'bar'
    }];

    let layout = {
        title: "DataMate Query Results"
    }

    Plotly.react("plot", ethnicityData, layout);
}