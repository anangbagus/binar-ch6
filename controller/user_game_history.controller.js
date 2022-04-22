const {user_game_history} = require('../config/config')

const createHist = (req, res) => {
    const { userGameUserId, result } = req.body
    user_game_history.create({
        userGameUserId: userGameUserId,
        result: result
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
        const data = await user_game_history.findAll()
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
    user_game_history.findOne({
        where:{
            hist_id: req.params.id
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

const deleteHist = (req, res) => {
    const id = req.params.id
    user_game_history.destroy({
        where: {
            hist_id: id
        }
    }).then(() => {
        res.status(200).json({
            message: "data berhasil dihapus"
        })
    }).catch(err => {
        console.log(err)
    })
}

module.exports = {readAll, readById, createHist, updateHist, deleteHist}