const Sequelize=require('sequelize')

let env=process.env.NODE_ENV || "development"
//const config=require('./config/config.json')["production"]
//console.log(config)
let dbConnection={}


    dbConnection = new Sequelize(process.env.JAWSDB_URL,'ur0jrgacwr5ssi2m','u8x2w8129prenyf4',{
    dialect:'mysql',
    host: 'phtfaw4p6a970uc0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com'
    });

/*
else{ 
   dbConnection=new Sequelize('test2','root','',{
  dialect:'mysql',
  host: 'localhost'
})
}*/


module.exports=dbConnection;