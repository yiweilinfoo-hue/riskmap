const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

// The issue is we have \n inside backticks which JS turns into newlines.
// Oh wait, my python script put literally a backslash and 'n', but JS template literals resolve \n to a newline.
// Actually, no. Python's `\\n` gives a backslash and an 'n' in the text file. JS template literals resolve `\n` to a newline.
// Wait, if it's a backslash and 'n' in the text file, does JS template literal resolve `\n` to newline? YES.
// To make it literal `\n` in JS, it must be `\\n` in the text file.

const parts = content.split('const rawData = `');
let raw = parts[1].split('`;')[0];

// Wait, I can just use python again to fix it.
