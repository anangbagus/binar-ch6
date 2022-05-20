const {user_game_biodata} = require('../config/config')

const createBio = async (req, res) => {
    const { userGameUserId, name } = req.body
    var last_id = 1
    const data = await user_game_biodata.findAll()
    if(data.length != 0) last_id = await data[data.length-1].bio_id + 1
    user_game_biodata.create({
        bio_id: last_id,
        userGameUserId: userGameUserId,
        name: name
    }).then(response => {
        res.status(201).json({
            data : response,
            message: "success created"
        })
    }).catch(err => {
        console.log(err)
        res.status(400).json({
            message: err.message
        })
    })
}

const readAll = async (req, res) => {
    try {
        const data = await user_game_biodata.findAll()
        if(data.length == 0){
            res.status(200).json({
                data:data,
                message: "no data"
            })    
        }
        res.status(200).json({
            data:data,
            message: "success"
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
                message: "data not found"
            })
        }
        res.status(200).json({
            data : response,
            message: "data obtained"
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
                message: "data updated"
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    else{
        res.status(200).json({
            data: data,
            message: "data not found"
        })
    }
}

const deleteBio = async (req, res) => {
    const id = req.params.id
    const data = await user_game_biodata.findByPk(id)
    if(data){
        user_game_biodata.destroy({
            where: {
                bio_id: id
            }
        }).then(() => {
            res.status(200).json({
                message: "data deleted"
            })
        }).catch(err => {
            console.log(err)
        })
    }
    else {
        res.status(200).json({
            data: data,
            message: "data not found"
        })
    }
}

module.exports = {readAll, readById, createBio, updateBio, deleteBio}