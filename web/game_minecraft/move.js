function calculateSpeed(){
	currentSpeed_x = g.currentSpeed.x;
	currentSpeed_y = g.currentSpeed.y;
	currentSpeed_z = g.currentSpeed.z;
	//mag maar 1 keer per frame aangeroepen worden
    var c = g.c;
	var acceleration = g.acceleration

	var maxSpeed = g.maxGlobalSpeed * 50 / c.frameRate()
	const delta_v = acceleration * c.deltaTime
	if(c.keyIsDown(83)){
		if(currentSpeed_z > -maxSpeed){
			currentSpeed_z -= delta_v
		} else {
			currentSpeed_z += delta_v
		}
	} else {
		if(currentSpeed_z < 0){
			currentSpeed_z += delta_v
		}
	}
  
	if(c.keyIsDown(87)){
		if(currentSpeed_z < maxSpeed){
			currentSpeed_z += delta_v
		} else {
			currentSpeed_z -= delta_v
		}
	} else {
		if(currentSpeed_z > 0){
			currentSpeed_z -= delta_v
		}
	}

	if(c.keyIsDown(65)){
		//A
		if(currentSpeed_x > -maxSpeed){
			currentSpeed_x -= delta_v
		} else {
			currentSpeed_x += delta_v
		}
	} else {
		if(currentSpeed_x < 0){
			currentSpeed_x += delta_v
		}
	}

	if(c.keyIsDown(68)){
		//D
		if(currentSpeed_x < maxSpeed){
			currentSpeed_x += delta_v
		} else {
			currentSpeed_x -= delta_v
		}
	} else {
		if(currentSpeed_x > 0){
			currentSpeed_x -= delta_v
		}
	}

	//currentSpeed_y += .1 * delta_v
	if(c.keyIsDown(32) && checkIfPlayerCanJump()){
		currentSpeed_y = -500/c.frameRate()
	} else {
		currentSpeed_y += delta_v * g.gravity
	}
	
	if(currentSpeed_z < 0 && currentSpeed_z > -delta_v && !c.keyIsDown(83)){
		currentSpeed_z = 0;
	}
	if(currentSpeed_z > 0 && currentSpeed_z < delta_v && !c.keyIsDown(87)){
		currentSpeed_z = 0;
	}
	if(currentSpeed_x < 0 && currentSpeed_x > -delta_v && !c.keyIsDown(65)){
		currentSpeed_x = 0;
	}
	if(currentSpeed_x > 0 && currentSpeed_x < delta_v && !c.keyIsDown(68)){
		currentSpeed_x = 0;
	}

	g.currentSpeed.x = currentSpeed_x;
	g.currentSpeed.y = currentSpeed_y;
	g.currentSpeed.z = currentSpeed_z;
}

function checkIfPlayerCanJump(){
	return !(-g.cameraPos.position[1] % 100)
}

function getGridPosition(x,y,z){
	var ret = {};
	ret.x = Math.floor(x / 100 + .5)
	ret.y = Math.floor(-y / 100 - .5) + 6;
	ret.z = Math.floor(z / 100 + .5)
	return ret
}

function equalObjects(obj1, obj2){
	return JSON.stringify(obj1) === JSON.stringify(obj2)
}

function calcCenter(){
	var c = g.c
	var cam = g.cam
	var cameraPos = {...g.cameraPos}
	var pos_X = c.sin(-cameraPos.orientation[0]) * -935 + cam.eyeX
	var pos_Y = c.tan(cameraPos.orientation[1]) * 935 + cam.eyeY
	var pos_Z = c.cos(-cameraPos.orientation[0]) * -935 + cam.eyeZ

	return [pos_X, pos_Y, pos_Z]
}

function getCameraChanges(){
	currentSpeed_x = g.currentSpeed.x;
	currentSpeed_y = g.currentSpeed.y;
	currentSpeed_z = g.currentSpeed.z;
	var c = g.c;
	var cam = g.cam;
	var cameraPos = {...g.cameraPos}
	var sensitivity = g.sensitivity
    let changes = {
        position: [0, 0, 0],
        orientation: [0, 0]
    }

	var angle_res = cameraPos.orientation[0]
	var BR_loodrecht = c.sin(angle_res) * currentSpeed_z;
	var BR_evenwijdig = c.cos(angle_res) * currentSpeed_z;
	changes.position[0] += BR_loodrecht
	changes.position[2] -= BR_evenwijdig


	var angle_res = cameraPos.orientation[0]
	var BR_loodrecht = c.cos(angle_res) * currentSpeed_x;
	var BR_evenwijdig = c.sin(angle_res) * currentSpeed_x;
	changes.position[0] += BR_loodrecht
	changes.position[2] += BR_evenwijdig
	
	
	if(c.keyIsDown(37)){
        changes.orientation[0] -= sensitivity
	}
	if(c.keyIsDown(39)){
        changes.orientation[0] += sensitivity
	}
	if(c.keyIsDown(40)){
		if(sensitivity + cameraPos.orientation[1] < 90){
            changes.orientation[1] += sensitivity
		}
	}
	if(c.keyIsDown(38)){
		if(cameraPos.orientation[1] - sensitivity > -90){
            changes.orientation[1] -= sensitivity
		}
	}
	changes.position[1] += currentSpeed_y
    return {...changes}
}

function getUpdatedCameraState(newCameraPos){
	var c = g.c
	let changes = {...getCameraChanges()}
	// var newCameraPos = {...g.cameraPos} //copy maken van originele object
	for(var i = 0; i < 3; i++){
		newCameraPos.position[i] += changes.position[i]
	}
	for(var i = 0; i < 2; i++){
		newCameraPos.orientation[i] += changes.orientation[i]
	}
	return {...newCameraPos}
}

function checkCollision(oldCameraPos, newCameraPos){
	var blocks = g.blocks
	var collidedBlocks = [];
	let block;
	for(var i = 0; i < blocks.length; i++){
		for(var j = 0; j < blocks[i].length; j++){
			for(var k = 0; k < blocks[i][j].length; k++){
				block = blocks[i][j][k];
				if(block !== undefined){
					//console.log(newCameraPos)
					if(checkForHitBoxInBlock(newCameraPos.position, block)){
						collidedBlocks.push(block);
					}
				}
			}
		}
	}
	g.touchedBlocks = collidedBlocks
	let cameraPos = {...oldCameraPos};

	for(let collidedBlock of collidedBlocks){
		let delta = [
			collidedBlock.gridPosition[0] - cameraPos.position[0],
			collidedBlock.gridPosition[1] - (-cameraPos.position[1]),
			collidedBlock.gridPosition[2] - cameraPos.position[2]
		]
		let collisionSideOfBlock = {
			x: delta[0] != 0 ? (delta[0] > 0 ? 1 : 3) : undefined,
			y: delta[1] != 0 ? (delta[1] > 0 ? 5 : 4) : undefined,
			z: delta[2] != 0 ? (delta[2] > 0 ? 2 : 0) : undefined
		}
		let oppositeSides = [2,3,0,1,5,4]
		let block = collidedBlock;
		let blockSides = [
			block.z + 50,
			block.x - 50,
			block.z - 50,
			block.x + 50,
			block.y + 50,
			block.y - 50
		]
		let hitBoxRelativeSides = [35, -35, -35, 35, 50, -150]

		resetSpeed = []
		//hitbox tegen blok aanzetten en speed resetten
		if(collisionSideOfBlock.y != undefined){
			cameraPos.position[1] = -(blockSides[collisionSideOfBlock.y] - hitBoxRelativeSides[oppositeSides[collisionSideOfBlock.y]])
			g.currentSpeed.y = 0;
		} else if(collisionSideOfBlock.x != undefined){
			cameraPos.position[0] = blockSides[collisionSideOfBlock.x] - hitBoxRelativeSides[oppositeSides[collisionSideOfBlock.x]]
			g.currentSpeed.z = 0;
		} else if(collisionSideOfBlock.z != undefined){
			cameraPos.position[2] = blockSides[collisionSideOfBlock.z] - hitBoxRelativeSides[oppositeSides[collisionSideOfBlock.z]]
			g.currentSpeed.x = 0;
		}
	}
	return cameraPos
}


function checkForHitBoxInBlock(point, block){
	//https://www.phind.com/search?cache=a5c26329-c4ea-4de6-b8aa-2b9c42ffabd5
	const blockSize = g.blockSize;

	let blockMin = {
		x: block.x - .5*blockSize,
		y: block.y - .5*blockSize,
		z: block.z - .5*blockSize
	}
	let hitBoxMin = {
		x: point[0] - 35,
		y: -point[1] - 150,
		z: point[2] - 35
	}
	let blockMax = {
		x: block.x + .5*blockSize,
		y: block.y + .5*blockSize,
		z: block.z + .5*blockSize
	}
	let hitBoxMax = {
		x: point[0] + 35,
		y: -point[1] + 50,
		z: point[2] + 35
	}

	const xOverlap = blockMin.x < hitBoxMax.x && blockMax.x > hitBoxMin.x;
	const yOverlap = blockMin.y <= hitBoxMax.y && blockMax.y >= hitBoxMin.y;
	const zOverlap = blockMin.z < hitBoxMax.z && blockMax.z > hitBoxMin.z;
	return xOverlap && yOverlap && zOverlap;
}


function moveCamera(){
	calculateSpeed()

	//roept calcSpeed aan en berekent nieuwe positie
	//checkCollision checkt of point(s) van hitbox in een bestaand blok komen
	// als een point in een bestaand blok komt, wordt de point als edge van de hitbox tegen het blok van de collisionrichting aangezet
	var c = g.c
	var cam = g.cam
	var oldCameraPos = {...g.cameraPos}
	var newCameraPos = getUpdatedCameraState(oldCameraPos)
	newCameraPos = checkCollision({...oldCameraPos}, {...newCameraPos});
	g.cameraPos = newCameraPos
	cam.lookAt(...calcCenter())
	cam.setPosition(...newCameraPos.position)
	checkForHealthLoss()
	preventFallingFromMap()

} 

function checkForHealthLoss(){
	if(g.gameMode !== "challenge" || g.gameState !== "playing"){
		return;
	}
	for(let block of g.touchedBlocks){
		if(block.type === "gold"){
			g.gameState = "level-passed";
			g.level++;
			set3DWorld();
			return;
		}
	}
	for(let block of g.touchedBlocks){
		if(block.deadly){
			g.timeOfLavaHit += g.c.deltaTime;
			break; //Als je meerdere blokken tegelijk raakt telt dat niet dubbel
		}
	}
	if(g.timeOfLavaHit > g.maxTimeOfLavaHit){
		g.gameState = "gameOver";
		set3DWorld();
	}
}

function preventFallingFromMap(){
	if(g.cameraPos.position[1] > 0){
		if(g.gameMode === "challenge"){
			g.gameState = "gameOver";
			set3DWorld();
		} else {
			g.cameraPos.position = [5000, -1500, 5000]
		}
	}
}