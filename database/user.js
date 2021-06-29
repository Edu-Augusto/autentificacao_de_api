//Model de criação da tabela usuários
const Sequelize=require("sequelize");
const connection=require("./database");

const Users=connection.define("Users",{
    email:{
        type:Sequelize.STRING,
        allowNull: false
    },
    password:{
        type:Sequelize.STRING
    },
    name:{
        type:Sequelize.STRING
    },
    empresa:{
        type:Sequelize.STRING
    }
});
Users.sync({force:false});
module.exports= Users;