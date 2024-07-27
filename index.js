const express = require("express");
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')

// Config
    // Template Engine
        app.engine('handlebars', handlebars.engine({
            defaultLayout: 'main',
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
            },}))
        app.set('view engine', 'handlebars')
    // Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
    

// Rotas

    app.get('/', (req, res) => {
        Post.findAll({order: [['id', 'DESC']]}).then( (posts) => {
            res.render('home', {posts: posts})
        })
    })

    app.get('/cad', function(req, res){
        res.render('formulario')
    })
    
    app.post('/add', function(req, res){
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then( () => {
            res.redirect('/')
        }).catch( (erro) => {
            res.send(erro)
        })
    })

    app.get('/deletar/:id', (req, res) => {
        Post.destroy({where: {'id': req.params.id}}).then(() => {
            res.send("Postagem deletada!")
        }).catch((erro) => {
            res.send(erro)
        })
    })

app.listen(8081, function(){
    console.log("Servidor rodando em http://localhost:8081")
});