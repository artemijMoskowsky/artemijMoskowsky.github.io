class Rect{
    constructor(x,y,width,height,elem) {
        this.X = x;
        this.Y = y;
        this.WIDTH = width;
        this.HEIGHT = height;
        this.ELEMENT = elem;
        this.RECT = this.getRect(this.ELEMENT)
    }
    getRect(elem) {
        const box = elem.getBoundingClientRect()

        return{
            left: box.left,
            right: box.right,
            bottom: box.bottom,
            top: box.top
        }
    }

    colBottom(listElements,rect) {
        for (var element of listElements) {
            let rectElem = this.getRect(element.ELEMENT)
            if (rect.right > rectElem.left + 20 && rect.left < rectElem.right - 20){
                if (rect.bottom >= rectElem.top && rect.bottom < rectElem.bottom){//if (rect.top < rectElem.bottom && rect.top > rectElem.top) {
                    if (element.ELEMENT.classList.contains('bomb') == true){
                        return false
                    }
                    if (element.ELEMENT.src.includes('drop') == true) {
                        if (element.ELEMENT.src.includes('f_a_k') != true){
                            element.ELEMENT.remove()
                            listElements.splice(listElements.indexOf(element),1)
                        }
                        return element
                    }
                    if (element.ELEMENT.src.includes('mine') == true) {
                        return element
                    }

                    if (element.ELEMENT.src.includes('Portal') == true) {
                        return 'portal'
                    }
                    if (element.ELEMENT.src.includes('note') == true){
                        return false
                    }
                    if (element.ELEMENT.src.includes('background') == true){
                        return false
                    }
                    if (element.ELEMENT.classList.contains('vertical')){
                        return element
                    }
                    //if (element.ELEMENT.src.includes('gate') == true){
                    //    if (element.STUCK == false) {
                    //        element.STUCK = true
                    //        element.moveGate()
                    //    }
                    //}
                    return true
                    
                }
            }
        }
    }

    colTop(listElements,rect) {
        for (var element of listElements) {
            let rectElem = this.getRect(element.ELEMENT)
            if (rect.right > rectElem.left + 20 && rect.left < rectElem.right - 20){
                if (rect.top <= rectElem.bottom && rect.bottom > rectElem.bottom){
                    if (element.ELEMENT.classList.contains('bomb') == true){
                        return false
                    }
                    if (element.ELEMENT.src.includes('mine') == true) {
                        return false
                    }
                    if (element.ELEMENT.src.includes('drop') == true) {
                        if (element.ELEMENT.src.includes('f_a_k') != true){
                            element.ELEMENT.remove()
                            listElements.splice(listElements.indexOf(element),1)
                        }
                        
                        return element
                    }
                    if (element.ELEMENT.src.includes('background') == true){
                        return false
                    }
                    if (element.ELEMENT.src.includes('Portal') == true) {
                        return 'portal'
                    }
                    if (element.ELEMENT.src.includes('Platform') == true){
                        return false
                    }
                    if (element.ELEMENT.src.includes('note') == true){
                        return false
                    }
                    if (element.ELEMENT.src.includes('hero') == true){
                        return true
                    }
                    //if (element.ELEMENT.src.includes('gate') == true){
                    //    if (element.STUCK == false) {
                    //        element.STUCK = true
                    //        element.moveGate()
                    //    }
                    //}
                return true
            }
            }
        }
        }
    

    colRight(listElements, rect) {
        for (var element of listElements) {
            let rectElem = this.getRect(element.ELEMENT)
            if (rect.right > rectElem.left && rect.right < rectElem.right){
                if (rect.bottom > rectElem.top + 10 && rect.top < rectElem.bottom - 10){
                    if (element.ELEMENT.classList.contains('bomb') == true){
                        return false
                    }
                    if (element.ELEMENT.src.includes('mine') == true) {
                        return false
                    }
                    if (element.ELEMENT.src.includes('drop') == true) {
                        element.ELEMENT.remove()
                        listElements.splice(listElements.indexOf(element),1)
                        return element
                    }
                    if (element.ELEMENT.src.includes('background') == true){
                        return false
                    }
                    if (element.ELEMENT.src.includes('Portal') == true) {
                        return 'portal'
                    }
                    if (element.ELEMENT.src.includes('Platform') == true){
                        return false
                    }
                    if (element.ELEMENT.src.includes('note') == true){
                        return false
                    }
                    //if (element.ELEMENT.src.includes('gate') == true){
                    //    if (element.STUCK == false) {
                    //        element.STUCK = true
                    //        element.moveGate()
                    //    }
                    //}
                    return true
                }
            }
        }
    }

    colLeft(listElements, rect) {
        for (var element of listElements) {
            let rectElem = this.getRect(element.ELEMENT)
            if (rect.left < rectElem.right && rect.left > rectElem.left){
                if (rect.bottom > rectElem.top + 10 && rect.top < rectElem.bottom - 10){
                    if (element.ELEMENT.classList.contains('bomb') == true){
                        return false
                    }
                    if (element.ELEMENT.src.includes('mine') == true) {
                        return false
                    }
                    if (element.ELEMENT.src.includes('drop') == true) {
                        element.ELEMENT.remove()
                        listElements.splice(listElements.indexOf(element),1)
                        return element
                    }
                    if (element.ELEMENT.src.includes('background') == true){
                        return false
                    }
                    if (element.ELEMENT.src.includes('Portal') == true) {
                        return 'portal'
                    }
                    if (element.ELEMENT.src.includes('Platform') == true){
                        return false
                    }
                    if (element.ELEMENT.src.includes('note') == true){
                        return false
                    }
                    //if (element.ELEMENT.src.includes('gate') == true){
                    //    if (element.STUCK == false) {
                    //        element.STUCK = true
                    //        element.moveGate()
                    //    }
                    //}
                    return true
                }
            }
        }
    }

    
    
}


export default Rect;