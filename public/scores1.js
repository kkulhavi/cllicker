const tableScores = document.querySelector('#tableScores');
const newGameNav = document.querySelector('#newGameNav');

const ipAddress='192.168.1.7'
const port=3010



fetch(`http://${ipAddress}:${port}/api/top`)
    .then(data=>data.json())
    .then(data=>data.forEach((element, index) => {                 
        tableScores.innerHTML+=`<tr><th>${index+1}</th><td>${element.name}</td> <td>${element.score}</td></tr>`       
    }))
    .catch(err=>console.log(err))

newGameNav.addEventListener('click',()=>{

    location.reload()
})
