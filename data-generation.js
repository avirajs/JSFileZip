var Chance = require('chance');
var chance = new Chance();


'use strict';
const fs = require('fs');


var data=''

//sentences with punctuation
for (let i = 0; i < 30000/5; i++)
    data+=chance.sentence({words: 5});

// data=chance.string({length: 180000, pool: 'abcdef'});
// let data = JSON.stringify(flights,null,2);
fs.writeFileSync('./uncompressed.txt', data);