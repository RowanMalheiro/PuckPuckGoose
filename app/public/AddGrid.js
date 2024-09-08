var colourScale, avgData, g, height = 92, width = 85, returnArray = [], data, teamIceTime, totalIceTime

function toRadians (angle) {
    let radians=  angle * (Math.PI / 180);
    return radians
}

const addPixels = () => {
    console.log("ìn ere n it")
    for(let row = 0; row<width; row++){
        for(let col = height-64; col<height; col++){
            drawPixel(row, col)
        }
    }
}

const drawPixel = (row, col) => {
    let shots = 0
    for(let shot of data){
        let x=(width/2)-shot.shotDistance*Math.cos(toRadians(90-Number(shot.shotAngle)))
        let y=(height-64)+shot.shotDistance*Math.sin(toRadians(90-Number(shot.shotAngle)))
        let distance = Math.sqrt((row-x)**2+(col-y)**2)
        if(distance<5){
            shots++
        }
    }
    let avgShots = Number(avgData.filter((d) => d.x == row && d.y == col)[0].shots)
    let score = 3600*(shots/teamIceTime-avgShots/totalIceTime)
    score = score > 0.5 ? 0.5 : score
    score = score < -0.5 ? -0.5: score
    returnArray.push({
        'x': row,
        'y': col,
        'score': score
    })
}

onmessage = (message) => {
    data=message.data.data 
    totalIceTime=message.data.totalIceTime
    teamIceTime=message.data.teamIceTime
    avgData=message.data.avgData
    addPixels()
    postMessage(returnArray)
}