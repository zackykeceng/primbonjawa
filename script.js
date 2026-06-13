/**
 * =================================================================
 * SISTEM PAKAR PRIMBON JAWA - ANALISIS KECOCOKAN JODOH
 * Metode Inferensi: Forward Chaining
 * Program Studi Pendidikan Teknologi Informasi
 * IKIP PGRI BOJONEGORO - 2026
 * =================================================================
 */

// ==================== BASIS PENGETAHUAN (KNOWLEDGE BASE) ====================

/**
 * Tabel Data Premis 1: Nilai Neptu Hari
 * Kode: G01-G07
 */
const neptuHari = { 
    'Minggu': 5,   // G01
    'Senin': 4,    // G02
    'Selasa': 3,   // G03
    'Rabu': 7,     // G04
    'Kamis': 8,    // G05
    'Jumat': 6,    // G06
    'Sabtu': 9     // G07
};

/**
 * Tabel Data Premis 2: Nilai Neptu Pasaran
 * Kode: G08-G12
 */
const neptuPasaran = { 
    'Legi': 5,     // G08
    'Pahing': 9,   // G09
    'Pon': 7,      // G10
    'Wage': 4,     // G11
    'Kliwon': 8    // G12
};

/**
 * Tabel Data Kesimpulan (Hasil Perhitungan Neptu)
 * Berdasarkan primbon standar dengan pembagi 10 (atau sisa bagi total neptu)
 * Kode: K01-K10
 */
const hasilRamalan = {
    1: { 
        nama: "Wasesa Segara",           // K01
        deskripsi: "👑 Berhati mulia, mudah mendapat kekayaan & wibawa. Kehidupan harmonis serta dihormati sekelilingnya.",
        skor: 95,
        solusi: "-"
    },
    2: { 
        nama: "Tunggak Semi",            // K02
        deskripsi: "✅ Rajin, ulet, rezeki selalu berlimpah. Pasangan yang tipe pekerja keras dan relatif mudah mencapai kesuksesan finansial.",
        skor: 85,
        solusi: "-"
    },
    3: { 
        nama: "Satriya Wibawa",          // K03
        deskripsi: "✨ Selalu mendapat kemuliaan, keluhuran, dan derajat kedudukan yang tinggi. Sangat cocok dalam memimpin mahligai keluarga.",
        skor: 90,
        solusi: "-"
    },
    4: { 
        nama: "Sumur Sinobo",            // K04
        deskripsi: "🏠 Rezeki berlimpah bagaikan sumur yang tak pernah kering. Hidup penuh kebajikan, bahagia, dan berkecukupan.",
        skor: 80,
        solusi: "-"
    },
    5: { 
        nama: "Satriya Wirang",          // K05
        deskripsi: "⚠️ Kerap kali mengalami kesusahan atau rintangan sosial. Disarankan memperbanyak sedekah & rajin memohon doa restu orang tua.",
        skor: 40,
        solusi: "Memperbanyak sedekah dan rajin berdoa memohon restu orang tua"
    },
    6: { 
        nama: "Bumi Kapetak",            // K06
        deskripsi: "🌍 Kekuatan mental bagaikan bumi, sangat sabar & tabah menghadapi dinamika serta prahara dalam berumah tangga.",
        skor: 75,
        solusi: "-"
    },
    7: { 
        nama: "Lebur Ketinggang",        // K07
        deskripsi: "⚠️ Berpotensi sering cekcok, usaha yang dirintis bersama rentan runtuh. Perlu komunikasi intensif dan saling mengalah.",
        skor: 30,
        solusi: "Meningkatkan komunikasi intensif dan saling mengalah"
    },
    8: { 
        nama: "Padu",                    // K08
        deskripsi: "🔥 Sering terjadi pertengkaran hebat, rawan memicu pisah ranjang. Harus ekstra hati-hati dalam meredam ego membina rumah tangga.",
        skor: 25,
        solusi: "Menghindari konflik dan belajar mengendalikan ego"
    },
    9: { 
        nama: "Pegat",                   // K09
        deskripsi: "💔 Tradisi mencatat makna PEGAT = perceraian atau perpisahan berat. Sangat tidak disarankan menurut perhitungan primbon.",
        skor: 10,
        solusi: "Disarankan untuk tidak melanjutkan ke jenjang pernikahan"
    },
    0: { 
        nama: "Langgeng Sempurna",       // K10 (sisa 0)
        deskripsi: "🏆 SEMPURNA! Tipe keharmonisan abadi, jalinan cinta diprediksi langgeng aman sentosa hingga maut memisahkan.",
        skor: 100,
        solusi: "-"
    }
};

// Data pendukung untuk konversi Masehi ke Weton
const hariList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const pasaranList = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];

// Variabel global untuk menyimpan hasil konversi weton terakhir
window.lastWetonResult = null;


// ==================== MESIN INFERENSI (INFERENCE ENGINE) ====================
// Metode: Forward Chaining (Pelacakan ke Depan)

/**
 * Fungsi: hitungTotalNeptu
 * Menjumlahkan neptu hari dan pasaran dari kedua pasangan
 * @param {string} hariPria - Hari lahir pria
 * @param {string} pasaranPria - Pasaran lahir pria
 * @param {string} hariWanita - Hari lahir wanita
 * @param {string} pasaranWanita - Pasaran lahir wanita
 * @returns {number} Total neptu
 */
function hitungTotalNeptu(hariPria, pasaranPria, hariWanita, pasaranWanita) {
    const neptuPria = neptuHari[hariPria] + neptuPasaran[pasaranPria];
    const neptuWanita = neptuHari[hariWanita] + neptuPasaran[pasaranWanita];
    return neptuPria + neptuWanita;
}

/**
 * Fungsi: hitungSisaBagi
 * Menghitung sisa bagi total neptu dengan aturan primbon:
 * - Jika total > 10, maka sisa = total % 10
 * - Jika total <= 10, maka sisa = total
 * @param {number} totalNeptu - Total neptu kedua pasangan
 * @returns {number} Sisa bagi (0-9)
 */
function hitungSisaBagi(totalNeptu) {
    return totalNeptu > 10 ? totalNeptu % 10 : totalNeptu;
}

/**
 * Fungsi: getKesimpulan
 * Mencocokkan sisa bagi dengan basis aturan (Rule Base)
 * Mengimplementasikan Forward Chaining: dari fakta (sisa) ke kesimpulan
 * @param {number} sisa - Sisa bagi total neptu
 * @returns {object} Objek hasil ramalan (nama, deskripsi, skor, solusi)
 */
function getKesimpulan(sisa) {
    // Rule Base: IF sisa = X THEN kesimpulan = Y
    // Forward Chaining: fakta sisa memicu rule yang sesuai
    if (hasilRamalan[sisa]) {
        return hasilRamalan[sisa];
    }
    // Default fallback
    return hasilRamalan[0];
}

/**
 * Fungsi: cekPantanganKhusus
 * Mengecek pantangan khusus berdasarkan primbon (total neptu 25 dari 10+15)
 * @param {number} neptuPria - Neptu pria
 * @param {number} neptuWanita - Neptu wanita
 * @returns {boolean} True jika termasuk pantangan
 */
function cekPantanganKhusus(neptuPria, neptuWanita) {
    const total = neptuPria + neptuWanita;
    return (total === 25 && neptuPria === 10 && neptuWanita === 15) ||
           (total === 25 && neptuPria === 15 && neptuWanita === 10);
}

/**
 * Fungsi: cekTotal25TapiAman
 * Mengecek apakah total neptu 25 tetapi bukan pantangan 10+15
 * @param {number} totalNeptu - Total neptu
 * @param {number} neptuPria - Neptu pria
 * @param {number} neptuWanita - Neptu wanita
 * @returns {boolean} True jika total 25 tapi aman
 */
function cekTotal25TapiAman(totalNeptu, neptuPria, neptuWanita) {
    return totalNeptu === 25 && neptuPria !== 10 && neptuWanita !== 10;
}


// ==================== FUNGSI KONVERSI MASEHI KE WETON ====================

/**
 * Fungsi: getWetonFromDate
 * Mengkonversi tanggal Masehi ke weton Jawa
 * @param {number} tanggal - Tanggal (1-31)
 * @param {number} bulan - Bulan (1-12)
 * @param {number} tahun - Tahun (1900-2100)
 * @returns {object} Objek berisi hari, pasaran, neptu, dan weton
 */
function getWetonFromDate(tanggal, bulan, tahun) {
    const targetDate = new Date(tahun, bulan - 1, tanggal);
    const baseDate = new Date(1900, 0, 1);
    const diffDays = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
    
    // Perhitungan hari dan pasaran berdasarkan selisih hari dari 1 Januari 1900
    // 1 Januari 1900 adalah hari Senin (index 1) dan pasaran Legi (index 0)
    const hariIndex = (1 + diffDays) % 7;
    const pasaranIndex = (1 + diffDays) % 5;
    
    const hari = hariList[hariIndex];
    const pasaran = pasaranList[pasaranIndex];
    const neptuTotal = neptuHari[hari] + neptuPasaran[pasaran];
    
    return { hari, pasaran, neptu: neptuTotal, weton: `${hari} ${pasaran}` };
}

/**
 * Fungsi: cariWeton
 * Handler untuk tombol konversi Masehi ke Weton
 */
function cariWeton() {
    const tgl = parseInt(document.getElementById('tgl').value);
    const bln = parseInt(document.getElementById('bln').value);
    const thn = parseInt(document.getElementById('thn').value);
    
    if (tgl < 1 || tgl > 31 || isNaN(tgl)) { 
        alert('Tanggal tidak valid!'); 
        return; 
    }
    
    const result = getWetonFromDate(tgl, bln, thn);
    
    // Update tampilan
    document.getElementById('weton-text').innerHTML = `📅 ${tgl}/${bln}/${thn}`;
    document.getElementById('weton-nama').innerHTML = result.weton;
    document.getElementById('neptu-hasil').innerHTML = result.neptu;
    document.getElementById('detail-hari').innerHTML = result.hari;
    document.getElementById('detail-pasaran').innerHTML = result.pasaran;
    
    window.lastWetonResult = result;
}

/**
 * Fungsi: transferKePria
 * Mentransfer hasil konversi weton ke form pria
 */
function transferKePria() {
    if (window.lastWetonResult) {
        document.getElementById('pria-hari').value = window.lastWetonResult.hari;
        document.getElementById('pria-pasaran').value = window.lastWetonResult.pasaran;
        hitungKecocokan(); // Langsung hitung ulang
    } else {
        alert('Hitung atau cari weton terlebih dahulu!');
    }
}

/**
 * Fungsi: transferKeWanita
 * Mentransfer hasil konversi weton ke form wanita
 */
function transferKeWanita() {
    if (window.lastWetonResult) {
        document.getElementById('wanita-hari').value = window.lastWetonResult.hari;
        document.getElementById('wanita-pasaran').value = window.lastWetonResult.pasaran;
        hitungKecocokan(); // Langsung hitung ulang
    } else {
        alert('Hitung atau cari weton terlebih dahulu!');
    }
}


// ==================== FUNGSI UTAMA DIAGNOSIS ====================

/**
 * Fungsi: hitungKecocokan
 * FUNGSI UTAMA - Melakukan diagnosis kecocokan jodoh
 * Alur Forward Chaining:
 * 1. Terima fakta (input hari & pasaran dari user)
 * 2. Hitung total neptu
 * 3. Hitung sisa bagi (aturan: jika total > 10 maka total % 10, else total)
 * 4. Cocokkan dengan Rule Base
 * 5. Tarik kesimpulan
 * 6. Tampilkan hasil diagnosis
 */
function hitungKecocokan() {
    // ===== TAHAP 1: AKUISISI FAKTA DARI USER =====
    const priaHari = document.getElementById('pria-hari').value;
    const priaPasaran = document.getElementById('pria-pasaran').value;
    const wanitaHari = document.getElementById('wanita-hari').value;
    const wanitaPasaran = document.getElementById('wanita-pasaran').value;
    
    // ===== TAHAP 2: HITUNG NEPTU MASING-MASING =====
    const neptuPria = neptuHari[priaHari] + neptuPasaran[priaPasaran];
    const neptuWanita = neptuHari[wanitaHari] + neptuPasaran[wanitaPasaran];
    
    // ===== TAHAP 3: HITUNG TOTAL NEPTU =====
    const totalNeptu = neptuPria + neptuWanita;
    
    // ===== TAHAP 4: HITUNG SISA BAGI =====
    const sisa = hitungSisaBagi(totalNeptu);
    
    // ===== TAHAP 5: COCOKKAN DENGAN RULE BASE (FORWARD CHAINING) =====
    const ramalan = getKesimpulan(sisa);
    
    // ===== TAHAP 6: CEK PANTANGAN KHUSUS =====
    const isPantangan = cekPantanganKhusus(neptuPria, neptuWanita);
    const isTotal25Aman = cekTotal25TapiAman(totalNeptu, neptuPria, neptuWanita);
    
    // ===== TAHAP 7: TAMPILKAN HASIL DIAGNOSIS =====
    tampilkanHasilDiagnosis({
        priaHari, priaPasaran, neptuPria,
        wanitaHari, wanitaPasaran, neptuWanita,
        totalNeptu, sisa, ramalan, isPantangan, isTotal25Aman
    });
}

/**
 * Fungsi: tampilkanHasilDiagnosis
 * Menampilkan hasil diagnosis ke antarmuka pengguna
 * @param {object} data - Data hasil perhitungan
 */
function tampilkanHasilDiagnosis(data) {
    const { priaHari, priaPasaran, neptuPria, wanitaHari, wanitaPasaran, neptuWanita, totalNeptu, sisa, ramalan, isPantangan, isTotal25Aman } = data;
    
    // Konfigurasi warna berdasarkan skor
    let warnaUtama = ramalan.skor >= 80 ? '#166534' : (ramalan.skor >= 60 ? '#d97706' : '#991b1b');
    let warnaBgJudul = ramalan.skor >= 80 ? '#f0fdf4' : (ramalan.skor >= 60 ? '#fef3c7' : '#fef2f2');
    
    if (isPantangan) {
        warnaUtama = '#b91c1c';
        warnaBgJudul = '#fef2f2';
    }
    
    // Banner pantangan khusus
    let warningHtml = '';
    if (isPantangan) {
        warningHtml = `
            <div class="warning-banner danger">
                <span class="warning-icon">🚫</span>
                <div class="warning-content">
                    <strong>⚠️ PANTANGAN UTAMA PRIMBON (NEPTU 10 + 15) ⚠️</strong><br>
                    Kombinasi total Neptu berjumlah ${totalNeptu} (${neptuPria} + ${neptuWanita}) terdeteksi sebagai LARANGAN MUTLAK.<br>
                    <strong style="text-decoration: underline;">Hukum Tradisi: Sangat tidak disarankan untuk melanjutkan jenjang pernikahan.</strong>
                </div>
            </div>
        `;
    } else if (isTotal25Aman) {
        warningHtml = `
            <div class="warning-banner success">
                <span class="warning-icon">✅</span>
                <div class="warning-content">
                    <strong>KOMBINASI AMAN (BUKAN PANTANGAN)</strong><br>
                    Total nilai neptu adalah 25, namun diperoleh dari paduan ${neptuPria} + ${neptuWanita} (Bukan komposisi 10+15). Pernikahan diperbolehkan.
                </div>
            </div>
        `;
    }
    
    // Tambahan solusi jika ada
    let deskripsiTambahan = ramalan.deskripsi;
    if (ramalan.solusi && ramalan.solusi !== "-") {
        deskripsiTambahan += `<br><br><strong>💡 Solusi yang disarankan:</strong> ${ramalan.solusi}`;
    }
    if (isPantangan) {
        deskripsiTambahan += `<br><br><strong style="color:#b91c1c;">✘ STATUS PANTANGAN AKTIF: PERNIKAHAN TIDAK DIANJURKAN.</strong>`;
    } else if (isTotal25Aman) {
        deskripsiTambahan += `<br><br><strong style="color:#166534;">✓ STATUS AMAN: KOMBINASI TIDAK TERMASUK LARANGAN.</strong>`;
    }
    
    // Generate HTML hasil
    const html = `
        <div class="hasil-card">
            <div class="hasil-weton-info">
                👨 ${priaHari} ${priaPasaran} (${neptuPria}) &nbsp;❤️&nbsp; 👩 ${wanitaHari} ${wanitaPasaran} (${neptuWanita})
                <div style="margin-top: 6px; font-size:0.85rem; color:var(--text-muted);">
                    Total Neptu: <strong>${totalNeptu}</strong> | 
                    Sisa Bagi: <strong>${sisa}</strong>
                </div>
            </div>
            
            <div class="ramalan-box">
                <div class="ramalan-judul" style="background: ${warnaBgJudul}; color: ${warnaUtama}; border: 1px solid ${warnaUtama}40;">
                    ${ramalan.nama}
                </div>
                <div class="ramalan-deskripsi">
                    ${deskripsiTambahan}
                </div>
            </div>

            <div class="skor-container">
                <p>🎯 Tingkat Kecocokan Berdasarkan Aturan (Forward Chaining)</p>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${ramalan.skor}%; background: ${warnaUtama};">
                        ${ramalan.skor}%
                    </div>
                </div>
            </div>
            ${warningHtml}
            
            <div class="keterangan-ilmiah" style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.75rem; color: var(--text-muted); text-align: center;">
                <em>Diagnosis menggunakan metode Forward Chaining | Berdasarkan primbon standar (pembagi 10 untuk total &gt; 10)</em>
            </div>
        </div>
    `;
    
    const hasilDiv = document.getElementById('hasil');
    hasilDiv.innerHTML = html;
    hasilDiv.classList.add('show');
    hasilDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


// ==================== INISIALISASI AWAL ====================

/**
 * Inisialisasi saat halaman load
 * Menampilkan contoh default (17 Agustus 1945)
 */
window.onload = function() {
    // Set default value (17 Agustus 1945 - Hari Kemerdekaan RI)
    document.getElementById('tgl').value = 17;
    document.getElementById('bln').value = 8;
    document.getElementById('thn').value = 1945;
    
    // Jalankan konversi dan diagnosis default
    cariWeton();
    hitungKecocokan();
};