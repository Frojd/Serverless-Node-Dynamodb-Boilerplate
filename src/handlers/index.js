const { createEmployee, getEmployee } = require('./employee');
const { createDB } = require('./createDB');
const { getAppVersion } = require('./getAppVersion');

module.exports = {
    createEmployee,
    getEmployee,
    createDB,
    getAppVersion,
};
