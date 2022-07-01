import {User} from "../models/User";
import {errorCode, successCode} from "../util/util";
import {env} from "../util/config";


var AWS = require('aws-sdk');

var accessKeyId = env.ACCESSKEYID;
var secretAccessKey = env.SECRETACCESSKEY;
var region = "us-east-1";

// Set the region
AWS.config.update({region: 'us-east-1'});

// Create the DynamoDB service object
var dynamoDB = new AWS.DynamoDB({
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
});







export default class UserRepository {


    static async insert(user: User): Promise<any> {

        const params = {
            TableName: 'users',
            Item: {
                'id' : {S: user.id.toString()},
                'username' : {S: user.username},
                'password' : {S: user.password},
                'email' : {S: user.email}

            }
        };



        dynamoDB.putItem(params, function (err: any, data: any) {
            if (err) {
                console.log("Error", err);
                return errorCode;
            } else {
                console.log("Success", data);
                return  successCode;
            }
        });
    }

    static async findByUsername(username : string): Promise<any> {

        var params = {

            ProjectionExpression: "username, id,password",
            KeyConditionExpression : 'username = :username',
            ExpressionAttributeValues : {
                ':username': {'S':username}
            },
            TableName : 'users',

        };
        // Call DynamoDB to read the item from the table
        try{
            return  await dynamoDB.query(params).promise();

        }catch (e) {
            return errorCode;
        }
    }

    //TODO Ajouter le checker email
    static async findByEmail(email : string): Promise<any> {

        var params = {

            FilterExpression : 'email = :email',
            ExpressionAttributeValues : {
                ':email': {'S':email}
            },
            TableName : 'users',

        };
        // Call DynamoDB to read the item from the table
        try{
            return  await dynamoDB.scan(params).promise();

        }catch (e) {
            console.log(e)
            return errorCode;
        }
    }
}
