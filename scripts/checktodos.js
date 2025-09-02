import { existsSync, readFileSync } from 'fs';

let hasTodo = false;
const files = process.argv.slice(2);

files.forEach((file) => {
  if (!existsSync(file)) return;
  const content = readFileSync(file, 'utf8');
  if (/\/\/ *to-?do/i.test(content)) {
    console.error(`❌ TODO found in ${file}`);
    hasTodo = true;
  }
});

if (hasTodo) process.exit(1);
