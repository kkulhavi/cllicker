const Sequelize=require('sequelize')

let env=process.env.NODE_ENV || "development"
//const config=require('./config/config.json')["production"]
//console.log(config)
//let dbConnection = new Sequelize('heroku_45a657f0cf29b9f','bcb8dea161b467','e00a35a9',{
let dbConnection = new Sequelize('heroku_45a657f0cf29b9f','bcb8dea161b467',process.env.PASS,{
    dialect:'mysql',
    host: 'us-cdbr-east-04.cleardb.com'
    });

/*
else{ 
   dbConnection=new Sequelize('test2','root','',{
  dialect:'mysql',
  host: 'localhost'
})
}*/


module.exports=dbConnection;
