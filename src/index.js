import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import proposalRoutes from './routes/propuestasRoutes.js'
import cookieParser from "cookie-parser";

const app = express()


// Configuracion de los puertos
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SECRET_TOKEN));

// Rutas
app.use('/users', userRoutes)
app.use('/proposals', proposalRoutes)
app.use('/serverAlive', (req, res) => {
    res.send(`Server is alive on port: ${app.get('port')}`)
})

app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`)
})