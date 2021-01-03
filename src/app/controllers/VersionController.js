class VersionController{
    //[GET] / version
    index(req,res){
       res.send({
           id:'1',
           name:'version 1',
       });
    }
}
module.exports = new VersionController;