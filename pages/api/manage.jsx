const getManagementApiJwt = ()=>{
  var request = require("request")
  return new Promise(function(resolve,reject){
    var options = { method: 'POST',
    url: 'https://chandrankar.eu.auth0.com/oauth/token',
headers: { 'content-type': 'application/json' },
body: '{"client_id":"cqOdZuWovj2Oi00mBaHeMYQcQuhEUpOh","client_secret":"rTbHM8Alf-I6gBixy9bOy2XI-XqtnzOGXoyE9_9Kdx7SBBjC3RgiDXR0eHgdK_He","audience":"https://chandrankar.eu.auth0.com/api/v2/","grant_type":"client_credentials"}' };
request(options, function (error, response, body) {
if (error) {
  reject(error)
}
else{
  resolve(JSON.parse(body))
}
  
});
})
}
const manage = (req,res) => {
  var request = require("request")
  const given_name= req.body.values.firstName;
  console.log(given_name)
  const family_name= req.body.values.lastName;
  const email = req.body.values.email;
  const full_name = given_name + " " + family_name
  getManagementApiJwt().then(data=>{
    const token = data.access_token;
    var options = { method: 'POST',
    url: 'https://chandrankar.eu.auth0.com/api/v2/users',
    headers: { "authorization": "Bearer "+token,'content-type': 'application/json' },
    body: {
    "email": email,
    "blocked": false,
    "email_verified": true,
    "given_name": given_name,
    "family_name": family_name,
    "name": full_name,
    "connection": "Username-Password-Authentication",
    "password": "Secret@123",
    },
    json: true
  };
  console.log('request made')
  request(options, function (error, response, body) {
    if (error) console.log(error);
    else{
      console.log(response.body)
      res.send(response.body)}
});
})
}

export default manage