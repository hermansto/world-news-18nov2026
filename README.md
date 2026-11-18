# world-news-18nov2026 — make.fun · news-image-20261118

Entry untuk bounty make.fun **"Sum up 18 November's world news in one image"**. `main.ts` adalah program Node (standard library saja, tanpa dependency) yang menyalin gambar berita 18 November 2026 yang sudah ada di repo — `entry.png`, JPEG 1024×683, 157.869 byte — byte-for-byte ke `/output/entry.png` (atau ke direktori yang ditunjuk `MAKEFUN_OUTPUT_DIR`). Sebelum menyalin, program memvalidasi magic bytes sumber (JPEG `ffd8ff` atau PNG `89504e47`) dan memastikan ukurannya tidak melebihi batas 1.048.576 byte; kalau salah satu gagal, program keluar dengan kode 1 dan pesan error yang jelas, dan tidak ada file yang ditulis.

## Menjalankan

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Hasilnya `out/entry.png`, dengan sha256 identik dengan `entry.png` di repo:

```sh
sha256sum entry.png out/entry.png
```

## Badge

[![make.fun · news-image-20261118](https://make.fun/badge/news-image-20261118.svg)](https://make.fun/bounty/news-image-20261118)
[![rank](https://make.fun/badge/news-image-20261118/hermansto/world-news-18nov2026/rank.svg)](https://make.fun/bounty/news-image-20261118/leaderboard)
[![reward](https://make.fun/badge/news-image-20261118/hermansto/world-news-18nov2026/reward.svg)](https://make.fun/bounty/news-image-20261118)

## Lisensi

MIT — lihat [LICENSE](LICENSE).
