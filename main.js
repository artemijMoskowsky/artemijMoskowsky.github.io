import Hero from "./modules/hero.js";
import {gen_map, getStructures, createDecoration} from "./utils/gen_map.js";
import Bullet from './modules/bullet.js'
import Dealer from "./modules/dealer.js";
import structures from '/utils/structures.js';
import {achievmentsMove} from '../utils/achievments.js'
import Gate from './modules/gate.js'
//window.localStorage.clear()



let menu = new Audio('/sounds/Main_menu_music.wav')


let radiusEnemy = 0

let musicVolume = window.localStorage.getItem(`${window.localStorage.getItem('auth')}Music`)
let stepVolume = window.localStorage.getItem(`${window.localStorage.getItem('auth')}Step`)
let bulletVolume = window.localStorage.getItem(`${window.localStorage.getItem('auth')}Bullet`)
let Brightness = window.localStorage.getItem(`${window.localStorage.getItem('auth')}Light`)

//Чити
var alreadyActivated = false

var enteredCheat = "";

const codes = {
    "pleasedonthurtme": "Увимкнути безсмертя",
    "igothroughwall": "Увимкнути noclip",
    'jobthatiwant': "Увимкнути полет",
    'ifasterthanflash': "Прискорити гравця",
    'thereonlyrichinspace': 'Мати 25000 монет',
    'idoasiwant': 'Увимкнути усі чити',
    'befriendlybuddy': 'Видалити усі ворогів',
    'lettherebelight': 'Увімкнути електрощиток',
    'killmesaidspy': 'Самогубство',
    'aihasfixed': 'Не палить тебе',
};

function checkCode(hero,enemies,light,listElem, dealerList) {
    for (const code in codes) {
        if (enteredCheat.endsWith(code)) {
            cheatEffect(code,hero,enemies,light,listElem, dealerList);
            enteredCheat = "";
            break;
        }
    }   
}
  
function cheatEffect(code,hero,enemies,light,listElem, dealerList) {


    switch (code){
        case 'pleasedonthurtme':
            //Ефект
            hero.god = true;
            if (!window.localStorage.getItem(`${hero.NAME}`).includes('cheater')){
                window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; cheater`)
                hero.CONTENT = window.localStorage.getItem(hero.NAME)
                achievmentsMove('/images/achievements/cheater.png', 'Брудний читер','Хочеш поганих часів?')
                hero.heroAchievements.play()
            }
            //Повідомлення
            if (alreadyActivated == false) {
                alreadyActivated = true
                var cheatActivatedAchi = document.createElement('p');
                cheatActivatedAchi.textContent = 'When cheats are activated, achievements will be disabled';
                cheatActivatedAchi.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivatedAchi);
                setTimeout(() => {
                    cheatActivatedAchi.remove()
                    var cheatActivated = document.createElement('p');
                    cheatActivated.textContent = 'Cheat Activated';
                    cheatActivated.classList.add('cheatActivated')
                    document.querySelector('.gameWorking').append(cheatActivated);
                    var notification = new Audio('/sounds/cheat.mp3')
                    notification.volume = 1
                    notification.play()
                    setTimeout(() => {
                        cheatActivated.remove()
                    }, 5000);
                }, 3000);
            } else {
                var cheatActivated = document.createElement('p');
                cheatActivated.textContent = 'Cheat Activated';
                cheatActivated.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivated);
                var notification = new Audio('/sounds/cheat.mp3')
                notification.volume = 1
                notification.play()
                setTimeout(() => {
                    cheatActivated.remove()
                }, 5000);
            }
            break;
        case 'igothroughwall':
            //Ефект
            hero.nocollide = true;
            if (!window.localStorage.getItem(`${hero.NAME}`).includes('cheater')){
                window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; cheater`)
                hero.CONTENT = window.localStorage.getItem(hero.NAME)
                achievmentsMove('/images/achievements/cheater.png', 'Брудний читер','Хочеш поганих часів?')
                hero.heroAchievements.play()
            }
            //Повідомлення
            if (alreadyActivated == false) {
                alreadyActivated = true
                var cheatActivatedAchi = document.createElement('p');
                cheatActivatedAchi.textContent = 'When cheats are activated, achievements will be disabled';
                cheatActivatedAchi.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivatedAchi);
                setTimeout(() => {
                    cheatActivatedAchi.remove()
                    var cheatActivated = document.createElement('p');
                    cheatActivated.textContent = 'Cheat Activated';
                    cheatActivated.classList.add('cheatActivated')
                    document.querySelector('.gameWorking').append(cheatActivated);
                    var notification = new Audio('/sounds/cheat.mp3')
                    notification.volume = 1
                    notification.play()
                    setTimeout(() => {
                        cheatActivated.remove()
                    }, 5000);
                }, 3000);
            } else {
                var cheatActivated = document.createElement('p');
                cheatActivated.textContent = 'Cheat Activated';
                cheatActivated.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivated);
                var notification = new Audio('/sounds/cheat.mp3')
                notification.volume = 1
                notification.play()
                setTimeout(() => {
                    cheatActivated.remove()
                }, 5000);
            }
            break;
        case 'jobthatiwant':
            //Ефект
            hero.computerIsHacked = true
            hero.randomKillEnemy = 0
            hero.boxCount = 0
            if (!window.localStorage.getItem(`${hero.NAME}`).includes('cheater')){
                window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; cheater`)
                hero.CONTENT = window.localStorage.getItem(hero.NAME)
                achievmentsMove('/images/achievements/cheater.png', 'Брудний читер','Хочеш поганих часів?')
                hero.heroAchievements.play()
            }
            //Повідомлення
            if (alreadyActivated == false) {
                alreadyActivated = true
                var cheatActivatedAchi = document.createElement('p');
                cheatActivatedAchi.textContent = 'When cheats are activated, achievements will be disabled';
                cheatActivatedAchi.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivatedAchi);
                setTimeout(() => {
                    cheatActivatedAchi.remove()
                    var cheatActivated = document.createElement('p');
                    cheatActivated.textContent = 'Cheat Activated';
                    cheatActivated.classList.add('cheatActivated')
                    document.querySelector('.gameWorking').append(cheatActivated);
                    var notification = new Audio('/sounds/cheat.mp3')
                    notification.volume = 1
                    notification.play()
                    setTimeout(() => {
                        cheatActivated.remove()
                    }, 5000);
                }, 3000);
            } else {
                var cheatActivated = document.createElement('p');
                cheatActivated.textContent = 'Cheat Activated';
                cheatActivated.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivated);
                var notification = new Audio('/sounds/cheat.mp3')
                notification.volume = 1
                notification.play()
                setTimeout(() => {
                    cheatActivated.remove()
                }, 5000);
            }

            break;
        case 'ifasterthanflash':
            //Ефект
            hero.SPEED = 30;
            hero.ORIGINAL_SPEED = 30;
            if (!window.localStorage.getItem(`${hero.NAME}`).includes('cheater')){
                window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; cheater`)
                hero.CONTENT = window.localStorage.getItem(hero.NAME)
                achievmentsMove('/images/achievements/cheater.png', 'Брудний читер','Хочеш поганих часів?')
                hero.heroAchievements.play()
            }
            //Повідомлення
            if (alreadyActivated == false) {
                alreadyActivated = true
                var cheatActivatedAchi = document.createElement('p');
                cheatActivatedAchi.textContent = 'When cheats are activated, achievements will be disabled';
                cheatActivatedAchi.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivatedAchi);
                setTimeout(() => {
                    cheatActivatedAchi.remove()
                    var cheatActivated = document.createElement('p');
                    cheatActivated.textContent = 'Cheat Activated';
                    cheatActivated.classList.add('cheatActivated')
                    document.querySelector('.gameWorking').append(cheatActivated);
                    var notification = new Audio('/sounds/cheat.mp3')
                    notification.volume = 1
                    notification.play()
                    setTimeout(() => {
                        cheatActivated.remove()
                    }, 5000);
                }, 3000);
            } else {
                var cheatActivated = document.createElement('p');
                cheatActivated.textContent = 'Cheat Activated';
                cheatActivated.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivated);
                var notification = new Audio('/sounds/cheat.mp3')
                notification.volume = 1
                notification.play()
                setTimeout(() => {
                    cheatActivated.remove()
                }, 5000);
            }
            break;
        case 'thereonlyrichinspace':
            //Ефект
            hero.coins = 25000;
            hero.COINS_ELEM.textContent = `Coins: ${hero.coins}`;
            if (!window.localStorage.getItem(`${hero.NAME}`).includes('cheater')){
                window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; cheater`)
                hero.CONTENT = window.localStorage.getItem(hero.NAME)
                achievmentsMove('/images/achievements/cheater.png', 'Брудний читер','Хочеш поганих часів?')
                hero.heroAchievements.play()
            }
            //Повідомлення
            if (alreadyActivated == false) {
                alreadyActivated = true
                var cheatActivatedAchi = document.createElement('p');
                cheatActivatedAchi.textContent = 'When cheats are activated, achievements will be disabled';
                cheatActivatedAchi.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivatedAchi);
                setTimeout(() => {
                    cheatActivatedAchi.remove()
                    var cheatActivated = document.createElement('p');
                    cheatActivated.textContent = 'Cheat Activated';
                    cheatActivated.classList.add('cheatActivated')
                    document.querySelector('.gameWorking').append(cheatActivated);
                    var notification = new Audio('/sounds/cheat.mp3')
                    notification.volume = 1
                    notification.play()
                    setTimeout(() => {
                        cheatActivated.remove()
                    }, 5000);
                }, 3000);
            } else {
                var cheatActivated = document.createElement('p');
                cheatActivated.textContent = 'Cheat Activated';
                cheatActivated.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivated);
                var notification = new Audio('/sounds/cheat.mp3')
                notification.volume = 1
                notification.play()
                setTimeout(() => {
                    cheatActivated.remove()
                }, 5000);
            }
            break;
        case 'idoasiwant':
            //Ефект
            hero.god = true;
            hero.coins = 25000;
            hero.nocollide = true;
            hero.SPEED = 30;
            hero.computerIsHacked = true
            hero.randomKillEnemy = 0
            hero.boxCount = 0
            hero.canfly = true;
            hero.ORIGINAL_SPEED = 30;
            hero.COINS_ELEM.textContent = `Coins: ${hero.coins}`;
            if (!window.localStorage.getItem(`${hero.NAME}`).includes('cheater')){
                window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; cheater`)
                hero.CONTENT = window.localStorage.getItem(hero.NAME)
                achievmentsMove('/images/achievements/cheater.png', 'Брудний читер','Хочеш поганих часів?')
                hero.heroAchievements.play()
            }
            //Повідомлення
            if (alreadyActivated == false) {
                alreadyActivated = true
                var cheatActivatedAchi = document.createElement('p');
                cheatActivatedAchi.textContent = 'When cheats are activated, achievements will be disabled';
                cheatActivatedAchi.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivatedAchi);
                setTimeout(() => {
                    cheatActivatedAchi.remove()
                    var cheatActivated = document.createElement('p');
                    cheatActivated.textContent = 'Cheat Activated';
                    cheatActivated.classList.add('cheatActivated')
                    document.querySelector('.gameWorking').append(cheatActivated);
                    var notification = new Audio('/sounds/cheat.mp3')
                    notification.volume = 1
                    notification.play()
                    setTimeout(() => {
                        cheatActivated.remove()
                    }, 5000);
                }, 3000);
            } else {
                var cheatActivated = document.createElement('p');
                cheatActivated.textContent = 'Cheat Activated';
                cheatActivated.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivated);
                var notification = new Audio('/sounds/cheat.mp3')
                notification.volume = 1
                notification.play()
                setTimeout(() => {
                    cheatActivated.remove()
                }, 5000);
            }
            break;
        case 'befriendlybuddy':
            //Ефект
            for (let enemy of enemies) {
                enemy.ELEMENT.remove()
                enemy.HEALTH_ELEM.remove()
                enemy.RADIUS_ELEM.remove()
                // enemies.splice(enemies.indexOf(enemy),1)
            }
            if (!window.localStorage.getItem(`${hero.NAME}`).includes('cheater')){
                window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; cheater`)
                hero.CONTENT = window.localStorage.getItem(hero.NAME)
                achievmentsMove('/images/achievements/cheater.png', 'Брудний читер','Хочеш поганих часів?')
                hero.heroAchievements.play()
            }
            //Повідомлення
            if (alreadyActivated == false) {
                alreadyActivated = true
                var cheatActivatedAchi = document.createElement('p');
                cheatActivatedAchi.textContent = 'When cheats are activated, achievements will be disabled';
                cheatActivatedAchi.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivatedAchi);
                setTimeout(() => {
                    cheatActivatedAchi.remove()
                    var cheatActivated = document.createElement('p');
                    cheatActivated.textContent = 'Cheat Activated';
                    cheatActivated.classList.add('cheatActivated')
                    document.querySelector('.gameWorking').append(cheatActivated);
                    var notification = new Audio('/sounds/cheat.mp3')
                    notification.volume = 1
                    notification.play()
                    setTimeout(() => {
                        cheatActivated.remove()
                    }, 5000);
                }, 3000);
            } else {
                var cheatActivated = document.createElement('p');
                cheatActivated.textContent = 'Cheat Activated';
                cheatActivated.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivated);
                var notification = new Audio('/sounds/cheat.mp3')
                notification.volume = 1
                notification.play()
                setTimeout(() => {
                    cheatActivated.remove()
                }, 5000);
            }
            break;
        case 'lettherebelight':
            //Ефект
            light.progressCount = 0
            light.lightsOn(hero,listElem,enemies,dealerList)
            if (!window.localStorage.getItem(`${hero.NAME}`).includes('cheater')){
                window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; cheater`)
                hero.CONTENT = window.localStorage.getItem(hero.NAME)
                achievmentsMove('/images/achievements/cheater.png', 'Брудний читер','Хочеш поганих часів?')
                hero.heroAchievements.play()
            }
            //Повідомлення
            if (alreadyActivated == false) {
                alreadyActivated = true
                var cheatActivatedAchi = document.createElement('p');
                cheatActivatedAchi.textContent = 'When cheats are activated, achievements will be disabled';
                cheatActivatedAchi.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivatedAchi);
                setTimeout(() => {
                    cheatActivatedAchi.remove()
                    var cheatActivated = document.createElement('p');
                    cheatActivated.textContent = 'Cheat Activated';
                    cheatActivated.classList.add('cheatActivated')
                    document.querySelector('.gameWorking').append(cheatActivated);
                    var notification = new Audio('/sounds/cheat.mp3')
                    notification.volume = 1
                    notification.play()
                    setTimeout(() => {
                        cheatActivated.remove()
                    }, 5000);
                }, 3000);
            } else {
                var cheatActivated = document.createElement('p');
                cheatActivated.textContent = 'Cheat Activated';
                cheatActivated.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivated);
                var notification = new Audio('/sounds/cheat.mp3')
                notification.volume = 1
                notification.play()
                setTimeout(() => {
                    cheatActivated.remove()
                }, 5000);
            }
            break;
            
    
        case 'killmesaidspy':
            //Ефект
            hero.god = false
            hero.health = 0
            if (!window.localStorage.getItem(`${hero.NAME}`).includes('cheater')){
                window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; cheater`)
                hero.CONTENT = window.localStorage.getItem(hero.NAME)
                achievmentsMove('/images/achievements/cheater.png', 'Брудний читер','Хочеш поганих часів?')
                hero.heroAchievements.play()
            }
            //Повідомлення
            if (alreadyActivated == false) {
                alreadyActivated = true
                var cheatActivatedAchi = document.createElement('p');
                cheatActivatedAchi.textContent = 'When cheats are activated, achievements will be disabled';
                cheatActivatedAchi.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivatedAchi);
                setTimeout(() => {
                    cheatActivatedAchi.remove()
                    var cheatActivated = document.createElement('p');
                    cheatActivated.textContent = 'Cheat Activated';
                    cheatActivated.classList.add('cheatActivated')
                    document.querySelector('.gameWorking').append(cheatActivated);
                    var notification = new Audio('/sounds/cheat.mp3')
                    notification.volume = 1
                    notification.play()
                    setTimeout(() => {
                        cheatActivated.remove()
                    }, 5000);
                }, 3000);
            } else {
                var cheatActivated = document.createElement('p');
                cheatActivated.textContent = 'Cheat Activated';
                cheatActivated.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivated);
                var notification = new Audio('/sounds/cheat.mp3')
                notification.volume = 1
                notification.play()
                setTimeout(() => {
                    cheatActivated.remove()
                }, 5000);
            }
            break;
            case 'killmesaidspy':
                //Ефект
                hero.god = false
                hero.health = 0
                if (!window.localStorage.getItem(`${hero.NAME}`).includes('cheater')){
                    window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; cheater`)
                    hero.CONTENT = window.localStorage.getItem(hero.NAME)
                    achievmentsMove('/images/achievements/cheater.png', 'Брудний читер','Хочеш поганих часів?')
                    hero.heroAchievements.play()
                }
                //Повідомлення
                if (alreadyActivated == false) {
                    alreadyActivated = true
                    var cheatActivatedAchi = document.createElement('p');
                    cheatActivatedAchi.textContent = 'When cheats are activated, achievements will be disabled';
                    cheatActivatedAchi.classList.add('cheatActivated')
                    document.querySelector('.gameWorking').append(cheatActivatedAchi);
                    setTimeout(() => {
                        cheatActivatedAchi.remove()
                        var cheatActivated = document.createElement('p');
                        cheatActivated.textContent = 'Cheat Activated';
                        cheatActivated.classList.add('cheatActivated')
                        document.querySelector('.gameWorking').append(cheatActivated);
                        var notification = new Audio('/sounds/cheat.mp3')
                        notification.volume = 1
                        notification.play()
                        setTimeout(() => {
                            cheatActivated.remove()
                        }, 5000);
                    }, 3000);
                } else {
                    var cheatActivated = document.createElement('p');
                    cheatActivated.textContent = 'Cheat Activated';
                    cheatActivated.classList.add('cheatActivated')
                    document.querySelector('.gameWorking').append(cheatActivated);
                    var notification = new Audio('/sounds/cheat.mp3')
                    notification.volume = 1
                    notification.play()
                    setTimeout(() => {
                        cheatActivated.remove()
                    }, 5000);
                }
                break;
                case 'killmesaidspy':
            //Ефект
            hero.god = false
            hero.health = 0
            if (!window.localStorage.getItem(`${hero.NAME}`).includes('cheater')){
                window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; cheater`)
                hero.CONTENT = window.localStorage.getItem(hero.NAME)
                achievmentsMove('/images/achievements/cheater.png', 'Брудний читер','Хочеш поганих часів?')
                hero.heroAchievements.play()
            }
            //Повідомлення
            if (alreadyActivated == false) {
                alreadyActivated = true
                var cheatActivatedAchi = document.createElement('p');
                cheatActivatedAchi.textContent = 'When cheats are activated, achievements will be disabled';
                cheatActivatedAchi.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivatedAchi);
                setTimeout(() => {
                    cheatActivatedAchi.remove()
                    var cheatActivated = document.createElement('p');
                    cheatActivated.textContent = 'Cheat Activated';
                    cheatActivated.classList.add('cheatActivated')
                    document.querySelector('.gameWorking').append(cheatActivated);
                    var notification = new Audio('/sounds/cheat.mp3')
                    notification.volume = 1
                    notification.play()
                    setTimeout(() => {
                        cheatActivated.remove()
                    }, 5000);
                }, 3000);
            } else {
                var cheatActivated = document.createElement('p');
                cheatActivated.textContent = 'Cheat Activated';
                cheatActivated.classList.add('cheatActivated')
                document.querySelector('.gameWorking').append(cheatActivated);
                var notification = new Audio('/sounds/cheat.mp3')
                notification.volume = 1
                notification.play()
                setTimeout(() => {
                    cheatActivated.remove()
                }, 5000);
            }
            break;
        case 'aihasfixed':
                //Ефект
                for (let enemy of enemies){
                    enemy.RADIUS_ELEM.style.display = 'none'
                }
                if (!window.localStorage.getItem(`${hero.NAME}`).includes('cheater')){
                    window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; cheater`)
                    hero.CONTENT = window.localStorage.getItem(hero.NAME)
                    achievmentsMove('/images/achievements/cheater.png', 'Брудний читер','Хочеш поганих часів?')
                    hero.heroAchievements.play()
                }
                //Повідомлення
                if (alreadyActivated == false) {
                    alreadyActivated = true
                    var cheatActivatedAchi = document.createElement('p');
                    cheatActivatedAchi.textContent = 'When cheats are activated, achievements will be disabled';
                    cheatActivatedAchi.classList.add('cheatActivated')
                    document.querySelector('.gameWorking').append(cheatActivatedAchi);
                    setTimeout(() => {
                        cheatActivatedAchi.remove()
                        var cheatActivated = document.createElement('p');
                        cheatActivated.textContent = 'Cheat Activated';
                        cheatActivated.classList.add('cheatActivated')
                        document.querySelector('.gameWorking').append(cheatActivated);
                        var notification = new Audio('/sounds/cheat.mp3')
                        notification.volume = 1
                        notification.play()
                        setTimeout(() => {
                            cheatActivated.remove()
                        }, 5000);
                    }, 3000);
                } else {
                    var cheatActivated = document.createElement('p');
                    cheatActivated.textContent = 'Cheat Activated';
                    cheatActivated.classList.add('cheatActivated')
                    document.querySelector('.gameWorking').append(cheatActivated);
                    var notification = new Audio('/sounds/cheat.mp3')
                    notification.volume = 1
                    notification.play()
                    setTimeout(() => {
                        cheatActivated.remove()
                    }, 5000);
                }
                break;
        }

}
//if (window.localStorage.getItem('auth') != null) {
//    var lightElement = document.createElement('div')
//    lightElement.classList.add('lightElem')
//    lightElement.style.filter = `brightness(${window.localStorage.getItem(`${window.localStorage.getItem('auth')}Light`)*10}%)`
//    lightElement.style.minWidth = '1920px'
//    lightElement.style.minHeight = '1080px'
//    lightElement.style.zIndex = '999'
//    document.body.append(lightElement)
//  
//}
function checkUser(){
    if (window.localStorage.getItem('auth') != null) {
        if (window.localStorage.getItem(`${window.localStorage.getItem('auth')}Music`) == null) {
            window.localStorage.setItem(`${window.localStorage.getItem('auth')}Music`,0.1)
        }
        if (window.localStorage.getItem(`${window.localStorage.getItem('auth')}Step`) == null) {
            window.localStorage.setItem(`${window.localStorage.getItem('auth')}Step`,0.1)
        }
        if (window.localStorage.getItem(`${window.localStorage.getItem('auth')}Light`) == null) {
            window.localStorage.setItem(`${window.localStorage.getItem('auth')}Light`,1)
        }
        if (window.localStorage.getItem(`${window.localStorage.getItem('auth')}Bullet`) == null) {
            window.localStorage.setItem(`${window.localStorage.getItem('auth')}Bullet`,0.1)
        }
    }
}



// Головний меню
function mainMenu(){
    if (menu.paused == true){
        menu.play()
    }
    
    menu.volume = window.localStorage.getItem(`${window.localStorage.getItem('auth')}Music`)
    menu.loop = true;
    //
    let mainMenuDiv = document.createElement('div');
    mainMenuDiv.classList.add('mainMenu')
    document.body.append(mainMenuDiv)
    let inOptions = false;
    //
    let text = document.createElement('img');
    text.src = '/images/background/Logo1.png';
    text.style.width = '600px'
    text.style.height = '311.25px'
    // text.classList.add('mainMenuText');
    let logoCount = 1
    let logoAnimCD = 25

    setInterval(() =>{
        if (logoAnimCD == 0){
            text.src = `/images/background/Logo${logoCount}.png`;
            logoCount ++
            if (logoCount > 14){
                logoCount = 1
                logoAnimCD = 25
            }
        } else {
            logoAnimCD --
        }
    },40)

    mainMenuDiv.append(text)
    //
    let buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttonsDiv')
    mainMenuDiv.append(buttonsDiv)
    //
    let startButton = document.createElement('button');
    startButton.textContent = 'START'
    startButton.classList.add('mainMenuButtons')
    startButton.style.background = 'linear-gradient(0deg, rgba(44,43,1,1) 0%, rgba(143,141,4,1) 25%)'
    startButton.addEventListener('click', ()=>{
        if (inOptions == false){

            mainMenuDiv.remove()
            if (window.localStorage.getItem(`${window.localStorage.getItem('auth')}FirstTime`) == null) {
                window.localStorage.setItem(`${window.localStorage.getItem('auth')}FirstTime`,true)
                let newsDiv = document.createElement('div');
                newsDiv.classList.add('news');
                document.body.append(newsDiv)
                let newsImg = document.createElement('img');
                newsImg.classList.add('newsImg');
                newsImg.src = '/images/News_ukr.png';
                newsImg.style.zIndex = '5'
                newsDiv.append(newsImg)
                let startNews = document.createElement('button');
                startNews.classList.add('mainMenuButtons');
                startNews.classList.add('startNews');
                startNews.style.background = 'linear-gradient(0deg, rgba(44,28,1,1) 0%, rgba(161,105,0,1) 25%)'
                startNews.textContent = 'SKIP';
                newsDiv.append(startNews)
                startNews.addEventListener('click',()=>{
                    let bullets = new Array()  
                    let gameDiv = document.createElement('div');
                    menu.pause()
                    gameDiv.classList.add('gameWorking');
                    room = 1
                    game(gameDiv, bullets, false)
                    newsDiv.remove()
                })

            } else {
                let bullets = new Array()  
                let gameDiv = document.createElement('div');
                menu.pause()
                gameDiv.classList.add('gameWorking');
                room = 1
                game(gameDiv, bullets, false)
            }
            
    }})
    buttonsDiv.append(startButton)
    //
    let tutorialButton = document.createElement('button');
    tutorialButton.textContent = 'TUTORIAL'
    tutorialButton.classList.add('mainMenuButtons')
    tutorialButton.style.background = 'linear-gradient(0deg, rgba(44,43,1,1) 0%, rgba(143,141,4,1) 25%)'
    tutorialButton.addEventListener('click', ()=>{
        if (inOptions == false){
            inTutorial = true
            menu.pause()
            let bullets = new Array()  
            let gameDiv = document.createElement('div');
            room = 1
            gameDiv.classList.add('gameWorking');

            game(gameDiv, bullets, true)
            mainMenuDiv.remove()
    }})
    buttonsDiv.append(tutorialButton)
    //
    let optionsButton = document.createElement('button');
    optionsButton.textContent = 'OPTIONS'
    optionsButton.classList.add('mainMenuButtons')
    optionsButton.style.background = 'linear-gradient(0deg, rgba(44,28,1,1) 0%, rgba(161,105,0,1) 25%)'
    optionsButton.addEventListener('click', ()=>{
        inOptions = true;
        text.textContent = 'Options'
        buttonsDiv.style.display = 'none';
        let optionsDiv = document.createElement('div')
        optionsDiv.classList.add("buttonsDiv")
        optionsDiv.style.width = '100%'
        optionsDiv.style.height = '70%'
        mainMenuDiv.append(optionsDiv)

        let musicRangeText = document.createElement('p')
        musicRangeText.textContent = `Music Volume: ${parseFloat(window.localStorage.getItem(`${window.localStorage.getItem('auth')}Music`))*10}`
        optionsDiv.append(musicRangeText)

        let musicRange = document.createElement('input')
        musicRange.type = 'range';
        musicRange.value = `${parseFloat(window.localStorage.getItem(`${window.localStorage.getItem('auth')}Music`))*10}`
        musicRange.addEventListener('change', ()=>{
            musicRangeText.textContent = `Music Volume: ${musicRange.value}`
            musicRangeText.append(musicRange)
        })

        
        let stepRangeText = document.createElement('p');
        stepRangeText.textContent = `Step Volume: ${parseFloat(window.localStorage.getItem(`${window.localStorage.getItem('auth')}Step`))*10}`
        optionsDiv.append(stepRangeText)
        
        let stepRange = document.createElement('input');
        stepRange.type = 'range'
        stepRange.min = '0';
        stepRange.max = '10';
        stepRange.value = `${parseFloat(window.localStorage.getItem(`${window.localStorage.getItem('auth')}Step`))*10}`
        stepRange.addEventListener('change', ()=>{
            stepRangeText.textContent = `Step Volume: ${stepRange.value}`
            stepRangeText.append(stepRange)
        })
        stepRangeText.append(stepRange)
        
        let bulletRangeText = document.createElement('p')
        bulletRangeText.textContent = `Bullet Volume: ${parseFloat(window.localStorage.getItem(`${window.localStorage.getItem('auth')}Bullet`))*10}`
        optionsDiv.append(bulletRangeText)

        let bulletRange = document.createElement('input')
        bulletRange.type = 'range';
        bulletRange.min = '0';
        bulletRange.max = '10';
        bulletRange.value = `${parseFloat(window.localStorage.getItem(`${window.localStorage.getItem('auth')}Bullet`))*10}`
        bulletRange.addEventListener('change', ()=>{
            bulletRangeText.textContent = `Bullet Volume: ${bulletRange.value}`
            bulletRangeText.append(bulletRange)
        })
        bulletRangeText.append(bulletRange)

        musicRange.min = '0';
        musicRange.max = '10';
        musicRangeText.append(musicRange)

        //let lightRangeText = document.createElement('p')
        //lightRangeText.textContent = `Brightness: ${parseFloat(window.localStorage.getItem(`${window.localStorage.getItem('auth')}Light`))*10}`
        //optionsDiv.append(lightRangeText)
        //
        //let lightRange = document.createElement('input')
        //lightRange.type = 'range';
        //lightRange.min = '0';
        //lightRange.max = '10';
        //lightRange.value = `${parseFloat(window.localStorage.getItem(`${window.localStorage.getItem('auth')}Light`))}`
        //lightRange.addEventListener('change', ()=>{
        //    lightRangeText.textContent = `Brightness: ${lightRange.value}`
        //    lightRangeText.append(lightRange)
        //})
        //lightRangeText.append(lightRange)

        let radiusRangeText = document.createElement('p')
        radiusRangeText.textContent = `Radius Enemy Debug: ${radiusEnemy}`
        optionsDiv.append(radiusRangeText)

        let radiusRange = document.createElement('input')
        radiusRange.type = 'range';
        radiusRange.min = '0';
        radiusRange.max = '1';
        radiusRange.value = `${radiusEnemy}`
        radiusRange.addEventListener('change', ()=>{
            radiusEnemy = parseInt(radiusRange.value);
            radiusRangeText.textContent = `Radius Enemy Debug: ${radiusRange.value}`
            radiusRangeText.append(radiusRange)
        })

        

        radiusRangeText.append(radiusRange)


        let applyOptionButton = document.createElement('button');
        applyOptionButton.textContent = 'APPLY'
        applyOptionButton.classList.add('mainMenuButtons')
        applyOptionButton.style.background = 'linear-gradient(0deg, rgba(44,28,1,1) 0%, rgba(33,173,0,1) 25%)'
        optionsDiv.append(applyOptionButton)
        applyOptionButton.addEventListener('click',() =>{
            musicVolume = parseInt(musicRange.value) / 10
            stepVolume = parseInt(stepRange.value) / 10
            bulletVolume = parseInt(bulletRange.value) / 10
            //Brightness = window.localStorage.setItem(`${window.localStorage.getItem('auth')}Light`,parseInt(lightRange.value)*10)

            //document.querySelector('.lightElem').style.filter = `brightness(${Brightness}%)`
            window.localStorage.setItem(`${window.localStorage.getItem('auth')}Music`,musicVolume)
            window.localStorage.setItem(`${window.localStorage.getItem('auth')}Step`,stepVolume)
            window.localStorage.setItem(`${window.localStorage.getItem('auth')}Bullet`,bulletVolume)
            menu.volume = window.localStorage.getItem(`${window.localStorage.getItem('auth')}Music`)
            if (radiusRange.value == '1'){
                radius = true
            } else {
                radius = false
            }
            
        })       

        let exitOptionsButton = document.createElement('button')
        exitOptionsButton.textContent = 'BACK'
        exitOptionsButton.classList.add('mainMenuButtons')
        exitOptionsButton.style.background = 'linear-gradient(0deg, rgba(44,28,1,1) 0%, rgba(161,105,0,1) 25%)'
        optionsDiv.append(exitOptionsButton)
        exitOptionsButton.addEventListener('click',()=>{
            inOptions = false;
            buttonsDiv.style.display = 'flex';
            text.textContent = 'Never Improve A.I.'
            optionsDiv.remove()
        })
    })
    buttonsDiv.append(optionsButton)
    
    let inAchievments = false;
    
    let achievmentsButton = document.createElement('button')
    achievmentsButton.textContent = 'ACHIEVEMENTS'
    achievmentsButton.classList.add('mainMenuButtons')
    achievmentsButton.style.background = 'linear-gradient(0deg, rgba(27,0,73,1) 0%, rgba(145,0,173,1) 48%)'
    achievmentsButton.addEventListener('click', ()=>{
        inAchievments = true;
        buttonsDiv.style.display = 'none';
        text.style.display = 'none';
        let AchievmentsDiv = document.createElement('div')
        //AchievmentsDiv.style.position = 'relative'
        //AchievmentsDiv.style.top = '0px'
        //AchievmentsDiv.style.left = '0px'
        AchievmentsDiv.classList.add("buttonsDivAchiev")
    
        AchievmentsDiv.style.overflowY = 'auto'
        AchievmentsDiv.style.width = '100%'
        // AchievmentsDiv.style.height = `200%`
        mainMenuDiv.append(AchievmentsDiv)


        if (window.localStorage.getItem(window.localStorage.getItem('auth')).includes('killer')){
            let ach = document.createElement('div')
            ach.classList.add('achievements')
            ach.style.width = '400px'
            ach.style.height = '150px'
            ach.style.backgroundColor = 'brown'
            ach.style.zIndex = '998'
            ach.style.border = '2px solid black'
            ach.classList.add('ach')
                
            let achImg = document.createElement('img')
            achImg.src = '/images/achievements/killer.png'
            achImg.style.position = 'relative'
            achImg.style.width = '100px'
            achImg.style.height = '100px'
            achImg.style.right = '-25px'
            achImg.style.bottom = '-25px'
            achImg.style.zIndex = '999'
                
            let achText = document.createElement('p')
            achText.textContent = 'Вбити свого першого ворога'
            achText.style.position = 'relative'
            achText.style.width = '225px'
            achText.style.height = '100px'
            achText.style.right = '-150px'
            achText.style.bottom = '50px'
            achText.style.color = 'white'
            achText.style.zIndex = '999'

            let achName = document.createElement('p')
            achName.textContent = 'Вбивця!'
            achName.style.textShadow = '-1px 0px 0px red, 1px 0px 0px red, 0px -1px 0px red, 0px 1px 0px white'
            achName.style.fontSize = '15px'
            achName.style.position = 'relative'
            achName.style.width = '225px'
            achName.style.height = '100px'
            achName.style.right = '-150px'
            achName.style.bottom = '185px'
            achName.style.color = 'black'
            achName.style.zIndex = '999'
                
            ach.append(achImg)
            ach.append(achText)
            ach.append(achName)
            AchievmentsDiv.append(ach)
        }
        if (window.localStorage.getItem(window.localStorage.getItem('auth')).includes('fallToDie')){
            let ach = document.createElement('div')
            ach.classList.add('achievements')
            ach.style.width = '400px'
            ach.style.height = '150px'
            ach.style.backgroundColor = 'brown'
            ach.style.zIndex = '998'
            ach.style.border = '2px solid black'
            ach.classList.add('ach')
                
            let achImg = document.createElement('img')
            achImg.src = '/images/achievements/fall.png'
            achImg.style.position = 'relative'
            achImg.style.width = '100px'
            achImg.style.height = '100px'
            achImg.style.right = '-25px'
            achImg.style.bottom = '-25px'
            achImg.style.zIndex = '999'
                
            let achText = document.createElement('p')
            achText.textContent = 'Впасти й розбитись'
            achText.style.position = 'relative'
            achText.style.width = '225px'
            achText.style.height = '100px'
            achText.style.right = '-150px'
            achText.style.bottom = '50px'
            achText.style.color = 'white'
            achText.style.zIndex = '999'

            let achName = document.createElement('p')
            achName.textContent = 'Джеронімоооо!'
            achName.style.textShadow = '-1px 0px 0px green, 1px 0px 0px green, 0px -1px 0px green, 0px 1px 0px white'
            achName.style.fontSize = '15px'
            achName.style.position = 'relative'
            achName.style.width = '225px'
            achName.style.height = '100px'
            achName.style.right = '-150px'
            achName.style.bottom = '185px'
            achName.style.color = 'black'
            achName.style.zIndex = '999'
                
            ach.append(achImg)
            ach.append(achText)
            ach.append(achName)
            AchievmentsDiv.append(ach)
        }
        if (window.localStorage.getItem(window.localStorage.getItem('auth')).includes('learningIsLight')){
            let ach = document.createElement('div')
            ach.classList.add('achievements')
            ach.style.width = '400px'
            ach.style.height = '150px'
            ach.style.backgroundColor = 'brown'
            ach.style.zIndex = '998'
            ach.style.border = '2px solid black'
            ach.classList.add('ach')
                
            let achImg = document.createElement('img')
            achImg.src = '/images/achievements/learningIsLIght.png'
            achImg.style.position = 'relative'
            achImg.style.width = '100px'
            achImg.style.height = '100px'
            achImg.style.right = '-25px'
            achImg.style.bottom = '-25px'
            achImg.style.zIndex = '999'
                
            let achText = document.createElement('p')
            achText.textContent = 'Зайти в туторіал'
            achText.style.position = 'relative'
            achText.style.width = '225px'
            achText.style.height = '100px'
            achText.style.right = '-150px'
            achText.style.bottom = '50px'
            achText.style.color = 'white'
            achText.style.zIndex = '999'

            let achName = document.createElement('p')
            achName.textContent = 'Знання це світло'
            achName.style.textShadow = '-1px 0px 0px yellow, 1px 0px 0px yellow, 0px -1px 0px yellow, 0px 1px 0px white'
            achName.style.fontSize = '15px'
            achName.style.position = 'relative'
            achName.style.width = '225px'
            achName.style.height = '100px'
            achName.style.right = '-150px'
            achName.style.bottom = '185px'
            achName.style.color = 'black'
            achName.style.zIndex = '999'
                
            ach.append(achImg)
            ach.append(achText)
            ach.append(achName)
            AchievmentsDiv.append(ach)
        }
        if (window.localStorage.getItem(window.localStorage.getItem('auth')).includes('cheater')){
            let ach = document.createElement('div')
            ach.classList.add('achievements')
            ach.style.width = '400px'
            ach.style.height = '150px'
            ach.style.backgroundColor = 'brown'
            ach.style.zIndex = '998'
            ach.style.border = '2px solid black'
            ach.classList.add('ach')
                
            let achImg = document.createElement('img')
            achImg.src = '/images/achievements/cheater.png'
            achImg.style.position = 'relative'
            achImg.style.width = '100px'
            achImg.style.height = '100px'
            achImg.style.right = '-25px'
            achImg.style.bottom = '-25px'
            achImg.style.zIndex = '999'
                
            let achText = document.createElement('p')
            achText.textContent = 'Хочеш поганих часів?'
            achText.style.position = 'relative'
            achText.style.width = '225px'
            achText.style.height = '100px'
            achText.style.right = '-150px'
            achText.style.bottom = '50px'
            achText.style.color = 'white'
            achText.style.zIndex = '999'

            let achName = document.createElement('p')
            achName.textContent = 'Брудний читер'
            achName.style.textShadow = '-1px 0px 0px purple, 1px 0px 0px purple, 0px -1px 0px purple, 0px 1px 0px white'
            achName.style.fontSize = '15px'
            achName.style.position = 'relative'
            achName.style.width = '225px'
            achName.style.height = '100px'
            achName.style.right = '-150px'
            achName.style.bottom = '185px'
            achName.style.color = 'black'
            achName.style.zIndex = '999'
                
            ach.append(achImg)
            ach.append(achText)
            ach.append(achName)
            AchievmentsDiv.append(ach)
        }
        if (window.localStorage.getItem(window.localStorage.getItem('auth')).includes('math')){
            let ach = document.createElement('div')
            ach.classList.add('achievements')
            ach.style.width = '400px'
            ach.style.height = '150px'
            ach.style.backgroundColor = 'brown'
            ach.style.zIndex = '998'
            ach.style.border = '2px solid black'
            ach.classList.add('ach')
                
            let achImg = document.createElement('img')
            achImg.src = '/images/achievements/hacker.png'
            achImg.style.position = 'relative'
            achImg.style.width = '100px'
            achImg.style.height = '100px'
            achImg.style.right = '-25px'
            achImg.style.bottom = '-25px'
            achImg.style.zIndex = '999'
                
            let achText = document.createElement('p')
            achText.textContent = 'Дайте правильну відповідь десятичним дробом'
            achText.style.position = 'relative'
            achText.style.width = '225px'
            achText.style.height = '100px'
            achText.style.right = '-150px'
            achText.style.bottom = '50px'
            achText.style.color = 'white'
            achText.style.zIndex = '999'

            let achName = document.createElement('p')
            achName.textContent = 'Хакер'
            achName.style.textShadow = '-1px 0px 0px green, 1px 0px 0px green, 0px -1px 0px green, 0px 1px 0px white'
            achName.style.fontSize = '15px'
            achName.style.position = 'relative'
            achName.style.width = '225px'
            achName.style.height = '100px'
            achName.style.right = '-150px'
            achName.style.bottom = '185px'
            achName.style.color = 'black'
            achName.style.zIndex = '999'
                
            ach.append(achImg)
            ach.append(achText)
            ach.append(achName)
            AchievmentsDiv.append(ach)
        }
        if (window.localStorage.getItem(window.localStorage.getItem('auth')).includes('badMath')){
            let ach = document.createElement('div')
            ach.classList.add('achievements')
            ach.style.width = '400px'
            ach.style.height = '150px'
            ach.style.backgroundColor = 'brown'
            ach.style.zIndex = '998'
            ach.style.border = '2px solid black'
            ach.classList.add('ach')
                
            let achImg = document.createElement('img')
            achImg.src = '/images/achievements/badMath.png'
            achImg.style.position = 'relative'
            achImg.style.width = '100px'
            achImg.style.height = '100px'
            achImg.style.right = '-25px'
            achImg.style.bottom = '-25px'
            achImg.style.zIndex = '999'
                
            let achText = document.createElement('p')
            achText.textContent = 'Дайте відповідь 3 на запитанні 2 + 2'
            achText.style.position = 'relative'
            achText.style.width = '225px'
            achText.style.height = '100px'
            achText.style.right = '-150px'
            achText.style.bottom = '50px'
            achText.style.color = 'white'
            achText.style.zIndex = '999'

            let achName = document.createElement('p')
            achName.textContent = 'Поганий математик'
            achName.style.textShadow = '-1px 0px 0px aqua, 1px 0px 0px aqua, 0px -1px 0px aqua, 0px 1px 0px white'
            achName.style.fontSize = '15px'
            achName.style.position = 'relative'
            achName.style.width = '225px'
            achName.style.height = '100px'
            achName.style.right = '-150px'
            achName.style.bottom = '185px'
            achName.style.color = 'black'
            achName.style.zIndex = '999'
                
            ach.append(achImg)
            ach.append(achText)
            ach.append(achName)
            AchievmentsDiv.append(ach)
        }
        if (window.localStorage.getItem(window.localStorage.getItem('auth')).includes('explosion')){
            let ach = document.createElement('div')
            ach.classList.add('achievements')
            ach.style.width = '400px'
            ach.style.height = '150px'
            ach.style.backgroundColor = 'brown'
            ach.style.zIndex = '998'
            ach.style.border = '2px solid black'
            ach.classList.add('ach')
                
            let achImg = document.createElement('img')
            achImg.src = '/images/achievements/explosion.png'
            achImg.style.position = 'relative'
            achImg.style.width = '100px'
            achImg.style.height = '100px'
            achImg.style.right = '-25px'
            achImg.style.bottom = '-25px'
            achImg.style.zIndex = '999'
                
            let achText = document.createElement('p')
            achText.textContent = "Вижити після вибуху (обов'язково отримати шкоду від вибуху та вижити)"
            achText.style.position = 'relative'
            achText.style.width = '225px'
            achText.style.height = '100px'
            achText.style.right = '-150px'
            achText.style.bottom = '50px'
            achText.style.color = 'white'
            achText.style.zIndex = '999'

            let achName = document.createElement('p')
            achName.textContent = 'Я в порядку, сір'
            achName.style.textShadow = '-1px 0px 0px orange, 1px 0px 0px orange, 0px -1px 0px orange, 0px 1px 0px white'
            achName.style.fontSize = '15px'
            achName.style.position = 'relative'
            achName.style.width = '225px'
            achName.style.height = '100px'
            achName.style.right = '-150px'
            achName.style.bottom = '185px'
            achName.style.color = 'black'
            achName.style.zIndex = '999'
                
            ach.append(achImg)
            ach.append(achText)
            ach.append(achName)
            AchievmentsDiv.append(ach)
        }
        if (window.localStorage.getItem(window.localStorage.getItem('auth')).includes('empty')){
            let ach = document.createElement('div')
            ach.classList.add('achievements')
            ach.style.width = '400px'
            ach.style.height = '150px'
            ach.style.backgroundColor = 'brown'
            ach.style.zIndex = '998'
            ach.style.border = '2px solid black'
            ach.classList.add('ach')
                
            let achImg = document.createElement('img')
            achImg.src = '/images/achievements/EmptyBox.png'
            achImg.style.position = 'relative'
            achImg.style.width = '100px'
            achImg.style.height = '100px'
            achImg.style.right = '-25px'
            achImg.style.bottom = '-25px'
            achImg.style.zIndex = '999'
                
            let achText = document.createElement('p')
            achText.textContent = "У коробці нічого немає"
            achText.style.position = 'relative'
            achText.style.width = '225px'
            achText.style.height = '100px'
            achText.style.right = '-150px'
            achText.style.bottom = '50px'
            achText.style.color = 'white'
            achText.style.zIndex = '999'

            let achName = document.createElement('p')
            achName.textContent = 'А де?'
            achName.style.textShadow = '-1px 0px 0px grey, 1px 0px 0px grey, 0px -1px 0px grey, 0px 1px 0px white'
            achName.style.fontSize = '15px'
            achName.style.position = 'relative'
            achName.style.width = '225px'
            achName.style.height = '100px'
            achName.style.right = '-150px'
            achName.style.bottom = '185px'
            achName.style.color = 'black'
            achName.style.zIndex = '999'
                
            ach.append(achImg)
            ach.append(achText)
            ach.append(achName)
            AchievmentsDiv.append(ach)
        }
        if (window.localStorage.getItem(window.localStorage.getItem('auth')).includes('theEnd')){
            let ach = document.createElement('div')
            ach.classList.add('achievements')
            ach.style.width = '400px'
            ach.style.height = '150px'
            ach.style.backgroundColor = 'brown'
            ach.style.zIndex = '998'
            ach.style.border = '2px solid black'
            ach.classList.add('ach')
                
            let achImg = document.createElement('img')
            achImg.src = '/images/achievements/theEnd.png'
            achImg.style.position = 'relative'
            achImg.style.width = '100px'
            achImg.style.height = '100px'
            achImg.style.right = '-25px'
            achImg.style.bottom = '-25px'
            achImg.style.zIndex = '999'
                
            let achText = document.createElement('p')
            achText.textContent = 'Пройдіть гру'
            achText.style.position = 'relative'
            achText.style.width = '225px'
            achText.style.height = '100px'
            achText.style.right = '-150px'
            achText.style.bottom = '50px'
            achText.style.color = 'white'
            achText.style.zIndex = '999'

            let achName = document.createElement('p')
            achName.textContent = 'Зе енд'
            achName.style.textShadow = '-1px 0px 0px orange, 1px 0px 0px orange, 0px -1px 0px orange, 0px 1px 0px white'
            achName.style.fontSize = '15px'
            achName.style.position = 'relative'
            achName.style.width = '225px'
            achName.style.height = '100px'
            achName.style.right = '-150px'
            achName.style.bottom = '185px'
            achName.style.color = 'black'
            achName.style.zIndex = '999'
                
            ach.append(achImg)
            ach.append(achText)
            ach.append(achName)
            AchievmentsDiv.append(ach)
        }
        if (!window.localStorage.getItem(window.localStorage.getItem('auth')).includes('killer') && 
        !window.localStorage.getItem(window.localStorage.getItem('auth')).includes('fallToDie') && 
        !window.localStorage.getItem(window.localStorage.getItem('auth')).includes('learningIsLight') && 
        !window.localStorage.getItem(window.localStorage.getItem('auth')).includes('cheater') &&
        !window.localStorage.getItem(window.localStorage.getItem('auth')).includes('math') &&
        !window.localStorage.getItem(window.localStorage.getItem('auth')).includes('explosion') &&
        !window.localStorage.getItem(window.localStorage.getItem('auth')).includes('empty')){
            let achText = document.createElement('p')
            achText.textContent = 'У вас немає досягнень'
            achText.style.width = '225px'
            achText.style.height = '100px'
            achText.style.color = 'white'
            achText.style.fontSize = '30px'
            achText.style.zIndex = '999'
            AchievmentsDiv.append(achText)

        }
        //if (document.querySelectorAll('.achievements').length > 3){
        //    AchievmentsDiv.style.height = `${document.body.clientHeight + ((document.querySelectorAll('.achievements').length - 3) * 175)}px`
        //    // console.log(`${document.body.clientHeight + ((document.querySelectorAll('.achievements').length - 3) * 175)}px`, document.body.clientHeight)
        //}
        let AchievementsLogo = document.createElement('p')
        AchievementsLogo.style.fontFamily = 'Press Start 2P, sans serif'
        AchievementsLogo.style.color = 'white'
        AchievementsLogo.style.fontSize = '100px'
        AchievementsLogo.style.textShadow = '-1px 0px 0px white, 10px 0px 0px orange, 0px 0px 0px orange, 0px 1px 0px orange'
        AchievementsLogo.style.position = 'absolute'
        AchievementsLogo.style.right = '50px'
        AchievementsLogo.style.top = '150px'
        AchievementsLogo.textContent = 'Achievements'
        AchievmentsDiv.append(AchievementsLogo)
        let exitAchButton = document.createElement('button');
        exitAchButton.textContent = 'EXIT'
        exitAchButton.classList.add('mainMenuButtons')
        exitAchButton.style.position = 'absolute'
        exitAchButton.style.right = '20px'
        exitAchButton.style.bottom = '20px'
        exitAchButton.style.background = 'linear-gradient(0deg, rgba(44,28,1,1) 0%, rgba(33,173,0,1) 25%)'
        AchievmentsDiv.append(exitAchButton)
        exitAchButton.addEventListener('click',() =>{
            inAchievments = false
            AchievmentsDiv.remove()
            buttonsDiv.style.display = 'flex';
            text.style.display = 'block';
            AchievmentsDiv.style.overflowY = 'hidden'
        })
    
    })
    buttonsDiv.append(achievmentsButton)

    let exitButton = document.createElement('button');
    exitButton.textContent = 'LOG OUT'
    exitButton.classList.add('mainMenuButtons')
    exitButton.style.background = 'linear-gradient(0deg, rgba(44,43,1,1) 0%, rgba(143,141,4,1) 25%)'
    exitButton.addEventListener('click', ()=>{
        if (inOptions == false){
            window.localStorage.removeItem(`${window.localStorage.getItem('auth')}FirstTime`)
            window.localStorage.removeItem('auth')
            location.reload()
    }})
    buttonsDiv.append(exitButton)
}

// Плавна підгрузка кімнат
function transitionRooms(){
    let helpList = [
        'Натисніть Alt + F4 для стабільної нервової системи',
        'Не розкидуйтесь грошима, можете економити на більш цінну прокачку',
        'Чим далі ви заходите, тим сильніші вороги',
        'Руйнуйте коробки, зних може випасти щось корисне',
        'Не ігноруйте записи, вони є прововідниками в сюжет',
        'Програмування це круто!'
    ]
    let opacity = 0
    let animCount = 1
    let transitionDiv = document.createElement('div')
    transitionDiv.style.opacity = opacity
    transitionDiv.style.background = 'black'
    transitionDiv.style.width = '100%'
    transitionDiv.style.height = '2000px'
    document.body.append(transitionDiv)
    let transitionImg = document.createElement('img')
    let randomImg = Math.random()*4
    if (randomImg <= 1){
        transitionImg.src = 'images/TR1.png'
    } else if (randomImg <= 2){
        transitionImg.src = 'images/TR2.png'
    } else if (randomImg <= 3){
        transitionImg.src = 'images/TR3.png'
    } else if (randomImg <= 4){
        transitionImg.src = 'images/TR4.png'
    }
    transitionImg.style.marginLeft = '25%'
    transitionImg.style.marginRight = '25%'
    transitionDiv.append(transitionImg)
    let helpDiv = document.createElement('div')
    helpDiv.style.position = 'absolute'
    helpDiv.style.top = '800px'
    helpDiv.style.left = '25%'
    helpDiv.style.width = '1024px'
    helpDiv.style.height = '120px'
    helpDiv.style.border = '4px solid rgba(74, 52, 35, 1)'
    helpDiv.style.backgroundColor = 'rgba(39, 35, 35, 1)'
    transitionDiv.append(helpDiv)
    let heroAnim = document.createElement('img')
    heroAnim.src = '/images/hero/move/move1.png'
    heroAnim.style.position = 'absolute'
    heroAnim.style.top = '10px'
    helpDiv.append(heroAnim)
    let helpText = document.createElement('p')
    helpText.style.position = 'absolute'
    let textContent = helpList[Math.round(Math.random()*(helpList.length-1))]
    helpText.textContent = textContent
    helpText.style.top = '10px'
    helpText.style.left = '125px'
    helpText.style.width = '890px'
    helpText.classList.add('coinText')
    helpDiv.append(helpText)
    let skipButton = document.createElement('button')
    skipButton.style.position = 'absolute';
    skipButton.style.background = 'linear-gradient(0deg, rgba(44,28,1,1) 0%, rgba(161,105,0,1) 25%)'
    skipButton.textContent = 'SKIP';
    skipButton.classList.add('mainMenuButtons');
    skipButton.classList.add('startNews');
    skipButton.style.left = '1624px';
    skipButton.style.top = '835px';
    skipButton.style.width = '150px';
    skipButton.style.height = '50px';
    transitionDiv.append(skipButton)
    

    let opac = setInterval(() => {
        if (opacity < 1){
            opacity += 0.1
            transitionDiv.style.opacity = opacity
        }
    },25)
    let anim = setInterval(() => {
        if (animCount >= 4){
            animCount = 1
        } else{
            animCount++
        }
        heroAnim.src = `/images/hero/move/move${animCount}.png`
    },170)

    skipButton.addEventListener('click', ()=>{
        clearInterval(opac)
        clearInterval(anim)
        transitionDiv.remove()
        let bullets = new Array()
        let gameDiv = document.createElement('div')
        gameDiv.classList.add('gameWorking');
        game(gameDiv, bullets, false)
    })
}



var radius = false
var heroHealth = 30;
var heroCoins = 0;

var tutorialMap = [
    ['1','1','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','1','1'],
    ['1','1','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','1','1'],
    ['1','1','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','1','1'],
    ['1','1','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','1','1'],
    ['1','1','0','0','m','0','0','j','0','0','0','0','0','0','0','0','s','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','p','0','0','0','1','1'],
    ['1','1','0','0','0','0','0','0','0','0','0','0','0','3','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','1','1'],
    ['1','1','0','0','0','0','0','0','0','0','0','2','0','1','0','0','0','0','0','0','0','0','0','0','3','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','1','1'],
    ['1','1','0','0','h','0','0','0','3','0','0','0','0','1','0','0','n','0','0','e','0','0','0','b','1','0','0','0','0','i','0','0','0','0','d','0','0','0','0','0','0','0','0','1','1'],
    ['1','1','3','3','3','3','3','3','3','3','3','3','3','1','3','3','3','3','3','3','3','3','3','3','1','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','1','1'],
    ['1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1']
];

if (window.localStorage.getItem('auth') == null) {
    // Додаємо контейнер для реєстрації
    const fon = document.createElement('div');
    fon.classList.add('fon');
    document.body.append(fon);

    // Додаємо контейнер для об'єктів реєстрації
    const loginDiv = document.createElement('div');
    loginDiv.classList.add('login');
    fon.append(loginDiv);

    // Додаємо змінну івенту реєстрації
    var logEvent = 'login';

    // Додаємо кнопку для авторизації/реєстрації
    const loginButton = document.createElement('button');
    loginButton.innerHTML = 'Login';
    loginButton.classList.add('loginButton')

    // Контейнер для кнопок логіну та регістру
    const loginButtons = document.createElement('div')
    loginButtons.classList.add('loginButtons')
    loginDiv.append(loginButtons)

    // Додаємо кнопку для початку процессу логіну
    const buttonLogin = document.createElement('button');
    buttonLogin.classList.add('buttonLogin');
    buttonLogin.textContent = 'Sign in';
    loginButtons.append(buttonLogin);

    // Змінюємо подію на "Авторизація"
    buttonLogin.addEventListener('click', ()=>{
        logEvent = 'login'
        loginButton.textContent = 'Login' 
        loginButton.classList.add('loginButton')
        loginButton.classList.remove('registerButton')
    })

    // Додаємо кнопку початку процессу реєстрації
    const buttonRegister = document.createElement('button');
    buttonRegister.classList.add('buttonRegister');
    buttonRegister.textContent = 'Register'
    loginButtons.append(buttonRegister);

    // Змінюємо подію на "Реєстрація"
    buttonRegister.addEventListener('click', ()=>{
        logEvent = 'register';
        loginButton.textContent = 'Register'
        loginButton.style.background = ""
        loginButton.classList.add('registerButton')
        loginButton.classList.remove('loginButton')
    })

    // Створюємо поле для вводу імені
    const userName = document.createElement('label');
    userName.classList.add('loginLabel');
    userName.textContent = "User name: ";
    loginDiv.append(userName);
    const nameInput = document.createElement('input');
    userName.append(nameInput);


    // Створюємо змінну для вводу пароля
    const userPassword = document.createElement('label');
    userPassword.classList.add('loginLabel');
    userPassword.textContent = 'User password: ';
    loginDiv.append(userPassword);
    const passwordInput = document.createElement('input');
    userPassword.append(passwordInput);

    loginDiv.append(loginButton);

    // Додаємо кнопці процесс входу/закінчення процессу реєстрації
    loginButton.addEventListener('click', ()=> {
        if (logEvent == 'login') {
            
            window.localStorage.setItem('auth',`${nameInput.value}`)
            checkUser()
            let localPassword = window.localStorage.getItem(`${nameInput.value}`);
            let mainPassword = ''
            for (let lPassword of localPassword){
                if (lPassword == ';'){
                    break
                } else {
                    mainPassword += lPassword
                }
            }
            if(mainPassword == passwordInput.value){
                fon.remove();
                mainMenu()
            }

        }else{
            if (!window.localStorage.getItem(`${nameInput.value}`)){
                window.localStorage.setItem(nameInput.value, passwordInput.value);
                logEvent = 'login';
                loginButton.style.background = "linear-gradient(rgb(89, 207, 59), rgb(2, 66, 23))"
                loginButton.textContent = 'Login'
            }
    }
    });
} else {
    checkUser()
    mainMenu()
}



function theEnd(){
    window.localStorage.setItem(`${window.localStorage.getItem('auth')}FirstTime`,false)
    let newsDiv = document.createElement('div');
    newsDiv.classList.add('news');
    document.body.append(newsDiv)
    let newsImg = document.createElement('img');
    newsImg.classList.add('newsImg');
    newsImg.src = '/images/Authors.png';
    newsImg.style.zIndex = '5'
    newsDiv.append(newsImg)
    let startNews = document.createElement('button');
    startNews.classList.add('mainMenuButtons');
    startNews.classList.add('startNews');
    startNews.style.background = 'linear-gradient(0deg, rgba(44,28,1,1) 0%, rgba(161,105,0,1) 25%)'
    startNews.textContent = 'SKIP';
    newsDiv.append(startNews)
    startNews.addEventListener('click',()=>{
        alreadyActivated = false
        mainMenu()
       
        newsDiv.remove()
    })
}


// Створюємо контейнер для поразки
let gameOverDiv = document.createElement('div');
gameOverDiv.classList.add('gameOver');

// Створюємо елемент для зображення
let gameOverImg = document.createElement('img');
gameOverImg.src = '/images/background/game_over.png'
gameOverImg.classList.add('gameOverImg')
gameOverDiv.append(gameOverImg)

let coins = 0
let boosts = []
let inTutorial = false
let room


// Додаємо кнопку воскресіння
let respawnButton = document.createElement('button')
respawnButton.classList.add('respawnButton')
respawnButton.textContent = 'Respawn'
// respawnButton.style.top = `${document.body.clientHeight/2.25}px`
respawnButton.style.top = `${document.body.clientHeight/1.2}px`
gameOverDiv.append(respawnButton)
// Додаємо відновлення гри при воскресенні
respawnButton.addEventListener('click', () =>{
    gameOverDiv.remove()
    if (document.querySelector('.gameDivTop')!= null){
        document.querySelector('.gameDivTop').remove()
    }
    let bullets = new Array()  
    let gameDiv = document.createElement('div');
    room = 1
    coins = 0
    boosts = []
    gameDiv.classList.add('gameWorking');
    game(gameDiv, bullets, false)

})

// Створюємо функцію для закінчення усіх процессів у разі програшу
function gameOver(health, intervalList,bullets,BackgroundMusic,hero,enemyList) {
    if (health <= 0) {
        for (let enemy of enemyList){
            enemy.stopMusic()
        }
        alreadyActivated = false
        enteredCheat = "";
        heroHealth = 30;
        heroCoins = 0;
        coins = 0
        boosts = []
        BackgroundMusic.pause()
        hero.heroDeathSound.play()
        document.querySelector('.gameWorking').remove()
        document.body.append(gameOverDiv)
        for(let interval of intervalList){
            clearInterval(interval)
        }
    }
}





// Створюємо функцію яка запускає гру
function game(gameDiv, bullets, inTutorial){

    // if (menu != undefined){
    //     console.log(menu)
    //     if (menu.paused == false){
    //         menu.pause()
    //     } else{
    //         console.log(menu.paused)
    //     }
    // }

    document.body.append(gameDiv);
    let gameDivTop = document.createElement('div')
    gameDivTop.position = 'absolute'
    gameDivTop.style.width = '100%'
    gameDivTop.style.height = '100%'
    gameDivTop.classList.add('gameDivTop')
    gameDivTop.style.zIndex = '1'
    document.body.append(gameDivTop)
    var end = false
    // let cheatActivated = document.createElement('p');
    // cheatActivated.textContent = 'Cheat Activated';
    // cheatActivated.classList.add('cheatActivated')
    // document.querySelector('.gameWorking').append(cheatActivated);

    for (let elem of document.querySelectorAll('.mainMenu')) {
        elem.remove()
    }
    let currency_list = new Array();
    // Чистимо усі пулі які залишились з минулої гри
    for (let bullet of document.querySelectorAll('.bullet')) {
        bullet.remove()
    }

    let account = window.localStorage.getItem('auth')

    // Створюємо матрицю гри
    if (inTutorial == false) {
        console.log(room)
        var map = getStructures(room)
        var [hero, listElem, enemyList, dealerList] = gen_map(map,coins,boosts,room,false,account)
        var decList = createDecoration()
    } else {
        var [hero, listElem, enemyList, dealerList] = gen_map(tutorialMap,coins,boosts,room,true,account)
        var decList = createDecoration()
        if (!window.localStorage.getItem(`${hero.NAME}`).includes('learningIsLight')){
            window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; learningIsLight`)
            hero.CONTENT = window.localStorage.getItem(hero.NAME)
            achievmentsMove('/images/achievements/learningIsLight.png', 'Знання це світло', 'Зайти в туторіал')
            hero.heroAchievements.play()
        }
    }
    if (radius == false){
        for (let radius of document.querySelectorAll('.debugRadiusEnemy')){
            radius.style.backgroundColor = 'rgba(0,0,0,0)'
        }
    }
    hero.health = heroHealth
    hero.coins = heroCoins
    hero.COINS_ELEM.textContent = `Coins: ${hero.coins}`
    //генеруємо карту та додаємо усі елементи гри
    //let [hero, listElem, enemyList, dealerList] = gen_map(map,coins,boosts)
    hero.SOUND_STEP.volume = stepVolume
    // Додаємо фонову музику
    let music = new Audio('/sounds/BackgroundMusic.wav')
    music.play()
    music.volume = musicVolume
    music.loop = true;

    var canAchievement = true

    // Додаємо усі цикли обробки подій
    let heroJump = setInterval(()=>{hero.jump(listElem,alreadyActivated)},40)
    let heroAnimation = setInterval(()=> {hero.animation()}, 300)
    let obj_list = [listElem, enemyList, bullets, dealerList,currency_list]
    let enemyLoop = setInterval(()=> {
        // if (document.querySelector('.ach') != null){
            // console.log(document.querySelector('.ach').style.bottom)
        // }
        hero.moveLoop(obj_list, listElem,decList);
        hero.addBoosts()
        hero.pickUpCoins(currency_list)

        hero.task(enemyList,listElem)
        if (enemyList.length != 0){
            for (let enemy of enemyList) {
                enemy.bossAttack(hero,listElem,music)
                enemy.move(listElem,hero)
                enemy.fall(listElem,hero)
                enemy.animation()
                if (enemy.X >= document.body.clientWidth|| enemy.X < -100) {
                    enemy.canCollide = false
                    // enemy.ELEMENT.style.display = 'none'
                } else {
                    enemy.canCollide = true
                    // enemy.ELEMENT.style.display = 'block'
                }
                if (enemy.BOSS != false) {
                    document.querySelector('.portal').style.display = 'none'
                }
                for (let bullet of bullets) {
                    enemy.gotDamage(bullet,currency_list,enemyList,hero,alreadyActivated,music) 
                }
                if (bullets.length == 0){
                    for (let bullet of document.querySelectorAll('.bullet')) {
                        bullet.remove()
                    }
                }
                if (enemy.BOSS != false) {
                    document.querySelector('.portal').style.display = 'none'
                }
            }
        };
        for (let obj of listElem) {
            if (obj.X >= document.body.clientWidth || obj.X < -100) {
                obj.ELEMENT.style.display = 'none'
            } else {
                if (obj.ELEMENT.classList.contains('bomb')){
                    obj.explosionDamage(hero,alreadyActivated)
                    obj.animation(listElem)
                }
                if (!obj.ELEMENT.classList.contains('gate')){
                    obj.ELEMENT.style.display = 'block'
                }
                if (obj.ELEMENT.classList.contains('horizontal') || obj.ELEMENT.classList.contains('vertical')){
                    obj.move()
                }
                if (obj.ELEMENT.classList.contains('box')){
                    for (let bullet of bullets){
                        obj.gotDamage(bullet, currency_list, listElem,hero,enemyList,room,alreadyActivated) 
                    }
                }
                if (obj.ELEMENT.classList.contains('comp')){
                    if (obj.CAN_ENTER == false){
                        hero.computerIsHacked = true;
                    }
                }
                if (obj.ELEMENT.classList.contains('light')){
                    obj.heroInRadious(hero, listElem, enemyList, dealerList)
                    if (obj.light == true && Math.random()*101 <= 100 && obj.canOffLight <= 0){
                        obj.lightsOff(hero, listElem, enemyList, dealerList)
                    }
                }
                if (obj.ELEMENT.classList.contains('gate')){
                    obj.checkDIR(hero,enemyList)
                }
                if (obj.ELEMENT.classList.contains("movingBlock")){
                    obj.falling(hero,listElem)
                }
            }
        }
        let hasDrops = 0
        for (let drop of currency_list){
            hasDrops++
            
        }
        if (hasDrops == 0 && document.querySelector('.drop') != null){
            document.querySelector('.drop').remove()
        }
        gameOver(hero.health, [heroAnimation, enemyLoop, heroJump], bullets,music,hero,enemyList)
        for (let bullet of bullets) {
            bullet.move()
            bullets = bullet.bulletLife(bullets,listElem)  
        };
        for (let coin of currency_list){
            coin.currencyFall(listElem,currency_list)
        }

        dealerList[0].heroInRadious(hero);

        for (let enemy of enemyList) {
            if (enemy.BOSS != false || document.querySelector('.cross') != null) {
                document.querySelector('.portal').style.display = 'none'
            }
        }

        hero.gotDamage(enemyList)
        if(hero.InPortal == 'portal'){
            end = true
            if (inTutorial == true){
                document.querySelector('.gameWorking').remove()
                document.querySelector('.gameDivTop').remove()
                for(let interval of [heroAnimation, enemyLoop, heroJump]){
                    clearInterval(interval)
                }
                let bullets = new Array()
                music.pause()
                mainMenu()
            } else{
                if (document.querySelector('.portal').style.display == 'block') {
                    if (document.querySelector('.cross') == null){
                        if (room < 11) {
                            room += 1
                            console.log(room)
                            heroHealth = hero.health
                            heroCoins = hero.coins
                            hero.InPortal = false
                            document.querySelector('.gameWorking').remove()
                            document.querySelector('.gameDivTop').remove()
                            for(let interval of [heroAnimation, enemyLoop, heroJump]){
                                clearInterval(interval)
                            }
                            music.pause()
                            let bullets = new Array()  
                            let gameDiv = document.createElement('div');
                            gameDiv.classList.add('gameWorking');
                            transitionRooms()
                            //game(gameDiv, bullets, false)
                        } else {
                            if (!window.localStorage.getItem(`${hero.NAME}`).includes('theEnd')){
                                if (!alreadyActivated) {
                                    window.localStorage.setItem(`${hero.NAME}`,`${hero.CONTENT}; theEnd`)
                                    hero.CONTENT = window.localStorage.getItem(hero.NAME)
                                    achievmentsMove('../images/achievements/theEnd.png','Зе Енд','Пройдіть гру')
                                    hero.heroAchievements.play()
                                }
                            }
							heroHealth = 30
							coins = 0
							heroCoins = 0
							boosts = []
                            document.querySelector('.gameWorking').remove()
                            document.querySelector('.gameDivTop').remove()
                            for(let interval of [heroAnimation, enemyLoop, heroJump]){
                                clearInterval(interval)
                            }


                            music.pause()
                            theEnd()
                        }
                    }


                    }   

            
    }}


    }, 40);
    setInterval(()=>{

        dealerList[0].animateButton(hero)
        for (let elem of listElem){
            if (elem.ELEMENT.src.includes('note')){
                elem.animateButton();
                elem.heroInRadious(hero);
            } else if (elem.ELEMENT.classList.contains('comp')) {
                elem.heroInRadious(hero,alreadyActivated)
            }
        } 
    },100)
    // Перевіряємо натискнення клавіш клавіатури
    document.addEventListener('keydown', (event) =>{
        if (event.code == 'KeyS' && hero.isJump == true){
            event.code = undefined
        }
        hero.move(event.code)
        dealerList[0].Key = event.code

        for (let elem of listElem){
            if (elem.ELEMENT.src.includes('note')){
                elem.Key = event.code
            } else if (elem.ELEMENT.classList.contains('comp')) {
                elem.Key = event.code
            } else if (elem.ELEMENT.classList.contains('light')) {
                elem.Key = event.code
            }
        }

    })

    // Додаємо прослушку кліків для стрільби
    document.addEventListener('click',() => {
        if (hero.health > 0 && dealerList[0].ISINSHOP != true) {
            if (hero.FIRE_CD >= hero.ORIGINAL_FIRE_CD){                
                if (hero.ELEMENT.classList.contains('left')) {
                    let bullet = new Bullet(hero.X,hero.Y+(hero.HEIGHT/2),15,15,'/images/bullet/bullet1.png',undefined,'img','left',35,hero.damage)
                    bullet.sound.volume = bulletVolume
                    bullets.push(bullet)
                } else {
                    let bullet = new Bullet(hero.X+hero.WIDTH,hero.Y+(hero.HEIGHT/2),15,15,'/images/bullet/bullet1.png',undefined,'img','right',35,hero.damage)
                    bullet.sound.volume = bulletVolume
                    bullets.push(bullet)
                }
                hero.FIRE_CD = 0
            }
        }

    })
    
    // Перевіряємо віджаття клавіш клавіатури
    document.addEventListener('keyup',(event)=>{
        if (event.code == 'KeyA') {
            hero.IsStanding = true
            hero.moveLeft =  false
        }
        if (event.code == 'KeyD') {
            hero.IsStanding = true
            hero.moveRight = false
        }
        if (event.code == 'KeyS') {
            hero.squats = false;
            hero.ELEMENT.style.top = `${hero.Y}px`
            hero.ELEMENT.style.height = `${hero.HEIGHT}px`
            hero.IMG_PATH = `/images/hero/stay/stay1.png`;
            hero.ELEMENT.src = hero.IMG_PATH
        }
        if (event.code == 'KeyE'){
            dealerList[0].Key = undefined
            for (let elem of listElem){
                if (elem.ELEMENT.src.includes('note')){
                    elem.Key = undefined
                } else if (elem.ELEMENT.classList.contains('comp')) {
                    elem.Key = undefined
                }
            }
        }
        if (event.code == 'Escape') {
            if (hero.health > 0){
                for (let enemy of enemyList){
                    enemy.stopMusic()
                }
                heroHealth = 30;
                heroCoins = 0;
                coins = 0
                boosts = []
                if(document.querySelector('.gameWorking') != null){
                    document.querySelector('.gameWorking').remove()
                    document.querySelector('.gameDivTop').remove()
                }
                for(let interval of [heroAnimation, enemyLoop, heroJump]){
                    clearInterval(interval)
                }
                alreadyActivated = false
                let bullets = new Array()
                music.pause()
                end = true
                enteredCheat = "";
                mainMenu()
            }

        }
        

        if (end == false || hero.health <= 0){
            const code = event.key.toLowerCase();
            enteredCheat += code;
            for (let elem of listElem){
                if (elem.ELEMENT.classList.contains('light')) {
                    checkCode(hero,enemyList,elem,listElem,dealerList);
                }
            }
            
        }
    })
}

document.addEventListener('contextmenu',function(event){
    event.preventDefault()
    let textError = document.createElement('h1')
    textError.textContent = 'DO NOT TRY TO FIND SOMETHING THERE!'
    textError.classList.add('textError')
    document.body.append(textError)
    setTimeout(()=>{
        textError.remove()
    },3000)
})

//document.addEventListener('keydown', function(event) {
//    console.log(event);
//    if (event.key === "F12") {
//        event.preventDefault();
//        let textError = document.createElement('h1')
//        textError.textContent = 'DO NOT TRY TO FIND SOMETHING THERE!'
//        textError.classList.add('textError')
//        document.body.append(textError)
//        setTimeout(()=>{
//            textError.remove()
//        },3000)
//    }
//  });