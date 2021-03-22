# kaholo-plugin-amazon-iam
Kaholo integration with AWS IAM according to this [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IAM.html)

## Settings
1. Access Key ID (Vault) **Optional** - Access key ID of the default IAM user to do the actions with.
2. Secret Access Key (Vault) **Optional** - Secret access key of the default IAM user to do the actions with.

## Method: Delete Access Key
This method will remove access key from a specified user. [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IAM.html#deleteAccessKey-property)

### Parameters:
1. Auth Access Key ID (Vault) **Optional**
2. Secret Access Key (Vault) **Optional**
3. Region (Autocomplete) **Required**
4. Access Key ID (String) **Required** - The ID of the access key to delete.
5. User name (String) **Optional**  - The user name the access key to delete belongs to. If not specified the username will be determined implicitly based on the Auth access key ID.

## Method: Update Access Key
Changes the status of the specified access key from Active to Inactive, or vice versa. [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IAM.html#updateAccessKey-property)

### Parameters:
1. Auth Access Key ID (Vault) **Optional**
2. Secret Access Key (Vault) **Optional**
3. Region (Autocomplete) **Required**
4. Access Key ID (String) **Required** - The ID of the access key to update.
5. User name (String) **Optional**  - The user name the access key to update belongs to. If not specified the username will be determined implicitly based on the Auth access key ID.
6. Status(Active/Inactive) **Optional**  - The new status of the access key.

## Method: Update SSH Public Key
Sets the status of an IAM user's SSH public key to active or inactive. SSH public keys that are inactive cannot be used for authentication. This operation can be used to disable a user's SSH public key as part of a key rotation work flow. [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IAM.html#updateSSHPublicKey-property)

### Parameters:
1. Access Key ID (Vault) **Optional**
2. Secret Access Key (Vault) **Optional**
3. Region (Autocomplete) **Required**
4. SSH Public Key ID (String) **Required** - The ID of the SSH public key to update. 
5. User name (String) **Optional**  - The user name the access key to delete belongs to. If not specified the username will be determined implicitly based on the access key ID.
6. Status(Active/Inactive) **Optional**  - The new status of the SSH public key.

## Method: Delete User
Deletes the specified IAM user. Unlike the AWS Management Console, when you delete a user programmatically, you must delete the items attached to the user manually, or the deletion fails. [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IAM.html#deleteUser-property)

### Parameters:
1. Auth Access Key ID (Vault) **Optional**
2. Secret Access Key (Vault) **Optional**
3. Region (Autocomplete) **Required**
5. User name (String) **Required**  - The user name of the user to delete.