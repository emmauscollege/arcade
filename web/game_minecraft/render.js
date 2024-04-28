function renderWorld(){
    var blocks = g.blocks;
    var c = g.c;
    var cam = g.cam;
    let gridPosition = getPositionInBlockArray(cam.eyeX, cam.eyeY, cam.eyeZ);
    let [x, y, z] = gridPosition;
    let transparentBlocks = []
    let rD = 20
    let x1 = x - rD > 0 ? x - rD : 0
    let x2 = x + rD < 99 ? x + rD : 99
    let y1 = 0;
    let y2 = 99;
    let z1 = z - rD > 0 ? z - rD : 0
	let z2 = z + rD < 99 ? z + rD : 99
    for(var i = x1; i <= x2; i++){
		for(var j = y1; j <= y2; j++){
			for(var k = z1; k <= z2; k++){
				let block = blocks[i][j][k]
                if(block){
                    if(!block.transparent){
                        block.render()
                    } else {
                        transparentBlocks.push(block)
                        //transparante blokken moeten als laatste gerenderd worden, door een 'foutje' in webgl
                    }
                }
			}
		}
	}
    for(let block of getRenderOrderOfTransparentBlocks(transparentBlocks)){
        block.render()
    }
}

function getRenderOrderOfTransparentBlocks(blocks){
    var c = g.c
    var cam = g.cam
    //sorteren van groot naar klein, verste weg wordt eerste gerenderd
    let blockDists = []
    for(let block of blocks){
        blockDists.push([c.dist(block.x, block.y, block.z, cam.eyeX, cam.eyeY, cam.eyeZ), block])
    }
    let bD = blockDists
    for(var i = 0; i < bD.length; i++){
        for(var j = 0; j < bD.length - 1; j++){
            if(bD[j][0] < bD[j + 1][0]){
                [bD[j + 1], bD[j]] = [bD[j], bD[j + 1]]
            }
        }
    }
    let ret = []
    for(let block of bD){
        ret.push(block[1])
    }
    return ret
}

function getRenderOrderOfTransparentFaces(block){
    var c = g.c
    var cam = g.cam
    let facePositions = [
        [block.x, block.y, block.z + 50],
        [block.x - 50, block.y, block.z],
        [block.x, block.y, block.z - 50], 
        [block.x + 50, block.y, block.z],
        [block.x, block.y - 50, block.z],
        [block.x, block.y + 50, block.z]
    ]
    let facesRelativeToBlock = [
        [0, 0, 50, 0, 0],
        [-50, 0, 0, 90, 0],
        [0, 0, -50, 0, 0],
        [50, 0, 0, 90, 0],
        [0, -50, 0, 0, 90],
        [0, 50, 0, 0, 90]
    ]
    for(var i = 0; i < facesRelativeToBlock.length; i++){
        facesRelativeToBlock[i].push(block.selectedFaces[i])
        facesRelativeToBlock[i].push(block.texture[i])
    }
    let facesOrder = []
    for(var i = 0; i < 6; i++){
        facesOrder.push([c.dist(cam.eyeX, -cam.eyeY, cam.eyeZ, ...facePositions[i]), facesRelativeToBlock[i]])
    }
    let fO = facesOrder
    for(var i = 0; i < fO.length; i++){
        for(var j = 0; j < fO.length - 1; j++){
            if(fO[j][0] < fO[j + 1][0]){
                [fO[j + 1], fO[j]] = [fO[j], fO[j + 1]]
            }
        }
    }
    let ret = []
    for(let face of fO){
        ret.push(face[1])
    }
    return ret
}

function getPositionInBlockArray(x, y, z){
    return [Math.floor(x / 100), Math.floor(y / 100), Math.floor(z / 100)]
}

function createSelectedFace(texture, selected){
    var c = g.c
    var graphic = c.createGraphics(400,400)
    graphic.clear()
    graphic.image(texture, 0, 0, 400, 400)
    if(selected){
        graphic.fill(255,255,255,50)
        graphic.rect(0,0,400,400)
    }
    graphic.noStroke()
    return graphic
}