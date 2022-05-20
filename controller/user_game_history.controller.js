const {user_game_history} = require('../config/config')

const createHist = async (req, res) => {
    const { userGameUserId, result } = req.body
    var last_id = 1
    const data = await user_game_history.findAll()
    if(data.length != 0) last_id = await data[data.length-1].hist_id + 1
    user_game_history.create({
        hist_id: last_id,
        userGameUserId: userGameUserId,
        result: result
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
        const data = await user_game_history.findAll()
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
    user_game_history.findOne({
        where:{
            hist_id: req.params.id
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

const updateHist = async (req, res) => {
    const { userGameUserId, result } = req.body
    const query = {
        where:{
            hist_id: req.params.id
        }
    }
    const data = await user_game_history.findByPk(req.params.id)
    if(data){
        user_game_history.update({
            userGameUserId: userGameUserId,
            result: result
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

const deleteHist = async (req, res) => {
    const id = req.params.id
    const data = await user_game_history.findByPk(id)
    if(data){
        user_game_history.destroy({
            where: {
                hist_id: id
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

module.exports = {readAll, readById, createHist, updateHist, deleteHist}