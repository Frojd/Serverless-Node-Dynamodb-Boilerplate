const AWS = require("aws-sdk");
const { withOfflineSupport, requireOffline } = require("../decorators.js");
const { getSettings } = require("../settings.js");

const createLocalDb = async (event, context) => {
    var dynamodb = new AWS.DynamoDB();
    var params = {
        TableName: getSettings().TABLE_NAME,
        KeySchema: [
            {
                AttributeName: "email",
                KeyType: "HASH"
            },
            {
                AttributeName: "company",
                KeyType: "RANGE"
            }
        ],
        AttributeDefinitions: [
            { AttributeName: "email", AttributeType: "S" },
            { AttributeName: "company", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    try {
        const data = await dynamodb.createTable(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: [
                    "Created table. Table description JSON:",
                    JSON.stringify(data, null, 2)
                ]
            })
        };
    } catch (err) {
        return {
            statusCode: err.statusCode,
            body: JSON.stringify({
                message: err.message,
                code: err.code
            })
        };
    }
};

module.exports = {
    createLocalDb: requireOffline(withOfflineSupport(createLocalDb)),
}
