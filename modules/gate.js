import Sprite from '/modules/sprite.js'
import Rect from '/modules/rect.js'
// 800px
class Gate extends Sprite{
    constructor(x, y, width, height, imagePath = undefined, color = undefined, tagName="div",direction){
        super(x,y,width,height,imagePath,color,tagName)
        this.RECT = new Rect(this.X, this.Y, this.WIDTH, this.HEIGHT, this.ELEMENT)
        this.ELEMENT.style.display = 'none';
        this.ELEMENT.style.transitionDuration = '1'
        this.ELEMENT.style.backgroundImage = 'url(/images/blocks/gate/1.png)'
        this.ELEMENT.style.backgroundRepeat = 'repeat';
        this.STUCK = false
        this.animCount = 1
        this.animCooldown = 40
        this.DIR = direction
        this.ELEMENT.classList.add("gate")
        this.ELEMENT.style.zIndex = '1'
    }
    checkDIR(hero,enemyList){
        for (let enemy of enemyList){
            if (enemy.BOSS != false){
                if (enemy.BOSS != false && enemy.health <= 0){
                    this.ELEMENT.style.display = 'none';
                } else {
                    if (this.DIR != 'right'){
                        if (hero.X >= this.X){
            
                            this.ELEMENT.style.display = 'block';
                            if (this.animCount <= 7){
                                this.animCount += 1
                            }
                            this.ELEMENT.style.backgroundImage = `url("/images/blocks/gate/${this.animCount}.png")` ///images/blocks/gate/1.png
                        }
            
                    } else{
                        this.ELEMENT.style.display = 'block';
                        if (this.animCount <= 7){
                            this.animCount += 1
                        }
                        this.ELEMENT.style.backgroundImage = `url("/images/blocks/gate/${this.animCount}.png")`
                    }
                }
            }  
        
        }

        //setTimeout(()=>{
        //    this.ELEMENT.style.display = 'block';
        //    this.interval = setInterval(()=>{
        //        if (this.animCount <= 8){
        //            this.animCount += 1
        //        }
        //        this.ELEMENT.style.backgroundImage = `url(../images/blocks/${this.animCount}.png)`
        //    },this.animCooldown)
        //},500)
    }
}

export default Gate