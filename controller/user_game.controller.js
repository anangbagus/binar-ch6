const {user_game} = require('../config/config')

const createUser = async (req, res) => {
    const {email, password} = req.body
    var last_id = 1
    const data = await user_game.findAll()
    if(data.length != 0) last_id = await data[data.length-1].user_id + 1
    user_game.create({
        user_id: last_id,
        email: email,
        password: password
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
        const data = await user_game.findAll()
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
    user_game.findOne({
        where:{
            user_id: req.params.id
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

const updateUser = async (req, res) => {
    const { email, password } = req.body
    const query = {
        where:{
            user_id: req.params.id
        }
    }
    const data = await user_game.findByPk(req.params.id)
    if(data){
        user_game.update({
            email: email,
            password: password
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
    else {
        res.status(200).json({
            data: data,
            message: "data not found"
        })
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id
    const data = await user_game.findByPk(id)
    if(data){
        user_game.destroy({
            where: {
                user_id: id
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

module.exports = {readAll, readById, createUser, updateUser, deleteUser}