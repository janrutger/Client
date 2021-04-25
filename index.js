google.charts.load('current', {'packages':['line']});



function refresh(){
    console.log("Func refresh")
    let url = "http://rest:5000/slice/json/now/36/5/Amsterdam/Humidity"
    //let url = "ServerResponse.json"

    fetch(url)
    .then(res => res.json())
    .then(j => {console.log(j)
        return j})
    .then(j => update(j["ANSWER"]) );
    
}   

function update(info){
    console.log("Func update")
    console.log(info)

    parm = Object.keys(info["VALUE_LAST"])[0]
    value  = info["VALUE_LAST"][parm]
    markerValue = info["VALUE_N_AVERAGE"][parm]

    if (markerValue < value){
        marker = "Higher"
    } else if (markerValue > value){
        marker = "Lower"
    } else {
        marker = "Same"
    }
   
    document.getElementById("stationName").innerHTML=info["STATION"]
    document.getElementById("parmName").innerHTML=info["PARAMETER"].toUpperCase()
    document.getElementById("parmValue").innerHTML=value
    document.getElementById("parmMean").innerHTML=info["VALUE_AVERAGE"][parm]
    document.getElementById("parmMarker").innerHTML=marker

    //plot(info["TIME_LABELS"], info["VALUE_LIST"][parm])

    google.charts.setOnLoadCallback(plot(info));
}

function plot(info){
    console.log("Func plot")
    console.log(info)

    //JR Code
    
    parm = Object.keys(info["VALUE_LAST"])[0]
    markerValue = info["VALUE_N_AVERAGE"][parm]
    if (markerValue < value){
        marker = "Higher"
    } else if (markerValue > value){
        marker = "Lower"
    } else {
        marker = "Same"
    }
    //merge 2x1D to 1x2D array
    var xas = info["TIME_LABELS"];
    var yas = info["VALUE_LIST"][parm];
    var resultArr = [];

    for (let i = 0; i < xas.length; i++) {
        resultArr.push([new Date(xas[i]), yas[i]]);
    };

    console.log(resultArr); // prints the result
    //Google Code

    var data = new google.visualization.DataTable();
      data.addColumn('datetime', 'Date');
      data.addColumn('number', info["PARAMETER"]);

      data.addRows(resultArr)

      /*data.addColumn('number', 'The Avengers');
      data.addColumn('number', 'Transformers: Age of Extinction');

      data.addRows([
        [1,  37.8, 80.8, 41.8],
        [2,  30.9, 69.5, 32.4],
        [3,  25.4,   57, 25.7],
        [4,  11.7, 18.8, 10.5],
        [5,  11.9, 17.6, 10.4],
        [6,   8.8, 13.6,  7.7],
        [7,   7.6, 12.3,  9.6],
        [8,  12.3, 29.2, 10.6],
        [9,  16.9, 42.9, 14.8],
        [10, 12.8, 30.9, 11.6],
        [11,  5.3,  7.9,  4.7],
        [12,  6.6,  8.4,  5.2],
        [13,  4.8,  6.3,  3.6],
        [14,  4.2,  6.2,  3.4]
      ]);*/

      var options = {
        chart: {
          title: info["PARAMETER"].toUpperCase(),
          subtitle: parm + " " + info["UNITS"]
        },
        width: 1200,
        height: 500
      };

      var chart = new google.charts.Line(document.getElementById('PlotGraph'));

      chart.draw(data, google.charts.Line.convertOptions(options));


}

function refreshButton(){
    refresh()
}