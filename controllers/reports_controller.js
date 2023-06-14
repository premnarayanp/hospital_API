const Report = require('../models/report');

//Reports basis on status of report
module.exports.status = async function(req, res) {
    console.log("======req.param.status=========", req.params.status);

    try {
        const reports = await Report.find({ status: req.params.status });
        return res.status(200).json({
            msg: "Reports Successfully founded",
            data: {
                report: reports
            }
        });

    } catch {
        return res.status(400).json({
            msg: "internal server error"
        })
    }

}