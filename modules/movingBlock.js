import Sprite from "/modules/sprite.js";
import Rect from "/modules/rect.js";
import {achievmentsMove} from '../utils/achievments.js'

class movingBlock extends Sprite{
    constructor(x, y, width, height, imagePath = undefined, color = undefined, tagName="div",wait){
        super(x, y, width, height, imagePath, color, tagName)
        this.StartY = y
        this.Fall = false
        this.ELEMENT.classList.add('movingBlock')
        this.RECT = new Rect(this.X,this.Y,this.WIDTH,this.HEIGHT,this.ELEMENT)
        this.SPEED = 15
        this.WAIT = wait
    }
    falling(hero,listElem){
        if (this.RECT.colTop([hero],this.RECT.RECT)){
            setTimeout(()=>{
                this.Fall = true
            },this.WAIT)
            
        }
        if (this.Fall == true){
            for(let i = 0; i < this.SPEED; i++){
                if (this.RECT.colBottom(listElem,this.RECT.RECT) || this.Y > 1280){
                    this.Fall = false
                }
                if (this.Fall == true){
                    this.Y ++
                    this.ELEMENT.style.top = `${this.Y}px`
                    this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                }
            }
        }
        if (this.Fall == false && this.Y != this.StartY){
            for(let i = 0; i < this.SPEED; i++){
                if (this.Y == this.StartY){
                    break
                } else {
                    this.Y --
                    this.ELEMENT.style.top = `${this.Y}px`
                    this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                }
            
            
            }   
        }
    }
}

export default movingBlock