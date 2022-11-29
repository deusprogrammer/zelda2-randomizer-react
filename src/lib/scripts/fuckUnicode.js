let fucker = {};
for(var code = 32; code < 127; code++)
{
    var chr = String.fromCharCode(code);

    fucker[code] = chr;
}

console.log(JSON.stringify(fucker, null, 5));