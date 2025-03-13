const proyecto = async (req,res) => {

    const url = 'https://datos.congreso.gov.py/opendata/api/data/proyecto'

    try {
        const response = fetch(url)
        res.json(response)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export {
    proyecto
}