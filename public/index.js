const btnOK = document.querySelector('#btnOK');
const txtName = document.querySelector('#txtName');
const gameSection = document.querySelector('#game-section');
const gameHeader = document.querySelector('#game-header');
const progressBar = document.querySelector('#progressBar');
const initSection = document.querySelector('#init-section');
const scoresSection = document.querySelector('#scores-section');
const playerName = document.querySelector('#playerName');
const noPlayerName = document.querySelector('#noPlayerName');
const image = document.querySelector('#image');
const sccore = document.querySelector('#score');
const scoresList = document.querySelector('#scoresList');
const newGame = document.querySelector('#newGame');
const newGameNav = document.querySelector('#newGameNav');
const btnNewGame = document.querySelector('#btnNewGame');
const endGame = document.querySelector('#endGame');
const tableScope1 = document.querySelector('#tableScope1');
const tableScope2 = document.querySelector('#tableScope2');
const tableScores = document.querySelector('#tableScores');

//

//const ipAddress='192.168.1.7'
//const port=3010
//const {myIPAddress}=require('./variables')

//const socket = io(ipAddress+':'+port);
const socket = io();




socket.on('connect',()=>{
    console.log('connection created in browser')
})

scoresSection.classList.add('game')

//const img1=new Image(400,500)
const img1=new Image()
img1.src='images/kruno1_mala.gif'
img1.classList.add('img-fluid')
img1.classList.add('myImage')
//img1.classList.add('img-responsive')
//const img2=new Image(400,500)
const img2=new Image()
img2.src='images/kruno2_mala.gif'
//img2.classList.add('img-fluid')
img2.classList.add('img-fluid')
img2.classList.add('myImage')
const gameOver=new Image()
gameOver.src='images/gameover.png'


btnOK.addEventListener('click',()=>{
    if(txtName.value===''){
        noPlayerName.innerHTML='No name! Too many drinks?'
    }
    else{
        socket.emit('new-player','new')
        noPlayerName.innerHTML=''
        initSection.classList.add('game')
        playerName.innerHTML=`Hey <strong>${txtName.value}</strong>, tap or click to start!`       
        gameSection.classList.remove('game')
        image.appendChild(img1)
        progressBar.style=`width:100%`
        
        
    }    
})

let counter=0
let progressBarMax=100

let isJustOnce=true
let isProgressBarInitVal95=true


image.addEventListener('click',()=>{
    if(counter===0)
        countDown()

    
        
    playerName.innerHTML=`C'mon <strong>${txtName.value}!</strong>`
    counter++

    if(isJustOnce){
        isJustOnce=false
        if(isProgressBarInitVal95){
            isProgressBarInitVal95=false
            progressBarMax=95
        }

        setInterval(()=>{
        progressBar.style=`width:${progressBarMax-=5}%`        
    },250)
    }

    sccore.innerHTML=counter
    if(counter%2){
        image.appendChild(img1)
        image.removeChild(img2)
    }
    else{
        image.appendChild(img2)
        image.removeChild(img1)
    }       
})

//what api responds
let myObject={}

  function countDown(){
    setTimeout(()=>{      

        //fetch(`https://${ipAddress}:${port}/api`,{
        fetch(`https://tranquil-bastion-33502.herokuapp.com/api`,{
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:txtName.value, score:counter}),
        })
        .then(data=>data.json())
        .then(data=>{
            console.table(data)
            //what api responds
            myObject=data
            console.log(myObject)
            socket.emit('end-game-player', myObject)
        })
        
        image.classList.add('game')
        endGame.classList.remove('game')
        
        
        
        setTimeout(() => {        
            results()
        }, 2000);
        
    },5000)
}

function results(){  
    socket.emit('end-game','end')
    
    gameSection.classList.add('game')
    newGameNav.classList.remove('disabled')
    endGame.classList.add('game')
    scoresSection.classList.remove('game')

    let once=true
    //fetch(`http://${ipAddress}:${port}/api/top`)
    fetch(`https://tranquil-bastion-33502.herokuapp.com/api/top`)
    .then(data=>data.json())
    .then(data=>data.forEach((element, index) => {  
        //if(index===2)               
        if(myObject.name===element.name&&myObject.score===element.score&&once){   
            once=false         
            tableScores.innerHTML+=`<tr class="yellowRow"><th>${index+1}</th><td>${element.name}</td><td>${element.score}</td></tr>`       
        }
        else
            tableScores.innerHTML+=`<tr><th>${index+1}</th><td>${element.name}</td> <td>${element.score}</td></tr>`       
    
    }))
    
    .catch(err=>console.log(err))
}


btnNewGame.addEventListener('click',()=>{
    location.reload()
})
newGameNav.addEventListener('click',()=>{
    console.log('clicked')
    location.reload()
})
