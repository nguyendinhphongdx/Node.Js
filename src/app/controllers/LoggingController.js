class LoggingController{
    //[GET] / logging
    index(req,res){
       res.send({
           loggin_id:'1',
           name:'loging 1',
       });
    }
}
module.exports = new LoggingController;