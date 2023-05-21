function replacecodelist(data){
    console.log("length:"+data.length);
    for (var i = 0; i < data.length; i++) {
        data[i] = replacecode(data[i]);
    }
    return data;
}

function replacecode(data){
    console.log("data:"+data);
    if(data.b1code < 10){
        data.b1code = '0'+data.b1code;
    }
    console.log( data.b1code );
    if(data.b2code < 10){
        data.b2code = '0'+data.b2code;
    }

    if(data.b3code < 10){
        data.b3code = '0'+data.b3code;
    }

    if(data.b4code < 10){
        data.b4code = '0'+data.b4code;
    }

    if(data.b5code < 10){
        data.b5code = '0'+data.b5code;
    }

    if(data.b6code < 10){
        data.b6code = '0'+data.b6code;
    }

    if(data.b7code < 10){
        data.b7code = '0'+data.b7code;
    }
    return data;
}