from collections import Counter

d3.csv("../../db/all.csv").then(function(dataAll) {

    //console.log(data);
    arrPets = [];
    arrNumpets = [];
    dataAll.forEach(function(dataRow){
        
        arrPets.push(dataRow.Pets);
        //arrNumpets.push(dataRow.rowcount);
        
    });

    //console.log(arrNumpets);
    console.log(arrPets);
    //console.log(data);

    /*var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

      var groupBy = function (arr, criteria) {
        return arr.reduce(function (obj, item) {
    
            // Check if the criteria is a function to run on the item or a property of it
            var key = typeof criteria === 'function' ? criteria(item) : item[criteria];
    
            // If the key doesn't exist yet, create it
            if (!obj.hasOwnProperty(key)) {
                obj[key] = [];
            }
    
            // Push the value to the object
            obj[key].push(item);
    
            // Return the object to the next item in the loop
            return obj;
    
        }, {});
    };

    arrgNumpets = groupBy(arrNumpets, Math.floor);
    console.log(arrgNumpets);*/


})