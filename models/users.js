const { Pool } = require('pg')
const queries = require('../helpers/queries')
const express = require('express');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'usersPelis',
  password: 'admin'
})

const getUserByEmail = async (req, res) => {

  let client,data
  const email = req.params.email

          try {
              client = await pool.connect()
              data = await client.query(queries.getUserEmail, [email])
              console.log(data.rows)
              if (data.rows.length != 0) {
                
                res.status(200).json({
                  ok: true,
                  msg: `El usuario con email ${email} ha sido encontrado`,
                  data:data.rows
              })
              console.log('paso2')
              } else {
                
                res.status(404).json({
                  ok: false,
                  msg: `No se ha encontrado el usuario`,
              })
              }
              
          } catch (error) {
              res.status(500).json({
                  ok: false,
                  msg: `meh`,
                  error
              })
          } finally {
              client.release()
          }
      }

const createUser = async (req, res) => {
    let client, respuesta;
    let { name, password, email, isAdmin } = req.body
    console.log(isAdmin)

    try {
        client = await pool.connect()
        const data = await client.query(queries.createUser, [name, password, email, isAdmin])
        respuesta = data.rows
        res.status(200).json({
            ok: true,
            msg: 'Usuario creado',
            data: respuesta
          })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error al crear el usuario',
            error
          })
    } finally {
        client.release()
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

const checkMovie = async (req, res) => {
  console.log('paso')
  let client, data
  let idUser = req.body.idUser
  let idMovie = req.params.id
  console.log(idUser, idMovie)
  try {
    client = await pool.connect()
    data = await client.query(queries.checkMovie, [idUser, idMovie])
    if (data.rows.length == 0) {
      res.status(404).json({
        ok: false,
        msg: 'el usuario no tiene esa película',
      })
    } else {
      res.status(200).json({
        ok: true,
        msg: 'la pelicula',
        data: data.rows
      })
    }
  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: 'Fallo de conexión'
    })
  } finally {
    client.release()
  }

}

const checkMovies = async (req,res) => {
  let data,client
 const id = req.params.idUser
  try {
    client = await pool.connect()

    data = await client.query(queries.myMovies, [id])

    res.status(200).json({
      ok: true,
      msg: `Todas las películas del usuario con id ${id}`,
      data:data.rows
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'error al buscar las películas'
    })
  } finally {

    client.release()
  }


}

const addMovieConnect = async (req,res) => {

  let data, client
  const {idUser,title,idFilm,genres,year,runtimeStr,directors} = req.body
  console.log(req.body)

  try {
    client = await pool.connect()

    data = await client.query(queries.addMovie, [idFilm, idUser, title, genres, year, runtimeStr, directors])
    console.log(data)
    res.status(200).json({
      ok: true,
      msg: 'la pelicula se ha añadido a favoritos',
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'error al crear la película'
    })
  } finally {

    client.release()
  }
  
}

const removeMovie = async (req,res) => {
  
  const idUser = req.body.idUser
  const idMovie = req.params.id
  let data,client
  try {
      client = await pool.connect()

      data = await client.query(queries.removeMovie, [idUser, idMovie])
      res.status(200).json({
        ok: true,
        msg: 'la pelicula se ha eliminado de favoritos',
      })
  } catch (error) {
    res.status(200).json({
      ok: false,
      msg: 'Error al eliminar la película',
    })
  }finally {
      client.release()
  }
  
  
}


//falta gestión de errores, y no repetir peliculas. Y corregir el redirect
const addMovie = async (req, res) => {

  const idMovie = req.params.id
  const idUsers = req.header.id
  console.log(idMovie, idUsers)
  const checkMovieOne = await checkMovie(idUsers, idMovie)
  if (checkMovieOne.length == 0) {
    const peticion = await consulta(null, idMovie)
    const { title, image, genres, year, runtimeStr, directors } = peticion
    const data = await addMovieConnect(idMovie, idUsers, title, image, genres, year, runtimeStr, directors)

  } else {
    //aqui ya tiene la película
  }

  res.redirect('/movies')
}

const updateUser = async (req,res) => {
  const emailViejo = req.params.email
  const { name, password, email} = req.body
  let data, client
  try {
      client = await pool.connect()
      data = await client.query(queries.updateUser, [emailViejo, name, password, email])
      res.status(200).json({
        ok: true,
        msg: 'Usuario actualizado', // esto puede tratar de contraseña solo, asi que igual pongo contraseña actualizada
        data: {
          name,email
        }
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'error al actualizar el usuario'
  })
  } finally {
      client.release()
  }

}



module.exports = {
  removeMovie,
  addMovie,
  checkMovie,
  addMovieConnect,
  createUser,
  deleteUser,
  updateUser,
  getUserByEmail,
  checkMovies
}