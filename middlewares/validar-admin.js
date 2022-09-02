const { response } = require('express');
const {validationResult}= require('express-validator');

const validarAdminC = (req, res = response, next) => {
    const tipo = req.tipo;
    if(tipo!='adminC'){
        return res.status(400).json({
            ok: false,
            msg: "No tiene los permisos para relizar esta acción",
        })
    }
    next();
}

const validarAdminL = (req, res = response, next) => {
    const tipo = req.tipo;
    if(tipo!='adminL'){
        return res.status(400).json({
            ok: false,
            msg: "No tiene los permisos para relizar esta acción",
        })
    }
    next();
}

const validarAdmin = (req, res = response, next) => {
    const tipo = req.tipo;
    console.log(tipo);
    if(tipo!='adminL' && tipo!="adminC"){
        return res.status(400).json({
            ok: false,
            msg: "No tiene los permisos para relizar esta acción",
        })
    }
    next();
}

module.exports= {
    validarAdmin,
    validarAdminL,
    validarAdminC,
}