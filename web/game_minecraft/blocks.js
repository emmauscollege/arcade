const c = g.c;
var blockSize = g.blockSize;
var cam = g.cam;

class Block{
	constructor(type, x, y, z){
		this.mineable = true
		this.vervalTime = getVervalTime()
		this.x = (x) * blockSize
		this.y = (y) * blockSize
		this.z = (z) * blockSize
		this.gridPosition = [x,y,z]
		this.transparent = false
		this.deadly = false;
		this.type = type
		switch(type){
			case "grass":
				this.mineTime = .6
				this.texture = g.grassTexture
				break;
			case "dirt":
				this.mineTime = .4;
				this.texture = g.dirtTexture
			case "sand":
				this.mineTime = .2
				break;
			case "stone":
				this.mineTime = 1.5
				this.texture = g.stoneTexture
				break;
			case "wood":
				this.mineTime = 1
				this.texture = g.oakTexture
				break;
			case "leaf":
				this.mineTime = .3
				this.texture = g.leavesTexture
				this.transparent = true
				break;
			case "gold":
				this.texture = g.goldTexture;
				this.mineable = false;
				this.vervalTime = Infinity;
				break;
			case "bedrock":
				this.mineable = false
				this.texture = g.bedrockTexture
				break;
		}
		this.selectedFaces = new Array(6).fill(false)
	}
	render(){
        const c = g.c
        const cam = g.cam
		if(g.gameMode === "challenge" && g.playTime > this.vervalTime && this.type !== "lava"){
			this.turnToLava()
		}
		if(c.dist(this.x, this.z, cam.eyeX, cam.eyeZ) < g.renderDistance){
			c.translate(this.x, -this.y, this.z)
			let faces = [
				[0, 0, 50, 0, 0],
				[-50, 0, 0, 90, 0],
				[0, 0, -50, 0, 0],
				[50, 0, 0, 90, 0],
				[0, -50, 0, 0, 90],
				[0, 50, 0, 0, 90]
			]

			for(var i = 0; i < faces.length; i++){
				faces[i].push(this.selectedFaces[i])
				faces[i].push(this.texture[i])
			}
			let visibleFaces = getVisibleFaces(this)
			if(this.type === "leaf"){
				faces = getRenderOrderOfTransparentFaces(this)
			}
			for(var i = 0; i < faces.length; i++){
				let face = faces[i]
				let hidden = visibleFaces[i]

				c.noStroke()
				if(face[5]){
					c.texture(createSelectedFace(face[6], true))
				} else {
					c.texture(face[6])
				}
				if(!hidden){
					c.translate(face[0], -face[1], face[2])
					c.rotateY(face[3])
					c.rotateX(face[4])
					c.plane(g.blockSize, g.blockSize);
					c.rotateY(-face[3])
					c.rotateX(-face[4])
					c.translate(-face[0], face[1], -face[2])
				}
			}
			c.translate(-this.x, this.y, -this.z)
			this.selectedFaces = new Array(6).fill(false)

		}
	}
	turnToLava(){
		this.type = "lava";
		this.mineable = false;
		this.texture = g.lavaTexture
		this.deadly = true;
		this.addTime = g.playTime;
	}
	isNormalBlock(){
		return true;
	}
}

function getVervalTime(){
	//vervalTime hangt af van level, daardoor vervallen ze steeds sneller en wordt het spel moeilijker
	var b = 1000 / g.level;
	var a = 30000 / g.level;
	return g.playTime + Math.random() * a + b;
}
