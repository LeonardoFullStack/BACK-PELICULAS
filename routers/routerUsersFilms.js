const express = require('express')
const router = express.Router()
const {checkMovie, addMovieConnect,removeMovie} = require('../models/users')


//todos los datos se envían con un ok
router.get('/:id', checkMovie)//recoge una película de un usuario en la tabla favs
router.post('/', addMovieConnect)// añade una película al usuario en la tabla favs
router.delete('/:id', removeMovie)// borra una película del usuario en la tabla favs
// NO necesito el update






module.exports= router