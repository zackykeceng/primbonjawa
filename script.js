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
 * 
 * Setiap hasil dilengkapi dengan:
 * - nama: Nama ramalan
 * - deskripsi: Penjelasan lengkap tentang karakter dan nasib pasangan
 * - skor: Tingkat kecocokan (0-100)
 * - solusi: Saran/tindakan yang dianjurkan
 * - karakter: Sifat-sifat yang dimiliki pasangan
 * - kelebihan: Kelebihan hubungan
 * - kekurangan: Kekurangan yang perlu diwaspadai
 */
const hasilRamalan = {
    1: { 
        nama: "Wasesa Segara",           // K01
        deskripsi: "👑 Pasangan ini memiliki hati yang mulia dan budi pekerti yang luhur. Mereka akan mudah mendapatkan kekayaan, wibawa, dan penghormatan dari masyarakat sekitarnya. Kehidupan rumah tangga akan dipenuhi dengan harmoni dan kebahagiaan.",
        skor: 95,
        solusi: "Pertahankan sikap rendah hati dan teruslah berbuat baik kepada sesama. Jangan pernah sombong meskipun telah mencapai kesuksesan.",
        karakter: "Mulia, dermawan, berwibawa, bijaksana, dan rendah hati",
        kelebihan: "Mudah mendapatkan rezeki, dihormati banyak orang, hubungan harmonis, dan beruntung dalam segala usaha",
        kekurangan: "Cenderung terlalu percaya diri dan mudah dimanfaatkan orang lain"
    },
    2: { 
        nama: "Tunggak Semi",            // K02
        deskripsi: "✅ Pasangan ini adalah tipe pekerja keras dan pantang menyerah. Mereka memiliki semangat juang yang tinggi dalam meraih kesuksesan. Rezeki selalu mengalir deras dan mereka termasuk orang yang mudah mencapai kesuksesan finansial. Keuletan dan ketekunan menjadi kunci keberhasilan mereka.",
        skor: 85,
        solusi: "Jaga keseimbangan antara bekerja dan beristirahat. Luangkan waktu untuk keluarga dan jangan terlalu fokus pada materi saja.",
        karakter: "Ulet, pekerja keras, tangguh, pantang menyerah, dan ambisius",
        kelebihan: "Rezeki berlimpah, karir cemerlang, mental baja, dan disiplin tinggi",
        kekurangan: "Cenderung workaholic dan kurang memperhatikan kesehatan"
    },
    3: { 
        nama: "Satriya Wibawa",          // K03
        deskripsi: "✨ Pasangan ini ditakdirkan untuk mendapatkan kemuliaan dan keluhuran derajat. Mereka akan memiliki kedudukan yang tinggi dan dihormati oleh banyak orang. Sangat cocok dalam memimpin mahligai keluarga karena memiliki jiwa kepemimpinan yang kuat. Kehidupan mereka akan dipenuhi dengan kehormatan dan pengakuan.",
        skor: 90,
        solusi: "Gunakan kedudukan dan pengaruh yang dimiliki untuk membantu orang lain. Jangan lupa untuk selalu bersikap adil dalam setiap keputusan.",
        karakter: "Berwibawa, pemimpin alami, bijaksana, disegani, dan tegas",
        kelebihan: "Mudah mendapat kepercayaan orang, karir cemerlang, dihormati, dan sukses dalam kepemimpinan",
        kekurangan: "Cenderung otoriter dan kurang mendengarkan saran orang lain"
    },
    4: { 
        nama: "Sumur Sinobo",            // K04
        deskripsi: "🏠 Rezeki pasangan ini bagaikan sumur yang tak pernah kering. Mereka akan selalu hidup dalam kecukupan dan kebahagiaan. Kehidupan mereka penuh dengan kebajikan dan berkah yang melimpah. Pasangan ini memiliki kemampuan untuk menarik kekayaan dan keberuntungan dari berbagai arah.",
        skor: 80,
        solusi: "Syukuri setiap nikmat yang diberikan. Jangan lupa untuk berbagi dengan orang yang membutuhkan karena rezeki akan semakin bertambah jika dibagikan.",
        karakter: "Dermawan, murah hati, bahagia, syukur, dan ramah",
        kelebihan: "Rezeki berlimpah, banyak teman, hidup bahagia, dan dikelilingi orang baik",
        kekurangan: "Cenderung boros dan kurang pandai mengelola keuangan"
    },
    5: { 
        nama: "Satriya Wirang",          // K05
        deskripsi: "⚠️ Pasangan ini sering kali mengalami kesusahan dan rintangan dalam kehidupan sosialnya. Mereka mungkin akan menghadapi berbagai cobaan dan hambatan yang menguji kesabaran. Disarankan untuk memperbanyak sedekah dan rajin memohon doa restu orang tua agar mendapat perlindungan dan kelancaran.",
        skor: 40,
        solusi: "Perbanyak sedekah, rajin berdoa memohon restu orang tua, dan selalu introspeksi diri. Kurangi sifat angkuh dan egois. Perbanyak ibadah dan mendekatkan diri kepada Tuhan.",
        karakter: "Pemberani, ulet, tetapi sering mendapat tantangan dan hambatan dalam hidup",
        kelebihan: "Memiliki ketahanan mental yang kuat dan tidak mudah menyerah",
        kekurangan: "Cenderung mendapat musuh, sering difitnah, dan mengalami kesulitan dalam hubungan sosial"
    },
    6: { 
        nama: "Bumi Kapetak",            // K06
        deskripsi: "🌍 Pasangan ini memiliki kekuatan mental yang bagaikan bumi yang kokoh. Mereka sangat sabar dan tabah dalam menghadapi berbagai dinamika dan prahara dalam berumah tangga. Keteguhan hati dan kesabaran menjadi senjata utama mereka dalam menghadapi setiap badai kehidupan.",
        skor: 75,
        solusi: "Pertahankan kesabaran dan keteguhan hati. Jadilah fondasi yang kuat bagi keluarga. Perkuat komunikasi agar tetap harmonis.",
        karakter: "Sabar, tabah, kokoh, dapat diandalkan, dan kuat mentalnya",
        kelebihan: "Tahan banting, dapat menjadi sandaran, dan selalu tenang dalam menghadapi masalah",
        kekurangan: "Cenderung pasif dan kurang berinisiatif dalam mengambil keputusan"
    },
    7: { 
        nama: "Lebur Ketinggang",        // K07
        deskripsi: "⚠️ Pasangan ini berpotensi sering mengalami cekcok dan pertengkaran. Usaha yang dirintis bersama rentan mengalami kegagalan dan keruntuhan. Diperlukan komunikasi yang intensif dan sikap saling mengalah untuk menjaga keharmonisan rumah tangga.",
        skor: 30,
        solusi: "Tingkatkan komunikasi intensif, selalu saling mengalah, dan jangan biarkan ego menguasai. Segera selesaikan setiap konflik dengan kepala dingin. Jangan membawa masalah keesokan harinya.",
        karakter: "Emosional, mudah tersulut, egois, dan keras kepala",
        kelebihan: "Memiliki semangat yang besar jika sesuatu sesuai dengan keinginannya",
        kekurangan: "Sering bertengkar, usaha mudah hancur, dan hubungan tidak harmonis"
    },
    8: { 
        nama: "Padu",                    // K08
        deskripsi: "🔥 Pasangan ini sering kali terlibat dalam pertengkaran hebat yang berpotensi memicu perpisahan. Perselisihan yang terjadi bisa sangat parah hingga mengancam keutuhan rumah tangga. Harus ekstra hati-hati dalam meredam ego dan menjaga komunikasi agar tidak terjadi hal-hal yang tidak diinginkan.",
        skor: 25,
        solusi: "Hindari konflik yang tidak perlu, pelajari teknik mengendalikan ego, dan jangan pernah membawa emosi saat berdiskusi. Segera cari bantuan konseling jika pertengkaran sudah terlalu sering terjadi.",
        karakter: "Mudah marah, keras kepala, kurang sabar, dan sulit mengendalikan emosi",
        kelebihan: "Memiliki pendirian yang teguh dan tidak mudah terpengaruh",
        kekurangan: "Sering konflik, rentan perceraian, dan emosi yang tidak stabil"
    },
    9: { 
        nama: "Pegat",                   // K09
        deskripsi: "💔 Menurut tradisi primbon, PEGAT memiliki makna yang sangat buruk yaitu perceraian atau perpisahan yang berat. Pasangan ini sangat tidak disarankan untuk melanjutkan hubungan ke jenjang pernikahan karena diprediksi akan berakhir dengan perpisahan yang menyakitkan.",
        skor: 10,
        solusi: "Sangat tidak disarankan untuk melanjutkan ke jenjang pernikahan. Jika tetap ingin melanjutkan, lakukan ritual ruwatan dan konsultasi dengan ahli spiritual. Kedua pihak harus benar-benar siap menghadapi segala konsekuensi.",
        karakter: "Cenderung saling bertolak belakang dan sulit menemukan titik temu",
        kelebihan: "Masing-masing memiliki kelebihan yang mungkin bisa melengkapi",
        kekurangan: "Sangat rentan terhadap perceraian, perpisahan, dan konflik berkepanjangan"
    },
    0: { 
        nama: "Langgeng Sempurna",       // K10 (sisa 0)
        deskripsi: "🏆 INILAH KOMBINASI SEMPURNA! Pasangan ini diprediksi akan memiliki keharmonisan yang abadi dan jalinan cinta yang langgeng hingga ajal memisahkan. Hubungan mereka akan dipenuhi dengan cinta, pengertian, dan kebahagiaan yang tak terhingga. Ini adalah jodoh yang sangat ideal menurut perhitungan primbon Jawa.",
        skor: 100,
        solusi: "Jaga selalu komunikasi yang baik dan jangan pernah lupa untuk saling menghargai. Pertahankan keharmonisan dengan terus menumbuhkan rasa cinta dan kasih sayang setiap hari.",
        karakter: "Saling mencintai, harmonis, saling memahami, setia, dan dewasa",
        kelebihan: "Hubungan langgeng, dipenuhi cinta, tidak pernah bosan, dan saling melengkapi",
        kekurangan: "Tidak ada kekurangan yang berarti, hanya perlu menjaga agar tidak terjadi kebosanan"
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
    
    // Informasi lengkap ramalan
    let deskripsiTambahan = `
        <p>${ramalan.deskripsi}</p>
        <br>
        <div style="background: rgba(15,23,42,0.4); padding: 16px; border-radius: 12px; margin: 12px 0;">
            <strong>🌟 Karakter Utama:</strong><br>
            <span style="color: #fcd34d;">${ramalan.karakter || 'Tidak tersedia'}</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 12px 0;">
            <div style="background: rgba(34,197,94,0.1); padding: 12px; border-radius: 12px; border-left: 3px solid #22c55e;">
                <strong style="color: #86efac;">✅ Kelebihan:</strong><br>
                <span style="font-size: 0.9rem;">${ramalan.kelebihan || 'Tidak tersedia'}</span>
            </div>
            <div style="background: rgba(239,68,68,0.1); padding: 12px; border-radius: 12px; border-left: 3px solid #ef4444;">
                <strong style="color: #fca5a5;">⚠️ Kekurangan:</strong><br>
                <span style="font-size: 0.9rem;">${ramalan.kekurangan || 'Tidak tersedia'}</span>
            </div>
        </div>
    `;
    
    if (ramalan.solusi && ramalan.solusi !== "-") {
        deskripsiTambahan += `
            <div style="background: rgba(245,158,11,0.1); padding: 16px; border-radius: 12px; margin-top: 12px; border: 1px solid rgba(245,158,11,0.2);">
                <strong style="color: #fcd34d;">💡 Solusi yang Disarankan:</strong><br>
                ${ramalan.solusi}
            </div>
        `;
    }
    
    if (isPantangan) {
        deskripsiTambahan += `
            <div style="background: rgba(239,68,68,0.15); padding: 16px; border-radius: 12px; margin-top: 12px; border: 2px solid #ef4444;">
                <strong style="color: #ef4444;">✘ STATUS PANTANGAN AKTIF: PERNIKAHAN TIDAK DIANJURKAN.</strong>
            </div>
        `;
    } else if (isTotal25Aman) {
        deskripsiTambahan += `
            <div style="background: rgba(34,197,94,0.15); padding: 16px; border-radius: 12px; margin-top: 12px; border: 2px solid #22c55e;">
                <strong style="color: #22c55e;">✓ STATUS AMAN: KOMBINASI TIDAK TERMASUK LARANGAN.</strong>
            </div>
        `;
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
