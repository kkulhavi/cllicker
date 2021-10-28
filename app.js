const express = require('express')
const sequelize=require('./database')
const app = express()
var cors = require('cors')
//const bodyParser=require('body-parser')
//var http = require("http");

let socket=require('socket.io')




const port = process.env.PORT||3010

app.use(cors({
    origin: '*'
}));


app.use(express.json())
app.use(express.static('public'))

//app.use(bodyParser.urlencoded({extended:true}))

const Customer=require('./customer')

sequelize.sync({force:true})
.then(result=>{
    Customer.create({name:'Pero', score:20})
    Customer.create({name:'Miki', score:10})
    Customer.create({name:'Roki', score:40})
    Customer.create({name:'Kiki', score:30})
    //console.log(result)
    })


app.get('/api',(req, res) => {
    Customer.findAll().then(x=>res.json(x))
})


app.get('/api/top',(req,res)=>{
    Customer.findAll()
    .then(x=>x.sort((a,b)=>b.score-a.score))
    .then(x=>res.json(x))
})

app.get('/api/azn',(req,res)=>{
    Customer.findAll()
    .then(x=>x.sort((a,b)=>(b.name<a.name)?1:-1))
    .then(x=>res.json(x))
})

app.post('/api', (req, res) => {
console.log(req.body)
//console.log(req.header)
        
     Customer.create({name:req.body.name, score:req.body.score})
    // res.status(201).send('result added to db')
    res.json({name:req.body.name, score:req.body.score})
})


let server=app.listen(port)

let io=socket(server)
let activePlayers=0

io.on('connection',(socket)=>{
    console.log('connection created', socket.id)

    socket.on('new-player',()=>{
        activePlayers++
        io.emit('active-players', activePlayers)
    })

    socket.on('end-game',(message)=>{
        activePlayers--
        io.emit('active-players', activePlayers)

        console.log(message)
        Customer.findAll()
        .then(x=>x.sort((a,b)=>b.score-a.score))
        .then(data=>JSON.stringify(data))
        .then(data=>io.emit('recieve-message',data))

        //.then(data=>console.log(data))
    })

    socket.on('end-game-player', myObj=>{
        io.emit('end-game-playeer', myObj)
    })
    
})