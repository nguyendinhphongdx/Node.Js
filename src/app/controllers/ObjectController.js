class ObjectController{
    //[GET] / object
    index(req,res){
       res.send({
           object_id:'1',
           name:'object 1',
       });
    }
}
module.exports = new ObjectController;