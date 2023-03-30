const {Schema,model } = require("mongoose");

const PeliculaSchema=new Schema({
    title: {
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    year:{
        type:Number,
        required:true,
    },
    director:{
        type:String,
        required:true,
     },
    genero:{
        type:String,
        required:true,
    },
    actores:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    sinopsis:{
        type:String,
        required:false,
    },
    duracion:{
        type:Number,
        required:true,
    }
})



module.exports=model("pelicula",PeliculaSchema)