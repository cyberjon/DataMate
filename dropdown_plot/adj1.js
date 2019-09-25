/*d3.csv("../../db/Summ_adj.csv").then(function(adjData) {
    console.log(adjData); 

    function filterTable(word) {
        adjData.forEach(function(data) {
            Object.entries(data).forEach(([key, value]) => {
                if (key === "adj" & value === word) {
                    console.log(data);
                }
            });
        });
    }
    
    
   

});*/

function filterTable(word) {
    d3.csv("../../db/Summ_adj.csv").then(function(adjData) {

        adjData.forEach(function(data) {
            Object.entries(data).forEach(([key, value]) => {
                if (key === "adj" & value === word) {
                    console.log(data);
                    buildPlots(data);
                    //return data;
                }
            })
        })
    })

}



function adjectiveChange(word) {
    console.log(word);
    filterTable(word);

    return word;
}

function buildPlots(data) {
    
    arrEthnicity = [];
    arrEthcount = [];
    Object.entries(data).forEach(([key, value]) => {
        if (key.includes("ethnicity")) {
            arrEthnicity.push(key);
            arrEthcount.push(parseInt(value));
            //console.log(key);
        }
    })
    console.log(arrEthcount);
    console.log(arrEthnicity);

    ethnicityData = [{
        y : arrEthcount,
        x : arrEthnicity,
        type: 'bar'
    }];

    Plotly.react("bar", ethnicityData);
}