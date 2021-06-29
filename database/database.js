//Conecção com o banco de dados
const Sequelize=require('sequelize');
const connection=new Sequelize('api', 'root', '123456',{
    host:'localhost',
    dialect:'mysql'
});
module.exports=connection;
