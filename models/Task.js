let mongoose=require('mongoose');
let TaskSchema=mongoose.Schema({
    text:{type:String,required:true},
    completed:{type:Boolean,default:false},
    index:Number
});
let Task=mongoose.model('Task',TaskSchema);
module.exports=Task;