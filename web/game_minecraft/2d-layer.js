new p5(function(c){
	g.c2 = c;
	var canvas;
	var logoImg;
	var pixelFont;
	var normal_pickaxe;
	var dirt_block;
	var grass_block;
	var leaves_block;
	var wood_block;
	var stone_block;
	var inventory;
	var heart;
	var gravitySlider
	var renderDistanceSlider
	var showFramerate;
	
	c.preload = function(){
		logoImg = c.loadImage("images/logo.png")
		heart = c.loadImage("images/hartje.png")
		pixelFont = c.loadFont("images/pixel-font.ttf")
		normal_pickaxe = c.loadImage("images/inventory/normal-pickaxe-2.png")
		dirt_block = c.loadImage("images/inventory/dirt-block.png")
		grass_block = c.loadImage("images/inventory/grass-block.png")
		leaves_block = c.loadImage("images/inventory/leaves-block.png")
		wood_block = c.loadImage("images/inventory/oak-wood-block.png")
		stone_block = c.loadImage("images/inventory/stone-block.png")
		inventory = [
			{name: "normal_pickaxe", isBlock: false, img: normal_pickaxe},
			{name: "dirt", isBlock: true, img: dirt_block},
			{name: "grass", isBlock: true, img: grass_block},
			{name: "leaf", isBlock: true, img: leaves_block},
			{name: "wood", isBlock: true, img: wood_block},
			{name: "stone", isBlock: true, img: stone_block}
		]
		g.inventory = inventory
	}
	c.setup = function(){
		canvas = c.createCanvas(1920,1080)
		gravitySlider = c.createSlider(.3,1,g.gravity,.1);
		gravitySlider.position(c.width / 2, 360);
		gravitySlider.style("width", "100px")
		gravitySlider.hide()
		renderDistanceSlider = c.createSlider(500, 3000, 1500, 100);
		renderDistanceSlider.position(c.width / 2, 420);
		renderDistanceSlider.style("width", "100px");
		showFramerate = c.createCheckbox("", false);
		showFramerate.position(c.width / 2, 480)

	}
	c.draw = function(){

		if(g.keysHit.p === "first"){
			g.gameState = g.gameState === "playing" ? "paused" : "playing"
		}
		hideSliders()
		
		switch (g.gameState){
			case "startScreen":
				startScreen();
				break;
			case "playing":
				playing();
				break;
			case "paused":
				paused();
				break;
			case "guide":
				guide();
				break;
			case "settings":
				settings();
				break;
			case "level-passed":
				levelCompleted();
				break;
			case "gameOver":
				gameOver();
				break;
		}
	}
	function startScreen(){
		let creative = [c.width / 2 - 450, c.height / 2 + 50, 400, 100]
		let challenge = [c.width / 2 + 50, c.height / 2 + 50, 400, 100]
		c.background("darkgreen")
		//logo is 739 x 73
		c.image(logoImg, c.width / 2 - 370, c.height / 2 - 137, 739, 73)
		c.fill("green")

		c.rect(...creative);
		c.rect(...challenge)
		c.textFont(pixelFont)
		c.textSize(42)
		c.textAlign(c.CENTER, c.CENTER)
		c.fill("white")
		
		c.text("Creative", c.width / 2 - 250, c.height / 2 + 100)
		c.text("Challenge", c.width / 2 + 250, c.height / 2 + 100)
		if(rectClicked(...creative)){
			g.gameState = "guide"
			g.gameMode = "creative"
			set3DWorld();
		}
		if(rectClicked(...challenge)){
			g.gameState = "guide";
			g.gameMode = "challenge"
			g.level = 1;
			set3DWorld();
			
		}
	}
	function paused(){
		c.background("darkgreen");
		c.textSize(45);
		c.textFont(pixelFont);
		c.textAlign(c.CENTER, c.CENTER);
		c.text("Gameplay paused", 0, 100, 1920, 300);
		
		let restartButton = [c.width / 2 - 450, c.height / 2 - 50, 400, 100]
		let explainButton = [c.width / 2 + 50, c.height / 2 - 50, 400, 100]
		let settingsButton = [c.width / 2 - 450, c.height / 2 + 100, 400, 100]
		let unpauseButton = [c.width / 2 + 50, c.height / 2 + 100, 400, 100]
		c.fill("green")
		c.stroke("black")
		c.strokeWeight(1)
		c.rect(...restartButton);
		c.rect(...explainButton);
		c.rect(...settingsButton);
		c.rect(...unpauseButton);
		c.fill("white")
		c.noStroke()
		c.text("Restart", c.width / 2 - 250, c.height / 2)
		c.text("Guide", c.width / 2 + 250, c.height / 2)
		c.text("Settings", c.width / 2 - 250, c.height / 2 + 150)
		c.text("Unpause", c.width / 2 + 250, c.height / 2  + 150)
		c.textAlign(c.LEFT)
		//handle clicks:
		if(rectClicked(...restartButton)){
			//restart:
			location.reload()
		}
		if(rectClicked(...explainButton)){
			g.gameState = "guide"
		}
		if(rectClicked(...settingsButton)){
			g.gameState = "settings"
		}
		if(rectClicked(...unpauseButton)){
			g.gameState = "playing"
		}
	}
	function guide(){
		//uitleg, daarna knop om terug te gaan naar spelen
		c.background("darkgreen");
		c.textSize(30);
		c.textFont("Helvetica");
		c.textAlign(c.CENTER, c.CENTER);
		let understoodButton = [c.width / 2 - 200, c.height - 200, 400, 100];
		let texts = [
			"Walk with WASD, look around using the arrow keys. Jump with SPACE",
			"You can select items from your inventory with the row of numbers, not with the Number Pad!",
			"To dig a block, select the pickaxe and hold R. Every type of block has a different mining time.",
			"To place a block, hit R once.",
			"You can only use the mouse in paused menus.",
			"The deepest layer of blocks is Bedrock, these blocks are unminable.",
			"This overview is always accesible from the pause menu (P)."
		]
		let survivalText = `Uh oh! The blocks in this 100x100 world appear to be radioactive. They will decay into Lava one by one,
			increasingly quickly as you reach higher levels. Rush to the Gold-block on the other side of the map,
			but be careful: You can only touch the lava for 1.5 seconds per level. To give you a head start, you receive
			25 blocks in total per level you can place to build bridges or platforms. Mine to get more blocks.
			(Btw, you can't mine Lava-blocks)`
		c.fill("green")
		c.stroke("black")
		c.strokeWeight(1)
		c.rect(...understoodButton)
		c.fill("white")
		c.noStroke()
		for(var i = 0; i < texts.length; i++){
			c.text(`- ${texts[i]}`, c.width / 2, i * 50 + 350)
		}
		c.textAlign(c.CENTER, c.TOP)
		c.fill("orange")
		if(g.gameMode === "challenge"){
			c.text(survivalText, c.width / 2, texts.length * 50 + 330)
		}
		c.fill("white")
		c.textAlign(c.CENTER, c.CENTER)
		c.textSize(45)
		c.textFont(pixelFont)
		c.text("Got it!", c.width / 2, c.height - 150)
		c.text("Guide", 0, 100, 1920, 300);
		if(rectClicked(...understoodButton)){
			g.gameState = "playing"
		}
		c.textAlign(c.LEFT)
	}
	function settings(){
		gravitySlider.show()
		renderDistanceSlider.show()
		showFramerate.show()
		//gravity, renderdistance
		c.background("darkgreen")
		c.fill("green")
		c.stroke("black")
		c.strokeWeight(1)
		let doneButton = [c.width / 2 - 200, c.height - 200, 400, 100];
		c.rect(...doneButton);

		c.textAlign(c.LEFT, c.TOP)
		c.textFont("Helvetica");
		c.fill("white")
		c.textSize(35);
		c.text("Gravity:", c.width / 2 - 200, 400)
		c.text("Render distance:", c.width / 2 - 200, 460)
		c.text("Show framerate:", c.width / 2 - 200, 520)
		g.gravity = gravitySlider.value()
		g.renderDistance = renderDistanceSlider.value()
		g.settings.showFramerate = showFramerate.checked()




		c.textAlign(c.CENTER, c.CENTER)
		c.fill("white")
		c.noStroke()
		c.textSize(45)
		c.textFont(pixelFont)
		c.text("Settings", 0, 100, 1920, 300)
		c.text("Done", c.width / 2, c.height - 150)
		if(rectClicked(...doneButton)){
			g.gameState = "playing"
		}
		c.textAlign(c.LEFT, c.TOP)
	}

	
	function playing(){
		//teken kruis in het midden:
		c.clear();
		c.strokeWeight(5)
		c.stroke("lightgrey")
		c.rect(c.width/2 - .5,c.height / 2 - 20,1,40)
		c.rect(c.width/2 - 20,c.height / 2 - .5,40,1)


		//teken inventory:
		handleInventoryPicker();
		let inventory_width = 100 * inventory.length;
		let inventory_height = 100;
		let inventory_left_corners = c.width / 2 - inventory_width / 2
		let inventory_upper_corners = c.height - inventory_height
		let strokeThickness = 5
		c.noStroke()
		c.fill(50,50,50,200)
		c.rect(inventory_left_corners - strokeThickness, inventory_upper_corners - strokeThickness, inventory_width + 2*strokeThickness, inventory_height + strokeThickness);

		c.noFill();
		c.stroke("gray");
		c.strokeWeight(2 * strokeThickness);
		c.rect(inventory_left_corners - strokeThickness, inventory_upper_corners - strokeThickness, inventory_width + 2*strokeThickness, inventory_height + strokeThickness);
		
		c.stroke("LightSlateGrey")
		c.strokeWeight(strokeThickness)
		for(var i = 0; i < inventory.length; i++){
			c.noFill()
			c.rect(inventory_left_corners + 100 * i, inventory_upper_corners, 100, 100)
			c.image(inventory[i].img, inventory_left_corners + 100 * i + 10, inventory_upper_corners + 10, 80, 80)
			if(i === 0){
				continue; //pickaxe heeft geen amount
			}
			let a = g.inventory[i].amount
			a = a === Infinity ? "∞" : a
			c.fill("white")
			c.textSize(15)
			c.text(a, inventory_left_corners + 100 * i + 10, inventory_upper_corners + 10)
			c.noFill()
		}
		if(g.selectedInventoryItem < inventory.length){
			c.stroke("darkgrey") //teken gekleurde rand om geselecteerde item, kan niet in for-loop omdat er iets overheen kan worden getekend
			c.rect(inventory_left_corners + 100 * g.selectedInventoryItem, inventory_upper_corners, 100, 100)
		}

		if(g.gameMode === "challenge"){
			c.imageMode(c.LEFT, c.TOP)
			for(var i = 0; i < 10; i++){
				//omzetten naar hp (0 - 100):
				let drawImage;
				let hp = (-100/g.maxTimeOfLavaHit) * g.timeOfLavaHit + 100;
				let a = hp > i * 10 && hp < (i + 1) * 10
				let b = hp === (i + 1) * 10;
				//c is al bezet
				let d = hp > (i + 1) * 10;
				let e = hp < i * 10;
				c.noTint()
				if(a){
					c.tint(255, ((hp % 10) / 10) * 255)
					drawImage = true;
				} else if(b || d){
					drawImage = true
				} else if(e){
					drawImage = false;
				} else {
					drawImage = false; //voor de zekerheid
				}
				//p5 kan het niet aan als er 10 images met tint worden getekend
				if(drawImage){
					c.image(heart, (c.width / 2) - 50 * inventory.length + 45 * i, c.height - 160, 40, 40)
				}

			}
			c.noTint();
		}



		//teken stats:
		c.textFont("monospace")
		c.fill('black');
		c.noStroke();
		c.textSize(30);
		if(g.settings.showFramerate){
			c.text("fps: " + Math.ceil(g.c.frameRate()), c.width - 150, 60);
		}

		displayMessages();

	}
	function gameOver(){
		c.background("darkgreen");
		c.textSize(30);
		c.textFont("Helvetica");
		c.textAlign(c.CENTER, c.CENTER);
		let returnButton = [c.width / 2 - 650, c.height - 200, 600, 100];
		let retryButton = [c.width / 2 + 50, c.height - 200, 600, 100];
		c.fill("green")
		c.stroke("black")
		c.strokeWeight(1)
		c.rect(...returnButton)
		c.rect(...retryButton)
		c.fill("white")
		c.noStroke()
		c.textSize(45)
		c.textFont(pixelFont)
		c.text("Back to home", c.width / 2 - 350, c.height - 150)
		c.text("Retry", c.width / 2 + 350, c.height - 150)
		c.text(`You failed level ${g.level} :/`, 0, 100, 1920, 300);
		if(rectClicked(...returnButton)){
			location.reload()
		}
		if(rectClicked(...retryButton)){
			g.gameState = "playing"
		}
		c.textAlign(c.LEFT);
	}
	function levelCompleted(){
		c.background("darkgreen");
		c.textSize(30);
		c.textFont("Helvetica");
		c.textAlign(c.CENTER, c.CENTER);
		let continueButton = [c.width / 2 - 300, c.height - 200, 600, 100];
		c.fill("green")
		c.stroke("black")
		c.strokeWeight(1)
		c.rect(...continueButton)
		c.fill("white")
		c.noStroke()
		c.textSize(45)
		c.textFont(pixelFont)
		c.text("Next level", c.width / 2, c.height - 150)
		c.text(`You passed level ${(g.level - 1)}!`, 0, 100, 1920, 300);
		if(rectClicked(...continueButton)){
			g.gameState = "playing"
		}
		c.textAlign(c.LEFT);
	}
	function rectClicked(x,y,width,height){
		return c.mouseX >= x && c.mouseX <= x + width && c.mouseY >= y && c.mouseY <= y + height && c.mouseIsPressed;
	}
	function handleInventoryPicker(){
		let index = undefined;
		for(var i = 1; i < 10; i++){
			if(c.keyIsDown(48 + i)){
				index = i - 1;
			}
		}
		if(c.keyIsDown(48)){
			index = 9;
		}
		if(index !== undefined){
			if(index < g.inventory.length){
				g.selectedInventoryItem = index;
			} else {
				g.selectedInventoryItem = g.inventory.length - 1
			}
		}
	}
	function displayMessages(){
		var i = 0;
		for(var message of g.messages){
			if(performance.now() - message.addTime > 5000){
				g.messages.splice(i, 1)
				continue;
			}
			switch(message.type){
				case "message":
					c.fill("black");
					break;
				case "warning":
					c.fill("red");
					break;
			}
			c.text(message.content, 50, 100 + 50 * i)
			i++
		}
	}
	function hideSliders(){
		if(g.gameState !== "settings"){
			gravitySlider.hide()
			renderDistanceSlider.hide()
			showFramerate.hide()
		}
	}
})
