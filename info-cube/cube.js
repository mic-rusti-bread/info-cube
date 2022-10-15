var cubeContainer = document.querySelector('.cube-container');
const cube = document.querySelector('.cube');


cube.currentRotation = 0
cube.sides = {}
cube.sides.front = cube.querySelector('.cube__face--front');
cube.sides.back = cube.querySelector('.cube__face--back');
cube.sides.top = cube.querySelector('.cube__face--top');
cube.sides.bottom = cube.querySelector('.cube__face--bottom');
cube.sides.list = [cube.sides.front, cube.sides.bottom, cube.sides.back, cube.sides.top]

cube.show = () => {cubeContainer.classList.add('show')};
cube.hide = () => {cubeContainer.classList.remove('show')};


cube.goUp  = () => {
    cube.currentRotation -= 90;
    cube.setRotation(cube.currentRotation);
}
cube.goDown  = () => {
    cube.currentRotation += 90;
    cube.setRotation(cube.currentRotation);
}

cube.setRotation = (deg) => {
    cube.style.transform = calcZtranslate() + ' rotateX(' + deg + 'deg)'
}

cube.sides.setTitle = (face, title) => {
    let target = face.querySelector('.content-title:not(.custom)')
    if (target !== null){
        target.textContent = title
    }
}

cube.sides.setDescr = (face, descr) => {
    let paragraph = face.querySelector('.content-body:not(.custom) p')
    if (paragraph !== null){
        paragraph.textContent = descr 
    }
    //:not(.custom)
}
cube.setTitle = (title) => {
    cube.querySelectorAll('.cube-title').forEach(e => e.textContent = title)
}
cube.sides.setNavigation = (face, upTxt, downTxt) => {

    face.querySelector('.cube-navigation .cube-up p').textContent = upTxt
    face.querySelector('.cube-navigation .cube-down p').textContent = downTxt
}


cube.setFaces = (inObj) => {
    let i = 0
    let j = 0
    let k = 0
    let contentKeysArray = Object.keys(inObj)
    
    contentKeysArray.forEach(faceName => {
        
        let currentFace = cube.sides.list[i]
        cube.sides.setTitle(currentFace, inObj[faceName].titolo)
        cube.sides.setDescr(currentFace, inObj[faceName].descr)


        j = i === 0 ? (contentKeysArray.length -1 ) : (i - 1)
        k = i === (contentKeysArray.length - 1 ) ? 0 : (k + 1)
        cube.sides.setNavigation(currentFace, contentKeysArray[j], contentKeysArray[k])

        i++
    });
}




//devo mettere le media queries qui perchè non mi legge il css. Visto che devo contrastare il translateZ del cubo 
function calcZtranslate(){
    let translate = 'translateZ('
    translate += window.matchMedia(" only screen and (min-width : 320px) and (max-width : 1024px)").matches ? '-155'  : '-135'
    translate += 'px)'
    return translate
}


document.querySelectorAll('.cube-up').forEach(el => {
    el.addEventListener('click', cube.goUp)})


document.querySelectorAll('.cube-down').forEach(el => {
    el.addEventListener('click', cube.goDown)})

document.querySelectorAll('.cube-close').forEach(el => {
    el.addEventListener('click', cube.hide)
})

//inizializzo il cubo
cube.setRotation('0');