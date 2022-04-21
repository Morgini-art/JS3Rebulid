//TODO: Chwilowa nazwa pliku!!!
function interpeter(text) {
    let startArguments;
    let endArguments;
    let results;
    let commas = [];

    let arguments = [];

    for (let i = 0; i < text.length; i++) {
        if (text[i] === '{') {
            startArguments = i;
        } else if (text[i] === '}') {
            endArguments = i;
        }
        results = text.substring(startArguments+1, endArguments);
    }
    
    arguments = results.split(',');

    return arguments;
}

export {interpeter};

/*let test01 = 'CreateBullet{speed:5,distance:50,dmg:12}';
test01 = interpeter(test01);



console.log(test01);

if (test01[1] >= 'distance:'+50) {
    console.log('Daleko');
} else {
    console.log('Niedaleko');
}*/