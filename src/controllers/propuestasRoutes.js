import prisma from '../../prisma/prismaClient.js';
import { check, validationResult } from "express-validator";


const crearPropuesta = async (req, res) => {

    // Desestructuracion
    const { title, content } = req.body

    try {
        await check('title').notEmpty().withMessage('El titulo no puede ir vacio').run(req)
        await check('content').isLength({ min: 10 }).withMessage('Agrega minimo 10 letras a la publicacion').run(req)

        let resultado = validationResult(req)

        if (!resultado.isEmpty()) {
            return res.status(400).json({ errores: resultado.array() })
        }

        // Crear propuesta
        const crearPropuesta = await prisma.propuestas.create({
            data: {
                title,
                content,
                autorId: req.userId
            },
            include: {
                author: true
            }
        })

        console.log(crearPropuesta)

        if (!crearPropuesta) {
            return res.status(400).json({ message: "Ha ocurrido un error al crear la propuesta" })
        }

        res.status(200).json({ message: "Propuesta creada exitosamente" })
    } catch (error) {
        res.status(400).json({ errores: error.message })
    }
}

const obtenerPropuesta = async (req, res) => {


    try {
        const traerPropuestas = await prisma.propuestas.findMany()

        return res.status(200).json({ traerPropuestas })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export {
    crearPropuesta,
    obtenerPropuesta
}