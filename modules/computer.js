import Sprite from '/modules/sprite.js'
import Rect from '/modules/rect.js'
import {achievmentsMove} from '../utils/achievments.js'
class Computer extends Sprite{
    constructor(x, y, width, height, imagePath = undefined, color = undefined, tagName="div"){
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
        this.ELEMENT.classList.add('comp')
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
        this.opacity = 0
        this.Key = undefined
        this.IN_COMP = false
        this.COMP_ELEM = document.createElement('img');
        this.COMP_ELEM.src = 'images/Computer/CompIsOpen.png';
        this.COMP_ELEM.style.opacity = '0';
        this.COMP_ELEM.style.position = 'absolute'
        this.COMP_ELEM.style.width = '1000px';
        this.COMP_ELEM.style.height = '562px';
        this.COMP_ELEM.style.left = '350px';
        this.COMP_ELEM.style.top = '50px';
        this.COMP_ELEM.style.filter = 'brightness(70%)'
        this.COMP_ELEM.style.zIndex = '9';
        document.querySelector('.gameWorking').append(this.COMP_ELEM);

        this.COMP_BUTTON = document.createElement('img')
        this.COMP_BUTTON.style.opacity='0'
        this.COMP_BUTTON.src='/images/shop/Close_button.png'
        this.COMP_BUTTON.style.width = '20px'
        this.COMP_BUTTON.style.height = '20px'
        this.COMP_BUTTON.style.position='absolute'

        this.COMP_BUTTON.style.top = '77px'
        this.COMP_BUTTON.style.left=`1330px`
        this.COMP_BUTTON.textContent='✕'
        this.COMP_BUTTON.style.zIndex = '10'



        this.COMP_BUTTON.addEventListener('click',() => {
            this.IN_COMP = false
            this.COMP_ELEM.style.opacity = '0';
            this.COMP_BUTTON.style.opacity='0'
            this.MATHEMATICS_BUT.style.opacity = '0'
            this.MATHEMATICS.style.opacity = '0'
            this.MATHEMATICS_INPUT.style.opacity = '0'
        })

        this.COMP_ELEM.style.display = 'none'

        document.querySelector('.gameWorking').append(this.COMP_BUTTON);
        this.MATHEMATICS = document.createElement('p')
        this.MATHEMATICS.classList.add('coinText')
        this.MATHEMATICS.style.zIndex = '11'
        this.MATHEMATICS.style.fontSize = 'xxx-large'
        this.MATHEMATICS.style.position = 'absolute'
        this.MATHEMATICS.style.left = '450px'
        this.MATHEMATICS.style.top = `277px`
        this.MATHEMATICS.style.opacity = '0'
        this.MATHEMATICS.style.fontWeight = '600'
        //this.COMP_ELEM.append(this.MATHEMATICS)
        document.querySelector('.gameWorking').append(this.MATHEMATICS)

        
        this.MATHEMATICS_INPUT = document.createElement('input')
        this.MATHEMATICS_INPUT.classList.add('mathText')
        this.MATHEMATICS_INPUT.style.zIndex = '11'
        this.MATHEMATICS_INPUT.style.fontSize = 'xxx-large'
        this.MATHEMATICS_INPUT.style.position = 'absolute'
        this.MATHEMATICS_INPUT.style.left = `${450 + this.MATHEMATICS.clientWidth}px`
        this.MATHEMATICS_INPUT.style.top = `277px`
        this.MATHEMATICS_INPUT.style.width = '150px'
        this.MATHEMATICS_INPUT.style.height = '50px'
        this.MATHEMATICS_INPUT.style.opacity = '0'
        this.MATHEMATICS_INPUT.style.fontWeight = '600'
        document.querySelector('.gameWorking').append(this.MATHEMATICS_INPUT)

        this.canAchieve = undefined
        this.heroComp = undefined

        this.MATHEMATICS_BUT = document.createElement('button')
        this.MATHEMATICS_BUT.textContent = 'Apply'
        this.MATHEMATICS_BUT.classList.add('mathText')
        this.MATHEMATICS_BUT.style.zIndex = '11'
        this.MATHEMATICS_BUT.style.fontSize = 'xxx-large'
        this.MATHEMATICS_BUT.style.left = '470px'
        this.MATHEMATICS_BUT.style.top = `180px`
        this.MATHEMATICS_BUT.style.position = 'absolute'
        this.MATHEMATICS_BUT.style.opacity = '0'
        this.MATHEMATICS_BUT.style.fontWeight = '600'
        document.querySelector('.gameWorking').append(this.MATHEMATICS_BUT)


        this.MATHEMATICS_BUT.addEventListener('click',()=>{
            if (this.MATHEMATICS_INPUT.value == this.Example) {



                if (this.MATHEMATICS_INPUT.value.toString().includes('.') == true && this.Example.toString().includes('.') == true){
                    if (!window.localStorage.getItem(`${this.heroComp.NAME}`).includes('math')){
                        if (!this.gotAchieve) {
                            window.localStorage.setItem(`${this.heroComp.NAME}`,`${this.heroComp.CONTENT}; math`)
                            hero.CONTENT = window.localStorage.getItem(hero.NAME)

                            achievmentsMove('../images/achievements/hacker.png','Хакер','Дайте правильну відповідь десятичним дробом')
                            this.heroComp.heroAchievements.play()
                        }
                    }
                }



                this.CAN_ENTER = false
                this.MATHEMATICS.style.display = 'none'
                this.MATHEMATICS.style.opacity = '0'
                this.MATHEMATICS_INPUT.style.display = 'none'
                this.MATHEMATICS_BUT.style.display = 'none'
                this.COMP_BUTTON.style.opacity = '0';
                this.COMP_ELEM.src = '/images/Computer/MathIsDone.png'
                this.COMP_ELEM.style.filter = 'brightness(100%)'
                

                setTimeout(()=>{
                    this.COMP_ELEM.style.opacity = '0';
                    this.COMP_ELEM.style.display = 'none'
                    this.BUTTON_ELEM.style.opacity = '0'
                    this.COMP_ELEM.style.filter = 'brightness(70%)'
                    this.IN_COMP = false
                },3000)

            
            } else {

                if (this.MATHEMATICS.textContent == '2 + 2 = ' && this.MATHEMATICS_INPUT.value == '3'){
                    if (!window.localStorage.getItem(`${this.heroComp.NAME}`).includes('badMath')){
                        if (!gotAchieve) {
                            window.localStorage.setItem(`${this.heroComp.NAME}`,`${this.heroComp.CONTENT}; badMath`)
                            hero.CONTENT = window.localStorage.getItem(hero.NAME)

                            achievmentsMove('../images/achievements/badMath.png','Поганий математик','Дайте відповідь 3 на запитанні 2 + 2')
                            this.heroComp.heroAchievements.play()
                        }
                    }
                }

                // this.CAN_ENTER = false
                this.MATHEMATICS.style.opacity = '0'
                this.MATHEMATICS.style.display = 'none'
                this.MATHEMATICS_INPUT.style.opacity = '0'
                this.MATHEMATICS_INPUT.style.display = 'none'
                this.MATHEMATICS_BUT.style.display = 'none'
                this.MATHEMATICS_BUT.style.opacity = '0'
                this.COMP_BUTTON.style.opacity = '0';
                this.COMP_ELEM.src = '/images/Computer/MathFailed.png'
                this.COMP_ELEM.style.filter = 'brightness(100%)'

                setTimeout(()=>{
                    this.IN_COMP = true
                    this.COMP_BUTTON.style.opacity = '1';
                    this.COMP_ELEM.src = 'images/Computer/CompIsOpen.png';
                    this.MATHEMATICS_BUT.style.opacity = '1'
                    // this.COMP_ELEM.style.opacity = '1';
                    this.MATHEMATICS.style.display = 'block'
                    this.MATHEMATICS_INPUT.style.display = 'block'
                    this.MATHEMATICS_BUT.style.display = 'block'
                    this.COMP_ELEM.style.filter = 'brightness(70%)'
                    this.MATHEMATICS_INPUT.style.opacity = '1'
                    this.minigame()
                    this.MATHEMATICS.style.opacity = '1'
                },3000)
            }
        })
        // this.Answer - для input
        // this.BUTTON_RESULT - кнопка для отправление результата

        this.CAN_ENTER = true
    }

    minigame(){
        this.NumberOne = parseInt(Math.random() * 11)
        this.Operators = parseInt(Math.random() * 4)
        this.NumberTwo = parseInt(Math.random() * 11)
        if (this.Operators == 0){
            this.Example = this.NumberOne + this.NumberTwo
            this.Operators = '+'
        } else if (this.Operators == 1) {
            this.Example = this.NumberOne - this.NumberTwo
            this.Operators = '-'
        } else if (this.Operators == 2) {
            this.Operators = '*'
            this.Example = this.NumberOne * this.NumberTwo
        } else if (this.Operators == 3) {
            if (this.NumberTwo != 0){
                this.Operators = '/'
                this.Example = Math.round((this.NumberOne / this.NumberTwo) * 10)/10
            } else {
                this.Operators = '*'
                this.Example = this.NumberOne * this.NumberTwo
            }
        }

        //this.Example = 2 + 2
        // this.Result = parseInt(this.Example)
        //this.MATHEMATICS.textContent = `2 + 2 = `
        // console.log(`${this.NumberOne} ${this.Operators} ${this.NumberTwo}`)
        this.MATHEMATICS.maxLength = toString(this.Example).length
        this.MATHEMATICS.textContent = `${this.NumberOne} ${this.Operators} ${this.NumberTwo} = `
        this.MATHEMATICS_INPUT.style.left = `${450 + this.MATHEMATICS.clientWidth}px`
        
        this.BUTTON_RESULT.addEventListener('click',()=>{
            if (parseFloat(this.Answer.textContent) != this.Result){
                this.minigame()
            }
        })
    }

    heroInRadious(hero,canAchievement){
        this.heroComp = hero
        this.canAchieve = canAchievement
        this.radius.RECT.RECT = this.RECT.getRect(this.RADIUS_ELEM)
        if (this.radius.RECT.RECT.top < hero.RECT.RECT.top && this.radius.RECT.RECT.bottom > hero.RECT.RECT.top || this.radius.RECT.RECT.bottom > hero.RECT.RECT.bottom && this.radius.RECT.RECT.top < hero.RECT.RECT.bottom){
            if (this.radius.RECT.RECT.left < hero.RECT.RECT.right && this.radius.RECT.RECT.right > hero.RECT.RECT.right || this.radius.RECT.RECT.right > hero.RECT.RECT.left && this.radius.RECT.RECT.left < hero.RECT.RECT.right){
                if (this.opacity < 1 && this.CAN_ENTER) {
                    this.opacity += 0.1
                    this.BUTTON_ELEM.style.opacity = `${this.opacity}`;
                }   
                if (this.Key == 'KeyE'){
                    if (this.COMP_ELEM.style.opacity == '0' && this.CAN_ENTER) {
                        this.IN_COMP = true
                        this.MATHEMATICS.style.opacity = '1'
                        this.MATHEMATICS.style.display = 'block'
                        this.MATHEMATICS_INPUT.style.opacity = '1'
                        this.MATHEMATICS_INPUT.style.display = 'block'
                        this.MATHEMATICS_BUT.style.opacity = '1'
                        this.MATHEMATICS_BUT.style.display = 'block'
                        this.COMP_ELEM.style.display = 'block'
                        this.COMP_ELEM.style.opacity = '1';
                        this.COMP_BUTTON.style.opacity = '1';
                        this.COMP_BUTTON.style.disply = 'block'
                        this.minigame()
                    }

                }         
            } else {
                this.MATHEMATICS.style.opacity = '0'
                this.MATHEMATICS.style.display = 'none'
                this.MATHEMATICS_INPUT.style.opacity = '0'
                this.MATHEMATICS_INPUT.style.display = 'none'
                this.MATHEMATICS_BUT.style.opacity = '0'
                this.MATHEMATICS_BUT.style.display = 'none'
                this.COMP_ELEM.style.display = 'none'
                this.COMP_ELEM.style.opacity = '0';
                this.COMP_BUTTON.style.opacity = '0';
                this.COMP_BUTTON.style.disply = 'none'
                this.IN_COMP = false
                if (this.opacity > 0  && this.CAN_ENTER) {
                    this.opacity -= 0.1
                    this.BUTTON_ELEM.style.opacity = `${this.opacity}`;
                }
            }

            
        } else {
            this.MATHEMATICS.style.opacity = '0'
            this.MATHEMATICS.style.display = 'none'
            this.MATHEMATICS_INPUT.style.opacity = '0'
            this.MATHEMATICS_INPUT.style.display = 'none'
            this.MATHEMATICS_BUT.style.opacity = '0'
            this.MATHEMATICS_BUT.style.display = 'none'
            this.COMP_ELEM.style.display = 'none'
            this.COMP_ELEM.style.opacity = '0';
            this.COMP_BUTTON.style.opacity = '0';
            this.COMP_BUTTON.style.disply = 'none'
            this.IN_COMP = false
        }
    }
}


export default Computer