# Panduan Penggunaan Febristore (Khusus Admin)

Selamat datang di sistem manajemen **Febristore**! Dokumen ini dibuat khusus untuk Anda (Admin/Pemilik Toko) agar dapat mengelola pesanan top-up dan joki dengan mudah dan efisien.

---

## 1. Cara Login sebagai Admin

Agar Anda dapat melihat dan mengubah status pesanan pelanggan, Anda harus masuk (login) menggunakan akun khusus Admin.

1. Buka website Febristore.
2. Klik tombol **Masuk** di pojok kanan atas layar.
3. Masukkan **Email** dan **Password** admin yang telah diberikan oleh tim developer Anda.
4. Setelah berhasil login, menu di atas akan berubah dan menampilkan menu khusus **Admin**.

*(Catatan: Hanya akun dengan hak akses admin yang bisa melihat menu ini)*

---

## 2. Dashboard Admin & Manajemen Pesanan

Setelah Anda login sebagai Admin, klik menu **Admin** di navigasi atas. Di halaman ini, Anda akan melihat semua pesanan yang masuk dari pelanggan.

### Membaca Tabel Pesanan
Di halaman Admin, Anda akan melihat tabel berisi informasi:
*   **Order ID**: Nomor unik pesanan pelanggan.
*   **Waktu**: Kapan pesanan tersebut dibuat.
*   **Game**: Game apa yang di-topup (Mobile Legends, Free Fire, dll).
*   **User ID / Server**: Data ID akun game pelanggan.
*   **Item**: Nominal/Jenis barang yang dibeli (misal: 86 Diamonds).
*   **WhatsApp**: Nomor WA pelanggan yang bisa dihubungi.
*   **Status**: Status pesanan saat ini (`PENDING`, `PROCESSING`, `COMPLETED`, `CANCELLED`).

### Mengubah Status Pesanan
Saat ada pesanan baru, statusnya otomatis akan menjadi **PENDING**. Anda bisa mengubah statusnya dengan mengklik tombol status di kolom paling kanan.

*   🟡 **PENDING (Menunggu)**: Pelanggan baru saja membuat pesanan. Admin sedang mengecek apakah transfer dana (QRIS/Dana/Gopay) sudah masuk.
*   🔵 **PROCESSING (Diproses)**: Admin sudah menerima pembayaran dan saat ini sedang memproses top-up / joki ke akun pelanggan.
*   🟢 **COMPLETED (Selesai)**: Top-up / joki sudah sukses masuk ke akun pelanggan.
*   🔴 **CANCELLED (Dibatalkan)**: Pesanan dibatalkan (misal: uang tidak masuk, ID game salah, dsb).

---

## 3. Memahami Alur Pelanggan (Penting!)

Agar Anda tidak bingung saat melayani, berikut adalah alur yang dilalui oleh pelanggan Anda di website:

1.  **Memilih Game & Nominal**: Pelanggan memilih game dan nominal diamond/item.
2.  **Mengisi ID**: Pelanggan memasukkan ID Game & Server mereka.
3.  **Pilih Pembayaran**: Pelanggan memilih metode bayar (QRIS, Dana, dll). Saat pelanggan mengklik metode bayar, akan muncul **jendela petunjuk cara bayar** (termasuk nomor rekening/QR dan tombol salin).
4.  **Konfirmasi & Bayar**: Pelanggan mentransfer uang melalui aplikasi m-banking/e-wallet mereka sesuai instruksi.
5.  **Klik "Saya Sudah Bayar"**: Setelah transfer, pelanggan mengklik tombol konfirmasi. 
6.  **Otomatis Chat ke WA Admin**: Website akan langsung mengarahkan pelanggan ke WhatsApp Admin dengan format chat otomatis yang berisi detail pesanan. Bersamaan dengan itu, data pesanan juga **otomatis masuk ke halaman Admin Anda**.

**Tips**: 
Selalu cocokkan pesan WhatsApp dari pelanggan dengan data pesanan di halaman Admin. Pastikan bukti transfer yang dikirim di WA valid sebelum Anda memproses pesanan (mengubah status ke PROCESSING/COMPLETED).

---

## 4. Tombol Bantuan (Chat CS)

Di pojok kanan bawah layar pelanggan, selalu ada tombol mengambang **"CHAT CS"**. Jika pelanggan bingung, mereka bisa mengklik tombol ini.
*   Tombol ini berisi link cepat untuk menghubungi WhatsApp CS utama, maupun CS khusus Joki sesuai jam kerja (Pagi, Siang, Malam).
*   Fitur Instagram dan Youtube saat ini ditandai "Coming Soon" (Segera Hadir) dan tidak akan memicu error jika diklik.

---

## 5. Pesan Untuk Admin
*   Selalu jaga kerahasiaan password Admin Anda.
*   Jika Anda butuh bantuan teknis atau ada error sistem, segera hubungi developer Anda (Fazry).
*   Website ini dibuat agar pelanggan merasa pesanan mereka profesional dan terpercaya. Respon yang cepat di WhatsApp akan sangat membantu menaikkan reputasi Febristore!

Semoga sukses dengan Febristore! 🚀
