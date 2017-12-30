//run data generator to get data
//run the text processr to get minheap
const minheap = require('./text-processor.js');
var fs = require('fs');

//use the algorithm in class to create tree from minheap
function huffmanTree(C) {
    n = C.length
    heap = C
    for (let i = 1; i < n; i+=1) {
        l=heap.shift()
        r=heap.shift()
        let z = {
            left: l,
            right: r,
            frequency: l.frequency + r.frequency
        }
        C.push(z);
    }
    return heap.pop()
}

//tranverse the tree to add table translation values
//going through storing all the characters in stack with their codes
encodingtable={}
stack=[]
function findCodes (currenthead) {
    if(currenthead!=null) {
        //if containsts character print it and add stack
        if("character" in currenthead) {
            console.log("character: " + currenthead.character + " frequency: " + currenthead.frequency)
            encodingtable[currenthead.character]=stack.join("")
        }
        stack.push(0)
        findCodes(currenthead.left)
        stack.pop()
        stack.push(1)
        findCodes(currenthead.right)
        stack.pop()
    }

}

//gets the tree and then codes from the tree
tree=huffmanTree(minheap)
findCodes(tree)

//encode data, character by character using the encoding table
var data = fs.readFileSync('uncompressed.txt', 'utf8');
var encoded='';
for (var i = 0, len = data.length; i < len; i++) {
    encoded+=encodingtable[data[i]]
}
let strhd = JSON.stringify([tree],null,2);
fs.writeFileSync('./huffmantree.json', strhd);

//pass tree to decoder for later
fs.writeFileSync('./encoded.txt', encoded);

