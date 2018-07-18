import mongoose, { Schema } from 'mongoose'

const centerSchema = new Schema({
    name: String,
    latitude: Number,
    longitude: Number
})

const Center = mongoose.model('Center', centerSchema)
export { Center }