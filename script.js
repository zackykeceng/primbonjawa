// Data neptu
const neptuHari = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const neptuPasaran = { 'Legi': 5, 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8 };
const hariList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const pasaranList = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];

// Data ramalan berdasarkan sisa perhitungan
const hasilRamalan = {
    1: { nama: "Wasesa Segara", deskripsi: "👑 Berhati mulia, mudah mendapat kekayaan & wibawa. Kehidupan harmonis serta dihormati sekelilingnya.", skor: 95 },
    2: { nama: "Tunggak Semi", deskripsi: "✅ Rajin, ulet, rezeki selalu berlimpah. Pasangan yang tipe pekerja keras dan relatif mudah mencapai kesuksesan finansial.", skor: 85 },
    3: { nama: "Satriya Wibawa", deskripsi: "✨ Selalu mendapat kemuliaan, keluhuran, dan derajat kedudukan yang tinggi. Sangat cocok dalam memimpin mahligai keluarga.", skor: 90 },
    4: { nama: "Sumur Sinobo", deskripsi: "🏠 Rezeki berlimpah bagaikan sumur yang tak pernah kering. Hidup penuh kebajikan, bahagia, dan berkecukupan.", skor: 80 },
    5: { nama: "Satriya Wirang", deskripsi: "⚠️ Kerap kali mengalami kesusahan atau rintangan sosial. Disarankan memperbanyak sedekah & rajin memohon doa restu orang tua.", skor: 40 },
    6: { nama: "Bumi Kapetak", deskripsi: "🌍 Kekuatan mental bagaikan bumi, sangat sabar & tabah menghadapi dinamika serta prahara dalam berumah tangga.", skor: 75 },
    7: { nama: "Lebur Ketinggang", deskripsi: "⚠️ Berpotensi sering cekcok, usaha yang dirintis bersama rentan runtuh. Perlu komunikasi intensif dan saling mengalah.", skor: 30 },
    8: { nama: "Padu", deskripsi: "🔥 Sering terjadi pertengkaran hebat, rawan memicu pisah ranjang. Harus ekstra hati-hati dalam meredam ego membina rumah tangga.", skor: 25 },
    9: { nama: "Pegat", deskripsi: "💔 Tradisi mencatat makna PEGAT = perceraian atau perpisahan berat. Sangat tidak disarankan menurut perhitungan primbon.", skor: 10 },
    0: { nama: "Langgeng Sempurna", deskripsi: "🏆 SEMPURNA! Tipe keharmonisan abadi, jalinan cinta diprediksi langgeng aman sentosa hingga maut memisahkan.", skor: 100 }
};

// Variabel global untuk menyimpan hasil konversi weton terakhir
window.lastWetonResult = null;

/**
 * Mendapatkan weton dari tanggal Masehi
 */
function getWetonFromDate(tanggal, bulan, tahun) {
    const targetDate = new Date(tahun, bulan - 1, tanggal);
    const baseDate = new Date(1900, 0, 1);
    const diffDays = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
    const hariIndex = (1 + diffDays) % 7;
    const pasaranIndex = (1 + diffDays) % 5;
    const hari = hariList[hariIndex];
    const pasaran = pasaranList[pasaranIndex];
    const neptuTotal = neptuHari[hari] + neptuPasaran[pasaran];
    return { hari, pasaran, neptu: neptuTotal, weton: `${hari} ${pasaran}` };
}

/**
 * Mencari weton dari input tanggal dan menampilkannya
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
    
    document.getElementById('weton-text').innerHTML = `📅 ${tgl}/${bln}/${thn}`;
    document.getElementById('weton-nama').innerHTML = result.weton;
    document.getElementById('neptu-hasil').innerHTML = result.neptu;
    document.getElementById('detail-hari').innerHTML = result.hari;
    document.getElementById('detail-pasaran').innerHTML = result.pasaran;
    
    window.lastWetonResult = result;
}

/**
 * Mentransfer hasil weton ke form pria
 */
function transferKePria() {
    if (window.lastWetonResult) {
        document.getElementById('pria-hari').value = window.lastWetonResult.hari;
        document.getElementById('pria-pasaran').value = window.lastWetonResult.pasaran;
        hitungKecocokan();
    } else {
        alert('Hitung atau cari weton terlebih dahulu!');
    }
}

/**
 * Mentransfer hasil weton ke form wanita
 */
function transferKeWanita() {
    if (window.lastWetonResult) {
        document.getElementById('wanita-hari').value = window.lastWetonResult.hari;
        document.getElementById('wanita-pasaran').value = window.lastWetonResult.pasaran;
        hitungKecocokan();
    } else {
        alert('Hitung atau cari weton terlebih dahulu!');
    }
}

/**
 * Menghitung sisa kecocokan berdasarkan aturan Primbon
 */
function hitungSisaKecocokan(neptuPria, neptuWanita) {
    let total = neptuPria + neptuWanita;
    if (total > 10) return total % 10;
    return total;
}

/**
 * Mengecek apakah kombinasi termasuk pantangan 10+15
 */
function cekPantangan10_15(neptuPria, neptuWanita) {
    const total = neptuPria + neptuWanita;
    if (total !== 25) return false;
    return (neptuPria === 10 && neptuWanita === 15) || (neptuPria === 15 && neptuWanita === 10);
}

/**
 * Menghitung dan menampilkan hasil kecocokan jodoh
 */
function hitungKecocokan() {
    const priaHari = document.getElementById('pria-hari').value;
    const priaPasaran = document.getElementById('pria-pasaran').value;
    const wanitaHari = document.getElementById('wanita-hari').value;
    const wanitaPasaran = document.getElementById('wanita-pasaran').value;
    
    const neptuPria = neptuHari[priaHari] + neptuPasaran[priaPasaran];
    const neptuWanita = neptuHari[wanitaHari] + neptuPasaran[wanitaPasaran];
    const totalNeptu = neptuPria + neptuWanita;
    
    const sisa = hitungSisaKecocokan(neptuPria, neptuWanita);
    const ramalan = hasilRamalan[sisa];
    const isPantangan = cekPantangan10_15(neptuPria, neptuWanita);
    
    // Konfigurasi warna UI responsif hasil ramalan
    let warnaUtama = ramalan.skor >= 80 ? '#166534' : (ramalan.skor >= 60 ? '#d97706' : '#991b1b');
    let warnaBgJudul = ramalan.skor >= 80 ? '#f0fdf4' : (ramalan.skor >= 60 ? '#fef3c7' : '#fef2f2');
    if (isPantangan) {
        warnaUtama = '#b91c1c';
        warnaBgJudul = '#fef2f2';
    }
    
    let warningHtml = '';
    if (isPantangan) {
        warningHtml = `
            <div class="warning-banner danger">
                <span class="warning-icon">🚫</span>
                <div class="warning-content">
                    <strong>⚠️ PANTANGAN UTAMA PRIMBON (NEPTU 10 + 15) ⚠️</strong><br>
                    Kombinasi total Neptu berjumlah ${totalNeptu} (${neptuPria} + ${neptuWanita}) terdeteksi sebagai LARANGAN MUTLAK 10+15.<br>
                    <strong style="text-decoration: underline;">Hukum Tradisi: Sangat tidak disarankan untuk melanjutkan jenjang pernikahan.</strong>
                </div>
            </div>
        `;
    } else if (totalNeptu === 25 && !isPantangan) {
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
    
    let deskripsiTambahan = ramalan.deskripsi;
    if (isPantangan) {
        deskripsiTambahan += `<br><br><strong style="color:#b91c1c;">✘ STATUS PANTANGAN AKTIF: PERNIKAHAN TIDAK DIANJURKAN.</strong>`;
    } else if (totalNeptu === 25 && !isPantangan) {
        deskripsiTambahan += `<br><br><strong style="color:#166534;">✓ STATUS AMAN: KOMBINASI TIDAK TERMASUK LARANGAN.</strong>`;
    }
    
    const html = `
        <div class="hasil-card">
            <div class="hasil-weton-info">
                👨 ${priaHari} ${priaPasaran} (${neptuPria}) &nbsp;❤️&nbsp; 👩 ${wanitaHari} ${wanitaPasaran} (${neptuWanita})
                <div style="margin-top: 6px; font-size:0.85rem; color:var(--text-muted);">Total Neptu: <strong>${totalNeptu}</strong> | Sisa Bagi: <strong>${sisa}</strong></div>
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
                <p>🎯 Tingkat Kecocokan Berdasarkan Aturan</p>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${ramalan.skor}%; background: ${warnaUtama};">
                        ${ramalan.skor}%
                    </div>
                </div>
            </div>
            ${warningHtml}
        </div>
    `;
    
    const hasilDiv = document.getElementById('hasil');
    hasilDiv.innerHTML = html;
    hasilDiv.classList.add('show');
    hasilDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Jalankan otomatis sewaktu load awal halaman
window.onload = function() {
    document.getElementById('tgl').value = 17;
    document.getElementById('bln').value = 8;
    document.getElementById('thn').value = 1945;
    
    cariWeton();
    hitungKecocokan();
};