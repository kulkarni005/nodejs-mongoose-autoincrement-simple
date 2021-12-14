var mongoose = require("mongoose");

// Create new counter schema.
counterSchema = new mongoose.Schema({
  model: { type: String, require: true },
  field: { type: String, require: true },
  count: { type: Number, default: 1 },
},  { timestamps: true });


// Export model
var CounterModel = (module.exports = mongoose.model("Counter", counterSchema));
module.exports.get = function (callback, limit) {
  CounterModel.find(callback).limit(limit);
};

module.exports.getSetAutoIncrementId = async function (model,field='id'){
    //check if such entry in collection
    let options = {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        useFindAndModify: false,
      };  
    
    let result = await CounterModel.findOneAndUpdate({model:model,field:field},{$inc:{count :1 },options});
      if(!result){
        result = new CounterModel({model:model,field:field});
        await result.save();
      }
      
      return result; 
};
