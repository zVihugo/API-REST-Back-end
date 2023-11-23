const { ADDRCONFIG } = require('dns');
const mongoose = require('mongoose');

const AdminModel = mongoose.model('User', {
    nome: String,
    email: String,
    senha: String
});

module.exports = {
    save: async (nome, email, senha) => {

        const admin = new AdminModel({
            nome: nome,
            email: email,
            senha: senha
        });

        await admin.save();

        return admin;
    },
    getById: async (id) => {
        return await AdminModel.findById(id).leand()
    },
    list: async () => {
        const admins = await AdminModel.find({}).lean();

        return admins;
    },
    update: async (id, admin) => {
        const newAdmin = await AdminModel.findById(id);

        if(!newAdmin) {
            return false;
        }

        Object.keys(admin).forEach(key => 
            newAdmin[key] = admin[key]);
        
        await newAdmin.save();

        return newAdmin;
    },
    delete: async (id) => {
        return await AdminModel.findByIdAndUpdate(id).lean();
    }
};