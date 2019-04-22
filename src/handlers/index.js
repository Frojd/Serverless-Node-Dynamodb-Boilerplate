const { createEmployee, getEmployee } = require('./employee');
const { createLocalDb } = require('./createLocalDb');
const { getAppVersion } = require('./getAppVersion');

module.exports = {
    createEmployee,
    getEmployee,
    createLocalDb,
    getAppVersion,
};
