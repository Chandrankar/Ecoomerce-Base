const fast2sms = require('fast-two-sms')

const smssender = async(req,res) => {
    console.log("sms sender is called")
    console.log(req.body.phone,req.body.message)
    var options = {authorization : process.env.FAST2_SMS_API_KEY , message : req.body.message ,  numbers : [req.body.phone]}
    const response = await fast2sms.sendMessage(options)
    console.log(response)
    res.send(response)
}

export default smssender
