"use strict";

const AWS = require("aws-sdk");
const uuidv4 = require("uuid/v4");
const { getSettings } = require("../settings.js");
const { withOfflineSupport } = require("../decorators.js");

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
};


const createEmployee = async (event, context) => {
    const { email, company, ...extraValues } = JSON.parse(event.body);

    if (!email || !company) {
        return buildErrorResponse({
            message: "Missing either email or company",
            code: "MissingArguments"
        });
    }

    const model = {
        ...extraValues,
        guid: uuidv4(),
        email,
        company,
        created: new Date().getTime()
    };
    try {
        await putDoc({ TableName: getSettings().TABLE_NAME }, model).promise();
        return {
            statusCode: 201,
            headers: CORS_HEADERS,
            body: JSON.stringify(model)
        };
    } catch (err) {
        return buildErrorResponse(err);
    }
};

const buildErrorResponse = err => {
    return {
        statusCode: err.statusCode,
        headers: CORS_HEADERS,
        body: JSON.stringify({
            message: err.message,
            code: err.code
        })
    };
};

const putDoc = (config, item) => {
    let docClient = new AWS.DynamoDB.DocumentClient();
    const model = { ...config, Item: item };
    return docClient.put(model);
};

const getEmployee = async (event, context) => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    let params = {
        TableName: getSettings().TABLE_NAME
    };

    try {
        const data = await docClient.scan(params).promise();
        let items = data.Items;

        return {
            statusCode: 200,
            body: JSON.stringify(items)
        };
    } catch (err) {
        return buildErrorResponse(err);
    }
};

module.exports = {
    createEmployee: withOfflineSupport(createEmployee),
    getEmployee: withOfflineSupport(getEmployee),
};
