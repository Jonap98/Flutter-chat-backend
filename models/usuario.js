const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },
});

// Extrayendo __v, _i, password para que no aparezcan al mostrar el objeto
// ...object: los tres puntos indican que el resto de propiedades se 
// almacenarán en oject
// Posteriormente se modifica el id para mostrarlo como uid, y no como _id
// Finalmente se retorna el object
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Usuario', UsuarioSchema);