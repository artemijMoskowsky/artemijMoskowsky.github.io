import Sprite from '/modules/sprite.js'
import Rect from '/modules/rect.js';
import { achievmentsMove } from '../utils/achievments.js';
class Explosion extends Sprite {
    constructor(x, y, width, height, imagePath = undefined, color = undefined, tagName="div",damage = 40) {
        super(x, y, width, height, imagePath, color, tagName)
        this.RECT = new Rect(this.X, this.Y, this.WIDTH, this.HEIGHT, this.ELEMENT)
        this.ELEMENT.style.zIndex = '1'
        //this.RADIUS_RANGE = radius
        this.ELEMENT.classList.add("bomb")
        //this.RADIUS_ELEM = document.createElement('div')
        //this.RADIUS_ELEM.style.position = 'absolute'
        //this.RADIUS_ELEM.style.left = `${this.X+(this.WIDTH/2)-this.RADIUS_RANGE/2}px`
        //this.RADIUS_ELEM.style.top = `${this.Y+(this.HEIGHT/2)-this.RADIUS_RANGE/2}px`
        //this.RADIUS_ELEM.style.width = `${this.RADIUS_RANGE}px`
        //this.RADIUS_ELEM.style.height = `${this.RADIUS_RANGE}px`
        //this.RADIUS_ELEM.classList.add("debugRadiusEnemy")
        //document.querySelector('.gameWorking').append(this.RADIUS_ELEM)
        //this.radius = new Rect(this.X+(this.WIDTH/2)-this.RADIUS_RANGE/2, this.Y+(this.HEIGHT/2)-this.RADIUS_RANGE/2, this.RADIUS_RANGE , this.RADIUS_RANGE, this.RADIUS_ELEM);
        //this.RADIUS_ELEM.style.zIndex = '1'

        this.animationCount = 0
        this.heroGotDamage = false
        this.DAMAGE = damage

        this.sound = new Audio('/sounds/explosion.mp3')
        this.sound.play()
    }

    animation(listElem){
        if (this.animationCount <= 3){
            this.animationCount += 1
            this.ELEMENT.src = `/images/blocks/explosion${this.animationCount}.png`
        } else{
            this.ELEMENT.remove()
            listElem.splice(listElem.indexOf(this),1)
        }
        
    }

    explosionDamage(hero,gotAchieve) {
        this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
        //this.radius.RECT.RECT = this.RECT.getRect(this.RADIUS_ELEM)
        if (this.RECT.RECT.top < hero.RECT.RECT.top && this.RECT.RECT.bottom > hero.RECT.RECT.top || this.RECT.RECT.bottom > hero.RECT.RECT.bottom && this.RECT.RECT.top < hero.RECT.RECT.bottom){ //this.radius.RECT.RECT.top < hero.RECT.RECT.top && this.radius.RECT.RECT.bottom > hero.RECT.RECT.bottom
            if (
                this.RECT.RECT.left > hero.RECT.RECT.left && hero.RECT.RECT.right >= this.RECT.RECT.left
                ) {
                    if (this.heroGotDamage == false){
                        this.heroGotDamage = true
                        hero.health -= this.DAMAGE
                        if (hero.health > 0){
                            if (!window.localStorage.getItem(`${hero.NAME}`).includes('explosion')){
                                if (!gotAchieve) {
                                    window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; explosion`)
                                    hero.CONTENT = window.localStorage.getItem(hero.NAME)

                                    achievmentsMove('../images/achievements/explosion.png','Я в порядку, сір',"Вижити після вибуху (обов'язково отримати шкоду від вибуху та вижити)")
                                    hero.heroAchievements.play()
                                }
                            }
                        }
                    }

            } else if (
                this.RECT.RECT.right < hero.RECT.RECT.right && hero.RECT.RECT.left <= this.RECT.RECT.right
                ) {
                    if (this.heroGotDamage == false){
                        this.heroGotDamage = true
                        if (hero.god == false){
                            hero.health -= this.DAMAGE
                        }

                        if (hero.health > 0){
                            if (!window.localStorage.getItem(`${hero.NAME}`).includes('explosion')){
                                if (!gotAchieve) {
                                    window.localStorage.setItem(`${hero.NAME}`,`${thero.CONTENT}; explosion`)
                                    hero.CONTENT = window.localStorage.getItem(hero.NAME)

                                    achievmentsMove('../images/achievements/explosion.png','Я в порядку, сір')
                                    hero.heroAchievements.play()
                                }
                            }
                        }

                    }
                    
            } else if (
                this.RECT.RECT.left < hero.RECT.RECT.left && hero.RECT.RECT.right < this.RECT.RECT.right
                ) {
                    if (this.heroGotDamage == false){
                        this.heroGotDamage = true
                        if (hero.god == false){
                            hero.health -= this.DAMAGE
                        }
                        
                        if (hero.health > 0){
                            if (!window.localStorage.getItem(`${hero.NAME}`).includes('explosion')){
                                if (!gotAchieve) {
                                    window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; explosion`)
                                    hero.CONTENT = window.localStorage.getItem(hero.NAME)

                                    achievmentsMove('../images/achievements/explosion.png','Я в порядку, сір')
                                    hero.heroAchievements.play()
                                }
                            }
                        }
                    }
                }
        }
    }
    
}

export default Explosion