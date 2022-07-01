import {User} from "../models/User";
import {errorCode, successCode} from "../util/util";
import {env} from "../util/config";
import {PlantUser} from "../models/PlantUser";


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







export default class PlantUserRepository {

    static async findByUsername(username : string): Promise<any> {

        var params = {


            FilterExpression : 'username = :username and plant_death= :plant_death',
            ExpressionAttributeValues : {
                ':username': {'S':username},
                ':plant_death': {'BOOL':false}
            },
            TableName : 'plant_user',

        };
        // Call DynamoDB to read the item from the table
        try{
            return  await dynamoDB.scan(params).promise();

        }catch (e) {
            console.log(e)
            return errorCode;
        }
    }

    static async insert(plant : PlantUser): Promise<any> {

        const params = {
            TableName: 'plant_user',
            Item: {
                'id' : {S: plant.id},
                'username' : {S: plant.username},
                'plant_name' : {S: plant.plant_name},
                'plant_death' : {BOOL: plant.plant_death},
                'device_id': {N: plant.device_id.toString()},
                'id_user': {S: plant.id_user},
                'id_plant': {N: plant.id_plant},
            }
        };
        // Call DynamoDB to read the item from the table
        try {
            return await dynamoDB.putItem(params).promise();
        }
        catch (e) {
            console.log(e)
            return errorCode;
        }
    }

    static async killPlant(id : string, isKilled : boolean): Promise<any> {

        console.log("ID : ",id)

        const params = {
            TableName: 'plant_user',

            Key: {

                id: {S: id},

            },
            UpdateExpression: 'SET plant_death = :plant_death',

            ExpressionAttributeValues: {
                ":plant_death": {"BOOL": isKilled},
            },


        };
        // Call DynamoDB to read the item from the table
        try {
            return await dynamoDB.updateItem(params).promise();
        }
        catch (e) {
            console.log(e)
            return errorCode;
        }
    }


}
