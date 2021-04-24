function refresh(){
    console.log("Func refresh")
    let url = "http://rest:5000/slice/json/now/2/5/Amsterdam/temperature"
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

    //value = info["VALUE_LAST"]
    console.log(Object.keys(info["VALUE_LAST"])[0])
    parm = Object.keys(info["VALUE_LAST"])[0]
    //val = info["VALUE_LAST"]
    //console.log(val)
    //console.log(val["T"])
    //for (key of val){   
     //   console.log(key[0])
    //}

    document.getElementById("parmName").innerHTML=info["PARAMETER"]
    document.getElementById("parmValue").innerHTML=info["VALUE_LAST"][parm]
    document.getElementById("parmMean").innerHTML=info["VALUE_AVERAGE"][parm]
    document.getElementById("parmMarker").innerHTML=info["VALUE_N_AVERAGE"][parm]
}



function refreshButton(){
    refresh()
}