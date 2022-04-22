const {user_game_biodata} = require('../config/config')

const createBio = (req, res) => {
    const { userGameUserId, name } = req.body
    user_game_biodata.create({
        userGameUserId: userGameUserId,
        name: name
    }).then(response => {
        res.status(201).json({
            data : response,
            message: "data berhasil ditambahkan"
        })
    }).catch(err => {
        res.status(200).json({
            message: "tidak ada data"
        })
        console.log(err)
    })
}

const readAll = async (req, res) => {
    try {
        const data = await user_game_biodata.findAll()
        if(!data){
            res.status(200).json({
                data:data,
                message: "tidak ada data"
            })    
        }
        res.status(200).json({
            data:data
        })
    } catch (error) {
        console.log(error)
    }
}

const readById = (req, res) => {
    user_game_biodata.findOne({
        where:{
            bio_id: req.params.id
        }
    }).then(response => {
        if(!response){
            res.status(200).json({
                data : response,
                message: "tidak ada data"
            })
        }
        res.status(200).json({
            data : response,
            message: "ada data"
        })
    }).catch(err => {
        console.log(err)
    })
}

const updateBio = async (req, res) => {
    const { userGameUserId, name } = req.body
    const query = {
        where:{
            bio_id: req.params.id
        }
    }
    const data = await user_game_biodata.findByPk(req.params.id)
    if(data){
        user_game_biodata.update({
            userGameUserId: userGameUserId,
            name: name
        }, query)
        .then(() => {
            res.status(200).json({
                message: "data diupdate"
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    else{
        res.status(200).json({
            data: data,
            message: "tidak ada data"
        })
    }
}

const deleteBio = (req, res) => {
    const id = req.params.id
    user_game_biodata.destroy({
        where: {
            bio_id: id
        }
    }).then(() => {
        res.status(200).json({
            message: "data berhasil dihapus"
        })
    }).catch(err => {
        console.log(err)
    })
}

module.exports = {readAll, readById, createBio, updateBio, deleteBio}