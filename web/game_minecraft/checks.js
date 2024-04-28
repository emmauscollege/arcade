function checkDirection(block, strict = false){
    let c = g.c
    let cam = g.cam
    let blockSize = g.blockSize
    let checkDir = false;
    let [delta_x, delta_z] = [cam.eyeX - cam.centerX, cam.eyeZ - cam.centerZ];
    let biggestSide = c.abs(delta_x) > c.abs(delta_z) ? "x" : "z"
    if(!strict){
        if(biggestSide == "z"){
            let delta_cam = delta_z > 0 ? 1 : -1
            let delta_camToFace = cam.eyeZ - block.z > 0 ? 1 : -1
            checkDir = delta_cam == delta_camToFace
        } else {
            let delta_cam = delta_x > 0 ? 1 : -1
            let delta_camToFace = cam.eyeX - block.x > 0 ? 1 : -1
            checkDir = delta_cam == delta_camToFace
        }
    } else {
        return true
    }
    return checkDir
}

function getVisibleFaces(block){
    let blocks = g.blocks
    let a = block.gridPosition
    let faces = [
        [a[0], a[1], a[2] + 1],
        [a[0] - 1, a[1], a[2]],
        [a[0], a[1], a[2] - 1],
        [a[0] + 1, a[1], a[2]],
        [a[0], a[1] - 1, a[2]],
        [a[0], a[1] + 1, a[2]]
    ]
    let surroundingBlocks = new Array(6).fill(false)
    for(var i = 0; i < faces.length; i++){
        let f = faces[i]
        let currentBlock;
        try{
            currentBlock = blocks[f[0]][f[1]][f[2]]
        } catch {

        }
        if(currentBlock){
            if(currentBlock.isNormalBlock() && currentBlock.type !== "leaf"){
                surroundingBlocks[i] = true
            }
        }
    }
    return surroundingBlocks
}