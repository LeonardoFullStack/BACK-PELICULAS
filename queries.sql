--crear database llamado usersPelis, y luego insertar esto en el query editor
CREATE TABLE users (
  id serial NOT NULL PRIMARY KEY, 
  name varchar(45) NOT NULL, 
  password varchar(255) NOT NULL, 
  email varchar(100) NOT NULL UNIQUE,
  image varchar(255)
);
--TITULO IMAGEN GENERO AÑO DURACION DIRECTOR
CREATE TABLE favs (
  id serial NOT NULL PRIMARY KEY
  idfilms varchar(45) NOT NULL,
  idUsers int NOT NULL  , 
  title varchar(45) NOT NULL,
  image varchar(255) ,
  gender varchar(45),
  year varchar(45),
  length varchar(45) ,
  direction varchar(100),
  FOREIGN KEY (idUsers) REFERENCES users(id)

)

INSERT INTO favs(idfilms,idUsers,title,image,gender,year,length,direction)
VALUES 
('tt0133093', '21', 'The matrix', 'meh.jpg', 'sci-fi', '1999', '2h 16min', 'Lana Lilly')

--poner los dos tipos de usuarios
INSERT INTO users(name,password,email,image,isadmin)
VALUES
('zersat','$2a$10$GR.Zt1iAAxMk1s/U3GMU/uLlyywnO6UKJdbahfuUDgG0r3Zsd5aE2', 'zersat@gmail.com', 'zersatFace', true)

INSERT INTO users(name,password,email,image,isadmin)
VALUES
('amfrizerg', '$2a$10$GR.Zt1iAAxMk1s/U3GMU/uLlyywnO6UKJdbahfuUDgG0r3Zsd5aE2', 'amfri@gmail.com', 'amfriFace', false)
--las contraseñas son 1234 , pero están hasheadas