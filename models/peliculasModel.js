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
    directors:{
        type:String,
        required:true,
     },
    genres:{
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
    runtimeStr:{
        type:Number,
        required:true,
    }


    
})



module.exports=model("pelicula",PeliculaSchema)