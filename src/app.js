const aws = require("aws-sdk");


async function deleteAccessKey(action,settings) {
    const accessKeyId = (action.params.ACCESS_KEY_ID || "").trim();
    const userName = (action.params.USER_NAME || "").trim();

    if (!accessKeyId || !userName){
        throw "Not given one of required fields";
    }

    const params = {
        UserName: userName,
        AccessKeyId: accessKeyId
    };

    const client = getClient(action, settings);
    return new Promise((resolve, reject) => {
        client.deleteAccessKey(params, getAwsCallback(resolve, reject));
    });
}

async function deleteUser(action,settings) {
    const params = getUsernameParam(action.params);
    const client = getClient(action, settings);
    return new Promise((resolve, reject) => {
        client.deleteUser(params, getAwsCallback(resolve, reject));
    });
}

async function updateAccessKey(action, settings){
    const params = getAwsUpdateParams(action.params, "accessKeyId", "AccessKeyId");
    const client = getClient(action, settings);
    return new Promise((resolve, reject) => {
        client.updateAccessKey(params, getAwsCallback(resolve, reject));
    });
}

async function updateSSHPublicKey(action, settings){
    const params = getAwsUpdateParams(action.params, "sshId", "SSHPublicKeyId");
    const client = getClient(action, settings);
    return new Promise((resolve, reject) => {
        client.updateSSHPublicKey(params, getAwsCallback(resolve, reject));
    });
}

async function listAccessKeys(action,settings) {
    const params = getUsernameParam(action.params);
    const client = getClient(action, settings);
    return new Promise((resolve, reject) => {
        client.listAccessKeys(params, getAwsCallback(resolve, reject));
    });
}

// Helpers

function getClient(action, settings){
    const options = {
        "accessKeyId": action.params.AWS_ACCESS_KEY_ID || settings.AWS_ACCESS_KEY_ID,
        "secretAccessKey": action.params.AWS_SECRET_ACCESS_KEY || settings.AWS_SECRET_ACCESS_KEY 
    }
    return new aws.IAM(options);
}

function getAwsCallback(resolve, reject){
    return (error, data) => {
        if (error) return reject(error);
        return resolve(data);
    }
}

function getAwsUpdateParams(params, keyIdParam, paramName){
    const keyId = (params[keyIdParam] || "").trim();

    if (!keyId || !params.status){
        throw "Not given one of required fields";
    }

    let awsParams = getUsernameParam(params);
    awsParams.Status = params.status;
    awsParams[paramName] = keyId;
    return awsParams;
}

function getUsernameParam(params){
    const userName = (params.userName || "").trim();

    if (!userName){
        throw "Not given username";
    }
    return { UserName: userName };
}

module.exports = {
    deleteAccessKey,
    deleteUser,
    updateAccessKey,
    updateSSHPublicKey,
    listAccessKeys
};