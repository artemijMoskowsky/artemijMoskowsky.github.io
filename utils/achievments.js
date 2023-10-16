function achievmentsMove(imgPath,title,text){
    setTimeout(()=>{
        new Notification(title, {
            body: text,
            icon: imgPath
        })
    },3000)
    
    let ach = document.createElement('div')
    ach.style.position = 'absolute'
    ach.style.width = '400px'
    ach.style.height = '150px'
    ach.style.right = '0px'
    ach.style.bottom = '-150px'
    ach.style.backgroundColor = 'brown'
    ach.style.zIndex = '998'
    ach.style.transitionDuration = '0.2s'
    ach.style.border = '2px solid black'
    ach.classList.add('ach')

    let achImg = document.createElement('img')
    achImg.src = imgPath
    achImg.style.position = 'absolute'
    achImg.style.width = '100px'
    achImg.style.height = '100px'
    achImg.style.right = '275px'
    achImg.style.bottom = '-125px'
    achImg.style.zIndex = '999'
    achImg.style.transitionDuration = '0.2s'

    let achText = document.createElement('p')
    achText.textContent = title
    achText.style.position = 'absolute'
    achText.style.width = '225px'
    achText.style.height = '100px'
    achText.style.right = '25px'
    achText.style.bottom = '-125px'
    achText.style.color = 'white'
    achText.style.zIndex = '999'
    achText.style.transitionDuration = '0.2s'

    document.querySelector('.gameDivTop').append(ach)
    ach.append(achImg)
    ach.append(achText)

    setTimeout(()=>{
        ach.style.bottom = '0px'
        achImg.style.bottom = '25px'
        achText.style.bottom = '25px'
        setTimeout(()=>{
            ach.style.bottom = '-150px'
            achImg.style.bottom = '-125px'
            achText.style.bottom = '-125px'
            setTimeout(()=>{
                ach.remove()
            },5000)
        },5000)
    },100)
    
}
export {achievmentsMove}