class DeviceController{
    //[GET] / device
    index(req,res){
       res.send({
           device_id:'1',
           name:'device 1',
       });
    }
}
module.exports = new DeviceController;