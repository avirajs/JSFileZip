var arrayLength;

function buildHeap(input) {
    arrayLength = input.length;

    for (var i = Math.floor(arrayLength / 2); i >= 0; i -= 1) {
        heapify(input, i);
    }
}

function heapify(input, i) {
    var left = 2 * i + input.length%2;
    var right = 2 * i + 1+ input.length%2;

    var smallest = i;
    if (right < arrayLength && input[left].frequency <=input[smallest].frequency) {
        smallest = left;
    }

    if (left < arrayLength && input[right].frequency <= input[smallest].frequency) {
        smallest = right;
    }

    if (smallest != i) {
        swap(input, i, smallest);
        heapify(input, smallest);
    }
}

function swap(input, index_A, index_B) {
    var temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
}

module.exports = buildHeap;