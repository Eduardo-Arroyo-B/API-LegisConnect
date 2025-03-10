import prisma from '../../prisma/prismaClient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator'

const crearUsuario = async (req,res) => {

    // Destructuracion
    const { name, email, password } = req.body

    try {
        // Validar campos
        await check('name').notEmpty().withMessage('El nombre es obligatorio').run(req)
        await check('email').isEmail().withMessage('El email es obligatorio').run(req)
        await check('password')
            .isLength({ min: 6})
            .withMessage('La contraseña debe tener minimo 6 caracteres').run(req)
        await check('repetir_password').equals(req.body.password).withMessage('La contraseña no es igual').run(req)

        let resultado = validationResult(req)

        if (!resultado.isEmpty()) {
            return res.status(400).json({ errores: resultado.array() })
        }

        // Verificar si el email ya existe en la base de datos
        const verificarEmail = await prisma.users.findUnique({
            where: {
                email
            }
        })

        if (verificarEmail) {
            return res.status(400).json({ message: "El email ya esta registrado" })
        }

        // SaltRounds
        const salt = await bcrypt.genSalt(10)

        // Hash password
        const hash = await bcrypt.hash(password, salt)

        const crearUsuario = await prisma.users.create({
            data: {
                name,
                email,
                password: hash
            }
        })

        if (!crearUsuario) {
            return res.status(400).json({ message: "Ha habido un error al crear el usuario" })
        }

        // Generar token
        const token = await jwt.sign({ id: crearUsuario.id, name: name }, process.env.JWT_SECRET, { expiresIn: '1d' })

        // Manda cookie con el jwt para verificarlo en los inicios de session
        return res
            .cookie('token', token, {
                httpOnly: true, // No accesible desde JS
                secure: false, // Solo HTTPS
                signed: true,
                sameSite: 'Lax', // Compatible con multiples pestañas y CSRF seguro
                path: '/',
            })
            .status(200)
            .json({ message: "usuario creado exitosamente", crearUsuario, token })

    } catch (error) {
        res.status(400).json({ errores: error.message })
    }
}



const autenticar = async (req, res) => {

    // Desestructuracion
    const { password, email } = req.body

    try {

        await check('email').isEmail().withMessage('El email es obligatorio').run(req)
        await check('password').notEmpty().withMessage('La contraseña es obligatoria').run(req)

        let resultado = validationResult(req)

        if (!resultado.isEmpty()) {
            return res.status(400).json({ errores: resultado.array() })
        }

        // Comprobar si el usuario existe
        const usuario = await prisma.users.findUnique({
            where: {
                email
            }
        })

        if (!usuario) {
            return res.status(400).json({ message: "El usuario no existe" })
        }

        // Comparar el password
        const passwordCompare = await bcrypt.compare(password, usuario.password)

        // Validar password
        if (!passwordCompare) {
            return res.status(400).json({ message: "La contraseña es incorrecta" })
        }

        // Generar token
        const token = await jwt.sign({ id: usuario.id, name: usuario.name }, process.env.JWT_SECRET, { expiresIn: '1d' })

        return res
            .cookie('token', token, {
                httpOnly: true, // No accesible desde JS
                secure: true, // Solo HTTPS / Desactivada para localhost
                signed: true, // Firma las cookies
                path: '/',
                sameSite: "none"
            })
            .status(200)
            .json(usuario)

    } catch (error) {
        res.status(400).json({ errores: error.message })
    }
}

const cerrarSession = (req,res) => {

    try {
        // Se elimina la cookie en el front
        res.clearCookie('token', {path: "/", secure: true, sameSite: 'Lax'})

        // Manda mensaje que se elimino correctamente
        return res.json({ message: "Session cerrada exitosamente" })
    } catch (error) {
        res.status(400).json({ errores: error.message })
    }
}

export {
    crearUsuario,
    autenticar,
    cerrarSession
}