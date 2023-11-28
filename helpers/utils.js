const AdminModel = require("../model/Admin");
const userModel = require("../model/Usuarios");
const jwt = require("jsonwebtoken");

async function isAdmin(token) {
    console.log(token)
    const tokenN = await token?.replace('Bearer ', '');
    const decoded = jwt.verify(tokenN, process.env.SECRET);
    const user = await userModel.buscarID(decoded._id);
    const admin = await AdminModel.buscarID(decoded._id);

    if (!user) {
        return {admin: false, userId: user._id};
    }

    if (!admin) {
        return {admin:true, userId: admin._id};
    }

    return null;
}

module.exports = {isAdmin: isAdmin}