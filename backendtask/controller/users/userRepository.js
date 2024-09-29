const { insertService, userLoginService } = require("./userServices");

exports.insertRepository = async (req) => {
    try {
        const result =await insertService(req);
        return result;
    } catch (error) {
        return error;
    }
}
exports.userLoginRepository= async (req) => {
    try {
        const result = await userLoginService(req);
        return result;
    } catch (error) {
        return error;
    }
}