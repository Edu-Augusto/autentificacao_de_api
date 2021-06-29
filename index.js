//Importando as ferramentas a serem usadas
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken')
//Importando a model do banco de dados
const connection = require('./database/database');
const Game = require('./database/games');
const Users = require('./database/user');
//Informando o express para usar o body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Função de conexão com o banco de dados
app.use(cors());

const JTWsecret = 'Então quer dizer?'

connection
    .authenticate()
    .then(() => {
        console.log("Servidor conectado com sucesso com o banco de dados!")
    })
    .catch((erro) => {
        console.log(erro)
    });

//Middleware para acesso as rotas da API através de autenticação de token
function auth(req,res,next){
    const authToken=req.headers['authorization'];
    
    if(authToken!=undefined){
        const bearer=authToken.split(' ');
        var token=bearer[1];
        //Função para descriptografar o token e analizar se o token é válido
        jwt.verify(token, JTWsecret, (err,data)=>{
            if(err){
                res.status(401);
                res.json({err:'Token invalido'})
            }else{
                //Utilizando a funcionalidade do jwt.verify para que qualquer rota da API possa usar os dados do token
                req.token=token;
                req.loggedUser={id:data.id, email:data.email};
                next();
            }
        })
    }else{
        res.status(401);
        res.json({err:'Token invalido'})
    }
}
//Rota de listagem dos games
app.get('/games', auth, (req, res) => {
    Game.findAll({
        raw: true, order: [
            ['title', 'ASC']
        ]
    })
        .then((games) => {
            if (games.length == 0) {
                res.sendStatus(404)
            }
            res.statusCode = 200
            res.json(games)
        })
})
//Rota de listagem única de game
app.get('/game/:id', auth , (req, res) => {
    let id = req.params.id
    if (isNaN(id)) {
        res.sendStatus(400)
    } else {
        Game.findOne({ raw: true, where: { id } })
            .then((game) => {
                if (game == null) {
                    res.sendStatus(404)
                } else {
                    res.statusCode = 200
                    res.json(game)
                }
            })
    }
});
//Rota de criação de game
app.post('/game', auth, (req, res) => {
    var { title, year, price } = req.body;
    //Verificando se os campos de cadastro estão corretos
    if (title != undefined) {
        if (!isNaN(year)) {
            if (!isNaN(price)) {
                Game.create({
                    title: title,
                    year: year,
                    price: price
                }).then(() => {
                    res.sendStatus(200);
                });
            } else {
                res.sendStatus(406);
            }
        } else {
            res.sendStatus(406);
        }
    } else {
        res.sendStatus(406);
    }
});
//Rota de deleção de game
app.delete('/game/:id', auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);

        Game.destroy({
            where: {
                id: id
            }
        }).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(404);
        })
    }
})
//Rota de edição de game
app.put('/game/:id', auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var { title, year, price } = req.body;
        Game.findOne({ where: { id } })
            .then((game) => {
                //Verificando quais os campos serão atualizados do game
                if (game == null) {
                    res.sendStatus(404)
                } else {
                    if (title != null) {
                        Game.update({ title }, { where: { id } })
                    }
                    if (year != null) {
                        Game.update({ year }, { where: { id } })
                    }
                    if (price != null) {
                        Game.update({ price }, { where: { id } })
                    }
                    res.sendStatus(200)
                }
            })
    }
})
//Rota para a autenticação do usuário e a geração do token de acesso
app.post('/auth', (req, res) => {
    var { email, password } = req.body;

    if (email != undefined){
        Users.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user != undefined){
                    if (user.password == password) {
                        //jwt.sing é a função que gera os tokens a partir do id e email do usuário, informado e filtrado a partir do login, que para chegar nesse ponto deve ser válido
                        jwt.sign({ id: user.id, email: user.email }, JTWsecret, { expiresIn:'48'}, (err, token) => {
                            if (err) {
                                res.status(400);
                                res.json({ err: 'Falha interna!' });
                            }else{
                                res.status(200);
                                res.json(token);
                            }
                        });
                    }else{
                        res.status(401);
                        res.json({ err: 'Senha incorreta!' });
                    }
                }
        })
    }else{
        res.status(400);
        res.json({ err: 'O email enviado é invalido!' });
    }
})
//Rota de criação de usuário
app.post('/usercreate', auth, (req, res) => {
    var { password, email, empresa, name } = req.body;
    if (password != undefined && email != undefined && empresa != undefined && name != undefined) {
        res.status(200);
        res.json({ password, email, empresa, name });
        //Função para criar o usuário no banco de dados
        Users.create({
            password: password,
            email: email,
            empresa: empresa,
            name: name
        });
    } else {
        res.status(400)
        res.json({ err: 'Preencha todos os campos de criação de usuário.' })
    }
})


app.listen(3000, () => {
    console.log('App rodando!');
})



