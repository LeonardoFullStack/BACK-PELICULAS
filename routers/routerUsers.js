const express = require('express')
const router = express.Router()
const {check} = require('express-validator')
const {createUser,deleteUser,updateUser, getUserByEmail } = require('../models/users')
const {validarInputs} = require('../middleware/validarInputs')




router.get('/:email', getUserByEmail)
router.post('/',/* [
    check('name','Tienes que poner un nombre').not().isEmpty(),
    check('email', 'el email no es válido').not().isEmpty().isEmail(),
    check('pass', 'La contraseña tiene que tener mínimo 4 caracteres').isLength({min:4}),
    validarInputs
] */ createUser)

router.delete('/:email',/*  [
    check('email', 'el email no es válido').not().isEmpty().isEmail(),
    validarInputs
], */ deleteUser)
router.put('/:email',/* [
    check('name','Tienes que poner un nombre').not().isEmpty(),
    check('email', 'el email no es válido').not().isEmpty().isEmail(),
    check('pass', 'La contraseña tiene que tener mínimo 4 caracteres').isLength({min:4}),
    validarInputs
], */ updateUser)



module.exports = router