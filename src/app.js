const aws = require("aws-sdk");
const { listRegions } = require('./autocomplete');


async function deleteAccessKey(action,settings) {
    const accessKeyId = (action.params.ACCESS_KEY_ID || "").trim();
    const userName = (action.params.USER_NAME || "").trim();

    if (!userName || !accessKeyId){
        throw "Not given one of required fields";
    }

    const params = {
        AccessKeyId: accessKeyId, 
        UserName: userName
    };
    const client = getClient(action, settings);
    return runAwsMethod(client.deleteAccessKey, params);
}

const updateAccessKey = getAwsUpdateMethod("accessKeyId");
const updateSSHPublicKey = getAwsUpdateMethod("sshId");

async function deleteUser(action,settings) {
    const userName = (action.params.USER_NAME || "").trim();
    if (!userName){
        throw "Not given user name";
    }
    const params = {
        UserName: userName
    };
    const client = getClient(action, settings);
    return runAwsMethod(client.deleteUser, params);
}

// Helpers

function getClient(action, settings){
    const options = {
        region: action.params.REGION.id,
        "accessKeyId": action.params.AWS_ACCESS_KEY_ID || settings.AWS_ACCESS_KEY_ID,
        "secretAccessKey": action.params.AWS_SECRET_ACCESS_KEY || settings.AWS_SECRET_ACCESS_KEY 
    }
    return new aws.IAM(options);
}

function runAwsMethod(method, params){
    return new Promise((resolve, reject) => {
        method(params, (error, data) => {
            if (error) return reject({ "err": error });
            return resolve(data);
        });
    });
}

function getAwsUpdateMethod(keyIdParam){
    return async function(action, settings){
        const keyId = (action.params[keyIdParam] || "").trim();
        const userName = (action.params.userName || "").trim();
        const status = action.params.status;

        if (!keyId || !userName || !status){
            throw "Not given one of required fields";
        }

        const params = {
            AccessKeyId: keyId, 
            UserName: userName,
            Status: status
        };
        const client = getClient(action, settings);
        return runAwsMethod(client.updateAccessKey, params);
    }
}

module.exports = {
    deleteAccessKey,
    updateAccessKey,
    updateSSHPublicKey,
    deleteUser,
    // autocomplete
    listRegions
};