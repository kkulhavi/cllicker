const tableScores = document.querySelector('#tableScores');
const newGameNav = document.querySelector('#newGameNav');
const activePlayers = document.querySelector('#activePlayers');

//const ipAddress='192.168.1.7'
//const port=3010

//const socket = io(ipAddress+':'+port);
const socket = io();

socket.on('connect',()=>{
    console.log('scores.js->connection created in browser')
})
let myObjj={}
socket.on('end-game-playeer', myObj=>{
    console.log(myObj)
    myObjj=myObj
})


socket.on('recieve-message', (data)=>{
        tableScores.innerHTML=''
        console.log(data)
        const myData=JSON.parse(data)
        let once=true
        myData.forEach((element, index) => {
            if(myObjj.name===element.name&&myObjj.score===element.score&&once){
                once=false
                tableScores.innerHTML+=`<tr class="yellowRow"><th>${index+1}</th><td><strong>${element.name}</strong></td> <td><strong>${element.score}</strong></td></tr>`
            }                
            
            else
            tableScores.innerHTML+=`<tr><th>${index+1}</th><td>${element.name}</td> <td>${element.score}</td></tr>`
    })
    
}
)
socket.on('active-players', (actPlayers)=>{
    activePlayers.innerHTML=actPlayers
})


//fetch(`https://${ipAddress}:${port}/api/top`)
fetch(`https://prof-clicker.herokuapp.com/api/top`)
    .then(data=>data.json())
    .then(data=>data.forEach((element, index) => {                 
        tableScores.innerHTML+=`<tr><th>${index+1}</th><td>${element.name}</td> <td>${element.score}</td></tr>`       
    }))
    
    .catch(err=>console.log(err))

    




newGameNav.addEventListener('click',()=>{

    location.reload()
})
