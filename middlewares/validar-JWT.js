const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next)=>{
    //X-TOKEN HEADERS

    const token = req.header('x-token');

    if(! token){
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición",
        })
    }

    try{
        const { uid, name, tipo } = jwt.verify(
            token, 
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;
        req.tipo= tipo;
    }
    catch(error){
        return res.status(401).json({
            ok: false,
            msg: "Token no válido",
        })
    }

    console.log(token);

    next();
}

module.exports={
    validarJWT,
}