var braintree = require("braintree");

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "tcsvjm5d3pwgpd38",
    publicKey: "npf8wvp7pxvmj4pz",
    privateKey: "116eeb40c630fadb01e4a470fd6fb922"
});

exports.getToken=(req,res)=>{
    gateway.clientToken.generate({}, function (err, response) {
        if(err){
            res.status(500).send(err)
        }else{
            res.send(response)
        }
    });
}
exports.processPayment=(req,res)=>{

    nonceFromTheClient=req.body.paymentMethodNonce
    let amountFromTheClient=req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        //deviceData: deviceDataFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, function (err, result) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(result)
            }
    });
}