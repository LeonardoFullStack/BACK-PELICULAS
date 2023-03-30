const express = require('express')
const router = express.Router()
const {checkMovie, addMovieConnect,removeMovie,checkMovies} = require('../models/users')


//todos los datos se envían con un ok
router.get('/all/:idUser', checkMovies)//recoge todas las películas
router.post('/userFilms/:id', checkMovie)//recoge una película de un usuario en la tabla favs
router.post('/', addMovieConnect)// añade una película al usuario en la tabla favs
router.delete('/:id', removeMovie)// borra una película del usuario en la tabla favs
// NO necesito el update






module.exports= router