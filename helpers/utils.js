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

async function verificarUsuario(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log("token", decoded)
        const user = await userModel.buscarID(decoded.id);
        const admin = await AdminModel.buscarID(decoded.id);
    
        if (!user && !admin) {
          throw new Error();
        }
    
        if (!admin && user._id.toString() !== req.params.id) {
          return res.status(403).send({ error: 'Acesso negado.' });
        }
    
        req.token = token;
        req.user = user || admin;
        next();
      } catch (e) {
        res.status(401).send({ error: 'Por favor, autentique.' });
      }
}

module.exports = {isAdmin: isAdmin}