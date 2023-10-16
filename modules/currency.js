import Sprite from '/modules/sprite.js';
import Rect from "/modules/rect.js"

class Currency extends Sprite{
    constructor(x,y,width,height,imagePath = undefined, color = undefined, tagName = 'div', current=1){
        super(x,y,width,height,imagePath,color,tagName)
        this.ELEMENT.style.zIndex = '1'
        this.CURRENT = current
        this.RECT = new Rect(this.X, this.Y, this.WIDTH, this.HEIGHT, this.ELEMENT)
        this.ELEMENT.classList.add('drop')
    }
    
    // Додаємо падіння монетки
    currencyFall(listElem, currency_list){
        if (this.RECT.colBottom(listElem, this.RECT.RECT) != true){
            this.Y += 1
            this.ELEMENT.style.top = `${this.Y}px`
            this.ELEMENT.style.bottom = `${this.Y+this.HEIGHT}px`
            this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
            if (this.Y >= 1080){
                this.ELEMENT.remove()
                currency_list.splice(currency_list.indexOf(this),1)
            }
    }
}
}
export default Currency