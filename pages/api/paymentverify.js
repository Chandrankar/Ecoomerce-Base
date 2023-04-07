const url = require('url')

const paymentverify = async (req,res) => {
    let url_parts = url.parse(req.url, true)
    console.log(url_parts);
}

export default paymentverify