import express from 'express'
import flashRoute from './src/routes/flashRoute.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Permite o localhost para desenvolvimento e a URL do Render em produção
};

app.use(cors(corsOptions));

app.use(express.json())

//Significa que todas as rotas dentro de flashRoute vão ser assim
app.use('/api/flashCards', flashRoute)
app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`)
})
