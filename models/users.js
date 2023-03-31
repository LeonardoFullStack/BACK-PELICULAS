const { Pool } = require('pg')
const queries = require('../helpers/queries')
const express = require('express');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'usersPelis',
  password: 'admin'
})

const getUserByEmail = async (req, res) => {  //envía datos de un usuario por el mail

  let client,data
  const email = req.params.email
  console.log(email)

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
  console.log('youyou')
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

const deleteUser = async (req, res) => { // borra un usuario por el email
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

const checkMovie = async (req, res) => {// busca una película en concreto en la tabla del usuario
                                        //para no añadir dos veces la misma película
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

const checkMovies = async (req,res) => { // envía todas las películas de un usuario por su id
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
// falta gestionar el   hecho de que tenga ya la película
const addMovieConnect = async (req,res) => { // añade una película a la tabla de favoritos del usuario

  let data, client
  const {idUser,title,idFilm,genres,year,image,runtimeStr,directors} = req.body
  console.log(req.body,'erbody')

  try {
    client = await pool.connect()

    data = await client.query(queries.addMovie, [idFilm, idUser, title,image, genres, year, runtimeStr, directors])
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

const removeMovie = async (req,res) => { // elimina la película de la tabla del usuario
  
  const idUser = req.body.idUser
  const idMovie = req.params.id
  console.log(idMovie, idUser)
  let data,client
  try {
      client = await pool.connect()

      data = await client.query(queries.removeMovie, [idUser, idMovie])
      res.status(200).json({
        ok: true,
        msg: 'la pelicula se ha eliminado de favoritos',
        data: {
          idUser,
          idMovie
        }
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


const updateUser = async (req,res) => { // modifica el usuario, para el recuperar contraseña
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
  checkMovie,
  addMovieConnect,
  deleteUser,
  updateUser,
  getUserByEmail,
  checkMovies,
  createUser
}