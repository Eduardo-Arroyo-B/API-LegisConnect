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

export {
    proyecto
}