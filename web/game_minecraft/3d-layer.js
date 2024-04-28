

new p5(function(c){
g.c = c
var cam;
g.cam = cam
var blocks = []



c.preload = function(){
	let grass_side = c.loadImage('images/grass_side.png')
	let grass_top = c.loadImage('images/grass_top.png')
	let dirt = c.loadImage('images/dirt.jpeg')
	let oak_side = c.loadImage('images/oak_side.png')
	let oak_top = c.loadImage('images/oak_top.png')
	let leaves = c.loadImage('images/leaves.png')
	let stone = c.loadImage('images/cobblestone.png')
	let bedrock = c.loadImage('images/bedrock.png')
	let lava = c.loadImage('images/lava.png')
	let gold = c.loadImage('images/gold.png')
	g.grassTexture = [grass_side, grass_side, grass_side, grass_side, dirt, grass_top]
	g.oakTexture = [oak_side, oak_side, oak_side, oak_side, oak_top, oak_top]
	g.dirtTexture = new Array(6).fill(dirt)
	g.leavesTexture = new Array(6).fill(leaves)
	g.stoneTexture = new Array(6).fill(stone)
	g.bedrockTexture = new Array(6).fill(bedrock)
	g.lavaTexture = new Array(6).fill(lava)
	g.goldTexture = new Array(6).fill(gold)
}

c.setup = function(){
	g.c = c
	c.createCanvas(1920,1080,c.WEBGL)
	c.angleMode(c.DEGREES)
	c.normalMaterial();
	cam = c.createCamera();
	g.cam = cam
	c.perspective(60, c.width/c.height, .1, 100000);
	g.blocks = blocks
}


c.draw = function(){
	cam = g.cam
	checkForKeysHit()
	if(g.gameState === "playing" && document.visibilityState === "visible"){
		g.playTime += c.deltaTime;
		c.background('skyblue');
		g.sensitivity = 60 / c.frameRate();
		if(c.frameRate() > 0){
			g.acceleration = .03 * (60 / c.frameRate());
		}
		moveCamera()
		getSelectedBlocks()
		handleBlockAdDe();
		blocks = g.blocks
		renderWorld()
		//Bij de meeste frames wordt een nieuw canvas-element in de DOM gezet waardoor WEBGL op een gegeven moment 'context verliest', daarom haal ik ze er hier uit
		if(document.getElementsByTagName("canvas").length > 2){
			document.getElementsByTagName("canvas")[2].remove()
		}
	}
}


function getSelectedBlocks(){
	var blocks = g.blocks
	let [x3,y3,z3] = [...g.cameraPos.position]
	let [x,y,z] = [Math.round(x3 / 100),Math.round(y3 / 100),Math.round(z3 / 100)]
	let x1 = x - 10 > 0 ? x - 10: 0
	let x2 = x + 10 < 99 ? x + 10 : 99
	let y1 = 0;
	let y2 = 99;
	let z1 = z - 10 > 0 ? z - 10 : 0
	let z2 = z + 10 < 99 ? z + 10 : 99

	let selectedBlocks = []
	for(var i = x1; i <= x2; i++){
		for(var j = y1; j <= y2; j++){
			for(var k = z1; k <= z2; k++){
				let block = blocks[i][j][k];
				if(getIfSelected(checkIfBlockSelected(block))){
					selectedBlocks.push({block: block, array: checkIfBlockSelected(block)})
				}
			}
		}
	}

	function calcDist(block){
		return c.dist(block.x, block.y, block.z, cam.eyeX, -cam.eyeY, cam.eyeZ)
	}


	g.selectedBlock = undefined;
	g.selectedBlockFace = undefined;
	if(selectedBlocks.length > 0){
		let closestBlock = selectedBlocks[0].block
		let closestDist = calcDist(selectedBlocks[0].block)
		let closestBlockArray = selectedBlocks[0].array
		for(let element of selectedBlocks){
			let block = element.block
			if(calcDist(block) < closestDist){
				closestDist = calcDist(block)
				closestBlock = block
				closestBlockArray = element.array
			}
		}
		let block = closestBlock
		let sidesPositions = [
			[block.x, block.y, block.z + 50],
			[block.x - 50, block.y, block.z],
			[block.x, block.y, block.z - 50], 
			[block.x + 50, block.y, block.z],
			[block.x, block.y - 50, block.z],
			[block.x, block.y + 50, block.z]
		]
		//calculate closestFace:
		closestFace = 0;
		closestFaceDistance = 1000000
		for(var i = 0; i < closestBlockArray.length; i++){
			if(closestBlockArray[i]){
				if(c.dist(cam.eyeX, -cam.eyeY, cam.eyeZ, ...sidesPositions[i]) < closestFaceDistance){
					closestFaceDistance = c.dist(cam.eyeX, -cam.eyeY, cam.eyeZ, ...sidesPositions[i]);
					closestFace = i;
				}
			}
		}
		//closestBlock.selectedFace = closestFace;
		closestBlock.selectedFaces = closestBlockArray;
		g.selectedBlock = closestBlock;
		g.selectedBlockFace = closestFace;
	}
}

function getIfSelected(array){
	let counter = 0
	for(element of array){
		if(element === true){
			counter++
		}
	}
	return counter === 2
}


function checkIfBlockSelected(block){
	if(block){
		if(block.isNormalBlock()){
			block.selectedFace = undefined
			let sides = [];

			function formulaZX(a,b,c,type){
				//type geeft aan of de 'c' parameter van x of z is
				if(type == "x"){
					//z = ax + b
					return a * c + b
				} else if(type == "z"){
					//x = (z - b) / a
					return (c - b) / a
				} else {
					return 0;
				}
			}

			function formulaYZ(a,b,c,type){
				if(type == "z"){
					//y = az + b
					return -(a * c + b)
				} else if(type == "y"){
					return -((c - b) / a)
				}
				return 0;
			}

			function formulaYX(a,b,c,type){
				if(type == "x"){
					//y = ax + b
					return -(a * c + b)
				} else if(type == "y"){
					return -((c - b) / a)
				}
				return 0;
			}

			function checkRC(a){
				return a === NaN || a === -Infinity || a === Infinity ? 10 ** 10 : a
				
			}
			
			let blockPos = {
				x:{left: block.x - 50, right: block.x + 50},
				z:{left: block.z - 50, right: block.z + 50},
				y:{up: block.y + 50, down: block.y - 50}
			}

			//face 1:
			//XZ en YZ
			let a = checkRC((cam.centerZ - cam.eyeZ) / (cam.centerX - cam.eyeX))
			let b = cam.centerZ - (cam.centerX * a)
			let checkTop = formulaZX(a,b,blockPos.z.right, "z")
			a = checkRC((cam.centerY - cam.eyeY) / (cam.centerZ - cam.eyeZ));
			b = cam.centerY - (cam.centerZ * a);
			let checkSide = formulaYZ(a,b,blockPos.z.right, "z");
			sides.push(checkTop >= blockPos.x.left && checkTop <= blockPos.x.right && checkSide >= blockPos.y.down && checkSide <= blockPos.y.up);


			//face 2:
			//ZX en YX
			a = checkRC((cam.centerZ - cam.eyeZ) / (cam.centerX - cam.eyeX))
			b = cam.centerZ - (cam.centerX * a)
			checkTop = formulaZX(a,b,blockPos.x.left, "x")
			a = checkRC((cam.centerY - cam.eyeY) / (cam.centerX - cam.eyeX))
			b = cam.centerY - (cam.centerX * a)
			checkSide = formulaYX(a,b,blockPos.x.left, "x")
			sides.push(checkTop >= blockPos.z.left && checkTop <= blockPos.z.right && checkSide >= blockPos.y.down && checkSide <= blockPos.y.up)


			//face 3:
			a = checkRC((cam.centerZ - cam.eyeZ) / (cam.centerX - cam.eyeX))
			b = cam.centerZ - (cam.centerX * a)
			checkTop = formulaZX(a,b,blockPos.z.left, "z")
			a = checkRC((cam.centerY - cam.eyeY) / (cam.centerZ - cam.eyeZ));
			b = cam.centerY - (cam.centerZ * a);
			checkSide = formulaYZ(a,b,blockPos.z.left, "z")
			sides.push(checkTop >= blockPos.x.left && checkTop <= blockPos.x.right && checkSide >= blockPos.y.down && checkSide <= blockPos.y.up)

			//face 4:
			a = checkRC((cam.centerZ - cam.eyeZ) / (cam.centerX - cam.eyeX))
			b = cam.centerZ - (cam.centerX * a)
			checkTop = formulaZX(a,b,blockPos.x.right, "x")
			a = checkRC((cam.centerY - cam.eyeY) / (cam.centerX - cam.eyeX))
			b = cam.centerY - (cam.centerX * a)
			checkSide = formulaYX(a,b,blockPos.x.right, "x")
			sides.push(checkTop >= blockPos.z.left && checkTop <= blockPos.z.right && checkSide >= blockPos.y.down && checkSide <= blockPos.y.up)

			//face 5 (boven):
			//YX en YZ
			a = checkRC((cam.centerY - cam.eyeY) / (cam.centerX - cam.eyeX))
			b = cam.centerY - (cam.centerX * a)
			let checkX = c.abs(formulaYX(a,b,-blockPos.y.down, "y"))
			a = checkRC((cam.centerY - cam.eyeY) / (cam.centerZ - cam.eyeZ))
			b = cam.centerY - (cam.centerZ * a)
			let checkZ = c.abs(formulaYZ(a,b,-blockPos.y.down, "y"))
			sides.push(checkX >= blockPos.x.left && checkX <= blockPos.x.right && checkZ >= blockPos.z.left && checkZ <= blockPos.z.right)

			//face 6 (onder):
			a = checkRC((cam.centerY - cam.eyeY) / (cam.centerX - cam.eyeX))
			b = cam.centerY - (cam.centerX * a)
			checkX = c.abs(formulaYX(a,b,-blockPos.y.up, "y"))
			a = checkRC((cam.centerY - cam.eyeY) / (cam.centerZ - cam.eyeZ))
			b = cam.centerY - (cam.centerZ * a)
			checkZ = c.abs(formulaYZ(a,b,-blockPos.y.up, "y"))
			sides.push(checkX >= blockPos.x.left && checkX <= blockPos.x.right && checkZ >= blockPos.z.left && checkZ <= blockPos.z.right)

			//rewrite:
			// a = checkRC((cam.centerY - cam.eyeY) / (cam.centerX - cam.eyeX))
			// b = cam.centerY - cam.centerX * a
			// checkX = formulaYX(a,b,blockPos.y.up, "y")
			// a = checkRC((cam.centerY - cam.eyeY) / (cam.centerZ - cam.eyeZ))
			// b = cam.centerY - cam.centerZ * a
			// checkZ = formulaYZ(a,b,blockPos.y.up, "y")
			// sides.push(checkX >= blockPos.x.left && checkX <= blockPos.x.right && checkZ >= blockPos.z.left && checkZ <= blockPos.z.right)
			
			
			
			let checkDir = checkDirection(block)
			
			if(checkDir){
				return sides;
			} else {
				return new Array(6).fill(false)
			}

			
			
		}
	}
	return new Array(6).fill(false)
}

function handleBlockAdDe(){
	//R:
	if(!c.keyIsDown(82) || g.selectedBlock === undefined/*|| g.keysHit.r === "true"*/){
		//g.keysHitLastFrame.slice(g.keysHitLastFrame.indexOf("r"), 1)
		g.mineTimer = undefined;
		return;
	}
	if(g.inventory[g.selectedInventoryItem].name === "normal_pickaxe"){
		//delete block...
		if(!g.selectedBlock.mineable){
			return;
		}
		if(g.mineTimer === undefined){
			g.mineTimer = c.deltaTime / 1000
		} else if(g.mineTimer + c.deltaTime / 1000 >= g.selectedBlock.mineTime){
			for(var i = 0; i < g.inventory.length; i++){
				if(g.selectedBlock.type === g.inventory[i].name){
					g.inventory[i].amount++
					break;
				}
			}
			let gp = g.selectedBlock.gridPosition;
			g.blocks[gp[0]][gp[1]][gp[2]] = undefined;
			g.mineTimer = undefined;
		} else {
			g.mineTimer += c.deltaTime / 1000;
		}
		
	} else {
		//add block...
		if(g.keysHit.r === "true"){
			return;
		}
		if(g.inventory[g.selectedInventoryItem].amount < 1){
			g.messages.push({type: "warning", content: "Not enough resources", addTime: performance.now()})
			return;
		}
		let faceDirections = [
			[0,0,1],
			[-1,0,0],
			[0,0,-1],
			[1,0,0],
			[0,-1,0],
			[0,1,0]
		]
		let gp = [...{...g.selectedBlock}.gridPosition];
		let side = g.selectedBlockFace;
		for(var i = 0; i < 3; i++){
			gp[i] += faceDirections[side][i]
		}
		try{
			g.blocks[gp[0]][gp[1]][gp[2]] = new Block(g.inventory[g.selectedInventoryItem].name, gp[0], gp[1], gp[2])
			g.inventory[g.selectedInventoryItem].amount--
		} catch {
			g.messages.push({type: "warning", content: "Out of bounds!", addTime: performance.now()})
		}
	}
}


function checkForKeysHit(){
	//r:
	let r_down = c.keyIsDown(82);
	if(g.keysHit.r === "false" && r_down){
		g.keysHit.r = "first"
	} else if(g.keysHit.r === "first" && r_down){
		g.keysHit.r = "true"
	} else if(!r_down){
		g.keysHit.r = "false"
	}
	//p:
	let p_down = c.keyIsDown(80);
	if(g.keysHit.p === "false" && p_down){
		g.keysHit.p = "first";
	} else if(g.keysHit.p === "first" && p_down){
		g.keysHit.p = "true"
	} else if(!p_down){
		g.keysHit.p = "false"
	}
}



})


function set3DWorld(){
	var c = g.c
	var blocks = g.blocks
	
	let startItems = 0;
	if(g.gameMode === "creative"){
		g.cameraPos.position = [5000, -1500, 5000]
		startItems = Infinity
	} else {
		g.cameraPos.position = [0, -1000, 0]
		g.cameraPos.orientation = [135,0]
		startItems = 5;
	}
	for(let item of g.inventory){
		item.amount = startItems;
	}
	g.currentSpeed = {x: 0, y: 0, z: 0};
	g.timeOfLavaHit = 0;
	c.angleMode(c.DEGREES)
	createWorld()
	placeTrees()
	c.normalMaterial();
	c.perspective(60, c.width/c.height, .01, 100000);

	function createWorld(){
		perlin.seed()
		for(var i = 0; i < 100; i++){
			blocks[i] = []
			for(var j = 0; j < 100; j++){
				blocks[i][j] = []
				for(var k = 0; k < 100; k++){
					blocks[i][j][k] = undefined;
				}
			}
		}
		for(var i = 0; i < 100; i++){
			for(var j = 0; j < 100; j++){
				let height = parseInt((perlin.get(i/10,j/10) + 1) * 4.5)
				blocks[i][height][j] = new Block("grass", i, height, j)
				for(var k = height - 1; k >= 0; k--){
					if(k === 0){
						blocks[i][k][j] = new Block("bedrock", i, k, j)
					} else if(height - k > 1){
						blocks[i][k][j] = new Block("stone", i, k, j)
					} else {
						blocks[i][k][j] = new Block("dirt", i, k, j)
					}
				}
				
			}
		}
		for(var height = 0; height < 8; height++){
			if(!blocks[99][height][99]){
				break;
			}
		}
		if(g.gameMode === "challenge"){
			blocks[99][height - 1][99] = new Block("gold", 99, height - 1, 99);
		}
	}
}
function placeTrees(){
	for(var i = 0; i < 100; i++){
		createTree(Math.round(Math.random() * 99), Math.round(Math.random() * 99))
	}
	
}

function createTree(x, z){
	const tree = [["wood",0,0,0], ["wood", 0,1,0], ["leaf", -1,2,0], ["leaf", 0,2,-1], ["leaf", 0,2,1], ["leaf", 1,2,0], ["leaf", 0,3,0]]
	var blocks = g.blocks
	for(var height = 0; height < 8; height++){
		if(!blocks[x][height][z]){
			break;
		}
	}
	for(var block of tree){
		try{
			blocks[x + block[1]][height + block[2]][z + block[3]] = new Block(block[0], x + block[1], height + block[2], z + block[3])
		} catch {

		}
	}
}