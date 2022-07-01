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







export default class PlantRepository {



    static async findFirst100(): Promise<any> {

        var params = {
            TableName : 'data_plant',
            Limit : 100,


        };
        // Call DynamoDB to read the item from the table
        try{
            return  await dynamoDB.scan(params).promise();
        }catch (e) {
            console.log("Erreur !", e)
            return errorCode;
        }
    }


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

    static async findById(plantId : string): Promise<any> {

        var params = {

            KeyConditionExpression : 'id = :id',
            ExpressionAttributeValues : {
                ':id': {'N':plantId}
            },
            TableName : 'data_plant',

        };
        // Call DynamoDB to read the item from the table
        try{
            return  await dynamoDB.query(params).promise();
        }catch (e) {
            console.log("Erreur !", e)
            return errorCode;
        }
    }


}
