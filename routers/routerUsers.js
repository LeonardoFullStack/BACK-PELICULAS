const express = require('express')
const router = express.Router()
const {createUser,deleteUser,updateUser, getUserByEmail } = require('../models/users')




router.get('/:email', getUserByEmail)

router.post('/', createUser)

router.delete('/:email', deleteUser)

router.put('/:email', updateUser)



module.exports = router