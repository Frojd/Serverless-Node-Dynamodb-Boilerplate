const AWS = require("aws-sdk");

const putDoc = (config, item) => {
    let docClient = new AWS.DynamoDB.DocumentClient();
    const model = { ...config, Item: item };
    return docClient.put(model);
};

const scan = (config, item) => {
    let docClient = new AWS.DynamoDB.DocumentClient();
    const model = { ...config, Item: item };
    return docClient.put(model);
};
