# PROYECTO-PELICULAS
Proyecto películas Esther Marcos Leonardo
BACK-END


RUTAS POSTMAN NUESTA API

GET http://localhost:3000/api/peliculas/  obtener todas las peliculas de nuestra base de datos 

POST http://localhost:3000/api/peliculas/ crear una nueva pelicula (title,image,year,director)

PUT http://localhost:3000/api/peliculas/ID  Actualizar pelicula 


"http://localhost:3000/admin/editMovie/<%=${pelicula.peliculaEncontrada._id}%>" 


RUTAS POSTMAN USUARIOS:  
GET  http://localhost:3000/api/apiUsers/:email obtener usuario   

POST http://localhost:3000/api/apiUsers CREAR USUARIO  

PUT http://localhost:3000/api/apiUsers/:email modificar usuario (name,password,email nuevo en req.
body, email viejo por parámetros)  

DELETE http://localhost:3000/api/apiUsers/:email eliminar usuario  


RUTAS POSTMAN películas de usuarios :  
GET http://localhost:3000/api/apiUsers/films/:id capturar película de usuarios (id película por parámetros, idUser por req.body)  

POST http://localhost:3000/api/apiUsers/films/ añadir película a usuarios(7 parámetros por req.body: idUser,title,idFilm,genres,year,runtimeStr,directors)  

DEL http://localhost:3000/api/apiUsers/films/:id borrar película de usuarios (id película por parámetros, idUser en req.body)  





