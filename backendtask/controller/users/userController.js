const { insertRepository, userLoginRepository } = require("./userRepository")

exports.insertConnectionController = async (req, res) => {
    try {
        const result = await insertRepository(req);
        if (result.status == true) {
            res.status(200).json(result);
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
} 

exports.userLoginController = async (req,res)=>{
    try {
        const result = await userLoginRepository(req);
        console.log(result);
        
        if (result.status == true) {
            res.status(200).json(result);
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ error: error }) 
    }
}