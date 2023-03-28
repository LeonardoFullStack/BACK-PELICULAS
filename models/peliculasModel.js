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
     }
    // genero:{
    //     type:String,
    //     required:true,
    // },
    // fecha:{
    //     type:Date,
    //     default:Date.now
    // }
})



module.exports=model("pelicula",PeliculaSchema)