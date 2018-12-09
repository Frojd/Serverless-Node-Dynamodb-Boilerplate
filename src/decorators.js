const AWS = require("aws-sdk");

const withOfflineSupport = handler => {
    return async (event, ...params) => {
        if (event.isOffline) {
            AWS.config.update({
                endpoint: "http://localhost:7955",
                accessKeyId: "AKID",
                secretAccessKey: "SECRET",
                region: "us-west-2",
                apiVersion: "2012-08-10"
            });
        }

        return await handler(event, ...params);
    };
};

const requireOffline = handler => {
    return async (event, ...params) => {
        if (!event.isOffline) {
            return { statusCode: 401 };
        }

        return await handler(event, ...params);
    };
};

module.exports = {
    withOfflineSupport,
    requireOffline
};
