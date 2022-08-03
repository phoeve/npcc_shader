
let table = [
      {34: '---'},
      {31: '25.'},
      {51: '22.'},
      {30: '21.'},
      {50: '19.'},
      {49: '17.'},
      {29: '16.'},
      {28: '15.'},
      {48: '13.'},
      {27: '12.'},
      {26: '11.'},
      {25: '10.'},
      {47: '9.5'},
      {24: '8.7'},
      {23: '8.0'},
      {22: '7.3'},
      {46: '6.7'},
      {21: '6.2'},
      {20: '5.6'},
      {19: '5.2'},
      {45: '4.8'},
      {18: '4.4'},
      {17: '4.0'},
      {16: '3.7'},
      {44: '3.4'},
      {15: '3.1'},
      {14: '2.8'},
      {13: '2.6'},
      {43: '2.4'},
      {12: '2.2'},
      {11: '2.0'},
      {9:  '1.8'},
      {8:  '1.7'},
      {6:  '1.5'},
      {5:  '1.4'} ];

function MapIris2Fstop(value){
    for (i=0;i<table.length;i++)
        if (value == Object.keys(table[i]))
            return table[i][value];

    return ('undef');
}

function MapIris2FstopPosition(value){
    for (i=0;i<table.length;i++)
        if (value == Object.keys(table[i]))
            return parseInt((i+1)/(table.length +1) *1000);
}

console.dir(table);


console.log(table.length);
console.log(table[0]);
console.log(table[34]);
console.log(table[34/2]);

console.log(table[34/2][Object.keys(table[34/2])]);



numElements = table.length;   // 0 - table.length-1

console.log('=========================');
console.log(MapIris2Fstop(5));
console.log(MapIris2FstopPosition(5));

console.log(MapIris2Fstop(51));
console.log(MapIris2FstopPosition(51));

console.log(MapIris2Fstop(34));
console.log(MapIris2FstopPosition(34));

console.log(MapIris2Fstop(21));
console.log(MapIris2FstopPosition(21));

console.log(MapIris2Fstop(28));
console.log(MapIris2FstopPosition(28));
