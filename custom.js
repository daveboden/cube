function changeCube() {
    cube.twistDuration = 0
    cube.twist("Z");

    var g = new ERNO.Group()
    g.add(cube.corners)
    g.add(cube.cubelets[1], cube.cubelets[5], cube.cubelets[7], cube.cubelets[11], cube.cubelets[14], cube.cubelets[17], cube.cubelets[19], cube.cubelets[23], cube.cubelets[25])
    g.setOpacity(0.1)

    setTimeout(cube.twistDuration = 200, 500);
}

function isGreenFaceSolved() {
    var greenFace = getGreenFace();
    var middleGreen = greenFace.center.cubelets[0];

    var faceIndex;

    for(var i = 0; i < middleGreen.faces.length; i++) {
        var currentFace = middleGreen.faces[i];
        if (currentFace.color && currentFace.color.initial && currentFace.color.initial == "G") {
            faceIndex = i;
            break;
        }
    }

    for(var i = 0; i < greenFace.cross.cubelets.length; i++) {
        var color = greenFace.cross.cubelets[i].faces[faceIndex].color;
        if(color.initial != "G") {
            return false;
        }
    }

    return true;
}


function getGreenFace() {
    for(var i = 0; i < cube.faces.length; i++) {
        var currentValue = cube.faces[i];
        if(currentValue.color.initial == "G") {
            return currentValue;
        }
    }
};

$(function() {
    //Keep the green centre at the top when shuffling
    cube.shuffleMethod = "RrLlUuDdBbFf"

    //Put green on top and make irelevant cubelets transparent.
    changeCube();

    cube.addEventListener("onTwistComplete", function () {
        var solved = isGreenFaceSolved();
        var colorOfBar = solved ? "palegreen" : "orangered";
        $("#progressBar").css("backgroundColor", colorOfBar);
        $("#progressBar").text(solved ? "Green cross is solved" : "Solve the green cross first");
    }, false);
});