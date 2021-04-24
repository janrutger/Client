function refresh(){
    console.log("Func refresh")
    let url = "http://rest:5000/slice/json/now/36/5/Amsterdam/temperature"
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
}



function refreshButton(){
    refresh()
}