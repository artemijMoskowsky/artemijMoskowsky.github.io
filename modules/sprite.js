class Sprite{
    constructor(x, y, width, height, imagePath = undefined, color = undefined, tagName="div"){
        this.X = x;
        this.Y = y;
        this.WIDTH = width;
        this.HEIGHT = height;
        this.IMG_PATH = imagePath;
        this.COLOR = color;
        this.ELEMENT = document.createElement(tagName);

        this.ELEMENT.style.position = 'absolute';
        this.ELEMENT.style.width = `${this.WIDTH}px`;
        this.ELEMENT.style.height = `${this.HEIGHT}px`;
        this.ELEMENT.style.top = `${this.Y}px`;
        this.ELEMENT.style.left = `${this.X}px`;

        if (this.IMG_PATH != undefined) {
            this.ELEMENT.src = this.IMG_PATH
        }   else if (this.COLOR != undefined) {
                this.ELEMENT.style.backgroundColor = this.COLOR;
        };

        document.querySelector('.gameWorking').append(this.ELEMENT);
        


    }
}

export default Sprite