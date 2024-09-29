const connection = require('../../dataBase/config')
const { insertUserValidation, userLoginValidation } = require('./userValidation')
const connectionPromise = connection.promise();
const bcrypt = require("bcryptjs");

//insert user details in user table.
exports.insertService = async (req) => {
    try {
        //check data type and validate data
        const { error } = insertUserValidation.validate(req.body);
        if (error) {
            return { status: false, error: error.message }
        } else {
            const { rolId, firstName, lastName, email, password } = req.body;
            //check that email is already exist or not.
            const query1 = `SELECT email FROM user WHERE email=?`;
            const [result] = await connectionPromise.query(query1, [email]);
            if (result.length != 0) {
                return { status: false, error: "Email already exists!" }
            } else {
                //bcrypt password
                const hashedPassword = await bcrypt.hash(password, 10);
                //insert user data in user table.
                const query2 = 'INSERT INTO user (roleId, firstName, lastName, email, password) VALUES (?,?,?,?,?)'
                const values = [rolId, firstName, lastName, email, hashedPassword]
                const [result] = await connectionPromise.query(query2, values)
                return { status: true, result:"You are register successfully!" }
            }
        }
    } catch (error) {
        return error
    }
}

//verify usr from login
exports.userLoginService = async (req) => {
    try {
        //check data type and validate data
        const { error } = userLoginValidation.validate(req.body);
        if (error) {
            return { status: false, error: error.message }
        } else {
            const { email, password } = req.body;
            //find user data from user table
            const query1 = `SELECT email,password ,ur.role FROM user LEFT JOIN userrole as ur ON ur.id=user.roleId WHERE email=?`;
            const [result] = await connectionPromise.query(query1, [email]);
            if (result.length == 0) {
                return { status: false, error: "User not register" }
            } else {
                //compare password with store password.
                const isPasswordValid = await bcrypt.compare(password, result[0].password)
                //check the password is match or not
                if (isPasswordValid) {
                    //check user role is admin or not.
                    if (result[0].role == "admin") {
                        return { status: true, result: "Login successful!" };
                    } else {
                        return { status: false, error: "You are not allowed to login from here" };
                    }
                } else {
                    return {
                        status: false, error: "Invalid credentials."
                    };
                }
            }
        }
    } catch (error) {
        return error
    }
}