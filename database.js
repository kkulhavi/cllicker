const Sequelize=require('sequelize')

let env=process.env.NODE_ENV || "development"
//const config=require('./config/config.json')["production"]
//console.log(config)
let dbConnection = new Sequelize('zzqynl7chv706qns','eq5s24k4itiufgwg','vb3x2eeod49ci17u',{
    dialect:'mysql',
    host: 'l0ebsc9jituxzmts.cbetxkdyhwsb.us-east-1.rds.amazonaws.com'
    });

/*
else{ 
   dbConnection=new Sequelize('test2','root','',{
  dialect:'mysql',
  host: 'localhost'
})
}*/


module.exports=dbConnection;
