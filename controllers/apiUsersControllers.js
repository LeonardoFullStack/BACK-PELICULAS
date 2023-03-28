const { createUserConnect, getUserConnect, getAllUsersConnect, deleteUserConnect, updateUserConnect } = require('../models/users')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const { generarJwt } = require('../helpers/jwt')
const express = require('express')
const app = express()

app.use(cookieParser())



const getUserByEmail = async (req, res) => {
    let data, msg

    try {
        let email = req.query.email
        console.log(email)
        if (email != undefined) {
            console.log('holi')
            data = await getUserConnect(email)
            msg = `datos del usuario ${email}`
        } else {
            data = await getAllUsersConnect()
            msg = 'Todos los usuarios'
        }
        res.status(200).json({
            ok: true,
            msg,
            data
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contacta con el administrador'
        })
    }
}





const deleteUser = async (req, res) => {
    let data, client
    let email = req.params.email
    try {
        client = await pool.connect()
        data = await client.query(queries.deleteUser, [email])
        res.status(200).json({
            ok: true,
            msg: `El usuario con email ${email} ha sido borrado`
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error al borrar el usuario'
        })
    } finally {

        client.release()
    }

}

const updateUser = async (req, res) => {
    let { name, password, email, image } = req.body
    const oldMail = req.params.email
    let salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt)
    try {
        const data = await updateUserConnect(oldMail, name, password, email, image)
        res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado',
            data: {
                name,
                password,
                email
            }
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error al actualizar el usuario'
        })
    }
}

module.exports = {
    getUserByEmail,
    deleteUser,
    updateUser,
}