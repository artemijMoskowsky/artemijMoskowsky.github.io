import Sprite from "/modules/sprite.js";
import Rect from "/modules/rect.js"

class Bullet extends Sprite{
    constructor(x,y,width,height, imagePath = undefined, color = undefined, tagName = 'div', direction, speed,damage){
        super(x,y,width,height, imagePath, color, tagName)
        this.SPEED = speed
        this.DIRECTION = direction
        this.healthCount = 10
        this.ELEMENT.classList.add('bullet')
        this.ELEMENT.style.zIndex = '1'
        this.damage = damage
        this.RECT = new Rect(this.X, this.Y, this.WIDTH, this.HEIGHT, this.ELEMENT)
        this.sound = new Audio('/sounds/bulletSound.mp3')
        this.sound.volume = 0.1;
        this.sound.play()
        this.animCount = 0
        this.ELEMENT.style.transitionDuration = '50ms'
        if (this.DIRECTION == 'left'){
            this.ELEMENT.classList.add('left')
        }
    }
    

    // Рух пулі
    move(){
        this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
        if (this.DIRECTION == 'left'){
            this.X -= this.SPEED
            this.ELEMENT.style.left = `${this.X}px`
        }
        if (this.DIRECTION == 'right'){
            this.X += this.SPEED
            this.ELEMENT.style.left = `${this.X}px`
        }
    }
    // Час до зникнення
    bulletLife(bullets, listElem){
        for (let elem of listElem){
            if (this.RECT.RECT.left <= elem.X + elem.WIDTH && this.RECT.RECT.right >= elem.X){
                if (this.RECT.RECT.bottom >= elem.Y && this.RECT.RECT.top <= elem.Y+elem.HEIGHT){
                    if (this.healthCount > 2 && elem.ELEMENT.src.includes('note') != true){
                        this.healthCount = 2
                    }
                }}
            if (this.RECT.RECT.right >= elem.X && this.RECT.RECT.left <= elem.X + elem.WIDTH){
                if (this.RECT.RECT.bottom >= elem.Y && this.RECT.RECT.top <= elem.Y+elem.HEIGHT){
                    if (this.healthCount > 2 && elem.ELEMENT.src.includes('note') != true){
                        this.healthCount = 2
                    }
                }}
        }
        if (this.healthCount != 0){
            this.healthCount--
            if (this.animCount < 10){
                this.animCount++
            }
            
        }
        if (this.healthCount == 0 && this.ELEMENT != undefined){
            this.ELEMENT.remove()
            bullets.splice(bullets.indexOf(this),1)
        }
        this.ELEMENT.src = `/images/bullet/bullet${this.animCount}.png`
        return bullets
    }

}

export default Bullet