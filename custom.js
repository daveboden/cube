function changeCube() {
    //cube.twistDuration = 0
    switch(currentStep) {
        case 1:
            cube.twist("Z");

            var g = new ERNO.Group()
            g.add(cube.corners)
            g.add(cube.cubelets[1], cube.cubelets[5], cube.cubelets[7], cube.cubelets[11], cube.cubelets[14], cube.cubelets[17], cube.cubelets[19], cube.cubelets[23], cube.cubelets[25])
            immediateSetOpacity(g, 0.1);
            break;
        case 2:
            cube.twist("z");

            var g = new ERNO.Group()
            g.add(cube.cubelets[2], cube.cubelets[8], cube.cubelets[20], cube.cubelets[26]);
            immediateSetOpacity(g, 0.1);
            break;
        case 3:
            cube.twist("z");
            break;
    }


}

function immediateSetOpacity(group, opacity){
    group.cubelets.forEach( function( cubelet ) {
        cubelet.css3DObject.element.style.opacity =  opacity;
    })
    return this
}

function isGreenCrossSolved() {
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