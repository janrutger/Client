function refresh(){
    console.log("Func refresh")
    let url = "http://rest:5000/slice/json/now/2/5/Amsterdam/Humidity"
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

    console.log(Object.keys(info["VALUE_LAST"])[0])
    parm = Object.keys(info["VALUE_LAST"])[0]

    value  = info["VALUE_LAST"][parm]
    marker = info["VALUE_N_AVERAGE"][parm]

    if (marker < value){
        markerValue = "Higher"
    } else if (marker > value){
        markerValue = "Lower"
    } else {
        markerValue = "Same"
    }
   
    document.getElementById("parmName").innerHTML=info["PARAMETER"]
    document.getElementById("parmValue").innerHTML=value
    document.getElementById("parmMean").innerHTML=info["VALUE_AVERAGE"][parm]
    document.getElementById("parmMarker").innerHTML=markerValue
}



function refreshButton(){
    refresh()
}