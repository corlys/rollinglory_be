○ Jelaskan alasan mengapa memilih menggunakan NestJs version 10 or above
○ Jelaskan mengenai arsitektur aplikasi yang sudah dibuat
○ Jelaskan alasan mengapa memilih MySQL atau PostgreSQL
○ ~~jelaskan DB optimization yang dilakukan (jika dilakukan)~~
○ ~~Jelaskan alasan mengapa memilih layanan cloud computing platform (jika dilakukan)~~

## Alasan menggunakan NestJS 10

Pada soal test spec nya diperintahkan untuk menggunakan nestjs 10 keatas. Selain itu nestjs versi 10 adalah
versi yang paling familiar untuk saya, karena saya mulai menyentuh nestjs ketika versi 10.2.1.

## Arsitektur aplikasi

Dikarenakan menggunakan NestJS, arstektur yang digunakan adalah arsitektur yang modular dimana modul akan diimport dan
di export jika ada dibutuhkan di suatu modul lainnya. Setelah itu ada juga arsitektur repositori dikarenaan penggunaan ORM
seperti Drizzle. Arsitektur repository adalah dimana entitas dari skema database mempunyai fungsi - fungsi tertentu yang
dapat dipanggil pada servis ketika sedang menjalankan logika bisnis. Fungsi - fungsi ini umumnya berikaitan dengan CRUD
dari satu entitas tersebut, ex: findAll, findOne, create, update, delete, etc.

## Alasan Mengapa memilih PostgresQL

Alasan utama memilih postgres dibandingkan mysql adalah saya lebih lebih familiar dengan postgresql. Selain itu menurut saya
jika dilihat dari perkembangan di internet, postgres mulai lebih banyak resource pembelajaran terbaru nya dibandingkan mysql.
