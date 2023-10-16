import Sprite from '/modules/sprite.js'

class movingPlatforms extends Sprite{
    constructor(x, y, width, height, imagePath = undefined, color = undefined, tagName="div", direction='horizontal'){
        super(x, y, width, height, imagePath, color, tagName)
        this.DIR = direction
        this.moveCount = 0
        if (this.DIR == 'horizontal'){
            this.DIR_NOW = 'left'
            this.ELEMENT.classList.add('horizontal')
        } else{
            this.DIR_NOW = 'up'
            this.ELEMENT.classList.add('vertical')
        }
    }
    move(){
        if (this.DIR == 'horizontal'){
            if (this.DIR_NOW == 'left'){
                if (this.moveCount < 50){
                    this.moveCount++
                } else {
                    this.DIR_NOW = 'right'
                }

                this.X -= 5

                this.ELEMENT.style.left = `${this.X}px`
            } else if (this.DIR_NOW == 'right') {
                if (this.moveCount > 0){
                    this.moveCount--
                } else {
                    this.DIR_NOW = 'left'
                }

                this.X += 5

                this.ELEMENT.style.left = `${this.X}px`
            }
        } else if (this.DIR == 'vertical') {
            if (this.DIR_NOW == 'up'){
                if (this.moveCount < 50){
                    this.moveCount++
                } else {
                    this.DIR_NOW = 'down'
                }

                this.Y -= 5

                this.ELEMENT.style.top = `${this.Y}px`
            } else if (this.DIR_NOW == 'down') {
                if (this.moveCount > 0){
                    this.moveCount--
                } else {
                    this.DIR_NOW = 'up'
                }

                this.Y += 5

                this.ELEMENT.style.top = `${this.Y}px`
            }
        }
    }
}

export default movingPlatforms