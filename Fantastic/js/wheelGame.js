let fortuneWheelGame;
let coinSpinAnim;
var wheelConfig;
var reelNumber = 0;
// window loads event
window.onload = function() {

    // phaser game configuration object
    var gameConfig = {    
       type: Phaser.WEBGL,          // render type
       width: 1537,                 // game width, in pixels
       height: 1537,                // game height, in pixels    
       backgroundColor: 0xa3a3a3,   // game background color
       scene: [FortuneWheelChina6, FortuneWheelAncient8, FortuneWheelCasual10, FortuneWheelMedieval12, FortuneWheelPirates16 ],       // scenes used by the game  
       audio: 
	   {
			                        // disableWebAudio: true
       },
       scale: {
           mode: Phaser.Scale.FIT   // SHOW_ALL, RESIZE, FIT, //  autoCenter: Phaser.Scale.CENTER_BOTH   
      }
    };
   
    fortuneWheelGame = new Phaser.Game(gameConfig);     // game constructor
    window.focus()                                      // pure javascript to give focus to the page/frame 
                                                        // scale  resize();  window.addEventListener("resize", resize, false); - not used
}

// FortuneWheel scene
class CommonWheel extends Phaser.Scene{
  
    setWheelConfig(){ }

    // method to be executed when the scene preloads
    preload(){
        this.setWheelConfig();
        console.log(this.textures);

        // loading images
        wheelConfig.sprites.forEach((s)=>{
            if(this.textures.exists(s.name))  this.textures.remove(s.name); //   
            if(s.fileName != null) this.load.image(s.name, wheelConfig.assetPath + "png/" + s.fileName);
        });
        this.load.spritesheet("coinspin", wheelConfig.assetPath + "png/CoinSheet.png", { frameWidth: 200, frameHeight: 200});

        // set config variables
        this.useSpinArrow = (this.getSpriteData('spinarrow') != null && this.getSpriteData('spinarrow').fileName != null);
        this.usePointer = (this.getSpriteData('pointer') != null && this.getSpriteData('pointer').fileName != null);
  
        // loading sounds
        this.load.audio('pointer_hit_clip', ['audio/pointer_hit.ogg', 'audio/pointer_hit.mp3' ]);  // this.load.audio('wheel_spin_clip', 'audio/spin_sound.mp3'); this.load.audio('coins_clip', 'audio/win_coins.wav');
        this.load.audio('win_clip', ['audio/win_sound.ogg','audio/win_sound.mp3']);
        
        // loading bitmap fonts
        this.load.bitmapFont('sectorFont', 'fonts/' + wheelConfig.fontName +'.png', 'fonts/'+ wheelConfig.fontName + '.xml');

        // buttons
        this.load.image('nextbutton',  "png/NextButton.png");
        this.load.image('nextbutton_hover',  "png/NextButtonHover.png");
        this.load.image('previousbutton',  "png/PreviousButton.png");
        this.load.image('previousbutton_hover',  "png/PreviousButtonHover.png");
    }

    // method to be executed once the scene has been created
    create(){
        this.sectorsCount = wheelConfig.sectors.length;
        this.centerX = (fortuneWheelGame.config.width / 2) + wheelConfig.centerOffsetX;
        this.centerY = (fortuneWheelGame.config.height / 2) + wheelConfig.centerOffsetY;

        // add sprites
        this.background = this.addSprite('background')?.setScale(1.5);
        this.wheelborder = this.addSprite('wheelborder');

        this.wCont = this.add.container(this.centerX, this.centerY); // ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€ Ñ€ÐµÐ½Ð´ÐµÑ€Ð¸Ñ‚ÑÑ Ð¿Ð¾ÑÐ»Ðµ outer Ñ‚ÑƒÑ‚ ÐµÐ³Ð¾ Ð¸ ÑÑ‚Ð°Ð²Ð¸Ð¼

        this.wheel = this.add.sprite(0, 0, "wheel")?.setOrigin(0.5, 0.5);
        this.lightsector = this.addSprite('lightsector')?.setAlpha(0); 

        // setup spin button
        this.spinbutton = this.addSprite('spinbutton'); 
        this.spinbutton.on('pointerdown',this.spinDown,this);
        this.spinbutton.on('pointerup',this.spinUp,this);
        this.spinbutton.on('pointerover',this.spinOver,this);
        this.spinbutton.on('pointerout',this.spinOut,this);
        this.spinbutton.setInteractive();

        this.pointer = this.addSprite('pointer');
        this.centerpin = this.addSprite('centerpin');

        // adding the text field
        this.prizeText = this.add.bitmapText(this.centerX, this.centerY + 640, 'sectorFont', 'SPIN THE WHEEL', 72, 1).setOrigin(0.5);
        this.prizeText.tint =  wheelConfig.prizeTextTint;

        // create wheel with sectors
        this.wCont.add(this.wheel);
        this.wCont.angle = 0;

        var offsetSectText = 120;
        var sectAngle = Math.PI * 2 / this.sectorsCount;
        var piD2 = Math.PI / 2;
        for(var i = 0; i < this.sectorsCount; i++)
        {
            var posX = offsetSectText * Math.cos (-sectAngle * i - piD2);
            var posY = offsetSectText * Math.sin (-sectAngle * i - piD2);
            this.sectorText = this.add.bitmapText(posX,  posY, 'sectorFont', wheelConfig.sectors[i].text, 36, 1).setOrigin(0, 0.5);
            this.sectorText.tint = wheelConfig.sectorsTextTint;
            this.sectorText.angle = (-sectAngle * i - piD2) * 180/Math.PI;
            this.wCont.add(this.sectorText);
        }

        if(this.useSpinArrow)  this.spinArrow = this.addSprite('spinarrow').setAlpha(0);

        // add sounds 
        this.pointer_hit_clip = this.sound.add('pointer_hit_clip');  // this.wheel_spin_clip = this.sound.add('wheel_spin_clip'); this.coins_clip = this.sound.add('coins_clip');
        this.win_clip = this.sound.add('win_clip');

        // create animations
        coinSpinAnim = this.anims.create({             
            key: 'spin',
            frames: this.anims.generateFrameNumbers('coinspin'),
            frameRate: 16,
            repeat: -1
        });
       
        this.coinParticles = this.add.particles('coinspin');
       
        // the game has just started and we can spin the wheel
        this.canSpin = true;
        this.animPointerComplete = true;       
       if(this.useSpinArrow) this.animSpinArrow();

        // setup next button
        this.nextbutton = this.add.sprite(this.centerX + 600, this.centerY, 'nextbutton').setOrigin(0.5, 0.5);
        this.nextbutton.on('pointerdown',()=>{ reelNumber++; reelNumber = (reelNumber<=4) ? reelNumber : 0; this.showNextReel();}, this);
        this.nextbutton.on('pointerup',()=>{}, this);
        this.nextbutton.on('pointerover',()=>{}, this);
        this.nextbutton.on('pointerout',()=>{}, this);
        this.nextbutton.setInteractive();

         // setup previous button
         this.previousbutton = this.add.sprite(this.centerX -  600, this.centerY, 'previousbutton').setOrigin(0.5, 0.5);
         this.previousbutton.on('pointerdown',()=>{ reelNumber--; reelNumber = (reelNumber>=0) ? reelNumber : 4; this.showNextReel();}, this);
         this.previousbutton.on('pointerup',()=>{}, this);
         this.previousbutton.on('pointerover',()=>{}, this);
         this.previousbutton.on('pointerout',()=>{}, this);
         this.previousbutton.setInteractive();
    }

    update(time, delta) // https://newdocs.phaser.io/docs/3.52.0/focus/Phaser.Scene-update
    {   
     //  console.log('elapsed time: ' + this.game.time.totalElapsedSeconds());
       if(!this.canSpin)
       {
           if(this.usePointer && this.animPointerComplete && this.wheelSpeed > 0.1)
           {
               this.pointerTweenDuration = 360/this.wheelSpeed/this.sectorsCount;
               this.animPointer();
           }
       }
    }

    // function to spin the wheel
    spinWheel(){

        var oldTime;    // spin tween elapsed time 
        var oldValue;   // spin tween last value  

        // can we spin the wheel?
        if(this.canSpin){
            if(this.lightTween != null)
            {
                this.lightTween.stop();
                this.lightsector.setAlpha(0);
            }

            if(this.arrowTween != null)
            {
                this.arrowTween.stop();
                this.spinArrow.setAlpha(0);
            }

            if(this.coinsEmitter!=null)
            {
                this.coinsEmitter.stop();
            }

            this.win_clip.stop(); // this.wheel_spin_clip.setLoop(true); this.wheel_spin_clip.play();

            // resetting text field
            this.prizeText.setText("wait ...");

            // the wheel will spin round for some times. 
            var rounds = Phaser.Math.Between(wheelConfig.wheelRounds.min, wheelConfig.wheelRounds.max);

            // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
            var rand_sector = Phaser.Math.Between(0, wheelConfig.sectors.length - 1);
            var rand_degrees = rand_sector * 360/wheelConfig.sectors.length;

            // then will rotate back by a random amount of degrees
            var backDegrees = Phaser.Math.Between(wheelConfig.backSpin.min, wheelConfig.backSpin.max);

            // now the wheel cannot spin because it's already spinning
            this.canSpin = false;

            // animation tweeen for the spin
            this.tweens.add({              
                targets: [this.wCont],                                  // adding the wheel to tween targets               
                angle: 360 * rounds + rand_degrees + backDegrees,       // angle destination           
                duration: Phaser.Math.Between(wheelConfig.rotationTimeRange.min, wheelConfig.rotationTimeRange.max),    // tween duration             
                ease: "Cubic.easeOut",                          // tween easing               
                callbackScope: this,                            // callback scope           
                onComplete: function(tween){                    // function to be executed once the tween has been completed
                    this.showCoins();                 
                    this.tweens.add({                           // another tween to rotate a bit in the opposite direction
                        targets: [this.wCont],
                        angle: this.wCont.angle - backDegrees,
                        duration: Phaser.Math.Between(wheelConfig.rotationTimeRange.min, wheelConfig.rotationTimeRange.max) / 8,
                        ease: "Cubic.easeIn",
                        callbackScope: this,
                        onComplete: function(tween_1){
                            this.prizeText.setText(wheelConfig.sectors[rand_sector].text);  // displaying prize text  
                            
                            // insert here yuor win event handler
                            console.log('spin complete');                          
                            this.canSpin = true;                                            // player can spin again                      
                            this.animLightSector();                                         // this.wheel_spin_clip.stop();
                            this.win_clip.play();
                        }
                    })
                },
                onUpdate : function(tween)
                {
                    var dValue= tween.getValue([0]) - oldValue;
                    var dTime = tween.elapsed - oldTime;
                    this.wheelSpeed = (dTime!=null) ? dValue/dTime : 0;
                    oldTime = tween.elapsed;
                    oldValue = tween.getValue([0]);  // console.log('tween progress: ' + tween.progress + '; delta value: ' + dValue  + '; delta time: '+ dTime + 'speed: ' + wheelSpeed);
                }
            });
        }
    }

    animPointer()
    {
        this.animPointerComplete = false;
        this.tweens.add({
            targets: [this.pointer],
            angle: -15,
            duration: this.pointerTweenDuration * 5/6,
            ease: "Cubic.easeOut",
            callbackScope: this,
            onComplete: function(tween)
            {
                this.pointer_hit_clip.play();
                this.tweens.add({
                    targets: [this.pointer],
                    angle: this.pointer.angle + 15,
                    duration: this.pointerTweenDuration * 1/6,
                    ease: "Cubic.easeIn",
                    callbackScope: this,
                    onComplete: function(tween)
                    {
                        this.animPointerComplete = true;
                    }
                })
            },
           
        });
    }

    animLightSector()
    {
        var loopsCount = 0;     // lightTween loops counter
        this.lightTween =  this.tweens.add({
            targets: this.lightsector,
            alphaTopLeft: { value: 1, duration: wheelConfig.lightTweenDuration, ease: 'Power1' },
            alphaTopRight: { value: 1, duration: wheelConfig.lightTweenDuration, ease: 'Power1' },
            alphaBottomRight: { value: 1, duration: wheelConfig.lightTweenDuration, ease: 'Power1' },
            alphaBottomLeft: { value: 1, duration: wheelConfig.lightTweenDuration, ease: 'Power1' },
            yoyo: true,
            loop: 5,
            callbackScope: this,
            onLoop: function(tween)
            {
                  loopsCount++;
                  if(loopsCount == 2)               // stop coins emitter
                  {                     
                      this.coinsEmitter.stop();     // this.coins_clip.play();
                  }
                  else if(loopsCount == 4)          // enable spin arrow
                  {
                     if(this.useSpinArrow) this.animSpinArrow();
                  }
            },
           
        });
    }

    animSpinArrow() // not used in current version
    {
        this.arrowTween =  this.tweens.add({
            targets: this.spinArrow,
            delay: 300,
            alphaTopLeft: { value: 1, duration: wheelConfig.lightTweenDuration, ease: 'Power1' },
            alphaTopRight: { value: 1, duration: wheelConfig.lightTweenDuration, ease: 'Power1' },
            alphaBottomRight: { value: 1, duration: wheelConfig.lightTweenDuration, ease: 'Power1' },
            alphaBottomLeft: { value: 1, duration: wheelConfig.lightTweenDuration, ease: 'Power1' },
            yoyo: true,
            loop: 3
        });
    }

    showCoins()
    {
        this.coinsEmitter = this.coinParticles.createEmitter({
            x: this.centerX,
            y: -100,
            frame: 0,
            quantity: 3,
            frequency: 200,
            angle: { min: -30, max: 30 },
            speedX:  { min: -200, max: 200 },
            speedY: { min: -100, max: -200 },
            scale: { min: 0.4, max: 0.5 },
            gravityY: 400,
            lifespan: { min: 10000, max: 15000 },
            particleClass: AnimatedParticle
        });
    }

    spinUp() {
        this.spinbutton.setTexture('spinbutton'); // console.log('button up', arguments);
        this.spinWheel();
    }

    spinDown() {   
        if (this.canSpin) this.spinbutton.setTexture('spinbutton_hover'); // console.log('button down', arguments);
    }

    spinOver() {
        //  console.log('button over');
    }

    spinOut() {  
         this.spinbutton.setTexture('spinbutton'); // console.log('button out');
    }

    // adding a sprite by name with a given offset and origin (from wheel_config_.js file)
    addSprite(name)
    {
      var spriteData = this.getSpriteData(name);
      if(spriteData == null || spriteData.fileName === null) return null;
      return  this.add.sprite(this.centerX + spriteData.offsetX, this.centerY + spriteData.offsetY, name).setOrigin(spriteData.originX, spriteData.originY);
    } 

    // return import data of the sprite from the wheel_config_.js file
    getSpriteData(spriteName)
    {
        for(var si = 0; si < wheelConfig.sprites.length; si++)
        {
            if(wheelConfig.sprites[si].name === spriteName) return wheelConfig.sprites[si];
        }
        return null;
    }

    showNextReel()
    {
        console.log('reelNumber: ' + reelNumber);
        if(reelNumber == 0){
            this.scene.start('FortuneWheelChina6');
        } else if(reelNumber == 1){
           // this.scene.stop("FortuneWheelChina6")
            this.scene.start('FortuneWheelAncient8');
        } else if(reelNumber == 2){
            this.scene.start('FortuneWheelMedieval12');
        } else if(reelNumber == 3){
            this.scene.start('FortuneWheelPirates16');
        } else if(reelNumber == 4){
            this.scene.start('FortuneWheelCasual10');
        }

    }
}

class FortuneWheelChina6 extends CommonWheel{
    // constructor
    constructor(){
        super("FortuneWheelChina6"); // scene key FortuneWheel
    }

    setWheelConfig(){
        wheelConfig = wheelConfig_china_6;
        console.log('set china');
    }

}

class FortuneWheelAncient8 extends CommonWheel{

    constructor(){
        super("FortuneWheelAncient8"); // scene key FortuneWheel
    }

    setWheelConfig(){
        wheelConfig = wheelConfig_ancient_8;
        console.log('set ancient');
    }

}

class FortuneWheelMedieval12 extends CommonWheel{
    constructor(){
        super("FortuneWheelMedieval12"); // scene key FortuneWheel
    }

    setWheelConfig(){
        wheelConfig = wheelConfig_medieval_12;
        console.log('set medieval');
    }

}

class FortuneWheelPirates16  extends CommonWheel{

    constructor(){
        super("FortuneWheelPirates16"); // scene key FortuneWheel
    }

    setWheelConfig(){
        wheelConfig = wheelConfig_pirates_16;
        console.log('set pirates');
    }

}

class FortuneWheelCasual10 extends CommonWheel{
    constructor(){
        super("FortuneWheelCasual10"); // scene key FortuneWheel
    }

    setWheelConfig(){
        wheelConfig = wheelConfig_casual_10;
        console.log('set casual');
    }

}

