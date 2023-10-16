import Sprite from '/modules/sprite.js'
import Rect from '/modules/rect.js';
import Currency from '/modules/currency.js';
import Enemy from '/modules/enemy.js'
import Explosion from '/modules/explosionDamage.js';
import { achievmentsMove } from '../utils/achievments.js';

class Box extends Sprite {
    constructor(x, y, width, height, imagePath = undefined, color = undefined, tagName="div",loot) {
        super(x, y, width, height, imagePath, color, tagName)
        this.Health = 5;
        this.loot = loot
        this.RECT = new Rect(this.X, this.Y, this.WIDTH, this.HEIGHT, this.ELEMENT)
        this.ELEMENT.classList.add('box')
        this.got = false
        this.ELEMENT.style.zIndex = '1'
    }
    gotDamage(bullet, currency_list, listElem,hero,enemyList,room,gotAchieve) {
        this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
        if (this.RECT.RECT.left <= bullet.RECT.RECT.right && this.RECT.RECT.right >= bullet.RECT.RECT.left){
            if (this.RECT.RECT.bottom >= bullet.RECT.RECT.top && this.RECT.RECT.top <= bullet.RECT.RECT.bottom){
                if (this.Health > 0) {
                    this.Health -= bullet.damage
                }
            }
        }
        if (this.Health <= 0 && this.got == false){
            hero.boxCount -= 1
            // hero.boxTaskText.textContent = `Треба зламати ${hero.boxCount} коробок`;
            this.got = true
            if (this.loot == 'details') {
                var coin = new Currency(this.X+20,this.Y+30,30,30,'/images/enemy/drop/Details.png',undefined,'img', 5)
                currency_list.push(coin)
            } else if (this.loot == 'f_a_k'){
                var coin = new Currency(this.X+20,this.Y+30,30,30,'/images/enemy/drop/f_a_k.png',undefined,'img', 10)
                currency_list.push(coin)
            } else if (this.loot == 'random'){
                this.random = Math.floor(Math.random()*5)
                // this.random = 4
                switch(this.random){
                    case 0:
                        var coin = new Currency(this.X+20,this.Y+30,30,30,'/images/enemy/drop/f_a_k.png',undefined,'img', 20)
                        currency_list.push(coin)
                        break
                    case 1:
                        var coin = new Currency(this.X+20,this.Y+30,30,30,'/images/enemy/drop/Details.png',undefined,'img', 10)
                        currency_list.push(coin)
                        break
                    case 2:
                        var enemy = new Enemy(this.X,this.Y,50, 50, "/images/enemy/flying/fly_npc_", undefined, 'img', 5*(room/2),true, 7*(room/2),6, false, 700)
                        enemyList.push(enemy)
                        for (let enemy of enemyList){
                            enemy.RADIUS_ELEM.style.backgroundColor = 'rgba(0,0,0,0)'
                        }
                        break
                    case 3:
                        var bomb = new Explosion(this.X-150,this.Y-150,400,400,'/images/blocks/explosion1.png',undefined,'img',40)
                        listElem.push(bomb)
                        bomb.explosionDamage(hero,listElem)
                        break
                    case 4:
                        if (!window.localStorage.getItem(`${hero.NAME}`).includes('empty')){
                            if (!gotAchieve) {
                                window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; empty`)
                                hero.CONTENT = window.localStorage.getItem(hero.NAME)
                                achievmentsMove('../images/achievements/EmptyBox.png','А де?',"У коробці нічого немає")
                                hero.heroAchievements.play()
                            }
                        }
                        break
                }
            } else if (this.loot == 'enemy'){
                var enemy = new Enemy(this.X,this.Y,50, 50, "/images/enemy/flying/fly_npc_", undefined, 'img', 5*(room/2),true, 7*(room/2),6, false, 700)
                enemyList.push(enemy)
            }

            this.ELEMENT.remove()
            listElem.splice(listElem.indexOf(this), 1)
            
        }
    }

}

export default Box