var mongoose = require("mongoose"); 
CounterModel = require("./counter.model");

// Setup schema
var userSchema = mongoose.Schema(
  {
    idseq: { type: Number ,unique:true },
    name: { type: String, required: true },
    email: {
      type: String,
      lowercase: true,
      index: { unique: true, sparse: true },
    },
    password: {
      type: String,
    },
    mobile: {
      type: String,
      required: true,
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

 
//autoincrement
userSchema.pre("findOneAndUpdate", function (next) {
  if (!this._update.idseq) {
    CounterModel.getSetAutoIncrementId(this.mongooseCollection.name, "idseq").then((result) => {
      this._update.idseq = result.count;
      next();
    });
  } else {
    next();
  }
});


// Export User model
var UserModel = (module.exports = mongoose.model("User", userSchema));
module.exports.get = function (callback, limit) {
  UserModel.find(callback).limit(limit);
};
