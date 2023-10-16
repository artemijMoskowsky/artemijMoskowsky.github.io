import Sprite from "/modules/sprite.js";
import Rect from "/modules/rect.js";

class Note extends Sprite{
    constructor(x, y, width, height,imgPath,color,tagName = 'div', title, author, data, content){
        super(x,y,width,height,imgPath,color,tagName);
        this.title = title;
        this.author = author;
        this.data = data;
        this.content = content;
        this.ELEMENT.style.zIndex = '1'
        this.RECT = new Rect(this.X, this.Y, this.WIDTH, this.HEIGHT, this.ELEMENT);
        
        this.TITLE_ELEM = document.createElement('p');
        this.TITLE_ELEM.style.position = 'absolute'
        this.TITLE_ELEM.style.width = '100px'
        this.TITLE_ELEM.style.height = '50px'
        this.TITLE_ELEM.style.left = `700px`
        this.TITLE_ELEM.style.top = `300px`
        this.TITLE_ELEM.textContent = this.title
        this.TITLE_ELEM.style.opacity = '0'
        this.TITLE_ELEM.style.zIndex = '6'
        this.TITLE_ELEM.classList.add('coinText')
        document.querySelector('.gameWorking').append(this.TITLE_ELEM)
        
        this.AUTHOR_ELEM = document.createElement('p');
        this.AUTHOR_ELEM.style.position = 'absolute'
        this.AUTHOR_ELEM.style.width = '150px'
        this.AUTHOR_ELEM.style.height = '50px'
        this.AUTHOR_ELEM.style.left = `700px`
        this.AUTHOR_ELEM.style.top = `325px`
        this.AUTHOR_ELEM.textContent = this.author
        this.AUTHOR_ELEM.style.opacity = '0'
        this.AUTHOR_ELEM.style.zIndex = '6'
        this.AUTHOR_ELEM.classList.add('coinText')
        document.querySelector('.gameWorking').append(this.AUTHOR_ELEM)

        this.DATA_ELEM = document.createElement('p');
        this.DATA_ELEM.style.position = 'absolute'
        this.DATA_ELEM.style.width = '100px'
        this.DATA_ELEM.style.height = '50px'
        this.DATA_ELEM.style.left = `700px`
        this.DATA_ELEM.style.top = `350px`
        this.DATA_ELEM.textContent = this.data
        this.DATA_ELEM.style.opacity = '0'
        this.DATA_ELEM.style.zIndex = '6'
        this.DATA_ELEM.classList.add('coinText')
        document.querySelector('.gameWorking').append(this.DATA_ELEM)

        this.CONTENT_ELEM = document.createElement('p');
        this.CONTENT_ELEM.style.position = 'absolute'
        this.CONTENT_ELEM.style.textAlign = 'justify';
        this.CONTENT_ELEM.disabled = true;
        this.CONTENT_ELEM.style.width = '295px'
        this.CONTENT_ELEM.style.height = '300px'
        this.CONTENT_ELEM.style.left = `690px`
        this.CONTENT_ELEM.style.top = `400px`
        this.CONTENT_ELEM.innerHTML = this.content
        this.CONTENT_ELEM.style.opacity = '0'
        this.CONTENT_ELEM.style.zIndex = '6'
        this.CONTENT_ELEM.style.backgroundColor = 'rgba(0,0,0,0)'
        this.CONTENT_ELEM.style.border = 'none'
        this.CONTENT_ELEM.style.resize = 'none'
        this.CONTENT_ELEM.classList.add('coinText')
        document.querySelector('.gameWorking').append(this.CONTENT_ELEM)



        this.RADIUS_ELEM = document.createElement('div')
        this.RADIUS_ELEM.style.position = 'absolute'
        this.RADIUS_ELEM.style.width = '300px'
        this.RADIUS_ELEM.style.height = '300px'
        this.RADIUS_ELEM.style.left = `${this.X+100}px`
        this.RADIUS_ELEM.style.top = `${this.Y-100}px`
        document.querySelector('.gameWorking').append(this.RADIUS_ELEM)

        this.radius = new Rect(this.X+100, this.Y-100, 300, 300, this.RADIUS_ELEM);
        
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
        this.NOTE_ELEM = document.createElement('img');
        this.NOTE_ELEM.src = 'images/noteIsOpen.png';
        this.NOTE_ELEM.style.opacity = '0';
        this.NOTE_ELEM.style.position = 'absolute'
        this.NOTE_ELEM.style.width = '375px';
        this.NOTE_ELEM.style.height = '500px';
        this.NOTE_ELEM.style.left = '650px';
        this.NOTE_ELEM.style.top = '250px';
        this.NOTE_ELEM.style.zIndex = '3';
        document.querySelector('.gameWorking').append(this.NOTE_ELEM);

        this.NOTE_BUTTON = document.createElement('img')
        this.NOTE_BUTTON.style.opacity='0'
        this.NOTE_BUTTON.src='/images/shop/Close_button.png'
        this.NOTE_BUTTON.style.width = '20px'
        this.NOTE_BUTTON.style.height = '20px'
        this.NOTE_BUTTON.style.position='absolute'
        this.IS_IN_NOTE = false
        this.NOTE_BUTTON.style.top = '250px'
        this.NOTE_BUTTON.style.left='1010px'
        this.NOTE_BUTTON.textContent='✕'
        this.NOTE_BUTTON.style.zIndex = '4'
        this.NOTE_BUTTON.addEventListener('click',() => {
            this.IS_IN_NOTE = false
            this.NOTE_ELEM.style.opacity='0'
            this.NOTE_BUTTON.style.opacity='0'
            this.TITLE_ELEM.style.opacity = '0'
            this.AUTHOR_ELEM.style.opacity = '0'
            this.DATA_ELEM.style.opacity = '0'
            this.CONTENT_ELEM.style.opacity = '0'
        })
        document.querySelector('.gameWorking').append(this.NOTE_BUTTON);
    }
    animateButton(){
        this.BUTTON_ELEM.src = `images/buttons/E_button${this.animationButton}.png`
        if (this.animationButton < 2){
            setTimeout(()=>{this.animationButton++},400)
        } else {
            this.animationButton = 1
        }
        if (this.animDirection == 'up'){
            if (this.topAnim < 80) {
                this.topAnim++
                this.BUTTON_ELEM.style.top = `${this.Y-this.topAnim}px`
            } else{
                this.animDirection = 'down'
            }
        }
        if (this.animDirection == 'down'){
            if (this.topAnim > 70) {
                this.topAnim--
                this.BUTTON_ELEM.style.top = `${this.Y-this.topAnim}px`
            } else{
                this.animDirection = 'up'
            }
        }
    }
    heroInRadious(hero){
        this.radius.RECT.RECT = this.RECT.getRect(this.RADIUS_ELEM)
        if (this.radius.RECT.RECT.top < hero.RECT.RECT.top && this.radius.RECT.RECT.bottom > hero.RECT.RECT.top || this.radius.RECT.RECT.bottom > hero.RECT.RECT.bottom && this.radius.RECT.RECT.top < hero.RECT.RECT.bottom){
            if (this.radius.RECT.RECT.left < hero.RECT.RECT.right && this.radius.RECT.RECT.right > hero.RECT.RECT.right || this.radius.RECT.RECT.right > hero.RECT.RECT.left && this.radius.RECT.RECT.left < hero.RECT.RECT.right){
                if (this.opacity < 1) {
                    this.opacity += 0.1
                    this.BUTTON_ELEM.style.opacity = `${this.opacity}`;

                }   
                if (this.Key == 'KeyE'){
                    this.NOTE_ELEM.style.opacity = '1';
                    this.IS_IN_NOTE = true
                    this.NOTE_BUTTON.style.opacity='1'
                    this.TITLE_ELEM.style.opacity = '1'
                    this.AUTHOR_ELEM.style.opacity = '1'
                    this.DATA_ELEM.style.opacity = '1'
                    this.CONTENT_ELEM.style.opacity = '1'
                }         
            } else {
                this.NOTE_ELEM.style.opacity = '0';
                    this.IS_IN_NOTE = false
                    this.NOTE_BUTTON.style.opacity='0'
                    this.TITLE_ELEM.style.opacity = '0'
                    this.AUTHOR_ELEM.style.opacity = '0'
                    this.DATA_ELEM.style.opacity = '0'
                    this.CONTENT_ELEM.style.opacity = '0'
                if (this.opacity > 0) {
                    this.opacity -= 0.1
                    this.BUTTON_ELEM.style.opacity = `${this.opacity}`;
                }
                this.NOTE_ELEM.style.opacity = '0';
            }

            
        } else {
            this.NOTE_ELEM.style.opacity = '0';
            this.IS_IN_NOTE = false
            this.NOTE_BUTTON.style.opacity='0'
            this.TITLE_ELEM.style.opacity = '0'
            this.AUTHOR_ELEM.style.opacity = '0'
            this.DATA_ELEM.style.opacity = '0'
            this.CONTENT_ELEM.style.opacity = '0'
        }
    }
}
export default Note;