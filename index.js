async function refresh(){
    console.log("Func refresh")
    let url = "http://rest:5000/slice/json/now/2/5/Amsterdam/temperature"


    /*fetch(url)
    .then(res => res.json())
    .then((out) => {
        //console.log('Output: ', out["ANSWER"]);
        answer = out['ANSWER']
        console.log(answer)
        return answer
        }).catch(err => console.error(err)); */
    
    let response = await fetch(url)
    let data = await response.json()
    console.log(data["ANSWER"])
    return data

}   

function update(){
    console.log("Func update")
    document.getElementById("parmName").innerHTML="TEMPERATURE"
    document.getElementById("parmValue").innerHTML=22.4
    document.getElementById("parmMean").innerHTML=21.3
    document.getElementById("parmMarker").innerHTML=21.9
}



function refreshButton(){
    var y = refresh()
    console.log(y)
    update()
    //console.log(a)
}