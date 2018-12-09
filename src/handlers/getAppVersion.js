const getAppVersion = async (event, context) => {
    const packageInfo = require("../package.json");

    return {
        statusCode: 200,
        body: JSON.stringify({
            version: packageInfo.version
        })
    };
};

module.exports = {
    getAppVersion,
}
