import { mongoose } from 'mongoose'

const UserSchema = mongoose.Schema({
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    email: { type: String, required: true, unique: true, default: "" },
    password: { type: String, required: true, default: "" },
    is_deleted: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },

})

const UserData = mongoose.model('tbl_user', UserSchema)
export default UserData