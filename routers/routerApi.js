const express = require('express');
const router = express.Router();


const { getPeliculas,crearPelicula,actualizarPelicula,eliminarPelicula,getPelicula,getPeliculaTitulo } = require('../controllers/apiControllers')



router.get('/', getPeliculas)      //* GET

router.get('/:id',getPelicula)


router.get('/titulo/:titulo',getPeliculaTitulo)

router.post('/', crearPelicula)   //*POST


router.put('/:id' , actualizarPelicula)//* PUT
    
 router.delete('/:id', eliminarPelicula) //* DELETE




module.exports = router;