const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

//Rodar antes dos dados
userSchema.pre('save', function(next){
  if(this.isNew || this.idModified('password')){
    bcrypt.hash(this.password, 10,
      (err, hashedPassword) => {
        if(err)
          next(err)
        else{
          this.password = hashedPassword
          next()
        }
      }  
      
    )
  }
})


userSchema.methods.isCorrectPassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err, same){
    if(err){
      callback(err)
    }else{
      callback(err, same)
    }
  })
}

module.exports = mongoose.model("User", userSchema)