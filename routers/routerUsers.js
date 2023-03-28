const express = require('express')
const router = express.Router()
const {createUser,deleteUser,updateUser } = require('../models/users')


const { getUserByEmail} = require('../controllers/apiUsersControllers')

router.get('/', getUserByEmail)

router.post('/', createUser)

router.delete('/:email', deleteUser)

router.put('/:email', updateUser)



module.exports = router