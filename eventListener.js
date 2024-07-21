// It deblurs the screen for the user to view the game.
window.addEventListener('load', ()=>{
    while(data.length!=10){
        placeResults()
    }
})
// It used to start the game
document.addEventListener('click',async()=>{
    if(!gameStarted){
        gameStarted=true
        console.log(data)
        await new Promise(resolve => setTimeout(resolve,500))
        inputString.innerHTML=''
        triggerCountdown()
        document.querySelectorAll('.alphabetic-key span').forEach(elem => elem.style.opacity = '1')
        keysAllowed = true
    }
})
// It takes input from the user to solve puzzle and the evenet is triggred when user press the key.
document.addEventListener('keydown', async(e)=>{
    if(keysAllowed && sample.includes(e.key.toLowerCase()) && inputString.innerHTML.length!=6 && !e.repeat){
        inputString.innerHTML=inputString.innerHTML + e.key.toUpperCase()
        alphaKeys[sample.indexOf(e.key.toLowerCase())].querySelector('img').style.filter='brightness(50%)'

    }
    else if(e.key=='Backspace' && keysAllowed && inputString.innerHTML.length>0 && !e.repeat){
    inputString.innerHTML=inputString.innerHTML.slice(0,inputString.innerHTML.length-1)
    backspaceKeyImg.style.filter='brightness(50%)'
    } 
    else if (e.key=='Escape' && keysAllowed){
        gameOver()
    }
    else if(keysAllowed && e.code=='Space' && !e.repeat && inputString.innerHTML.length>=3){
       spaceKeyImg.style.filter='brightness(50%)' 
       let correct = false
    // Reads the data using innerhtml and checks for length and if the word is in the result set
       data.forEach((object)=>{
        if(object.result==inputString.innerHTML.toLowerCase() && !solved.includes(inputString.innerHTML.toLowerCase())){
            correct = true
            object.occupied.forEach((cellNo)=>{
                let blocksArray = getBlocksAtCellNo(cellNo)
                console.log(blocksArray)
                if(blocksArray.length==1){
                    blocksArray[0].style.transform='scale(1)'
                }
                else if(blocksArray.length==2){
                    if(blocksArray[0].style.transform=='scale(0)'){
                        blocksArray[0].style.transform='scale(1)'
                    }
                    else{
                        blocksArray[1].style.transform='scale(1)'
                    }
                }
            })
            solved.push(object.result)

            if(solved.length==10){
                clearInterval(countdownID)
                scoreValue.innerHTML = Number(scoreValue.innerHTML)+Number(countdown.innerHTML)+1000
            }
        }
       })
       !correct
       inputString.innerHTML=''
    }
    // Code to switch puzzle
    else if(e.key=='Enter' && keysAllowed && (solved.length==10 || skips!=3 )){
        solved.length!=10 && skips++
        solved=[]
        inputString.innerHTML=''
        clearInterval(countdownID)
        keysAllowed=false
        data=[]
        while(data.length!=10){
            placeResults()
        }
        triggerCountdown()
        keysAllowed=true
    }
    
})
// This event is triggred when the user releases the key
document.addEventListener('keyup',(e)=>{
    if(keysAllowed && sample.includes(e.key.toLowerCase())){
        setTimeout(()=>{
        alphaKeys[sample.indexOf(e.key.toLowerCase())].querySelector('img').style.filter='brightness(100%)'
        },100)

    }
    else if (keysAllowed && e.code=='Space'){
        setTimeout(()=>{
            spaceKeyImg.style.filter ='brightness(100%)'
        },100)
    }
    else if (keysAllowed && e.key=='Backspace'){
        setTimeout(()=>{
            backspaceKeyImg.style.filter='brightness(100%)'
        },100)
    }
    else if (keysAllowed && e.key=='Enter'){
        console.log("Enter pressed")
    }
}) 