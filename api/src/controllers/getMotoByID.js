const { Moto, Brand } = require("../db"); 

const getMotoByID = async (req , res) =>{
    let { id } = req.params;
    try{
        const motoId = await Moto.findByPk(id)
        res.status(200).json(motoId);
    } catch (error){
        res.status(500).json({message: error.message})
    }
}

module.exports = getMotoByID ;