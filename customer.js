const Sequelize=require('sequelize')
const db=require('./database')

const Customer=db.define('customer',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey: true
    },
    name:{
        type:Sequelize.STRING
    },
    score:{
        type:Sequelize.INTEGER
    }
});

module.exports=Customer