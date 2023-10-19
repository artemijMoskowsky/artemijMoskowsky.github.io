import Sprite from '/modules/sprite.js'
import Rect from '/modules/rect.js'
import Currency from '/modules/currency.js'
import {achievmentsMove} from '../utils/achievments.js'

class Enemy extends Sprite{
    constructor(x, y, width, height, imagePath=undefined, color=undefined, tagName='div',damage,canFly=false,health=10,speed=3,boss=false, radius = 500){
        super(x, y, width, height, imagePath, color, tagName)
        this.RECT = new Rect(this.X, this.Y, this.WIDTH, this.HEIGHT, this.ELEMENT)
        this.SPEED = speed
        this.RADIUS_RANGE = radius
        this.IMG_PATH = imagePath
        this.RADIUS_ELEM = document.createElement('div')
        this.RADIUS_ELEM.style.position = 'absolute'
        this.RADIUS_ELEM.style.left = `${this.X+(this.WIDTH/2)-this.RADIUS_RANGE/2}px`
        this.RADIUS_ELEM.style.top = `${this.Y+(this.HEIGHT/2)-this.RADIUS_RANGE/2}px`
        this.RADIUS_ELEM.style.width = `${this.RADIUS_RANGE}px`
        this.RADIUS_ELEM.style.height = `${this.RADIUS_RANGE}px`
        this.RADIUS_ELEM.classList.add("debugRadiusEnemy")
        this.ELEMENT.style.zIndex = '2'
        this.RADIUS_ELEM.style.zIndex = '1'
        if (this.CAN_FLY) {
            this.ELEMENT.classList.add('fliedenemy')
        }
        this.ELEMENT.src = this.IMG_PATH + 'stay1.png'
        document.querySelector('.gameWorking').append(this.RADIUS_ELEM)
        this.radius = new Rect(this.X+(this.WIDTH/2)-this.RADIUS_RANGE/2, this.Y+(this.HEIGHT/2)-this.RADIUS_RANGE/2, this.RADIUS_RANGE , this.RADIUS_RANGE, this.RADIUS_ELEM);
        this.isFalling = false
        this.fallCount = 0
        this.damage = damage
        this.CAN_FLY = canFly
        this.Max_Health = health
        this.Health = health
        this.BOSS = boss
        // Створюємо полоску здоров'я ворогу
        this.HEALTH_ELEM = document.createElement("div")
        this.HEALTH_ELEM.style.position = 'absolute';
        this.HEALTH_ELEM.style.backgroundColor = 'red';
        this.HEALTH_ELEM.style.zIndex = '1'
        if (this.BOSS == false){
            this.HEALTH_ELEM.style.top = `${this.Y-30}px`;
            this.HEALTH_ELEM.style.left = `${this.X}px`;
            this.HEALTH_ELEM.style.height = '15px';
            this.HEALTH_ELEM.style.width = `${this.WIDTH}px`;
            this.HEALTH_ELEM.style.border = '3px solid black';
        } else{
            this.HEALTH_ELEM.style.display = 'none';
            this.HEALTH_ELEM.style.height = '35px';
            this.HEALTH_ELEM.style.width = `${this.WIDTH*7}px`;
            this.HEALTH_ELEM.style.top = `25px`;
            this.HEALTH_ELEM.style.left = `500px`;
            this.HEALTH_ELEM.style.border = '5px solid black';
            this.BOSS_NAME = document.createElement("p")
            this.BOSS_NAME.textContent = this.BOSS
            this.BOSS_NAME.style.position = 'absolute'
            this.BOSS_NAME.classList.add('coinText')
            this.BOSS_NAME.style.left = '450px'
            this.HEALTH_ELEM.append(this.BOSS_NAME)
        }
        document.querySelector('.gameWorking').append(this.HEALTH_ELEM)
        this.canCollide = true
        this.DAMAGECD = 10;
        this.canDrop = true;
        this.isStanding = true
        this.animCount = 1;
        this.animCooldown = 50;
        this.MOVE_LEFT = false;
        this.MOVE_RIGHT = false;
        this.attack = undefined
        this.attackRect = undefined
        this.attackX = undefined
        this.attackY = undefined
        this.random = false
        this.v_x = undefined
        this.v_y = undefined
        this.attackSpeed = 50
        this.anger = 0
        this.animCountFly = 30
        this.animDir = 'right'
        this.animDirFly = 'down'
        this.angerFly = false
        this.melleeAttack = undefined
        this.BOSS_MUSIC = new Audio('/sounds/boss_music.mp3')
        this.BOSS_MUSIC.loop = true
        if (window.localStorage.getItem(`${window.localStorage.getItem('auth')}Music`)) {
            this.BOSS_MUSIC.volume = window.localStorage.getItem(`${window.localStorage.getItem('auth')}Music`)
        } else {
            this.BOSS_MUSIC.volume = 0.1
        }
        this.lightning = undefined
        this.lightningPos = 0
        this.lightningSound = new Audio('/sounds/lightning.mp3')
        this.ISINRUSH = 5
        this.inertX = 0
        this.inertY = 0
        this.DIRX = 'left'
        this.DIRY = 'left'
    }

    // Додаємо рух ворогу
    move(listElem,hero){
        if (this.DAMAGECD < 10){
            this.DAMAGECD++
        }
        if (this.BOSS == 'Crusher' && this.melleeAttack == undefined || this.BOSS == 'Jumbo' && this.melleeAttack == undefined || this.BOSS == 'Lawyer' && this.random > 2 && this.random <=3 || this.BOSS == 'Lawyer' && this.random > 5 || this.BOSS == false){
        for (let i = 0; i < this.SPEED; i ++){
            this.isStanding = true
            this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
            this.radius.RECT.RECT = this.RECT.getRect(this.RADIUS_ELEM)
            if (this.radius.RECT.RECT.top < hero.RECT.RECT.top && this.radius.RECT.RECT.bottom > hero.RECT.RECT.top || this.radius.RECT.RECT.bottom > hero.RECT.RECT.bottom && this.radius.RECT.RECT.top < hero.RECT.RECT.bottom){ //this.radius.RECT.RECT.top < hero.RECT.RECT.top && this.radius.RECT.RECT.bottom > hero.RECT.RECT.bottom
                if (
                    this.RECT.RECT.left > hero.RECT.RECT.left && this.RECT.colLeft(listElem , this.RECT.RECT) != true &&
                    hero.RECT.RECT.right >= this.radius.RECT.RECT.left
                    ) {
                    this.angerFly = true
                    this.X -= 1
                    this.DIRX = 'left'
                    if (this.inertX > -16){
                        this.inertX -= 0.1
                    }
                    this.RADIUS_ELEM.style.left = `${this.X+(this.WIDTH/2)-this.RADIUS_RANGE/2}px`
                        this.ELEMENT.style.left = `${this.X}px`
                        this.ELEMENT.style.right = `${this.X+this.WIDTH}px`
                    
                    if (this.BOSS == false){
                        this.HEALTH_ELEM.style.left = `${this.X}px`;
                    }
                    this.isStanding = false
                    this.MOVE_LEFT = true;
                    this.MOVE_RIGHT = false;
                    this.ELEMENT.classList.remove('left')
                } else if (
                    this.RECT.RECT.right < hero.RECT.RECT.right &&
                    this.RECT.colRight(listElem , this.RECT.RECT) != true && hero.RECT.RECT.left <= this.radius.RECT.RECT.right
                    ) {
                    this.angerFly = true
                    this.X += 1
                    this.DIRX = 'right'
                    if (this.inertX < 16){
                        this.inertX += 0.1
                    }
                    this.RADIUS_ELEM.style.left = `${this.X+(this.WIDTH/2)-this.RADIUS_RANGE/2}px`
                    this.ELEMENT.style.left = `${this.X}px`
                    if (this.BOSS == false){
                        this.HEALTH_ELEM.style.left = `${this.X}px`;
                    }
                    this.ELEMENT.style.right = `${this.X+this.WIDTH}px`
                    this.isStanding = false
                    this.MOVE_RIGHT = true;
                    this.MOVE_LEFT = false;
                    this.ELEMENT.classList.add('left')
                } else{
                    break
                }
                if (this.CAN_FLY){
                    //if (this.radius.RECT.RECT.left < hero.RECT.RECT.right && this.radius.RECT.RECT.right > hero.RECT.RECT.left){
                        if (
                            this.RECT.RECT.bottom < (hero.RECT.RECT.bottom-(hero.HEIGHT/4)) && this.RECT.colBottom(listElem , this.RECT.RECT) != true &&
                            hero.RECT.RECT.top <= this.radius.RECT.RECT.bottom
                            ) {
                            this.Y += 1
                            this.DIRY = 'down'
                            //console.log('top',hero.RECT.RECT.top, 'bottom',this.RECT.RECT.bottom)
                            if (this.inertY < 16){
                                this.inertY += 0.1
                            }
                            this.RADIUS_ELEM.style.top = `${this.Y+(this.HEIGHT/2)-this.RADIUS_RANGE/2}px`
                            this.ELEMENT.style.bottom = `${this.Y + this.HEIGHT}px`
                            this.ELEMENT.style.top = `${this.Y}px`
                            if (this.BOSS != 'Lawyer'){
                                this.HEALTH_ELEM.style.top = `${this.Y-30}px`;
                            }
                            this.isStanding = false
                        } else if (
                            this.RECT.RECT.top > hero.RECT.RECT.top && this.RECT.colTop(listElem , this.RECT.RECT) != true &&
                            hero.RECT.RECT.bottom >= this.radius.RECT.RECT.top
                            ) {
                            this.DIRY = 'up'
                            this.Y -= 1
                            //console.log('bottom',hero.RECT.RECT.bottom, 'top',this.RECT.RECT.top)
                            if (this.inertY > -16){
                                this.inertY -= 0.1
                            }
                            this.RADIUS_ELEM.style.top = `${this.Y+(this.HEIGHT/2)-this.RADIUS_RANGE/2}px`
                            this.ELEMENT.style.bottom = `${this.Y + this.HEIGHT}px`
                            this.ELEMENT.style.top = `${this.Y}px`
                            if (this.BOSS != 'Lawyer'){
                                this.HEALTH_ELEM.style.top = `${this.Y-30}px`;
                                this.isStanding = false
                            }
                            this.isStanding = false
            }   //}
            }
            } else{
                break
            }
}}}
    
    // Получаємо пошкодження
    gotDamage(bullet,currency_list,enemyList,hero,gotAchieve,music){
        if (this.RECT.RECT.left <= bullet.RECT.RECT.right && this.RECT.RECT.right >= bullet.RECT.RECT.left){
            if (this.RECT.RECT.bottom >= bullet.RECT.RECT.top && this.RECT.RECT.top <= bullet.RECT.RECT.bottom){
                if (this.Health > 0) {
                    if (this.DAMAGECD == 10){
                        this.Health -= bullet.damage
                        if (this.BOSS != false){
                            this.HEALTH_ELEM.style.width = `${this.WIDTH*7 /this.Max_Health * this.Health}px`;
                        } else {
                            this.HEALTH_ELEM.style.width = `${this.WIDTH /this.Max_Health * this.Health}px`;
                        }
                        
                        this.DAMAGECD = 0;
                    }
                } else {
                    if (!window.localStorage.getItem(`${hero.NAME}`).includes('killer')){
                        if (!gotAchieve) {
                            window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; killer`)
                            hero.CONTENT = window.localStorage.getItem(hero.NAME)
                            achievmentsMove(achImg='/images/achievements/killer.png', 'Вбивця!','Вбити свого першого ворога')
                            hero.heroAchievements.play()
                        }
                    }
                    hero.randomKillEnemy -= 1
                    // hero.enemyTaskText.textContent = `Треба вбити ${hero.randomKillEnemy} ворогів`;
                    if (this.BOSS != false){
                        this.BOSS_MUSIC.pause()
                        music.play()
                    }

                    enemyList.splice(enemyList.indexOf(this),1)
                    this.RADIUS_ELEM.remove()
                    this.ELEMENT.remove()
                    this.HEALTH_ELEM.remove()
                    if (this.canDrop == true) {
                        this.canDrop = false
                        if (this.BOSS == false) {
                            let random = Math.random()*40
                            if (random <= 38){                          
                            var coin = new Currency(this.X+20,this.Y+30,30,30,'/images/enemy/drop/Details.png',undefined,'img', 1)
                        } else{
                            var coin = new Currency(this.X+20,this.Y+30,30,30,'/images/enemy/drop/f_a_k.png',undefined,'img', 5)
                        }
                        } else {
                            document.querySelector('.portal').style.display = 'block'
                            var coin = new Currency(this.X+20,this.Y+30,30,30,'/images/enemy/drop/Details.png',undefined,'img', 5)
                        }
                        
                        currency_list.push(coin)
                    }
                    if (this.BOSS != false && this.attack != undefined){
                        this.attack.remove()
                    }
                }
            }
        }
        if (this.RECT.RECT.right >= bullet.RECT.RECT.left && this.RECT.RECT.left <= bullet.RECT.RECT.right){
            if (this.RECT.RECT.bottom >= bullet.RECT.RECT.top && this.RECT.RECT.top <= bullet.RECT.RECT.bottom){
                if (this.Health > 0) {
                    if (this.DAMAGECD == 10){
                        this.Health -= bullet.damage
                        if (this.BOSS != false){
                            this.HEALTH_ELEM.style.width = `${this.WIDTH*7 /this.Max_Health * this.Health}px`;
                        } else {
                            this.HEALTH_ELEM.style.width = `${this.WIDTH /this.Max_Health * this.Health}px`;
                        }
                        this.DAMAGECD = 0;
                    }
                } else {
                    hero.randomKillEnemy -= 1
                    if (!window.localStorage.getItem(`${hero.NAME}`).includes('killer')){
                        if (!gotAchieve) {
                            window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; killer`)
                            hero.CONTENT = window.localStorage.getItem(hero.NAME)
                            achievmentsMove('/images/achievements/killer.png', 'Вбивця!','Вбити свого першого ворога')
                            hero.heroAchievements.play()
                        }

                    }
                    // hero.enemyTaskText.textContent = `Треба вбити ${hero.randomKillEnemy} ворогів`;
                    this.BOSS_MUSIC.pause()
                    enemyList.splice(enemyList.indexOf(this),1)
                    this.RADIUS_ELEM.remove()
                    this.ELEMENT.remove()
                    this.HEALTH_ELEM.remove()
                    if (this.canDrop == true) {
                        this.canDrop = false
                        if (this.BOSS == false) {
                            let random = Math.random()*7
                            if (random <= 5){                          
                            var coin = new Currency(this.X+20,this.Y+30,30,30,'/images/enemy/drop/Details.png',undefined,'img', 1)
                        } else{
                            var coin = new Currency(this.X+20,this.Y+30,30,30,'/images/enemy/drop/f_a_k.png',undefined,'img', 5)
                        }
                        } else {
                            var coin = new Currency(this.X+20,this.Y+30,30,30,'/images/enemy/drop/Details.png',undefined,'img', 5)
                        }
                        currency_list.push(coin)
                    }
                    if (this.BOSS != false && this.attack != undefined){
                        this.attack.remove()
                }}
            }
        }
    }
    animation(){
        if (this.melleeAttack == undefined && this.BOSS == 'Crusher' || this.melleeAttack == undefined && this.BOSS == 'Jumbo' || this.BOSS == 'Lawyer' && this.random > 2 || this.BOSS == false){
            if (this.CAN_FLY && this.BOSS == false){
                if (this.angerFly != true) {
                    if (this.animDirFly == 'down' && this.animCountFly == 0){
                        this.animDirFly = 'up'
                    } else if (this.animDirFly == 'up' && this.animCountFly == 30){
                        this.animDirFly = 'down'
                    } else if (this.animDirFly == 'up' && this.animCountFly == -30){
                        this.animDirFly = 'down'
                    }
                    if (this.animDir == 'right' && this.animCountFly != -30) {
                        this.animCountFly--
                        this.X++
                        this.RADIUS_ELEM.style.left = `${this.X+(this.WIDTH/2)-this.RADIUS_RANGE/2}px`
                        this.ELEMENT.style.left = `${this.X}px`
                        this.HEALTH_ELEM.style.left = `${this.X}px`;
                    } else if (this.animDir == 'right'){
                        this.animDir = 'left'
                    }

                    if (this.animDir == 'left' && this.animCountFly != 30) {
                        this.animCountFly++
                        this.X--
                        this.RADIUS_ELEM.style.left = `${this.X+(this.WIDTH/2)-this.RADIUS_RANGE/2}px`
                        this.ELEMENT.style.left = `${this.X}px`
                        this.HEALTH_ELEM.style.left = `${this.X}px`;
                    } else if (this.animDir == 'left'){
                        this.animDir = 'right'
                    }
                    
                    if (this.animDirFly == 'down') {
                        this.Y += Math.abs(this.animCountFly/10)
                        this.ELEMENT.style.top = `${this.Y}px`
                        this.HEALTH_ELEM.style.top = `${this.Y-30}px`;
                        this.RADIUS_ELEM.style.top = `${this.Y+(this.HEIGHT/2)-this.RADIUS_RANGE/2}px`
                    } else if (this.animDirFly == 'up') {
                        this.Y -= Math.abs(this.animCountFly/10)
                        this.ELEMENT.style.top = `${this.Y}px`
                        this.HEALTH_ELEM.style.top = `${this.Y-30}px`;
                        this.RADIUS_ELEM.style.top = `${this.Y+(this.HEIGHT/2)-this.RADIUS_RANGE/2}px`
                    }
                    
                }




                if (this.animCooldown > 0){
                    this.animCooldown--
                }

                if (this.animCooldown == 0){
                    this.animCount++;
                    this.animCooldown = 5
                }
                if(this.animCount>2 && this.BOSS != 'Lawyer'){
                    this.animCount = 1
                } else if(this.animCount > 4){
                    this.animCount = 1
                }
                if (this.isStanding){
                    this.ELEMENT.src = `${this.IMG_PATH}stay${this.animCount}.png`; 
                    if (this.animCooldown == 0){
                        this.animCount++;
                        this.animCooldown = 5
                    }
                } else {
                    if (this.MOVE_LEFT){
                        this.ELEMENT.src = `${this.IMG_PATH}move${this.animCount}.png`
                    } else {
                        this.ELEMENT.src = `${this.IMG_PATH}move${this.animCount}.png`
                    }
                }
            } else{
                if (this.animCooldown > 0){
                    this.animCooldown--
                }

                if (this.animCooldown == 0){
                    this.animCount++;
                    this.animCooldown = 5
                }
                if(this.animCount>2 && this.BOSS != 'Lawyer'){
                    this.animCount = 1
                } else if(this.animCount > 4){
                    this.animCount = 1
                }
                if (this.isStanding){
                    this.ELEMENT.src = `${this.IMG_PATH}stay${this.animCount}.png`; 
                    if (this.animCooldown == 0){
                        this.animCount++;
                        this.animCooldown = 5
                    }
                } else {
                    if (this.BOSS != 'Lawyer'){
                        if (this.MOVE_LEFT){
                            this.ELEMENT.src = `${this.IMG_PATH}move${this.animCount}.png`
                        } else {
                            this.ELEMENT.src = `${this.IMG_PATH}move${this.animCount}.png`
                        }
                    } else{
                        this.ELEMENT.src = `${this.IMG_PATH}stay${this.animCount}.png`
                    }
                }
        }
        

    } else if(this.BOSS == 'Lawyer' && this.random <= 2){
        if (this.animCooldown > 0){
            this.animCooldown--
        }

        if (this.animCooldown == 0){
            this.animCount++;
            this.animCooldown = 5
        }
        if(this.animCount > 2){
            this.animCount = 1
        }
        this.ELEMENT.src = `${this.IMG_PATH}danger${this.animCount}.png`

    }
    }
    // Додаємо падіння
    fall(listElem, hero) {
        if (this.CAN_FLY == false && this.Health > 0 && this.canCollide == true) {
            if (this.RECT.colBottom(listElem,this.RECT.RECT) != true) {          
                this.isFalling = true
            }
            if (this.isFalling == true) {
                for (let i = 0; i >= this.fallCount; i--) {
                    if (this.RECT.colBottom(listElem,this.RECT.RECT)) {
                        this.isFalling = false
                        this.fallCount = 0
                    }
                    
                    this.Y += 1
                    this.ELEMENT.style.top = `${this.Y}px`
                    if (this.BOSS == false){
                    this.HEALTH_ELEM.style.top = `${this.Y-30}px`;
                    }
                    this.ELEMENT.style.bottom = `${this.Y+this.HEIGHT}px`
                    this.RADIUS_ELEM.style.top = `${this.Y+(this.HEIGHT/2)-250}px`
                    this.RADIUS_ELEM.style.bottom = `${this.Y+(this.HEIGHT/2)-250+500}px`
                    this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                    
                    if (this.Y >= 1080 && this.Health != 0){
                        hero.randomKillEnemy -= 1
                        // hero.enemyTaskText.textContent = `Треба вбити ${hero.randomKillEnemy} ворогів`;
                        this.Health = 0;
                        
                        this.ELEMENT.remove()
                        
                        enemyList.splice(enemyList.indexOf(this),1)
                        this.RADIUS_ELEM.remove()
                        this.HEALTH_ELEM.remove()
                    }
                    if (this.BOSS != false && this.attack != undefined){
                        this.attack.remove()
                    }
                }
                this.fallCount--
            }
        }

    }
    
    bossAttack(hero,listElem,music){
        if (this.BOSS != false && hero.X > (this.X-900) && this.anger >= 100 && this.canCollide) {
            this.HEALTH_ELEM.style.display = 'block';
            switch (this.BOSS){
                case 'Crusher':
                    if (this.attack == undefined && this.random != undefined){
                        this.attack = document.createElement('img');
                        this.attack.classList.add('bossAttack');
                        this.attack.src = '/images/enemy/bosses/LD16/attackStone.png'
                        this.attack.style.height = `${50}px`;
                        this.attack.style.width = `${50}px`;
                        this.attackRect = new Rect(this.X, this.Y-25, 100, 100, this.attack)
                        document.querySelector('.gameWorking').append(this.attack)
    
                        if (this.random <= 1){
                            this.attackX = this.X
                            this.attackY = this.Y - 25
                            this.attack.style.left = `${this.X}px`;
                            this.attack.style.top = `${this.Y-25}px`;
                        }
                    }
                    if (this.attackSpeed != 0){
                        this.attackSpeed--
                    }else{
                        this.attack.remove()
                        this.attack = undefined
                        this.attackX = undefined
                        this.attackY = undefined
                        this.attackSpeed = 50
                        this.v_x = undefined
                        this.v_y = undefined
                        this.ELEMENT.style.width = `${this.WIDTH}px`
                        this.ELEMENT.style.left = `${this.X}px`
                        this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                        this.melleeAttack = undefined
                        this.random = Math.random() * 2
                    }
                    if (this.random <= 1){
                        if (this.v_x, this.v_y == undefined){
                            this.v_x = (hero.X - this.X) / 10
                            this.v_y = ((hero.Y + hero.HEIGHT/2) - this.Y) / 10
    
                        }else {
                            if (this.attack != undefined){
                            this.attackX += this.v_x
                            this.attackY += this.v_y
                            this.attack.style.left = `${this.attackX}px`;
                            this.attack.style.top = `${this.attackY}px`;
                            this.attackRect.RECT = this.attackRect.getRect(this.attack)
                        }}
                    } else{
                        if (this.random <= 2 && hero.X+hero.WIDTH > (this.X-150) && hero.X < (this.X+this.WIDTH+150)){
                            this.melleeAttack = true
                        }
                        if (this.melleeAttack == true){
                            if(this.ELEMENT.classList.contains('left')){
                                this.ELEMENT.style.width = `${this.WIDTH * 2}px`
                                this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
    
                            }else {
                                this.ELEMENT.style.width = `${this.WIDTH * 2}px`
                                this.ELEMENT.style.left = `${this.X - this.WIDTH}px`
                                this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                            }
                            if (this.attackSpeed > 45){
                                this.ELEMENT.src = '/images/enemy/bosses/LD16/melee_attack1.png'
                            }else if (this.attackSpeed > 40){
                                this.ELEMENT.src = '/images/enemy/bosses/LD16/melee_attack2.png'
                            }else if (this.attackSpeed > 35){
                                this.ELEMENT.src = '/images/enemy/bosses/LD16/melee_attack3.png'
                            }else if (this.attackSpeed > 30){
                                this.ELEMENT.src = '/images/enemy/bosses/LD16/melee_attack4.png'
                            }else if (this.attackSpeed > 25){
                                this.ELEMENT.src = '/images/enemy/bosses/LD16/melee_attack5.png'
                            }else if (this.attackSpeed > 20){
                                this.ELEMENT.src = '/images/enemy/bosses/LD16/melee_attack4.png'
                            }else if (this.attackSpeed > 15){
                                this.ELEMENT.src = '/images/enemy/bosses/LD16/melee_attack3.png'
                            }else if (this.attackSpeed > 10){
                                this.ELEMENT.src = '/images/enemy/bosses/LD16/melee_attack2.png'
                            }else if (this.attackSpeed > 5){
                                this.ELEMENT.src = '/images/enemy/bosses/LD16/melee_attack1.png'
                            }
                        } else{
                            this.attackSpeed = 0
                        }
                    }
                    break
                case 'Jumbo':
                    if (this.attackSpeed != 0){
                        this.attackSpeed--    
                    }else{
                        this.attackSpeed = 50
                        this.ELEMENT.style.width = `${this.WIDTH}px`
                        this.ELEMENT.style.left = `${this.X}px`
                        this.ELEMENT.src = this.IMG_PATH + 'attack1.png'
                        this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                        this.melleeAttack = undefined
                        this.random = Math.random() * 5
                    }
                    if (this.random <= 4 && hero.X+hero.WIDTH > (this.X-150) && hero.X < (this.X+this.WIDTH+150) && this.melleeAttack == undefined){
                        this.melleeAttack = true
                        this.attackSpeed = 50
                    }
                    if (this.melleeAttack == true){
                        if (this.attackSpeed >= 35){
                                this.ELEMENT.src = this.IMG_PATH + 'attack1.png'
                        } else if (this.attackSpeed >= 30){
                                this.ELEMENT.src = this.IMG_PATH + 'attack2.png'
                        } else if (this.attackSpeed >= 25){
                                this.ELEMENT.src = this.IMG_PATH + 'attack3.png'
                        } else if (this.attackSpeed >= 20){
                                this.ELEMENT.src = this.IMG_PATH + 'attack4.png'
                                this.ELEMENT.style.width = `${this.WIDTH * 2}px`
                                this.ELEMENT.style.left = `${this.X - this.WIDTH/2}px`
                                this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                        } else if (this.attackSpeed >= 10){
                                this.ELEMENT.src = this.IMG_PATH + 'attack5.png'
                                this.ELEMENT.style.width = `${this.WIDTH * 3}px`
                                this.ELEMENT.style.left = `${this.X - this.WIDTH}px`
                                this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                        }
                    } else if (this.random > 4) {
                        for (let i = this.attackSpeed; i > 0 && this.attackSpeed >= 0 ; i--) {
                            this.Y -= 1
                            // console.log(this.X)
                            // console.log(this.ELEMENT.style.left)
                            this.ELEMENT.style.top = `${this.Y}px`
                            this.ELEMENT.style.bottom = `${this.Y+this.HEIGHT}px`
                            this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                        }
                        } else {
                            this.random = undefined
                        }
                    break
                case 'Lawyer':
                    if (this.attackSpeed != 0){
                        this.attackSpeed--    
                    }else{                     
                        this.attackSpeed = 50
                        this.ELEMENT.style.width = `${this.WIDTH}px`
                        this.ELEMENT.style.left = `${this.X}px`
                        //this.ELEMENT.src = this.IMG_PATH + 'attack1.png'
                        this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                        //this.melleeAttack = undefined
                        this.ISINRUSH = 5
                        this.lightning = undefined
                        this.random = Math.random() * 10
                    }
                    // this.random = 5
                    if (this.attackSpeed == 30 && this.random <= 2 && this.lightning == undefined && this.random != false){
                        this.lightningPos = hero.X - this.X
                    } else if (this.attackSpeed == 10 && this.random <= 2 && this.lightning == undefined && this.random != false){
                        this.lightning = document.createElement('img')
                        this.lightning.classList.add("lightning")
                        this.lightning.style.position = 'absolute'
                        this.lightning.style.width = '100px'
                        this.lightning.style.height = '1000px'
                        this.lightning.style.top = '0px'
                        this.lightning.src = this.IMG_PATH + 'Lightning.png'
                        this.lightning.zIndex = '10'
                        this.lightning.style.left = `${this.X + this.lightningPos}px`
                        document.querySelector('.gameWorking').append(this.lightning)
                        this.attackRect = new Rect(this.X + this.lightningPos, 0, 100, 1000, this.lightning)
                        this.attackRect.RECT = this.attackRect.getRect(this.lightning)
                        this.lightningSound.play()
                    } else if (this.attackSpeed == 0 && this.random <= 2 && this.lightning != undefined && this.random != false){
                        this.lightning.remove()
                    }
                    if (this.lightning != undefined){
                        this.lightning.style.left = `${this.X + this.lightningPos}px`
                    }
                    if (this.random > 2 && this.random <= 3){
                        if(this.ISINRUSH > 0 && this.attackSpeed == 1){
                            this.attackSpeed = 50
                            this.ISINRUSH --
                        }
                        this.SPEED = 8
                    } else {
                        
                        this.SPEED = 3
                    }
                    if (this.DIRX == 'right' && this.inertX < 0){
                        if (this.RECT.colLeft(listElem,this.RECT.RECT)){
                            this.inertX = 0
                        }
                        this.X += this.inertX
                        this.ELEMENT.style.left = `${this.X}px`
                        this.ELEMENT.style.right = `${this.X+this.WIDTH}px`
                        this.RADIUS_ELEM.style.left = `${this.X+(this.WIDTH/2)-this.RADIUS_RANGE/2}px`
                        this.radius.RECT.RECT = this.RECT.getRect(this.RADIUS_ELEM)
                        this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                    } else if (this.DIRX == 'left' && this.inertX > 0){
                        if (this.RECT.colRight(listElem,this.RECT.RECT)){
                            this.inertX = 0
                        }
                        this.X += this.inertX
                        this.ELEMENT.style.left = `${this.X}px`
                        this.ELEMENT.style.right = `${this.X+this.WIDTH}px`
                        this.RADIUS_ELEM.style.left = `${this.X+(this.WIDTH/2)-this.RADIUS_RANGE/2}px`
                        this.radius.RECT.RECT = this.RECT.getRect(this.RADIUS_ELEM)
                        this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                    }
                    if (this.DIRY == 'up' && this.inertY > 0){
                        if (this.RECT.colBottom(listElem,this.RECT.RECT)){
                            this.inertY = -10
                            //this.Y += 1
                            //this.ELEMENT.style.top = `${this.Y}px`
                            //this.ELEMENT.style.bottom = `${this.Y+this.HEIGHT}px`
                            //this.RADIUS_ELEM.style.top = `${this.Y+(this.HEIGHT/2)-this.RADIUS_RANGE/2}px`
                            //this.radius.RECT.RECT = this.RECT.getRect(this.RADIUS_ELEM)
                            //this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                        }
                        this.Y += this.inertY
                        this.ELEMENT.style.top = `${this.Y}px`
                        this.ELEMENT.style.bottom = `${this.Y+this.HEIGHT}px`
                        this.RADIUS_ELEM.style.top = `${this.Y+(this.HEIGHT/2)-this.RADIUS_RANGE/2}px`
                        this.radius.RECT.RECT = this.RECT.getRect(this.RADIUS_ELEM)
                        this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                    } else if (this.DIRY == 'down' && this.inertY < 0){
                        if (this.RECT.colTop(listElem,this.RECT.RECT)){
                            this.inertY = 0
                        }
                        this.Y += this.inertY
                        this.ELEMENT.style.top = `${this.Y}px`
                        this.ELEMENT.style.bottom = `${this.Y+this.HEIGHT}px`
                        this.RADIUS_ELEM.style.top = `${this.Y+(this.HEIGHT/2)-this.RADIUS_RANGE/2}px`
                        this.radius.RECT.RECT = this.RECT.getRect(this.RADIUS_ELEM)
                        this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                    }
                    if (this.Y < 0){
                        this.DIRY = 'down'
                        this.inertY = 0
                        this.ELEMENT.style.top = `${this.Y}px`
                        this.ELEMENT.style.bottom = `${this.Y+this.HEIGHT}px`
                        this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                    } else if (this.Y > document.body.clientHeight){
                        this.Y = 500
                        this.ELEMENT.style.top = `${this.Y}px`
                        this.ELEMENT.style.bottom = `${this.Y+this.HEIGHT}px`
                        this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                    }
                    if (this.random > 3 && this.random <= 5 && this.Health < (this.Max_Health/2)){
                        if (this.DIRX == 'left'){
                            if (!this.RECT.colLeft(listElem,this.RECT.RECT) && this.X > 0){
                                this.X -= 30
                                this.ELEMENT.style.left = `${this.X}px`
                                this.ELEMENT.style.right = `${this.X+this.WIDTH}px`
                                this.RADIUS_ELEM.style.left = `${this.X+(this.WIDTH/2)-this.RADIUS_RANGE/2}px`
                                this.radius.RECT.RECT = this.RECT.getRect(this.RADIUS_ELEM)
                                this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                            } else {
                                this.DIRX = 'right'
                            }
                        } else {
                            if (!this.RECT.colRight(listElem,this.RECT.RECT) && this.X+this.WIDTH < document.body.clientWidth){
                                this.X += 30
                                this.ELEMENT.style.left = `${this.X}px`
                                this.ELEMENT.style.right = `${this.X+this.WIDTH}px`
                                this.RADIUS_ELEM.style.left = `${this.X+(this.WIDTH/2)-this.RADIUS_RANGE/2}px`
                                this.radius.RECT.RECT = this.RECT.getRect(this.RADIUS_ELEM)
                                this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                            } else {
                                this.DIRX = 'left'
                            }
                        }
                    }
                    break
                    //console.log(this.inertY)
                    //if (this.random <= 4 && hero.X+hero.WIDTH > (this.X-150) && hero.X < (this.X+this.WIDTH+150) && this.melleeAttack == undefined){
                    //    this.melleeAttack = true
                    //    this.attackSpeed = 50
                    //}
                    //if (this.melleeAttack == true){
                    //    if (this.attackSpeed >= 25){
                    //            this.ELEMENT.src = this.IMG_PATH + 'attack1.png'
                    //    } else if (this.attackSpeed >= 15){
                    //            this.ELEMENT.src = this.IMG_PATH + 'attack2.png'
                    //    } else if (this.attackSpeed >= 5){
                    //            this.ELEMENT.src = this.IMG_PATH + 'attack3.png'
                    //    }
                    //} else if (this.random > 4) {
                    //
                    //} else {
                    //    this.random = undefined
                    //}
            }   
        } else if (this.BOSS != false && hero.X > (this.X-900) && this.anger < 100) {
            this.anger++
            if (this.anger >= 100){
                music.pause()
                this.BOSS_MUSIC.play()
            }
        }
    }
    stopMusic(){
        if (!this.BOSS_MUSIC.paused){
            this.BOSS_MUSIC.pause()
        }
    }
}

export default Enemy