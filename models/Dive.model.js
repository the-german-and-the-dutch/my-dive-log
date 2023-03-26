const { Schema, model } = require("mongoose");


const diveSchema = new Schema(
    {   
        username: {
            type: Schema.Types.ObjectId,
            ref: 'user'
          },
        location: {
            type: String,
            required: true,
            unique: false,
        },
        date: {
            type: Date, 
            default: Date.now, 
            require: true,
            
        },
        diveNumber: {
            type: Number,
            required: false,
        }, 
        timeIn: String,
        timeOut: String,
        bottomTime: String, //calculate time ref: timeIn+timeOut
        depth: {
            type: Number,
        },
        airStart: Number, 
        airEnd: Number,
        comment: {
            type: String,
            required: false,
        },
        visibility: String,
        },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);
    
    const Dive = model("Dive", diveSchema);
    
    module.exports = Dive;