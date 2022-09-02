const isEmptyArray= ( value, { req, location, path} )=>{
    if(!value){
        return false;
    }

    if(!value.length){
        return false;
    }
    else{
        return true;
    }
}

module.exports={
    isEmptyArray,
}