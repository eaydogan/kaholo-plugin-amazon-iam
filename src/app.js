#!/usr/bin/env node

let aws = require("aws-sdk");
const { listRegions } = require('./autocomplete');


function deleteAccessKey(action,settings) {
    return new Promise((resolve, reject) => {
        aws.config.update({
            region: action.params.REGION.id,
            "accessKeyId": action.params.AWS_ACCESS_KEY_ID || settings.AWS_ACCESS_KEY_ID,
            "secretAccessKey": action.params.AWS_SECRET_ACCESS_KEY || settings.AWS_SECRET_ACCESS_KEY 
        });
        let accessKeyId = action.params.ACCESS_KEY_ID;
        let userName = action.params.USER_NAME;
        let iam = new aws.IAM();
        let params = {
            AccessKeyId: accessKeyId, 
            UserName: userName
        };
        iam.deleteAccessKey(params, (error, data) => {
            if (error)
                return reject({ "err": error });
            return resolve(data);
        });
    });
}

module.exports = {
    deleteAccessKey,
    listRegions
};