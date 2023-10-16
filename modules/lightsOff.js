import Sprite from '/modules/sprite.js'
import Rect from "/modules/rect.js";

class lightLever extends Sprite{
    constructor(x, y, width, height, imagePath = undefined, color = undefined, tagName="div",backgroundImage = undefined){
        super(x,y,width,height,imagePath,color,tagName)    
        this.RADIUS_ELEM = document.createElement('div')
        this.RADIUS_ELEM.style.position = 'absolute'
        this.RADIUS_ELEM.style.width = '300px'
        this.RADIUS_ELEM.style.height = '300px'
        this.ELEMENT.style.zIndex = '2'
        this.RADIUS_ELEM.style.left = `${this.X-100}px`
        this.RADIUS_ELEM.style.top = `${this.Y-100}px`
        document.querySelector('.gameWorking').append(this.RADIUS_ELEM)
        this.RECT = new Rect(this.X, this.Y, this.WIDTH, this.HEIGHT, this.ELEMENT)
        this.radius = new Rect(this.X+100, this.Y-100, 300, 300, this.RADIUS_ELEM);
        this.onSound = new Audio('/sounds/powerUp.mp3')
        this.offSound = new Audio('/sounds/powerDown.mp3')
        this.light = true
        this.ELEMENT.classList.add('light')
        this.backgroundImage = backgroundImage  
        this.canOffLight = 100
        this.Key = undefined
        this.BUTTON_ELEM = document.createElement('img')
        this.BUTTON_ELEM.src = 'images/buttons/E_button1.png'
        this.BUTTON_ELEM.style.opacity = '0'
        this.BUTTON_ELEM.style.position = 'absolute'
        this.BUTTON_ELEM.style.width = '75px'
        this.BUTTON_ELEM.style.height = '75px'
        this.BUTTON_ELEM.style.left = `${this.X+12}px`
        this.BUTTON_ELEM.style.top = `${this.Y-70}px`
        this.BUTTON_ELEM.style.zIndex = '5'
        document.querySelector('.gameWorking').append(this.BUTTON_ELEM)
        this.animationButton = 1
        this.opacity = 500
        this.progressCount = 50
        this.progressElem = document.createElement('div')
        this.progressElem.style.position = 'absolute'
        this.progressElem.style.top = `${this.Y-100}px`
        this.progressElem.style.left = `${this.X}px`
        this.progressElem.style.backgroundColor = 'rgb(255,255,102)'
        this.progressElem.style.border = '5px solid black'
        this.progressElem.style.width = `${this.WIDTH}px`
        this.progressElem.style.height = '50px'
        this.progressElem.style.zIndex = '6'
        document.querySelector('.gameWorking').append(this.progressElem)
    }

    lightsOff(hero, listElem, enemyList, dealerList){

        this.light = false

        //hero.ELEMENT.style.filter = 'brightness(30%)'

        //for (let obj of listElem){
        //    obj.ELEMENT.style.filter = 'brightness(30%)'
        //}
//
        for (let obj of enemyList){
            //obj.ELEMENT.style.filter = 'brightness(30%)'
            obj.ELEMENT.style.opacity = '0'
            obj.HEALTH_ELEM.style.opacity = '0'
        }
//
        //for (let obj of dealerList){
        //    obj.ELEMENT.style.filter = 'brightness(30%)'
        //}

        // for (let obj of decList){
        //     obj.ELEMENT.style.filter = 'brightness(30%)'
        // }


        this.ELEMENT.src = '../images/light/off.png'
        document.querySelector('.gameWorking').style.filter = 'brightness(30%)'    //.background = `linear-gradient( rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0.5) ),url('/images/blocks/Block2.png');`


        this.offSound.volume = 0.1
        this.offSound.play()
    }

    lightsOn(hero, listElem, enemyList, dealerList){
        if (this.progressCount == 0){
            
            this.canOffLight = 1500

            this.light = true

            //hero.ELEMENT.style.filter = ''

            //for (let obj of listElem){
            //    obj.ELEMENT.style.filter = ''
            //}
//
            for (let obj of enemyList){
                //obj.ELEMENT.style.filter = ''
                obj.ELEMENT.style.opacity = '1'
                obj.HEALTH_ELEM.style.opacity = '1'
            }
//
            //for (let obj of dealerList){
            //    obj.ELEMENT.style.filter = ''
            //}

            document.querySelector('.gameWorking').style.filter = ''

            this.ELEMENT.src = '../images/light/on.png'

            this.onSound.volume = 0.1
            this.onSound.play()
            this.progressElem.style.width = `${this.WIDTH}px`
            this.progressCount = 50
    } else {
        this.progressCount --
        this.progressElem.style.width = `${this.WIDTH/50*this.progressCount}px`
    }
    
    }

    heroInRadious(hero, listElem, enemyList, dealerList){

        if (this.canOffLight > 0){
            this.canOffLight--
        } else if (this.canOffLight <= 0){
            this.canOffLight = 0
        }

        this.radius.RECT.RECT = this.RECT.getRect(this.RADIUS_ELEM)
        if (this.radius.RECT.RECT.top < hero.RECT.RECT.top && this.radius.RECT.RECT.bottom > hero.RECT.RECT.top || this.radius.RECT.RECT.bottom > hero.RECT.RECT.bottom && this.radius.RECT.RECT.top < hero.RECT.RECT.bottom){
            if (this.radius.RECT.RECT.left < hero.RECT.RECT.right && this.radius.RECT.RECT.right > hero.RECT.RECT.right || this.radius.RECT.RECT.right > hero.RECT.RECT.left && this.radius.RECT.RECT.left < hero.RECT.RECT.right){
                if (this.opacity < 1 && this.light == false) {
                    this.opacity += 0.1
                    this.BUTTON_ELEM.style.opacity = `${this.opacity}`;
                }   
                if (this.Key == 'KeyE' && this.light == false){
                    this.lightsOn(hero, listElem, enemyList, dealerList)
                }         
            } else {
                //
                if (this.opacity > 0) {
                    this.opacity -= 0.1
                    this.BUTTON_ELEM.style.opacity = `${this.opacity}`;
                }
            }

            
        } else {
            //
        }
    }
}


export default lightLever