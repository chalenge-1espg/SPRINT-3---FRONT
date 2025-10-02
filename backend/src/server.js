const express = require("express")
const fs= require("fs"); //file system
const path= require("path")// caminho do arquivo do banco de dados
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

// CRIAR UMA STRING PARA RENOVAR A CHAVE DE AUTENTICAÇÃO
const SECRET_KEY= "12345678910";


// LOCAL ONDE ESTA O ARQUIVO DO SEU BANCO DE DADOS
const localDados =path.join(__dirname,'../data/usuarios.json');

// FUNÇÃO PARA LER OS DADOS DO ARQUIVO
const consultarUsuarios=()=>{
    const data = fs.readFileSync(localDados,"utf-8");
    return JSON.parse(data);
}

// FUNÇÃO PARA GRAVAR DADOS NO ARQUIVO
const salvarUsuarios=(users)=>{
    fs.writeFileSync(localDados,JSON.stringify(users,null,2))
}

// ROTA PARA REGISTRAR USUARIO
app.post("/register", async(req,res)=>{
    const {email,senha}= req.body;

    if(!email || !senha){
        return res.status(400).json({message: "Campos obrigatórios"})
    }
    const users= consultarUsuarios();
    if(users.find(user=>user.email == email)){
         return res.status(400).json({message: "Email já cadastrado no banco de dados"})
    }
    // CRIPTOGRAFAR A SENHA
    const hashSenha = await bcrypt.hash(senha,10)
    const novoUsuario = {id:Date.now(),email, senha:hashSenha};
    users.push(novoUsuario);
    salvarUsuarios(users);
    res.status(200).json({message: "Usuario registrado com sucesso"})
})

// ROTA DO LOGIN

app.post("/login", async (req,res)=>{
    const {email, senha}= req.body;
    const users = consultarUsuarios();
    const user = users.find(user=>user.email === email);

    if(!user){
        return res.status(400).json({message: "Usuário/senha Inválidos"})
    }
    const senhaValida= await bcrypt.compare(senha, user.senha);
    if(!senhaValida){
         return res.status(400).json({message: "Senha inválida"})
    }
    // AUTENTICAÇÃO DO JWT
    const token = jwt.sign({id:user.id,email:user.email},SECRET_KEY,{expiresIn:"10m"});
    res.json({message:"Login realizado com sucesso",token})

})



//MIDDLEWARE QUE VAI PROTEGER AS ROTAS DA API E GARANTIR QUE APENAS 
//USUARIOS COM UM TOKEN VALIDO POSSA ACESSAR

const autenticaToken =(req,res,next)=>{
    const auth =req.headers['authorization'];
    const token = auth && auth.split(' ')[1];
    if(token ==null) return res.sendStatus(401);

    jwt.verify(token,SECRET_KEY,(erro, user)=>{
        if(erro) return res.sendStatus(403)
        req.user =user;
        next();
    })
}

// ROTA DO DASHBOARD 

app.get("/dashboard", autenticaToken, (req,res)=>{
    res.json({message:"Acesso autorizado, Bem-vindo", user:req.user})
})


// EXECUTANDO O SERVIDOR NA PORTA DEFINIDA
app.listen(port,()=>{
    console.log(`servidor rodando http://localhost:${port}`)
})