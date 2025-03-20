const jwt = require('jsonwebtoken');
const { BlacklistTokenModel } = require('../models/blacklist.model');
const { UserModel } = require('../models/user.model');

module.exports.authUser = async (req, res, next) => {
    const token =
        req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
        return res.status(401).json({ msg: "Unauthorized access1" });
    }
    try {
        const blacklistToken = await BlacklistTokenModel.findOne({ token });
        if (blacklistToken) {
            return res.status(401).json({ msg: "Unauthorized access2" });
        }


        const decoded = jwt.verify(token, "iloveme");
        const user = await UserModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ msg: "Unauthorized access3" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized access4" });
    }
};