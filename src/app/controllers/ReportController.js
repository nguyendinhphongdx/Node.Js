class ReportController{
    //[GET] / report
    index(req,res){
       res.send({
           report_id:'1',
           name:'report 1',
       });
    }
}
module.exports = new ReportController;