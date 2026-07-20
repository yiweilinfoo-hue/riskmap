const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf-8');

const startIndex = code.indexOf('const rawData = `') + 17;
const endIndex = code.indexOf('`;\nexport const riskData');
let rawData = code.substring(startIndex, endIndex);

let lines = rawData.split('\n');

let inServiceExceptions = 0;
let stageCounts = {};

for (let i = 0; i < lines.length; i++) {
  let cols = lines[i].split('\t');
  if (cols.length < 14) continue;
  
  let stage = cols[2];
  let isOnline = cols[7] === '是';
  
  if (stage === '在职' && isOnline) {
    if (inServiceExceptions < 10) {
      cols[13] = `⚠️异常数据${inServiceExceptions + 1}`;
      inServiceExceptions++;
    } else {
      cols[13] = '-';
    }
  } else if (isOnline) {
    if (!stageCounts[stage]) stageCounts[stage] = 0;
    if (stageCounts[stage] < 2) {
      cols[13] = `⚠️风险项提示`;
      stageCounts[stage]++;
    } else {
      cols[13] = '-';
    }
  }
  
  lines[i] = cols.join('\t');
}

rawData = lines.join('\n');
code = code.substring(0, startIndex) + rawData + code.substring(endIndex);

fs.writeFileSync('src/data.ts', code);
console.log("Success inService: " + inServiceExceptions);
