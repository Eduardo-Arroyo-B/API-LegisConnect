const proyecto = async (req,res) => {

    const url = 'https://datos.congreso.gov.py/opendata/api/data/proyecto'

    try {
        const response =  await fetch(url)

        if (!response.ok) {
            console.log("Ha ocurrido un error al extraer los datos")
        }

        return res.json(response)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export {
    proyecto
}