import mongoose, { Schema } from 'mongoose'

const centerSchema = new Schema({
    name: String,
    latitude: Number,
    longitude: Number
})

export default mongoose.model('Center', centerSchema)