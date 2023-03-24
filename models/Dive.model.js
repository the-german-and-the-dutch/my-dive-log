const { Schema, model } = require("mongoose");


const diveSchema = new Schema(
    {   
        username: {
            type: Schema.Types.ObjectId,
            ref: 'User'
          },
        location: {
            type: String,
            required: true,
            unique: false,
        },
        date: {
            type: Date,
            required: true,
        },
        diveNumber: {
            type: Number,
            required: false,
        }, 
        timeIn: Number,
        timeOut: Number,
        bottomTime: Number, //calculate time ref: timeIn+timeOut
        depth: {
            type: Number,
            required: true,
        },
        airStart: Number, 
        airEnd: Number,
        visibility: String, 
        comment: {
            type: String,
            required: true,
        },
        },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);
    
    const Dive = model("Dive", diveSchema);
    
    module.exports = Dive;