const Pelicula = require("../models/peliculasModel")


const getPeliculas=async(req,res)=>{

    try {
        const peliculas=await Pelicula.find()
       
      return  res.status(200).json({
            ok:true,
            msg:'Obteniendo todas las peliculas',
            total_peliculas:peliculas.length,
            data:peliculas
        })
    } catch (error) {
        return  res.status(404).json({
            ok:false,
            msg:'Error al obtener las peliculas '
        })
    } 
}
const getPelicula= async(req,res)=>{
    
    const id=req.params.id

    try {
        const unaPelicula=await Pelicula.findById(id) 

        if(!unaPelicula){
            return res.status(404).json({
                ok:false,
                msg:'el id esta mal'
            })
        }else{
             return  res.status(200).json({
                ok:true,
                msg:'Obteniendo una pelicula',
                peliculaEncontrada:unaPelicula
        })
        }
       
    } catch (error) {
        return  res.status(500).json({
            ok:false,
            msg:'Error al obtener el servicio solicitado'
        })
    }
   
}



const crearPelicula = async (req, res) => {

    const nuevaPelicula = new Pelicula(req.body);
    

    try {

        const peliculaData=nuevaPelicula.save()
        if(!peliculaData){
            return res.status(404)
        }else{
            return res.status(201).json({
            ok:true,
            msg:"pelicula creada",
            data:peliculaData
        })
        }
        
        

    } catch (error) {
       
        return res.status(500).json({
            ok: false,
            msg: 'ERROR: no se ha creado la pelicula.'
        });

    } 
}
const actualizarPelicula= async(req,res)=>{

    try {  
        const id = req.params.id;
        const title = req.body.title;
        const image = req.body.image;
        const director=req.body.director
        const year=req.body.year
        const peliculaActualizada = await Pelicula.findOneAndUpdate({_id:id},{$set:{title,image,director,year}},{new:true});
            return res.status(201).json({
                ok:true,
                msg:"actualizando pelicula",
                data:peliculaActualizada
            })
        
    } catch (error) {
        
        return res.status(500).json({
            ok: false,
            msg: 'ERROR: no se ha encontrado el servicio que quiere actualizar.'
        });

    };
}
const eliminarPelicula= async(req,res)=>{

    const id=req.params.id

   try {

        await Pelicula.findOneAndDelete({_id:id});

        return res.status(200).json({
            ok: true,
            msg: 'Pelicula eliminado correctamente.'
        });
        
    } catch (error) {
        
        return res.status(500).json({
            ok: false,
            msg: 'ERROR: la pelicula que quiere eliminar no existe.'
        });

    }
}

const getPeliculaTitulo= async(req,res)=>{
    const titulo=req.params.titulo
    console.log(titulo);
    try {
        const unaPeliculaTitulo=await Pelicula.find({title:{$regex:`${titulo}`}})
        if(!unaPeliculaTitulo){
            return res.status(404).json({
                ok:false,
                msg:'el titulo esta mal '
            })
        }else{
             return  res.status(200).json({
                ok:true,
                msg:'Obteniendo una pelicula ',
                peliculaEncontrada:unaPeliculaTitulo
        })
        }
    } catch (error) {
        return  res.status(500).json({
            ok:false,
            msg:'Error al obtener el servicio solicitado'
        })
    }
}








module.exports={
    getPeliculas,
    getPelicula,
    crearPelicula,
    actualizarPelicula,
    eliminarPelicula,
    getPeliculaTitulo
}