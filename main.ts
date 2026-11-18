// make.fun · news-image-20261118 · v2
// Salin gambar entry (entry.png di samping file ini) ke <MAKEFUN_OUTPUT_DIR>/entry.png
// byte-for-byte, setelah memvalidasi format (JPEG/PNG) dan batas ukuran 1 MiB.
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_BYTES: number = 1_048_576; // 1 MiB, batas berkas lomba

const here: string = dirname(fileURLToPath(import.meta.url));
const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source: string = join(here, 'entry.png');
const target: string = join(outDir, 'entry.png');

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

if (!existsSync(source)) {
  fail(`source image not found: ${source}`);
}

const size: number = statSync(source).size;
if (size > MAX_BYTES) {
  fail(`${source} is ${size} bytes, over the ${MAX_BYTES}-byte limit`);
}
if (size < 4) {
  fail(`${source} is only ${size} bytes, not a valid image`);
}

const bytes: Buffer = readFileSync(source);

const isJpeg: boolean =
  bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
const isPng: boolean =
  bytes[0] === 0x89 &&
  bytes[1] === 0x50 &&
  bytes[2] === 0x4e &&
  bytes[3] === 0x47;

if (!isJpeg && !isPng) {
  const head: string = bytes.subarray(0, 4).toString('hex');
  fail(
    `${source} is neither JPEG (ffd8ff) nor PNG (89504e47); magic bytes: ${head}`,
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(target, bytes);

console.log(
  `${target}: ${bytes.byteLength} bytes (${isJpeg ? 'jpeg' : 'png'} source)`,
);
