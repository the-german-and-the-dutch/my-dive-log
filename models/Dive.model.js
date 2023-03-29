const { Schema, model } = require("mongoose");


const diveSchema = new Schema(
    {   

        userId: {
            type: String
          },
        username: {
            type: String
          },
        location: {
            type: String,
            required: true,
            unique: false,
        },
        date: {
            type: String, 
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
            required: true,
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