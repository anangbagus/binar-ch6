const {user_game} = require('../config/config')

const createUser = (req, res) => {
    const {email, password} = req.body
    user_game.create({
        email: email,
        password: password
    }).then(response => {
        res.status(201).json({
            data : response,
            message: "data berhasil ditambahkan"
        })
    }).catch(err => {
        console.log(err)
    })
}

const readAll = async (req, res) => {
    try {
        const data = await user_game.findAll()
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
    user_game.findOne({
        where:{
            user_id: req.params.id
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

const deleteUser = (req, res) => {
    const id = req.params.id
    user_game.destroy({
        where: {
            user_id: id
        }
    }).then(() => {
        res.status(200).json({
            message: "data berhasil dihapus"
        })
    }).catch(err => {
        console.log(err)
    })
}

module.exports = {readAll, readById, createUser, updateUser, deleteUser}