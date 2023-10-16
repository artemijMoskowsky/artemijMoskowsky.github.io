import Rect from "/modules/rect.js"
import Sprite from "/modules/sprite.js"

class Dealer extends Sprite{
    constructor(x,y,width,height,imgPath=undefined,color = undefined,tagName='div',productList=[],price_list=[],hero){
        super(x,y,width,height,imgPath,color,tagName)
        this.ELEMENT.style.zIndex = '1';
        //Створюємо елемент радіусу
        this.RADIUS_ELEM = document.createElement('div')
        this.RADIUS_ELEM.style.position = 'absolute'
        this.RADIUS_ELEM.style.left = `${this.X+(this.WIDTH/2)-125}px`
        this.RADIUS_ELEM.style.top = `${this.Y+(this.HEIGHT/2)-125}px`
        this.RADIUS_ELEM.style.width = `${250}px`
        this.RADIUS_ELEM.style.height = `${250}px`
        // this.RADIUS_ELEM.classList.add("debugRadiusNPC")
        document.querySelector('.gameWorking').append(this.RADIUS_ELEM) 
        // Створюємо хіт-бокс для торговця
        this.RECT = new Rect(this.X,this.Y,this.WIDTH,this.HEIGHT,this.ELEMENT)
        // Створюємо радіус торговця
        this.radius = new Rect(this.X+this.WIDTH-125,this.Y+this.HEIGHT-125,250,250,this.RADIUS_ELEM)
        // Створюємо підказку
        this.BUTTON_ELEM = document.createElement('img')
        this.BUTTON_ELEM.src = 'images/buttons/E_button1.png'
        this.BUTTON_ELEM.style.opacity = '0'
        this.BUTTON_ELEM.style.position = 'absolute'
        this.BUTTON_ELEM.style.width = '75px'
        this.BUTTON_ELEM.style.height = '75px'
        this.BUTTON_ELEM.style.left = `${this.X+3}px`
        this.BUTTON_ELEM.style.top = `${this.Y-70}px`
        this.BUTTON_ELEM.style.zIndex = '1'
        document.querySelector('.gameWorking').append(this.BUTTON_ELEM)
        this.animationButton = 1
        this.opacity = 0
        this.topAnim = 70;
        this.animDirection = 'up'
        this.Key = undefined
        // Створюємо елемент вікна магазину
        this.SHOP_ELEM = document.createElement("img")
        this.SHOP_ELEM.style.width='500px'
        this.SHOP_ELEM.style.height='550px'
        this.SHOP_ELEM.style.position='absolute'
        this.SHOP_ELEM.style.marginLeft='400px'
        this.SHOP_ELEM.style.marginTop='100px'
        this.SHOP_ELEM.src='/images/shop/main.png'
        this.SHOP_ELEM.style.opacity='0'
        this.SHOP_ELEM.textContent = 'SHOP'
        this.SHOP_ELEM.style.border = '5px solid rgb(107,48,3'
        this.SHOP_ELEM.style.zIndex = '3'
        document.querySelector('.gameWorking').append(this.SHOP_ELEM)
        // Створюємо кнопку виходу з магазину
        this.SHOP_BUTTON = document.createElement('img')
        this.SHOP_BUTTON.style.opacity='0'
        this.SHOP_BUTTON.src='/images/shop/Close_button.png'
        this.SHOP_BUTTON.style.width = '20px'
        this.SHOP_BUTTON.style.height = '20px'
        this.SHOP_BUTTON.style.position='absolute'
        this.ISINSHOP = false
        this.SHOP_BUTTON.style.marginLeft='400px'
        this.SHOP_BUTTON.style.marginTop='100px'
        this.SHOP_BUTTON.style.left='480px'
        this.SHOP_BUTTON.textContent='✕'
        this.SHOP_BUTTON.style.zIndex = '4'
        this.SHOP_BUTTON.addEventListener('click',() => {
            this.ISINSHOP = false
            this.SHOP_ELEM.style.opacity='0'
            this.SHOP_BUTTON.style.opacity='0'
            for (let elem of this.PRODUCT_LIST){
                elem.ELEMENT.style.opacity = '0'
            }
            for (let elem of this.PRICE_ELEM_LIST){
                elem.style.opacity = '0'
            }
        })
        this.price_list = price_list
        document.querySelector('.gameWorking').append(this.SHOP_BUTTON)
        this.PRODUCT_LIST = []
        this.PRICE_ELEM_LIST = []
        this.product_y = 125
        // Додаємо елементи товарів
        for (let elem of productList){
            let product = new Sprite(425, this.product_y, 200, 100, `/images/shop/product/${elem}.png`, undefined, "img")
            product.ELEMENT.style.zIndex = '4'
            let priceElem = document.createElement('p')
            priceElem.style.position = 'absolute';
            priceElem.style.top =  `${this.product_y +75}px`
            priceElem.style.left = '430px';
            priceElem.style.opacity = '0';
            priceElem.textContent = `Coins: ${this.price_list[productList.indexOf(elem)]}`
            priceElem.classList.add('coinText')
            priceElem.style.fontSize = '13px'
            priceElem.style.zIndex = '4'
            this.PRICE_ELEM_LIST.push(priceElem)
            document.querySelector('.gameWorking').append(priceElem)
            product.ELEMENT.style.opacity = '0'
            product.ELEMENT.addEventListener('click',() => {
                if (this.ISINSHOP){
                    if (hero.coins >= this.price_list[productList.indexOf(elem)]) { 
                        let boost = product.ELEMENT.src
                        hero.boosts.push(boost)
                        hero.coins -= this.price_list[productList.indexOf(elem)]
                        hero.COINS_ELEM.textContent = `Coins: ${hero.coins}`
                    }

            }})
            this.PRODUCT_LIST.push(product)
            this.product_y += 125
        }
        
    }
    // Функція анімацій усіх кнопок/підказок
    animateButton(hero){
        for (let elem of this.PRODUCT_LIST){
            if (hero.coins >= this.price_list[this.PRODUCT_LIST.indexOf(elem)]) {
                elem.ELEMENT.classList.add('product')
                elem.ELEMENT.classList.remove('product-not-active')
            } else {
                elem.ELEMENT.classList.add('product-not-active')
                elem.ELEMENT.classList.remove('product')
            }
        }
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
    // Вхід до магазину
    heroInRadious(hero){
        this.radius.RECT.RECT = this.RECT.getRect(this.RADIUS_ELEM)
        if (this.radius.RECT.RECT.top < hero.RECT.RECT.top && this.radius.RECT.RECT.bottom > hero.RECT.RECT.top || this.radius.RECT.RECT.bottom > hero.RECT.RECT.bottom && this.radius.RECT.RECT.top < hero.RECT.RECT.bottom){
            if (this.radius.RECT.RECT.left < hero.RECT.RECT.right && this.radius.RECT.RECT.right > hero.RECT.RECT.right || this.radius.RECT.RECT.right > hero.RECT.RECT.left && this.radius.RECT.RECT.left < hero.RECT.RECT.right){
                if (this.opacity < 1) {
                    this.opacity += 0.1
                    this.BUTTON_ELEM.style.opacity = `${this.opacity}`;
                }
                if (this.Key == 'KeyE'){
                    this.ISINSHOP = true
                    this.SHOP_ELEM.style.opacity='1'
                    this.SHOP_BUTTON.style.opacity='1'
                    for (let elem of this.PRODUCT_LIST){
                        elem.ELEMENT.style.opacity = '1'
                    }
                    for (let elem of this.PRICE_ELEM_LIST){
                        elem.style.opacity = '1'
                    }
                }
                            
            } else {
                if (this.opacity > 0) {
                    this.opacity -= 0.1
                    this.BUTTON_ELEM.style.opacity = `${this.opacity}`;
                }
                this.ISINSHOP = false
                this.SHOP_ELEM.style.opacity='0'
                this.SHOP_BUTTON.style.opacity='0'
                for (let elem of this.PRODUCT_LIST){
                    elem.ELEMENT.style.opacity = '0'
                }
                for (let elem of this.PRICE_ELEM_LIST){
                    elem.style.opacity = '0'
                }
                }
        
        }
    }
}

export default Dealer