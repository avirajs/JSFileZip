const tree = require('./huffmantree.json')
var fs = require('fs');
var assert = require('assert');

currhead=tree[0]
var decoded=''
var encdata = fs.readFileSync('encoded.txt', 'utf8');

//read encoded digit by digit unitil finished
//follow the tree until the correct leaf is reached then add that to decompressed
for (var i = 0,len = encdata.length + 1; i < len; i++) {

    if(!("character" in currhead))
        if(encdata[i]=="0")
            currhead=currhead.left;
        else
            currhead=currhead.right;
    else {
        decoded += currhead.character;
        i=i-1
        currhead=tree[0];
    }

}

fs.writeFileSync('./decoded.txt', decoded);

//check if decoded correctly
//get raw strings
try {
    var uncompressedfile = fs.readFileSync('uncompressed.txt', 'utf8');
    var decodedfile = fs.readFileSync('decoded.txt', 'utf8');
    assert.equal(uncompressedfile,decodedfile)

} catch(e) {
    console.log('Error:', e.stack);
}