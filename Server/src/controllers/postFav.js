const { Favorite } = require('../DB_connection')

module.exports = async (req, res) =>{
    try {
        const {id, name, origin, status, image, species, gender} = req.body

        if(name && origin && status && image && species && gender){
            await Favorite.findOrCreate({where: { id: id, name: name, origin: origin, status: status, image: image, species: species, gender: gender }})
            const allFavorites = await Favorite.findAll();
            return res.status(200).json(allFavorites)
        }
        return res.status(400).send("Faltan datos");
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}