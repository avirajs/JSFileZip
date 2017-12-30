const buildHeap = require('./min-heap.js');
var assert = require('assert');
var fs = require('fs');

//get raw string
try {
    var data = fs.readFileSync('uncompressed.txt', 'utf8');
} catch(e) {
    console.log('Error:', e.stack);
}

//go thorugh all text character by character
//maintain freq in dictionary
chardict={}
for (var i = 0, len = data.length; i < len; i++) {
    if(!(data[i] in chardict))
        chardict[data[i]]=1;
    else
        chardict[data[i]]+=1
}

//change each dictionary to array of nodes
charnodes=[]
for(var key in chardict){
    let node = {

        character: key,
        frequency:chardict[key]

    }
    charnodes.push(node)
}

//check if heap using assert library
function checkminheap(arr,root)
{
    if(root>=arr.length/2)
        return 1;
    assert.equal(arr[root].frequency>arr[2*root].frequency || arr[root].frequency>arr[2*root+1].frequency,0)
    //check root is the smallest element
    checkminheap(arr,2*root)//check leftsubtree
    checkminheap(arr,2*root+1)//check rightsubtree

    return 1;
}

buildHeap(charnodes);
checkminheap(charnodes,1);
console.log(chardict)
module.exports = charnodes;

