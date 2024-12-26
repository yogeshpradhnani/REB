const {Schema , mongoose } = require( 'mongoose')

const solutionSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    shortDescription:{
        type: String,
        required: true
    },
    longDescription:{
        type: String
       
    }
    ,
    shortImage:{
        type: String,
        required: true
    },
    longImage:{
        type: String,
        required: true
       
    }

}   
,
{
    timestamps: true,

}

)

module.exports = mongoose.model('Solution',solutionSchema );