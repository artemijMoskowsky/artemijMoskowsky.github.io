import Sprite from "/modules/sprite.js";
import Rect from "/modules/rect.js";
import {achievmentsMove} from '../utils/achievments.js'
import Explosion from '/modules/explosionDamage.js';

class Hero extends Sprite{    
    constructor(x, y, width, height, imagePath = undefined, color = undefined, tagName="div", coins, boosts, Name, Content){
        super(x, y, width, height, imagePath, color, tagName ) 
        this.imageCount = 1;
        this.SPEED = 10;
        this.jumpCount = 22;
        this.IsStanding = true;
        this.isJump = false;
        this.moveRight = false;
        this.moveLeft = false;
        this.RECT = new Rect(this.X, this.Y, this.WIDTH, this.HEIGHT, this.ELEMENT)
        this.health = 30
        this.ORIGINAL_DAMAGE = 3
        this.damage = 3
        this.ELEMENT.style.zIndex = '100'
        this.NAME = Name
        this.CONTENT = Content
        // Додаємо полоску здоров'я
        this.HP_ELEM = document.createElement('div')
        this.HP_ELEM.style.width = `266px`
        this.HP_ELEM.style.height = `45px`
        this.HP_ELEM.style.left = '122px'
        this.HP_ELEM.classList.add('HP')
        this.HP_ELEM.style.zIndex = '1002';

        // Додаємо текст здоров'я
        this.HP_TEXT_ELEM = document.createElement('p');
        this.HP_TEXT_ELEM.classList.add('coinText')
        this.HP_TEXT_ELEM.style.position = 'absolute'
        this.HP_TEXT_ELEM.style.top = '37px'
        this.HP_TEXT_ELEM.style.left = '210px'
        this.HP_TEXT_ELEM.textContent = '30 hp'
        this.HP_TEXT_ELEM.style.zIndex = '1002';

        document.querySelector('.gameWorking').append(this.HP_ELEM)
        document.querySelector('.gameWorking').append(this.HP_TEXT_ELEM)
        
        this.DAMAGE_CD = 50
        this.FIRE_CD = 0;
        // Додаємо полоску перезарядки
        this.FIRE_CD_ELEM = document.createElement('div')
        this.FIRE_CD_ELEM.style.position = 'absolute'
        this.FIRE_CD_ELEM.style.left = '122px'
        this.FIRE_CD_ELEM.style.top = '105px'
        this.FIRE_CD_ELEM.style.backgroundColor = 'yellow'
        this.FIRE_CD_ELEM.style.width = '266px'
        this.FIRE_CD_ELEM.style.height = '45px'
        this.FIRE_CD_ELEM.style.border = '3px solid black'
        this.FIRE_CD_ELEM.style.transitionDuration = '100ms'
        this.FIRE_CD_ELEM.style.zIndex = '1002';
        // Додаємо текст перезарядки
        this.FIRE_TEXT_ELEM = document.createElement('p');
        this.FIRE_TEXT_ELEM.classList.add('coinText')
        this.FIRE_TEXT_ELEM.style.position = 'absolute'
        this.FIRE_TEXT_ELEM.style.top = '117px'
        this.FIRE_TEXT_ELEM.style.left = '210px'
        this.FIRE_TEXT_ELEM.style.color = 'rgb(204,0,204)'
        this.FIRE_TEXT_ELEM.textContent = '15 fire cd'
        this.FIRE_TEXT_ELEM.style.zIndex = '1002';

        document.querySelector('.gameWorking').append(this.FIRE_CD_ELEM)
        document.querySelector('.gameWorking').append(this.FIRE_TEXT_ELEM)
        // Додаємо звуки шагів
        this.SOUND_STEP = new Audio('/sounds/step1.mp3')
        this.SOUND_STEP.volume = 0.2;
        
        this.boosts = boosts
        this.ORIGINAL_HP = 30
        this.MAX_HP = 30
        this.ORIGINAL_FIRE_CD = 15
        this.INITIAL_FIRE_CD = 15
        this.ORIGINAL_SPEED = 10
        this.STATS_ELEM = document.createElement('img')
        this.STATS_ELEM.src = '/images/hero/HP_image.png'
        this.STATS_ELEM.style.position = 'absolute'
        this.STATS_ELEM.style.top = '0px'
        this.STATS_ELEM.style.left = '0px'
        this.STATS_ELEM.style.zIndex = '1001';
        document.querySelector('.gameWorking').append(this.STATS_ELEM)
        this.coins = coins
        this.COINS_ELEM = document.createElement('p');
        this.COINS_ELEM.classList.add('coinText')
        this.COINS_ELEM.style.position = 'absolute'
        this.COINS_ELEM.style.top = '125px'
        this.COINS_ELEM.style.left = '10px'
        this.COINS_ELEM.textContent = 'Coins: 0'
        this.COINS_ELEM.style.zIndex = '1001';
        document.querySelector('.gameWorking').append(this.COINS_ELEM)

        this.DAMAGE_ELEM = document.createElement('div')
        this.DAMAGE_ELEM.style.backgroundColor = ''
        this.DAMAGE_ELEM.style.position = 'absolute'
        this.DAMAGE_ELEM.style.left = '103px'
        this.DAMAGE_ELEM.style.top = '222px'
        this.DAMAGE_ELEM.style.fontSize = '16px'
        this.DAMAGE_ELEM.textContent = this.damage
        this.DAMAGE_ELEM.classList.add('coinText')
        this.DAMAGE_ELEM.style.zIndex = '1002'
        document.querySelector('.gameWorking').append(this.DAMAGE_ELEM)


        this.SPEED_ELEM = document.createElement('div')
        this.SPEED_ELEM.style.backgroundColor = ''
        this.SPEED_ELEM.style.position = 'absolute'
        this.SPEED_ELEM.style.left = '303px'
        this.SPEED_ELEM.style.top = '222px'
        this.SPEED_ELEM.style.fontSize = '16px'
        this.SPEED_ELEM.textContent = this.SPEED
        this.SPEED_ELEM.classList.add('coinText')
        this.SPEED_ELEM.style.zIndex = '1002'
        document.querySelector('.gameWorking').append(this.SPEED_ELEM)


        this.InPortal = false;
        this.squats = false;
        this.squatsCd = false
        this.randomKillEnemy = 0
        this.computerIsHacked = false;
        // this.kills = 0;
        // this.boxes = 0;

        // Task UI
        this.divTask = document.createElement('div');
        this.divTask.classList.add("tasks");
        this.divTask.style.width = '300px';
        this.divTask.style.height = '400px';
        this.divTask.style.position = 'absolute';
        this.divTask.style.top = '305px'

        document.querySelector('.gameWorking').append(this.divTask)
        

        this.divCompTask = document.createElement('div');
        this.divCompTask.classList.add('task')
        
        this.compTaskText = document.createElement('p');
        this.compTaskText.classList.add("tasksText");
        
        this.divCompTask.append(this.compTaskText);



        this.divEnemyTask = document.createElement('div');
        this.divEnemyTask.classList.add('task')
        
        this.enemyTaskText = document.createElement('p');
        this.enemyTaskText.classList.add("tasksText");
        
        this.divEnemyTask.append(this.enemyTaskText);

        this.divBoxTask = document.createElement('div');
        this.divBoxTask.classList.add('task');

        this.boxTaskText = document.createElement('p');
        this.boxTaskText.classList.add("tasksText");

        this.divBoxTask.append(this.boxTaskText)
        
        this.tasksText = document.createElement('p');
        this.tasksText.style.fontSize = 'x-large';
        this.tasksText.textContent = 'Квести:';
        this.tasksText.classList.add("tasksText");

        this.checkMarkEn = document.createElement('img');
        this.checkMarkEn.src = '/images/hero/cross.png';
        this.checkMarkEn.style.width = '25px';
        this.checkMarkEn.classList.add('cross')
        this.checkMarkEn.style.height = '25px'

        this.divEnemyTask.append(this.checkMarkEn);

        this.checkMarkBox = document.createElement('img');
        this.checkMarkBox.src = '/images/hero/cross.png';
        this.checkMarkBox.style.width = '25px';
        this.checkMarkBox.classList.add('cross')
        this.checkMarkBox.style.height = '25px'

        this.divBoxTask.append(this.checkMarkBox)

        this.checkMarkComp = document.createElement('img');
        this.checkMarkComp.src = '/images/hero/cross.png';
        this.checkMarkComp.style.width = '25px';
        this.checkMarkComp.classList.add('cross')
        this.checkMarkComp.style.height = '25px'

        this.divCompTask.append(this.checkMarkComp)
       

        document.querySelector('.tasks').append(this.tasksText)
        document.querySelector('.tasks').append(this.divEnemyTask)
        document.querySelector('.tasks').append(this.divCompTask)
        document.querySelector('.tasks').append(this.divBoxTask)

        this.heroGetDamageSound = new Audio('/sounds/heroGotDamage.mp3')
        this.heroAchievements = new Audio('/sounds/achievements.mp3')
        this.heroDeathSound = new Audio('/sounds/heroDeath.mp3')
        
        // Cheats
        this.god = false
        this.nocollide = false
        this.canfly = false
    };

    // Додаємо прокачки персонажу
    addBoosts(){
        this.SPEED = this.ORIGINAL_SPEED
        this.ORIGINAL_FIRE_CD = this.INITIAL_FIRE_CD = 15
        this.damage = this.ORIGINAL_DAMAGE
        this.MAX_HP = this.ORIGINAL_HP
        for (let boost of this.boosts){
            if (boost.includes('speedBoost')){
                this.SPEED += this.ORIGINAL_SPEED / 10
            }else if (boost.includes('reloadBoost')) {
                    this.ORIGINAL_FIRE_CD -= this.INITIAL_FIRE_CD / 10
            }else if (boost.includes('healthBoost')){
                this.MAX_HP += 5
            }else if (boost.includes('damageBoost')){
                this.damage += 2

            }
            }
        this.HP_ELEM.style.width = `${266 / this.MAX_HP * this.health}px`
        this.FIRE_CD_ELEM.style.width = `${266 / Math.round(this.ORIGINAL_FIRE_CD) * this.FIRE_CD}px`
        this.DAMAGE_ELEM.textContent = this.damage
        this.SPEED_ELEM.textContent = this.SPEED
        }

    // Створюємо анімацію
    animation(){
        if(this.squats != true){
            if (this.IsStanding == true) {
                    if (this.imageCount >= 3){
                        this.imageCount = 1;
                }
            

                this.IMG_PATH = `/images/hero/stay/stay${this.imageCount}.png`;
            } else {
                if (this.isJump != true){
                    if (this.imageCount >= 5){
                        this.imageCount = 1;
                }
                if (this.imageCount == 2){
                    this.SOUND_STEP.src = '/sounds/step1.mp3'
                    this.SOUND_STEP.play()

                } else if (this.imageCount == 4){
                    this.SOUND_STEP.src = "/sounds/step2.mp3"
                    this.SOUND_STEP.play()
                }

                this.IMG_PATH = `/images/hero/move/move${this.imageCount}.png`;
                }
            }
            this.ELEMENT.src = this.IMG_PATH;
            this.imageCount++
    }
    
    }
    // Підбераємо деталі
    pickUpCoins(currency_list){
        let rightCoin = this.RECT.colRight(currency_list, this.RECT.RECT)
        let leftCoin = this.RECT.colLeft(currency_list, this.RECT.RECT)
        if (rightCoin){
            if (rightCoin.ELEMENT.src.includes('f_a_k')){
                if (this.health < this.MAX_HP) {

                    this.health += rightCoin.CURRENT
                    if (this.health > this.MAX_HP){
                        this.health = this.MAX_HP
                    }
                    rightCoin.ELEMENT.remove()
                    currency_list.splice(currency_list.indexOf(rightCoin),1)
                    this.HP_ELEM.style.width = `${266 / this.MAX_HP * this.health}px`
                }
            } else if (rightCoin.ELEMENT.src.includes('Details')){

                this.coins += rightCoin.CURRENT
                this.COINS_ELEM.textContent = `Coins: ${this.coins}`
            }
        } else if (leftCoin){
            if (leftCoin.ELEMENT.src.includes('f_a_k')){
                if (this.health < this.MAX_HP) {

                    this.health += leftCoin.CURRENT
                    if (this.health > this.MAX_HP){
                        this.health = this.MAX_HP
                    }
                    leftCoin.ELEMENT.remove()
                    currency_list.splice(currency_list.indexOf(leftCoin),1)
                    this.HP_ELEM.style.width = `${266 / this.MAX_HP * this.health}px`
                }
            } else if (leftCoin.ELEMENT.src.includes('Details')){
                this.coins += leftCoin.CURRENT
                this.COINS_ELEM.textContent = `Coins: ${this.coins}`
            }
        }

    }

    // Додаємо рух
    moveLoop(obj_list,listElem,decList){
        let bombp = this.RECT.colBottom(listElem, this.RECT.RECT)
        if (typeof(bombp) == 'object'){
            if (bombp.ELEMENT.src.includes('mine')){
                let bomb = new Explosion(this.X-150,this.Y-150,400,400,'/images/blocks/explosion1.png',undefined,'img',10)
                listElem.push(bomb)
                bomb.explosionDamage(this,listElem)
                listElem.splice(listElem.indexOf(bombp),1)
                bombp.ELEMENT.remove()
            }
        }
        if (this.InPortal != 'portal') {
            this.InPortal = this.RECT.colRight(listElem, this.RECT.RECT)
        }
        if (this.InPortal != 'portal') {
            this.InPortal = this.RECT.colLeft(listElem, this.RECT.RECT)
        }
        if (this.InPortal != 'portal') {
            this.InPortal = this.RECT.colTop(listElem, this.RECT.RECT)
        }
        if (this.InPortal != 'portal') {
            this.InPortal = this.RECT.colBottom(listElem, this.RECT.RECT)
        } 
        this.HP_TEXT_ELEM.textContent = `${this.health} hp`
        if (this.FIRE_CD > Math.round(this.ORIGINAL_FIRE_CD)){
            this.FIRE_CD = this.ORIGINAL_FIRE_CD
        } else if (this.FIRE_CD < this.ORIGINAL_FIRE_CD){
            this.FIRE_CD++
        }
        this.FIRE_TEXT_ELEM.textContent = `${this.FIRE_CD} fire cd`
        this.FIRE_CD_ELEM.style.width = `${266 / Math.round(this.ORIGINAL_FIRE_CD) * this.FIRE_CD}px`
        if (this.squats == false){
        if (this.moveRight && this.RECT.colRight(listElem, this.RECT.RECT) != true || this.moveRight && this.nocollide == true){
            for (let list of obj_list){
                for (let elem of list){
                    if (elem.ELEMENT.src.includes('/tutorial') != true){
                        if (elem.ELEMENT.src.includes('/blocks')){
                                this.IsStanding = false            
                                this.ELEMENT.classList.add('right')
                                this.ELEMENT.classList.remove('left')
                                elem.X -= this.SPEED
                                elem.ELEMENT.style.left = `${elem.X}px`
                                elem.ELEMENT.style.right = `${elem.X + elem.WIDTH}px`
                                document.querySelector('.gameWorking').style.backgroundPosition = `${elem.X/5}px 0px`
                        }else {
                                this.IsStanding = false
                                this.ELEMENT.classList.add('right')
                                this.ELEMENT.classList.remove('left')
                                elem.X -= this.SPEED
                                elem.ELEMENT.style.left = `${elem.X}px`
                                elem.ELEMENT.style.right = `${elem.X + elem.WIDTH}px`
                                elem.RECT.RECT = this.RECT.getRect(elem.ELEMENT)
                        
                        }
                        if (elem.ELEMENT.src.includes('Block8')){
                            this.IsStanding = false
                            this.ELEMENT.classList.add('right')
                            this.ELEMENT.classList.remove('left')
                            elem.ELEMENT.style.left = `${elem.X}px`
                            elem.RECT.RECT = elem.RECT.getRect(elem.ELEMENT)
                        }
                        if (elem.ELEMENT.src.includes('/enemy') && elem.ELEMENT.src.includes('/drop') == false){
                            elem.radius.RECT.RECT = this.RECT.getRect(elem.RADIUS_ELEM)
                            elem.RADIUS_ELEM.style.left = `${elem.X+(elem.WIDTH/2)-elem.RADIUS_RANGE/2}px`
                            if (elem.BOSS == false){
                                elem.HEALTH_ELEM.style.left = `${elem.X}px`;
                            }
                            if (elem.BOSS != false && elem.attack != undefined){
                                elem.attackX -= this.SPEED
                                elem.attack.style.left = `${elem.attackX}px`;
                                elem.attackRect.RECT = this.RECT.getRect(elem.attack)
                            }
                            if (elem.BOSS == 'Crusher') {
                                if (elem.melleeAttack == true) {
                                    if (elem.ELEMENT.classList.contains('left') == false){
                                        elem.ELEMENT.style.left = `${elem.X-(elem.WIDTH)}px`
                                    }
                                }
                            }
                            if (elem.BOSS == 'Jumbo') {
                                if (elem.melleeAttack == true) {
                                    if (elem.attackSpeed < 25 && elem.attackSpeed > 19){
                                        elem.ELEMENT.style.left = `${elem.X-(elem.WIDTH/2)}px`
                                    } else if (elem.attackSpeed <= 19) {
                                        elem.ELEMENT.style.left = `${elem.X-(elem.WIDTH)}px`
                                    }
                                }
                            }
                        }
                        if (elem.ELEMENT.src.includes('/dealer')){
                            elem.radius.RECT.RECT = this.RECT.getRect(elem.RADIUS_ELEM)
                            elem.RADIUS_ELEM.style.left = `${elem.X+(elem.WIDTH/2)-125}px`
                            elem.BUTTON_ELEM.style.left = `${elem.X+3}px`
                        }
                        if (elem.ELEMENT.src.includes('note')){
                            elem.radius.RECT.RECT = this.RECT.getRect(elem.RADIUS_ELEM)
                            elem.RADIUS_ELEM.style.left = `${elem.X+(elem.WIDTH/2)-125}px`
                            elem.BUTTON_ELEM.style.left = `${elem.X+12}px`
                        }
                        if (elem.ELEMENT.classList.contains('comp')){
                            elem.radius.RECT.RECT = this.RECT.getRect(elem.RADIUS_ELEM)
                            elem.RADIUS_ELEM.style.left = `${elem.X+(elem.WIDTH/2)-150}px`
                            elem.BUTTON_ELEM.style.left = `${elem.X+12}px`
                        }
                        if (elem.ELEMENT.classList.contains('light')){
                            elem.radius.RECT.RECT = this.RECT.getRect(elem.RADIUS_ELEM)
                            elem.RADIUS_ELEM.style.left = `${elem.X+(elem.WIDTH/2)-150}px`
                            elem.BUTTON_ELEM.style.left = `${elem.X+12}px`
                            elem.progressElem.style.left = `${elem.X}px`
                        }
            
            
            } else{
                elem.X -= this.SPEED
                elem.ELEMENT.style.left = `${elem.X}px`
                elem.ELEMENT.style.right = `${elem.X + elem.WIDTH}px`
            }
            }
        }
        for (let elem of decList){
                    
                if (!elem.ELEMENT.classList.contains('decBack') && !elem.ELEMENT.classList.contains('decBackHole')){
                    elem.X -= this.SPEED/5
                    elem.ELEMENT.style.left = `${elem.X}px`
                } else {
                    elem.X -= this.SPEED/5
                    elem.ELEMENT.style.left = `${elem.X}px`
                    elem.ELEMENT.style.backgroundPosition = `${parseInt(elem.ELEMENT.style.backgroundPosition) + this.SPEED/5}px -512px`
                }
        
            }
                    
                
        
    }      
    
        if (this.moveLeft && this.RECT.colLeft(listElem, this.RECT.RECT) != true || this.moveLeft && this.nocollide == true){
            for (let list of obj_list){    
                for (let elem of list){
                    if (elem.ELEMENT.src.includes('Block8')){
                        this.IsStanding = false
                        this.ELEMENT.classList.add('left')
                        this.ELEMENT.classList.remove('right')
                        elem.ELEMENT.style.left = `${elem.X}px`
                        elem.RECT.RECT = elem.RECT.getRect(elem.ELEMENT)
                    }
                    if (elem.ELEMENT.src.includes('/tutorial') != true){
                        if (elem.ELEMENT.src.includes('/blocks')){
                            this.IsStanding = false
                            this.ELEMENT.classList.add('left')
                            this.ELEMENT.classList.remove('right')
                            elem.X += this.SPEED
                            document.querySelector('.gameWorking').style.backgroundPosition = `${elem.X/5}px 0px`
                            elem.ELEMENT.style.left = `${elem.X}px`
                        } else {
                            this.IsStanding = false
                            this.ELEMENT.classList.add('left')
                            this.ELEMENT.classList.remove('right')
                            elem.X += this.SPEED
                            elem.ELEMENT.style.left = `${elem.X}px`
                            elem.ELEMENT.style.right = `${elem.X + elem.WIDTH}px`
                            elem.RECT.RECT = this.RECT.getRect(elem.ELEMENT)
                        if (elem.ELEMENT.src.includes('/enemy') && elem.ELEMENT.src.includes('/drop') == false){
                            elem.radius.RECT.RECT = this.RECT.getRect(elem.RADIUS_ELEM)
                            elem.RADIUS_ELEM.style.left = `${elem.X+(elem.WIDTH/2)-elem.RADIUS_RANGE/2}px`
                            if (elem.BOSS == false){
                                elem.HEALTH_ELEM.style.left = `${elem.X}px`;
                            }
                            if (elem.BOSS != false && elem.attack != undefined){
                                elem.attackX += this.SPEED
                                elem.attack.style.left = `${elem.attackX}px`;
                                elem.attackRect.RECT = this.RECT.getRect(elem.attack)
                            }
                            if (elem.BOSS == 'Crusher') {
                                if (elem.melleeAttack == true) {
                                    if (elem.ELEMENT.classList.contains('left') == false){
                                        elem.ELEMENT.style.left = `${elem.X-(elem.WIDTH)}px`
                                    }
                                }
                            }
                            if (elem.BOSS == 'Jumbo') {
                                if (elem.random <= 4) {
                                    if (elem.melleeAttack == true){
                                        elem.ELEMENT.style.left = `${elem.X-(elem.WIDTH/2)}px`
                                    } else if (elem.attackSpeed <= 19) {
                                        elem.ELEMENT.style.left = `${elem.X-(elem.WIDTH)}px`
                                    }
                                }
                            }
                        }
                        if (elem.ELEMENT.src.includes('/dealer')){
                            elem.radius.RECT.RECT = this.RECT.getRect(elem.RADIUS_ELEM)
                            elem.RADIUS_ELEM.style.left = `${elem.X+(elem.WIDTH/2)-125}px`
                            elem.BUTTON_ELEM.style.left = `${elem.X+3}px`
                        }
                        if (elem.ELEMENT.src.includes('note')){
                            elem.radius.RECT.RECT = this.RECT.getRect(elem.RADIUS_ELEM)
                            elem.RADIUS_ELEM.style.left = `${elem.X+(elem.WIDTH/2)-125}px`
                            elem.BUTTON_ELEM.style.left = `${elem.X+12}px`
                        }
                        if (elem.ELEMENT.classList.contains('comp')){
                            elem.radius.RECT.RECT = this.RECT.getRect(elem.RADIUS_ELEM)
                            elem.RADIUS_ELEM.style.left = `${elem.X+(elem.WIDTH/2)-150}px`
                            elem.BUTTON_ELEM.style.left = `${elem.X+12}px`
                        }
                        if (elem.ELEMENT.classList.contains('light')){
                            elem.radius.RECT.RECT = this.RECT.getRect(elem.RADIUS_ELEM)
                            elem.RADIUS_ELEM.style.left = `${elem.X+(elem.WIDTH/2)-150}px`
                            elem.BUTTON_ELEM.style.left = `${elem.X+12}px`
                            elem.progressElem.style.left = `${elem.X}px`
                        }
                        
                        }
                } else{
                    elem.X += this.SPEED
                    elem.ELEMENT.style.left = `${elem.X}px`
                    elem.ELEMENT.style.right = `${elem.X + elem.WIDTH}px`
                }       
            }
        

        }
        for (let elem of decList){         
            if (!elem.ELEMENT.classList.contains('decBack') && !elem.ELEMENT.classList.contains('decBackHole')){
                elem.X += this.SPEED/5
                elem.ELEMENT.style.left = `${elem.X}px`
            } else{
                elem.X += this.SPEED/5
                elem.ELEMENT.style.left = `${elem.X}px`
                elem.ELEMENT.style.backgroundPosition = `${parseInt(elem.ELEMENT.style.backgroundPosition) - this.SPEED/5}px -512px`
            }
        
            }
                
        
    }   
        
    }
    }

    // Додаємо прослушку клавіш
    move(key){
        if (key == 'KeyA'){
            this.moveLeft = true;
            this.moveRight = false;
        
        }       
        if (key == 'KeyD'){
            this.moveRight = true;
            this.moveLeft = false;
        }
        if (key == 'Space' || key == 'KeyW') {
            if(this.squats == false){
                this.isJump = true;
            }
        }
        if (key == 'KeyS') {
            this.squats = true;
            this.ELEMENT.style.top = `${this.Y+this.HEIGHT / 2}px`;
            this.ELEMENT.style.height = `${this.HEIGHT / 2}px`;
            this.IMG_PATH = `/images/hero/stay/squats.png`;
            this.ELEMENT.src = this.IMG_PATH
            this.squatsCd = false       
        }
    }

    // Додаємо прижок та падіння
    jump(listElem,gotAchieve){
        let obj = this.RECT.colBottom(listElem,this.RECT.RECT)
        if (typeof(obj) == 'object'){ // Платформа
            if (obj.DIR == 'vertical'){
                if (obj.DIR_NOW == 'up'){
                    if (this.squats == false){
                        this.Y -= 5
                    }
                } else if (obj.DIR_NOW == 'down'){
                    if (this.squats == false){
                        this.Y += 5
                    }
                }

            }

        }
        this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
        if (this.isJump == true){
            if (this.RECT.colTop(listElem,this.RECT.RECT)) {
                this.jumpCount = -1
                for (let i = this.jumpCount; i >= -22; i--) {
                    this.Y += 1
                    this.ELEMENT.style.top = `${this.Y}px`
                    this.ELEMENT.style.bottom = `${this.Y+this.HEIGHT}px`
                    this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                    if (this.jumpCount <=0 && this.RECT.colBottom(listElem,this.RECT.RECT)) {
                        this.isJump = false;
                        this.jumpCount = 22;
                        break
                    }
                }
                this.jumpCount--
            } else {
                for (let i = this.jumpCount; i > 0 && this.jumpCount >= 0 ; i--) {
                    if (this.RECT.colTop(listElem,this.RECT.RECT)) {
                        this.jumpCount = -1
                        break
                    }
                   
                    this.Y -= 1

                    this.ELEMENT.style.top = `${this.Y}px`
                    this.ELEMENT.style.bottom = `${this.Y+this.HEIGHT}px`
                    this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                }}
                for (let i = 0; i >= this.jumpCount  && this.jumpCount >= -22 && this.jumpCount < 0; i--) {
                    this.ELEMENT.style.top = `${this.Y}px`
                    this.ELEMENT.style.bottom = `${this.Y+this.HEIGHT}px`
                    this.RECT.RECT = this.RECT.getRect(this.ELEMENT)
                    if (this.jumpCount <=0 && this.RECT.colBottom(listElem,this.RECT.RECT)) {
                        this.isJump = false;
                        this.jumpCount = 22;
                        break
                    } else {
                    this.Y += 1
                    }
                }
                
                if (this.jumpCount > -22) {
                    this.jumpCount--
                }
                
            
        if (this.Y >= 1080){
            if (this.god == false){
                this.health = 0;
                if (!window.localStorage.getItem(`${this.NAME}`).includes('fallToDie')){
                    if (!gotAchieve) {
                        window.localStorage.setItem(`${this.NAME}`,`${this.CONTENT}; fallToDie`)
                        this.CONTENT = window.localStorage.getItem(this.NAME)
                        achievmentsMove('/images/achievements/fall.png', 'Джеронімоооо!','Впасти й розбитись')
                        this.heroAchievements.play()
                    }


                }
            } else{
                this.Y = 0
                this.ELEMENT.style.top = `${this.Y}px`
            }
            
        }


        } else {
            if (this.RECT.colBottom(listElem,this.RECT.RECT) != true) {
                this.isJump = true
                this.jumpCount = -1
            }
        }

    }

    // Получаємо пошкодження
    gotDamage(enemyList) {
        for (let enemy of enemyList){
            if (this.DAMAGE_CD != 300){
                this.DAMAGE_CD++
            }
            if (this.RECT.RECT.left + (this.WIDTH / 3) <= enemy.RECT.RECT.right && this.RECT.RECT.right - (this.WIDTH / 3) >= enemy.RECT.RECT.left) {
                if (this.RECT.RECT.bottom >= enemy.RECT.RECT.top && this.RECT.RECT.top <= enemy.RECT.RECT.bottom) {
                    if (this.DAMAGE_CD == 300){
                        if (this.god == false) {
                            this.health -= enemy.damage;
                            this.heroGetDamageSound.play()
                            this.HP_ELEM.style.width = `${266 / this.MAX_HP * this.health}px`
                            this.DAMAGE_CD = 0
                        }

                }

            }
            if (this.RECT.RECT.right - (this.WIDTH / 3) >= enemy.RECT.RECT.left && this.RECT.RECT.left - (this.WIDTH / 3) <= enemy.RECT.RECT.right) {               
                if (this.RECT.RECT.bottom >= enemy.RECT.RECT.top && this.RECT.RECT.top <= enemy.RECT.RECT.bottom) {
                    if (this.DAMAGE_CD == 300){
                        if (this.god == false) {
                            this.health -= enemy.damage
                            this.heroGetDamageSound.play()
                            this.HP_ELEM.style.width = `${266 / this.MAX_HP * this.health}px`
                        }

                    }}
                }
            }
        if (enemy.BOSS != false && enemy.attack != undefined || enemy.BOSS != false && enemy.lightning != undefined){
            if (this.RECT.RECT.left + (this.WIDTH / 3) <= enemy.attackRect.RECT.right && this.RECT.RECT.right - (this.WIDTH / 3) >= enemy.attackRect.RECT.left) {
                if (this.RECT.RECT.bottom >= enemy.attackRect.RECT.top && this.RECT.RECT.top <= enemy.attackRect.RECT.bottom) {
                    
                    if (this.DAMAGE_CD == 300){
                        if (this.god == false) {
                            this.health -= enemy.damage;
                            this.heroGetDamageSound.play()
                            this.HP_ELEM.style.width = `${266 / this.MAX_HP * this.health}px`
                            this.DAMAGE_CD = 0
                        }

                }

            }
            if (this.RECT.RECT.right - (this.WIDTH / 3) >= enemy.attackRect.RECT.left && this.RECT.RECT.left - (this.WIDTH / 3) <= enemy.attackRect.RECT.right) {              
                if (this.RECT.RECT.bottom >= enemy.attackRect.RECT.top && this.RECT.RECT.top <= enemy.attackRect.RECT.bottom) {
                    
                    if (this.DAMAGE_CD == 300){
                        if (this.god == false) {
                            this.health -= enemy.damage
                            this.heroGetDamageSound.play()
                            this.HP_ELEM.style.width = `${266 / this.MAX_HP * this.health}px`
                        }

                    }}
                }
            if ((enemy.attackRect.RECT.right-enemy.attackRect.RECT.left)/2 <= this.RECT.RECT.right - (this.WIDTH / 3) && (enemy.attackRect.RECT.right-enemy.attackRect.RECT.left)/2 >= this.RECT.RECT.left - (this.WIDTH / 3)){
                if (this.DAMAGE_CD == 300){
                    if (this.god == false) {
                        this.health -= enemy.damage
                        this.heroGetDamageSound.play()
                        this.HP_ELEM.style.width = `${266 / this.MAX_HP * this.health}px`
                    }

                }
            }
            }
        }
        
        }
    }

    task(enemyList,listElem){
        if (!this.enemyTaskText.textContent.includes('Треба вбити')) {
            this.randomKillEnemy = Math.round(Math.random()*(enemyList.length-1))+1
            // this.enemyTaskText.textContent = `Треба вбити ${this.randomKillEnemy} ворогів`;
        }
        if (this.randomKillEnemy >= 0){
            this.enemyTaskText.textContent = `Треба вбити ${this.randomKillEnemy} ворогів`;
        }
        
        // if (this.computerIsHacked == 'false'){
            this.compTaskText.textContent = `Потрібно зламати комп'ютер`;
        // }
        let boxCount = 0;
        if (this.boxCount == undefined){
            for (let elem of listElem){
                if (elem.ELEMENT.src.includes('Box')){
                    boxCount += 1
                }
            }
            this.boxCount = Math.round(Math.random()*(boxCount-1))+1
            
            
        }
        if (this.boxCount >= 0){
            this.boxTaskText.textContent = `Треба зламати ${this.boxCount} коробок`;
        }
        
        if (this.randomKillEnemy <= 0){
            this.checkMarkEn.src = '/images/hero/checkMark.png'
            if (this.checkMarkEn.classList.contains('cross')){
                this.checkMarkEn.classList.remove('cross')
            }
            
        }
        
        if (this.boxCount <= 0){
            this.checkMarkBox.src = '/images/hero/checkMark.png'
            if (this.checkMarkBox.classList.contains('cross')){
                this.checkMarkBox.classList.remove('cross')
            }
        }
        
        if (this.computerIsHacked == true){
            this.checkMarkComp.src = '/images/hero/checkMark.png'
            if (this.checkMarkComp.classList.contains('cross')){
                this.checkMarkComp.classList.remove('cross')
            }
        }
    }
}
export default Hero

