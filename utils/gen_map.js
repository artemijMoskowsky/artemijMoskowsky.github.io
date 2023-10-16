import Sprite from '/modules/sprite.js';
import Hero from '../modules/hero.js';
import Enemy from '../modules/enemy.js'
import Dealer from '../modules/dealer.js';
import structures from '/utils/structures.js';
import Note from '../modules/note.js'
import {notesMap} from '/utils/notes.js'
import movingPlatforms from '../modules/movingPlatforms.js'
import Box from '../modules/boxLoot.js';
import Computer from '../modules/computer.js';
import lightLever from '../modules/lightsOff.js';
import Gate from '../modules/gate.js'
import movingBlock from '../modules/movingBlock.js';
var lastRandom = undefined

function createDecoration(){
    let listDecoration = []
    
    let x = Math.floor( Math.random() * 50+100)
    for (let i = 0; i < 20; i++){
        let randomBackground = Math.floor( Math.random() * 2)
        let y = Math.floor( Math.random() * 100+300)
        switch (randomBackground){
            case 0:
                var decBack = new Sprite(x+25,y+25,450,200,undefined,undefined,'div')
                decBack.ELEMENT.classList.add('decBack')
                decBack.ELEMENT.style.zIndex = '0'
                decBack.ELEMENT.style.backgroundPosition = '-512px -512px'
                listDecoration.push(decBack)
                var dec = new Sprite(x,y,500,250,'../images/background/window.png',undefined,'img')
                dec.ELEMENT.style.zIndex = '0'
                dec.ELEMENT.style.boxShadow = '2px 2px 30px 1px rgba(0,0,0,0.7)'
                listDecoration.push(dec)
                break;
            case 1:
                var decBack = new Sprite(x,y,500,500,undefined,undefined,'div')
                decBack.ELEMENT.classList.add('decBack')
                decBack.ELEMENT.style.zIndex = '0'
                decBack.ELEMENT.style.backgroundPosition = '-512px -512px'
                listDecoration.push(decBack)
                var dec = new Sprite(x,y,500,500,'../images/background/hole.png',undefined,'img')
                dec.ELEMENT.style.zIndex = '0'
                // dec.ELEMENT.style.boxShadow = '2px 2px 30px 1px rgba(0,0,0,0.7)'
                listDecoration.push(dec)
                break;
        }
        x += 2500
    }
    return listDecoration
}

function getStructures(room){
    let listElement = []
    for (let j = 0; j<10;j++){
        listElement.push(structures[0][j])
    }
    for (let i = 0; i<10; i++) {
        while (true) {
            var random = Math.floor( Math.random() * structures.length);
            if (random != 0 && random != 1 && random != 2 && random != 3 && random != 4 && random != 5 && Math.round(random) != Math.round(lastRandom)) {
                break
            }
        }
        lastRandom = random
        for (let j = 0; j<10;j++){
            listElement.push(structures[random][j])
        }
    }
    for (let j = 0; j<10;j++){
        listElement.push(structures[1][j])
    }
    if (room == 3){
        for (let j = 0; j<10;j++){
            listElement.push(structures[2][j])
        }
    } else if (room == 7){
        for (let j = 0; j<10;j++){
            listElement.push(structures[3][j])
        }
    } else if (room == 11){
        for (let j = 0; j<10;j++){
            listElement.push(structures[4][j])
        }
    }
    for (let j = 0; j<10;j++){
        listElement.push(structures[5][j])
    }
    
    
    return listElement
}

function gen_map(listElement,coins,boosts,room, inTutorial,account) {
    let listElem = new Array()
    let enemyList = new Array()
    let dealerList = new Array()
    let haveNote = false
    let haveLight = false
    let xCount = 0
    let x = 0;
    let y = 0;
    let columnIndex = 0
    for (let column of listElement) {
        columnIndex += 1
        for (let row of column) {
            if (row == '1') {
                let block = new Sprite(x,y,100,100,'../images/blocks/Block1.png',undefined,'img')
                block.ELEMENT.style.zIndex = '1'
                listElem.push(block)
            } else if (row == '2'){
                let block = new Sprite(x,y,100,50,'../images/blocks/Platform1.png',undefined,'img')
                block.ELEMENT.classList.add('platform')
                block.ELEMENT.style.zIndex = '1'
                listElem.push(block)
            } else if (row == '3'){      
                let block = new Sprite(x,y,100,100,'../images/blocks/Block3.png',undefined,'img')
                block.ELEMENT.style.zIndex = '1'
                listElem.push(block)
            } else if(row == '6'){
                let block = new Sprite(x,y,100,100,'../images/blocks/Block3.png',undefined,'img')
                block.ELEMENT.style.zIndex = '1'
                listElem.push(block)
                if (haveNote == false){
                    let note = new Note(x,y-100,100,100, '/images/note.png', undefined, 'img', notesMap[room-1][0], notesMap[room-1][1], notesMap[room-1][2], notesMap[room-1][3]);
                    listElem.push(note)
                    haveNote = true
                }
            } else if(row == '7'){
                let block = new Sprite(x,y,100,100,'../images/blocks/Block3.png',undefined,'img')
                block.ELEMENT.style.zIndex = '1'
                listElem.push(block)
                if (haveLight == false){
                    let light = new lightLever(x,y-100,100,100, '/images/light/on.png', undefined, 'img');
                    listElem.push(light)
                    haveLight = true
                }
            }else if (row == 'p'){
                let block = new Sprite(x,y,400,400,'../images/blocks/Portal.png',undefined,'img')
                block.ELEMENT.classList.add("portal")
                block.ELEMENT.style.zIndex = '1'
                listElem.push(block)
            } else if (row == 'h'){
                var hero = new Hero(x, y, 100, 100, "/images/hero/stay/stay1.png", undefined, "img",coins,boosts,account,window.localStorage.getItem(account))
            } else if (row == 'e'){
                if (Math.random()*10 > 8){
                    let enemy = new Enemy(x,y-50, 150, 150, "/images/enemy/CB1/cb1_", undefined, 'img', 10*(room/2),false, 20*(room/2), 7, false, 600)
                    enemyList.push(enemy)
                } else{
                    let enemy = new Enemy(x,y, 100, 100, "/images/enemy/CB1/cb1_", undefined, 'img', 10*(room/2),false, 10*(room/2), 3, false, 600)
                    enemyList.push(enemy)
                }
            } else if (row == '8'){
                let enemy = new Enemy(x,y-150, 250, 250, "/images/enemy/CB1/cb1_", undefined, 'img', 15*(room/2),false, 35*(room/2), 2, false, 800)
                enemyList.push(enemy)
            
            } else if (row == 'f') {
                let enemy = new Enemy(x,y, 50, 50, "/images/enemy/flying/fly_npc_", undefined, 'img', 5*(room/2),true, 7*(room/2),6, false, 700)
                enemyList.push(enemy)
            } else if (row == 'd') {
                let dealer = new Dealer(x,y,100,100,'/images/dealer/dealer.png',undefined,'img', ['speedBoost','reloadBoost','healthBoost','damageBoost'],[5,10,10,8],hero)
                dealerList.push(dealer)
            } else if (row == 'm'){
                let text = new Sprite(x,y,200,100,'../images/tutorial/move.png',undefined,'img')
                text.ELEMENT.style.zIndex = '999'
                listElem.push(text)
            } else if (row == 's'){
                let text = new Sprite(x,y,100,100,'../images/tutorial/click.png',undefined,'img')
                text.ELEMENT.style.zIndex = '999'
                listElem.push(text)
            } else if (row == 'j'){
                let text = new Sprite(x,y,200,100,'../images/tutorial/jump.png',undefined,'img')
                text.ELEMENT.style.zIndex = '999'
                listElem.push(text)
            } else if (row == 'c'){
                let enemy = new Enemy(x,y-50, 150, 150, "/images/enemy/Bosses/LD16/", undefined, 'img', 10,false, 400, 3,'Crusher', 1800)
                enemyList.push(enemy)
            } else if (row == 'k'){
                let enemy = new Enemy(x,y-50, 150, 150, "/images/enemy/Bosses/SB47/", undefined, 'img', 20,false, 1500, 3,'Jumbo', 1800)
                enemyList.push(enemy)
            } else if (row == 'l'){
                let platform = new movingPlatforms(x,y, 100, 50, "/images/blocks/Platform2.png", undefined, 'img', 'horizontal')
                platform.ELEMENT.style.zIndex = '1'
                listElem.push(platform)
            } else if (row == 'v'){
                let platform = new movingPlatforms(x,y, 100, 50, "/images/blocks/Platform3.png", undefined, 'img', 'vertical')
                platform.ELEMENT.style.zIndex = '1'
                listElem.push(platform)
            } else if (row == 'b'){
                let text = new Box(x,y,100,100,'../images/blocks/MetalBox.png',undefined,'img', 'details')
                listElem.push(text)
            } else if (row == 'z'){
                let text = new Box(x,y,100,100,'../images/blocks/AidBox.png',undefined,'img', 'f_a_k')
                listElem.push(text)
            } else if (row == 'i'){
                let text = new Computer(x,y,100,100,'../images/Computer/computer.png',undefined,'img')
                listElem.push(text)
            } else if (row == 'g'){
                let gate = new Gate(x,y-700,100,800,'../images/Blocks/gate/1.png',undefined,'div','left')
                listElem.push(gate)
            } else if (row == 'п'){
                let gate = new Gate(x,y-700,100,800,'../images/Blocks/gate/1.png',undefined,'div','right')
                listElem.push(gate)
            } else if (row == 'щ'){
                let text = new Box(x,y,100,100,'../images/blocks/RandomBox.png',undefined,'img', 'random')
                listElem.push(text)
            } else if (row == 'т'){
                let mine = new Sprite(x,y+85,50,15,'/images/blocks/mine.png',undefined,'img')
                mine.ELEMENT.style.zIndex = '9'
                listElem.push(mine)
            } else if (row == 'ф'){
                let enemy = new Enemy(x,y-50, 150, 150, "/images/enemy/Bosses/Lawyer/", undefined, 'img', 10,true, 1000, 3,'Lawyer', 1800)
                enemyList.push(enemy)
            } else if (row == 'r'){
                let platform = new movingBlock(x,y, 100, 100, "/images/blocks/Block8.png", undefined, 'img',0)
                platform.ELEMENT.style.zIndex = '1'
                listElem.push(platform)
            } else if (row == '9'){
                let platform = new movingBlock(x,y, 100, 100, "/images/blocks/Block8.png", undefined, 'img',500)
                platform.ELEMENT.style.zIndex = '1'
                listElem.push(platform)
        }
            x += 100;
        }
        x = xCount;
        y += 100;
        if (y >= 1000){
            y = 0
            xCount += 1000
            if (columnIndex == 130){
                xCount += 600
            }
        }
    }
    
    return [hero, listElem, enemyList, dealerList]
};


export {gen_map,getStructures,createDecoration}