var aws = require ('aws-sdk');
var ses = new aws.SES({region: 'us-west-2'});
var dynamoDB = new aws.DynamoDB.DocumentClient({region: "us-west-1"});
const queryString = require('querystring');

exports.handler = (event, context, callback) => {
    let queryParams = JSON.stringify(event);
    console.log("Request = " + queryParams);
    
    const qParams = JSON.parse(queryParams);

    const userName = qParams.UserName;
    const email = qParams.Email;
    const message = qParams.Message;
    
    
    
    var params = {
        Destination: {
            ToAddresses: [email]
        },
        Message: {
            Body: {  Text : { Data: message}} ,
            Subject : { Data : userName},
        },
        Source: "gsellamu@gmail.com",
    };
console.log(params);

ses.sendEmail(params,function(err, data) {
    
    callback(null, {err: err, data: data});
    
    if (err) {
        console.log(err);
        //context.fail(err);
        } else {
            console.log(data);
         //   context.succed(event);
        }
});
    
    // now add user deatils in to dynamodb
    console.log("calling dynamDB", userName, email, message);
    
    dynamoDB.put( {"TableName": "MkDecisionJeeth",
                    "Item" : {
                        "UserName" : userName,
                        "Email" : email,
                        "Message" : message,
                        "Time" : Date.now().toString()
                    }
                    
    },    function(err, data) {
        if (err) {
            console.log(err);
            
        } else {
            console.log(data);
            
        }
     });
    
    
    const response = {
        statusCode : 200,
        body: qParams,
        headers: {
            'Access-Control-Allow-Origin': '*',
            
        }
        }
        
};
