import mongoose from 'mongoose'
import bcrypt from 'bcrypt';

// create a schema user 
const userSchema = mongoose.Schema({
   firstName: {
       type: String,
       required: true
   },
   lastName: {
       type: String,
       required: true
   },
   email: {
       type: String,
       required: true,
       unique: true
   },
   userImage: {
        type: String,
        required: true
   },
   image: {
    type: String,
    required: false
  },
   password: {
       type: String,
       required: true
   },
   isAdmin: {
       type: Boolean,
       required: true,
       default: false
   },
   isEditor: {
       type: Boolean,
       required: true,
       default: false
   }
},
{
    timestamps: true
})

// encrypt the password 
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
// encrypt the password 
userSchema.pre('save', async function(next) {
    if( !this.isModified('password') ) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

// pack the user Schema to the User class.
const User = mongoose.model('User', userSchema);

export default User