import error from "jsonwebtoken/lib/JsonWebTokenError.js";

const proyecto = async (req,res) => {

    const url = 'https://datos.congreso.gov.py/opendata/api/data/proyecto'

    try {
        const response =  await fetch(url)
        const data = await response.json()

        if (!response.ok) {
            console.log("Ha ocurrido un error al extraer los datos")
        }

        return res.json(data)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const parlamentario = async (req,res) => {

    const url = "https://datos.congreso.gov.py/opendata/api/data/parlamentario"

    try {
        const response =  await fetch(url)
        const data = await response.json()

        if (!response.ok) {
            return res.status(404).json({ message: "A ocurrido un error al extraer los datos" })
        }

        return res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const comisiones = async (req,res) => {

    const url = "https://datos.congreso.gov.py/opendata/api/data/comision"

    try {
        const response =  await fetch(url)
        const data = await response.json()

        if (!response.ok) {
            return res.status(404).json({ message: "A ocurrido un error al extraer los datos" })
        }

        return res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const ley = async (req,res) => {

    const url = "https://datos.congreso.gov.py/opendata/api/data/ley"

    try {
        const response =  await fetch(url)
        const data = await response.json()

        if (!response.ok) {
            return res.status(404).json({ message: "A ocurrido un error al extraer los datos" })
        }

        return res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const sesiones = async (req,res) => {

    const url = "https://datos.congreso.gov.py/opendata/api/data/sesion/camara/S"

    try {
        const response =  await fetch(url)
        const data = await response.json()

        if (!response.ok) {
            return res.status(404).json({ message: "A ocurrido un error al extraer los datos" })
        }

        return res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const periodos = async (req,res) => {

    const url = "https://datos.congreso.gov.py/opendata/api/data/periodo"

    try {
        const response =  await fetch(url)
        const data = await response.json()

        if (!response.ok) {
            return res.status(404).json({ message: "A ocurrido un error al extraer los datos" })
        }

        return res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export {
    proyecto
}