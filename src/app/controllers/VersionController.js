const versionModel = require('../models/Version');

class VersionController{
    //[GET] / version
    index(req,res){
        versionModel.find({},function(err,versions){
            if(!err){
                res.json(versions);
            }else{
                res.status(400).json({error: 'Error'});

            }
        });
    }
}
module.exports = new VersionController;