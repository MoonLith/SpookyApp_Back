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







export default class PlantHistoryRepository {


    static async findByName(nameFlower : string): Promise<any> {

        var params = {


            FilterExpression : 'name_flower = :name_flower',
            ExpressionAttributeValues : {
                ':name_flower': {'S':nameFlower}
            },
            TableName : 'data_plant',

        };
        // Call DynamoDB to read the item from the table
        try{
            return  await dynamoDB.scan(params).promise();
        }catch (e) {
            console.log("Erreur !", e)
            return errorCode;
        }
    }

    static async findById(device_id : string): Promise<any> {

        var params = {


            FilterExpression : 'device_id = :device_id',
            ExpressionAttributeValues : {
                ':device_id': {'N':device_id}
            },
            TableName : 'spooky_data',
            Limit : 1

        };
        // Call DynamoDB to read the item from the table
        try{
            return  await dynamoDB.scan(params).promise();
        }catch (e) {
            console.log("Erreur !", e)
            return errorCode;
        }
    }

    static async findByIdWeekly(device_id : string): Promise<any> {

        var params = {


            FilterExpression : 'device_id = :device_id',
            ExpressionAttributeValues : {
                ':device_id': {'N':device_id}
            },
            TableName : 'spooky_data',
            Limit : 7,

        };
        // Call DynamoDB to read the item from the table
        try{
            return  await dynamoDB.scan(params).promise();
        }catch (e) {
            console.log("Erreur !", e)
            return errorCode;
        }
    }


}
