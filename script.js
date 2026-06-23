/**
 * =================================================================
 * SISTEM PAKAR PRIMBON JAWA - ANALISIS KECOCOKAN JODOH
 * Metode Inferensi: Forward Chaining
 * Program Studi Pendidikan Teknologi Informasi
 * IKIP PGRI BOJONEGORO - 2026
 * =================================================================
 */

// ==================== BASIS PENGETAHUAN (KNOWLEDGE BASE) ====================

const neptuHari = { 
    'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9
};

const neptuPasaran = { 
    'Legi': 5, 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8
};

const hariList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const pasaranList = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const bulanList = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

window.lastWetonResult = null;

// ==================== PAKAR 1: BAPAK SAIMAN ====================

const hasilRamalanSaiman = {
    0: { 
        nama: "Langgeng Sempurna",
        deskripsi: "🏆 INILAH KOMBINASI SEMPURNA! Pasangan ini diprediksi akan memiliki keharmonisan yang abadi dan jalinan cinta yang langgeng hingga ajal memisahkan. Mereka adalah pasangan yang diciptakan untuk saling melengkapi dan menjadi satu sama lain.",
        skor: 100,
        solusi: "Jaga selalu komunikasi yang baik, jangan pernah lupa untuk saling menghargai, dan selalu tanamkan rasa syukur atas kehadiran pasangan dalam hidup Anda.",
        karakter: "Saling mencintai, harmonis, saling memahami, setia, dan dewasa",
        kelebihan: "Hubungan langgeng, dipenuhi cinta, tidak pernah bosan, dan saling melengkapi dengan sempurna",
        kekurangan: "Tidak ada kekurangan yang berarti, namun perlu menjaga agar tidak terjadi kebosanan dalam hubungan",
        mitologi: "Langgeng Sempurna adalah cita-cita tertinggi dalam primbon Jawa.",
        filosofi: "Angka 0 melambangkan kesempurnaan dan keabadian."
    },
    1: { 
        nama: "Wasesa Segara",
        deskripsi: "👑 Pasangan ini memiliki hati yang mulia dan budi pekerti yang luhur. Mereka akan mudah mendapatkan kekayaan, wibawa, dan penghormatan dari masyarakat sekitarnya.",
        skor: 95,
        solusi: "Pertahankan sikap rendah hati dan teruslah berbuat baik kepada sesama.",
        karakter: "Mulia, dermawan, berwibawa, bijaksana, dan rendah hati",
        kelebihan: "Mudah mendapatkan rezeki, dihormati banyak orang, hubungan harmonis",
        kekurangan: "Cenderung terlalu percaya diri dan mudah dimanfaatkan orang lain",
        mitologi: "Wasesa Segara berasal dari kata 'Wasesa' (kekuasaan) dan 'Segara' (lautan).",
        filosofi: "Air laut selalu mengalir ke tempat yang lebih rendah, mengajarkan kerendahan hati."
    },
    2: { 
        nama: "Tunggak Semi",
        deskripsi: "✅ Pasangan ini adalah tipe pekerja keras dan pantang menyerah. Mereka memiliki semangat juang yang tinggi dalam meraih kesuksesan.",
        skor: 85,
        solusi: "Jaga keseimbangan antara bekerja dan beristirahat. Luangkan waktu untuk keluarga.",
        karakter: "Ulet, pekerja keras, tangguh, pantang menyerah, dan ambisius",
        kelebihan: "Rezeki berlimpah, karir cemerlang, mental baja, dan disiplin tinggi",
        kekurangan: "Cenderung workaholic dan kurang memperhatikan kesehatan",
        mitologi: "Tunggak Semi dalam bahasa Jawa berarti 'tumbuh kembali'.",
        filosofi: "Kehidupan bagaikan musim - ada masa tanam, masa panen, dan masa istirahat."
    },
    3: { 
        nama: "Satriya Wibawa",
        deskripsi: "✨ Pasangan ini ditakdirkan untuk mendapatkan kemuliaan dan keluhuran derajat. Mereka akan memiliki kedudukan yang tinggi dan dihormati oleh banyak orang.",
        skor: 90,
        solusi: "Gunakan kedudukan dan pengaruh yang dimiliki untuk membantu orang lain.",
        karakter: "Berwibawa, pemimpin alami, bijaksana, disegani, dan tegas",
        kelebihan: "Mudah mendapat kepercayaan orang, karir cemerlang, dihormati",
        kekurangan: "Cenderung otoriter dan kurang mendengarkan saran orang lain",
        mitologi: "Satriya Wibawa berarti 'kesatria yang berwibawa'.",
        filosofi: "Kewibawaan bukanlah tentang kekuasaan yang memaksa, tetapi tentang pengaruh yang menginspirasi."
    },
    4: { 
        nama: "Sumur Sinobo",
        deskripsi: "🏠 Rezeki pasangan ini bagaikan sumur yang tak pernah kering. Mereka akan selalu hidup dalam kecukupan dan kebahagiaan.",
        skor: 80,
        solusi: "Syukuri setiap nikmat yang diberikan. Jangan lupa untuk berbagi dengan orang yang membutuhkan.",
        karakter: "Dermawan, murah hati, bahagia, syukur, dan ramah",
        kelebihan: "Rezeki berlimpah, banyak teman, hidup bahagia, dan dikelilingi orang baik",
        kekurangan: "Cenderung boros dan kurang pandai mengelola keuangan",
        mitologi: "Sumur Sinobo dalam bahasa Jawa berarti 'sumur yang melimpah'.",
        filosofi: "Seperti sumur yang terus memberi tanpa pernah kehabisan, kebahagiaan sejati datang dari memberi."
    },
    5: { 
        nama: "Satriya Wirang",
        deskripsi: "⚠️ Pasangan ini sering kali mengalami kesusahan dan rintangan dalam kehidupan sosialnya.",
        skor: 40,
        solusi: "Perbanyak sedekah, rajin berdoa memohon restu orang tua, dan selalu introspeksi diri.",
        karakter: "Pemberani, ulet, tetapi sering mendapat tantangan dan hambatan dalam hidup",
        kelebihan: "Memiliki ketahanan mental yang kuat dan tidak mudah menyerah",
        kekurangan: "Cenderung mendapat musuh, sering difitnah, dan mengalami kesulitan sosial",
        mitologi: "Satriya Wirang berarti 'kesatria yang mendapat aib'.",
        filosofi: "Wirang (aib) bukanlah akhir segalanya, melainkan awal dari kebijaksanaan."
    },
    6: { 
        nama: "Bumi Kapetak",
        deskripsi: "🌍 Pasangan ini memiliki kekuatan mental yang bagaikan bumi yang kokoh.",
        skor: 75,
        solusi: "Pertahankan kesabaran dan keteguhan hati. Jadilah fondasi yang kuat bagi keluarga.",
        karakter: "Sabar, tabah, kokoh, dapat diandalkan, dan kuat mentalnya",
        kelebihan: "Tahan banting, dapat menjadi sandaran, dan selalu tenang",
        kekurangan: "Cenderung pasif dan kurang berinisiatif dalam mengambil keputusan",
        mitologi: "Bumi Kapetak berarti 'bumi yang telah digemburkan'.",
        filosofi: "Bumi selalu diam, tetapi memiliki kekuatan yang luar biasa."
    },
    7: { 
        nama: "Lebur Ketinggang",
        deskripsi: "⚠️ Pasangan ini berpotensi sering mengalami cekcok dan pertengkaran.",
        skor: 30,
        solusi: "Tingkatkan komunikasi intensif, selalu saling mengalah, dan jangan biarkan ego menguasai.",
        karakter: "Emosional, mudah tersulut, egois, dan keras kepala",
        kelebihan: "Memiliki semangat yang besar jika sesuatu sesuai dengan keinginannya",
        kekurangan: "Sering bertengkar, usaha mudah hancur, dan hubungan tidak harmonis",
        mitologi: "Lebur Ketinggang berarti 'hancur tergantung'.",
        filosofi: "Kehancuran sering kali datang bukan dari luar, tetapi dari dalam."
    },
    8: { 
        nama: "Padu",
        deskripsi: "🔥 Pasangan ini sering kali terlibat dalam pertengkaran hebat yang berpotensi memicu perpisahan.",
        skor: 25,
        solusi: "Hindari konflik yang tidak perlu, pelajari teknik mengendalikan ego, dan jangan pernah membawa emosi saat berdiskusi.",
        karakter: "Mudah marah, keras kepala, kurang sabar, dan sulit mengendalikan emosi",
        kelebihan: "Memiliki pendirian yang teguh dan tidak mudah terpengaruh",
        kekurangan: "Sering konflik, rentan perceraian, dan emosi yang tidak stabil",
        mitologi: "Padu berarti 'bertemu dan berbenturan'.",
        filosofi: "Padu mengajarkan bahwa dalam setiap pertemuan ada potensi untuk berbenturan."
    },
    9: { 
        nama: "Pegat",
        deskripsi: "💔 Menurut tradisi primbon, PEGAT memiliki makna yang sangat buruk yaitu perceraian atau perpisahan yang berat.",
        skor: 10,
        solusi: "Sangat tidak disarankan untuk melanjutkan ke jenjang pernikahan. Jika tetap ingin melanjutkan, lakukan ritual ruwatan.",
        karakter: "Cenderung saling bertolak belakang dan sulit menemukan titik temu",
        kelebihan: "Masing-masing memiliki kelebihan yang mungkin bisa melengkapi",
        kekurangan: "Sangat rentan terhadap perceraian, perpisahan, dan konflik berkepanjangan",
        mitologi: "Pegat berarti 'terputus' atau 'patah'.",
        filosofi: "Pegat mengajarkan bahwa tidak semua pertemuan adalah takdir."
    }
};

// ==================== PAKAR 2: BAPAK MOH. HAMIM, S.Pd ====================

const hasilRamalanHamim = {
    1: {
        nama: "Wasesa Segara (Begja - Beruntung)",
        deskripsi: "🌊 Rumah tangga pasangan ini diramalkan akan dianugerahi keberuntungan yang melimpah, rezeki yang mengalir deras bagaikan air laut, dan kehidupan yang tenteram serta sejahtera. Pasangan ini akan merasakan kemudahan dalam segala urusan dan dikelilingi oleh berkah yang tak terduga.",
        skor: 95,
        solusi: "Syukuri setiap nikmat yang diberikan, jaga sikap rendah hati, dan jangan lupa untuk berbagi dengan sesama agar keberuntungan tetap abadi.",
        karakter: "Beruntung, sejahtera, tenteram, rendah hati, dermawan, dan penuh syukur",
        kelebihan: "Rezeki melimpah, kehidupan tenteram, mudah dalam segala urusan, dikelilingi berkah, dan hubungan harmonis",
        kekurangan: "Cenderung lalai dalam bersyukur dan mudah terlena dengan kemudahan yang didapat",
        warna: "#22c55e",
        ikon: "🌊",
        detail: "Sisa 1 (Wasesa Segara / Begja / Beruntung)"
    },
    2: {
        nama: "Tunggak Semi (Lara - Cobaan)",
        deskripsi: "🌱 Rumah tangga pasangan ini akan sering menghadapi berbagai cobaan dan ujian, terutama berupa kesulitan ekonomi yang datang silih berganti atau masalah kesehatan yang mengganggu ketentraman. Namun seperti tunas yang selalu tumbuh kembali, pasangan ini diajarkan untuk tetap tegar dan bangkit dari setiap keterpurukan.",
        skor: 60,
        solusi: "Perbanyak sabar dan tawakal, jaga kesehatan dengan pola hidup yang baik, kelola keuangan dengan bijak, perbanyak doa memohon perlindungan, dan jangan pernah putus asa.",
        karakter: "Tangguh, ulet, sabar, tabah, pantang menyerah, dan memiliki ketahanan mental yang kuat",
        kelebihan: "Memiliki ketahanan mental yang kuat, mampu bangkit dari keterpurukan, menjadi pribadi yang lebih bijaksana",
        kekurangan: "Sering dilanda kesulitan ekonomi, gangguan kesehatan, ujian yang datang bertubi-tubi",
        warna: "#f59e0b",
        ikon: "🌱",
        detail: "Sisa 2 (Tunggak Semi / Lara / Cobaan)"
    },
    0: {
        nama: "Satriya Wibawa (Pati - Rintangan Berat)",
        deskripsi: "⚔️ Rumah tangga pasangan ini akan mengalami banyak rintangan dan halangan yang berat, penderitaan batin yang mendalam, serta cobaan yang menguji kesabaran. Bahkan tidak menutup kemungkinan akan terjadi perpisahan atau kehilangan yang menyakitkan. Namun seperti kesatria yang berwibawa, pasangan ini dituntut untuk tetap teguh menghadapi segala ujian dengan ketabahan hati.",
        skor: 30,
        solusi: "Perbanyak ibadah dan doa, konsultasikan masalah dengan orang tua dan ahli spiritual, jangan mengambil keputusan besar dalam keadaan emosi, persiapkan mental untuk menghadapi segala kemungkinan terburuk.",
        karakter: "Teguh, tabah, berwibawa, tetapi sering dilanda penderitaan batin dan rintangan berat",
        kelebihan: "Memiliki keteguhan hati yang luar biasa, mampu bertahan dalam situasi sulit, menjadi pribadi yang lebih dewasa dan bijaksana",
        kekurangan: "Rentan terhadap perpisahan, kehilangan, penderitaan batin, rintangan hidup yang berat",
        warna: "#ef4444",
        ikon: "⚔️",
        detail: "Sisa 0 (Satriya Wibawa / Pati / Rintangan Berat)"
    }
};

// ==================== GLOSARIUM ====================
const glossaryData = [
    { term: "Weton", definition: "Hari kelahiran dalam penanggalan Jawa yang merupakan gabungan dari hari dan pasaran. Weton dipercaya memiliki pengaruh terhadap karakter dan nasib seseorang." },
    { term: "Neptu", definition: "Nilai numerik dari hari dan pasaran. Neptu digunakan sebagai dasar perhitungan dalam primbon Jawa untuk berbagai keperluan, termasuk kecocokan jodoh." },
    { term: "Pasaran", definition: "Siklus lima hari dalam kalender Jawa yaitu Legi, Pahing, Pon, Wage, dan Kliwon. Setiap pasaran memiliki nilai neptu yang berbeda." },
    { term: "Primbon", definition: "Kitab warisan leluhur Jawa yang berisi ramalan, perhitungan, dan petunjuk tentang berbagai aspek kehidupan termasuk pernikahan, karier, dan kesehatan." },
    { term: "Forward Chaining", definition: "Metode penalaran dari fakta menuju kesimpulan. Dalam sistem pakar, metode ini menggunakan data yang diketahui untuk mencari solusi yang tepat." },
    { term: "Sisa Bagi 10", definition: "Hasil pembagian total neptu dengan angka 10. Digunakan dalam metode Pakar 1: Saiman." },
    { term: "Sisa Bagi 3", definition: "Hasil pembagian total neptu dengan angka 3. Digunakan dalam metode Pakar 2: Moh. Hamim." },
    { term: "Langgeng Sempurna", definition: "Ramalan terbaik yang berarti 'abadi dan sempurna'. Pasangan ini diprediksi memiliki hubungan yang langgeng hingga akhir hayat." },
    { term: "Wasesa Segara", definition: "Ramalan yang berarti 'berkuasa seperti lautan'. Pasangan dengan ramalan ini diprediksi akan memiliki wibawa, kekayaan, dan keberuntungan." },
    { term: "Tunggak Semi", definition: "Ramalan yang berarti 'tumbuh kembali'. Pasangan ini akan selalu bangkit dari keterpurukan dan memiliki semangat yang tak pernah padam." },
    { term: "Satriya Wibawa", definition: "Ramalan yang berarti 'kesatria berwibawa'. Pasangan ini akan mendapatkan kemuliaan dan dihormati banyak orang." },
    { term: "Sumur Sinobo", definition: "Ramalan yang berarti 'sumur melimpah'. Pasangan ini akan memiliki rezeki yang berlimpah seperti air sumur yang tak pernah kering." },
    { term: "Satriya Wirang", definition: "Ramalan yang berarti 'kesatria yang mendapat aib'. Pasangan ini akan menghadapi banyak cobaan dan tantangan." },
    { term: "Bumi Kapetak", definition: "Ramalan yang berarti 'bumi yang digemburkan'. Pasangan ini adalah fondasi yang kokoh dan dapat diandalkan." },
    { term: "Lebur Ketinggang", definition: "Ramalan yang berarti 'hancur tergantung'. Pasangan ini harus berhati-hati karena berpotensi sering bertengkar." },
    { term: "Padu", definition: "Ramalan yang berarti 'bertemu dan berbenturan'. Pasangan ini akan sering berselisih dan rentan konflik." },
    { term: "Pegat", definition: "Ramalan yang berarti 'terputus' atau 'patah'. Ini adalah ramalan terburuk yang menandakan potensi perceraian." }
];

// ==================== MITOLOGI & FILOSOFI ====================
const mythologyData = [
    {
        title: "Wasesa Segara - Kekuatan Lautan",
        story: "Dalam mitologi Jawa, Wasesa Segara terinspirasi dari kisah Nyi Roro Kidul, penguasa Laut Selatan. Konon, pasangan dengan ramalan ini memiliki perlindungan dari kekuatan lautan.",
        philosophy: "Lautan mengajarkan kita tentang kesabaran, kedalaman, dan kekuatan yang tak terlihat."
    },
    {
        title: "Tunggak Semi - Tunas Kehidupan",
        story: "Kisah Tunggak Semi berasal dari legenda pohon Dewandaru yang selalu tumbuh kembali meskipun ditebang.",
        philosophy: "Hidup adalah tentang proses tumbuh dan berkembang. Setiap jatuh adalah kesempatan untuk bangkit kembali."
    },
    {
        title: "Satriya Wibawa - Kesatria Sejati",
        story: "Terinspirasi dari sosok Arjuna dalam pewayangan, Satriya Wibawa melambangkan kesatria yang sempurna.",
        philosophy: "Kewibawaan sejati bukanlah tentang seberapa banyak orang yang takut pada kita, tetapi tentang seberapa banyak orang yang terinspirasi."
    },
    {
        title: "Sumur Sinobo - Sumber Kehidupan",
        story: "Dalam cerita rakyat Jawa, Sumur Sinobo adalah sumur ajaib yang memberikan air tanpa henti.",
        philosophy: "Sumur Sinobo mengajarkan bahwa kebahagiaan sejati datang dari memberi, bukan menerima."
    },
    {
        title: "Satriya Wirang - Ujian Kesatria",
        story: "Satriya Wirang adalah kisah tentang kesatria yang harus melalui jalan terjal menuju kejayaan.",
        philosophy: "Wirang (aib) adalah guru terbaik. Melalui kegagalan dan penghinaan, kita belajar untuk menjadi lebih rendah hati."
    },
    {
        title: "Bumi Kapetak - Fondasi Kehidupan",
        story: "Terinspirasi dari Dewi Pertiwi, Bumi Kapetak melambangkan kekuatan dan kesuburan.",
        philosophy: "Seperti bumi yang selalu menerima dan memberi kehidupan, pasangan Bumi Kapetak adalah fondasi yang kokoh."
    },
    {
        title: "Lebur Ketinggang - Peringatan Ego",
        story: "Kisah ini mengingatkan pada pertempuran antara Rama dan Rahwana dalam Ramayana.",
        philosophy: "Lebur Ketinggang mengajarkan bahwa dalam setiap hubungan, kita harus belajar untuk mengalah."
    },
    {
        title: "Padu - Pertemuan Dua Kekuatan",
        story: "Padu terinspirasi dari kisah pertemuan dua kekuatan besar dalam mitologi Jawa.",
        philosophy: "Perbedaan bukanlah kutukan, tetapi karunia. Padu mengajarkan bahwa dua orang yang berbeda dapat bersatu dengan indah."
    },
    {
        title: "Pegat - Perpisahan yang Bijaksana",
        story: "Pegat adalah peringatan dari para leluhur tentang pentingnya menyadari ketidakcocokan.",
        philosophy: "Tidak semua pertemuan adalah takdir. Terkadang, berpisah adalah bentuk cinta tertinggi."
    },
    {
        title: "Langgeng Sempurna - Cinta Sejati",
        story: "Ini adalah ramalan paling langka dan paling diinginkan. Konon, pasangan dengan ramalan ini adalah 'jodoh sejatining ati'.",
        philosophy: "Cinta sejati tidak pernah berakhir. Langgeng Sempurna mengajarkan bahwa cinta bukan tentang menemukan orang yang sempurna."
    }
];

// ==================== PANDUAN PERNIKAHAN ====================
const guideData = [
    {
        title: "Panduan Umum Membina Rumah Tangga",
        content: "1. Selalu jaga komunikasi yang terbuka dan jujur\n2. Saling menghormati dan menghargai perbedaan\n3. Bangun kepercayaan melalui konsistensi dan kesetiaan\n4. Luangkan waktu berkualitas bersama secara rutin\n5. Hadapi masalah bersama dengan kepala dingin",
        icon: "💑"
    },
    {
        title: "Tips untuk Pasangan Langgeng Sempurna",
        content: "1. Jangan pernah bosan menunjukkan kasih sayang\n2. Teruslah bertumbuh bersama sebagai pasangan\n3. Jadikan setiap hari sebagai hari istimewa\n4. Jaga api cinta tetap menyala dengan kejutan-kejutan kecil\n5. Selalu bersyukur atas kehadiran pasangan",
        icon: "🏆"
    },
    {
        title: "Tips untuk Pasangan Wasesa Segara",
        content: "1. Gunakan wibawa untuk membantu orang lain\n2. Jaga kerendahan hati meskipun telah sukses\n3. Jadilah teladan bagi keluarga dan masyarakat\n4. Seimbangkan kehidupan material dan spiritual\n5. Perkuat ikatan dengan doa bersama",
        icon: "👑"
    },
    {
        title: "Tips untuk Pasangan Tunggak Semi",
        content: "1. Jaga keseimbangan antara kerja dan istirahat\n2. Prioritaskan keluarga di tengah kesibukan\n3. Bangun visi bersama untuk masa depan\n4. Dukung karir masing-masing tanpa mengorbankan waktu bersama\n5. Belajar untuk menikmati proses, bukan hanya hasil",
        icon: "🌱"
    },
    {
        title: "Tips untuk Pasangan Satriya Wibawa",
        content: "1. Gunakan pengaruh untuk kebaikan banyak orang\n2. Dengarkan saran dan masukan dari pasangan\n3. Bagilah tanggung jawab dalam rumah tangga\n4. Jadilah pemimpin yang melayani, bukan mendominasi\n5. Tetap rendah hati di tengah kemuliaan",
        icon: "⚔️"
    },
    {
        title: "Tips untuk Pasangan Sumur Sinobo",
        content: "1. Kelola keuangan dengan bijak\n2. Jangan lupa bersyukur dan berbagi\n3. Investasikan rezeki untuk masa depan\n4. Bangun dana darurat untuk situasi tak terduga\n5. Hindari gaya hidup konsumtif yang berlebihan",
        icon: "🏠"
    },
    {
        title: "Tips untuk Pasangan Satriya Wirang",
        content: "1. Perbanyak sedekah dan amal kebaikan\n2. Jaga hubungan baik dengan orang tua\n3. Perbanyak doa dan ibadah\n4. Hindari konflik yang tidak perlu\n5. Fokus pada pengembangan diri dan karir",
        icon: "🛡️"
    },
    {
        title: "Tips untuk Pasangan Bumi Kapetak",
        content: "1. Jangan terlalu pasif, ambil inisiatif\n2. Berani mengambil keputusan bersama\n3. Kembangkan keberanian dalam menghadapi tantangan\n4. Jangan takut untuk memulai sesuatu yang baru\n5. Bersikaplah lebih spontan dan menyenangkan",
        icon: "🌍"
    },
    {
        title: "Tips untuk Pasangan Lebur Ketinggang",
        content: "1. Pelajari teknik komunikasi yang baik\n2. Kurangi ego dan belajar mengalah\n3. Jangan memperbesar masalah kecil\n4. Segera selesaikan konflik tanpa ditunda\n5. Cari bantuan konseling jika diperlukan",
        icon: "⚠️"
    },
    {
        title: "Tips untuk Pasangan Padu",
        content: "1. Hindari kata-kata yang menyakitkan\n2. Belajar mengendalikan emosi\n3. Beri waktu untuk menenangkan diri\n4. Jangan berdebat di depan anak\n5. Cari titik tengah dalam setiap perbedaan",
        icon: "🔥"
    },
    {
        title: "Tips untuk Pasangan Pegat",
        content: "1. Pertimbangkan kembali dengan matang\n2. Konsultasi dengan orang tua dan ahli\n3. Lakukan ritual ruwatan jika memungkinkan\n4. Siapkan mental untuk segala kemungkinan\n5. Jangan memaksakan diri jika sudah tidak cocok",
        icon: "💔"
    }
];

// ==================== MESIN INFERENSI ====================

function hitungTotalNeptu(hariPria, pasaranPria, hariWanita, pasaranWanita) {
    const neptuPria = neptuHari[hariPria] + neptuPasaran[pasaranPria];
    const neptuWanita = neptuHari[hariWanita] + neptuPasaran[pasaranWanita];
    return { neptuPria, neptuWanita, total: neptuPria + neptuWanita };
}

function hitungSisaBagi10(totalNeptu) {
    return totalNeptu > 10 ? totalNeptu % 10 : totalNeptu;
}

function getKesimpulanSaiman(sisa) {
    return hasilRamalanSaiman[sisa] || hasilRamalanSaiman[0];
}

function hitungSisaBagi3(totalNeptu) {
    return totalNeptu % 3;
}

function getKesimpulanHamim(sisa) {
    return hasilRamalanHamim[sisa] || hasilRamalanHamim[1];
}

function cekPantanganKhusus(neptuPria, neptuWanita) {
    const total = neptuPria + neptuWanita;
    return (total === 25 && neptuPria === 10 && neptuWanita === 15) ||
           (total === 25 && neptuPria === 15 && neptuWanita === 10);
}

function cekTotal25TapiAman(totalNeptu, neptuPria, neptuWanita) {
    return totalNeptu === 25 && neptuPria !== 10 && neptuWanita !== 10;
}

// ==================== KONVERSI MASEHI KE WETON ====================

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

function transferKePria() {
    if (window.lastWetonResult) {
        document.getElementById('pria-hari').value = window.lastWetonResult.hari;
        document.getElementById('pria-pasaran').value = window.lastWetonResult.pasaran;
        document.getElementById('hamim-pria-hari').value = window.lastWetonResult.hari;
        document.getElementById('hamim-pria-pasaran').value = window.lastWetonResult.pasaran;
        hitungKecocokanPakar1();
        hitungKecocokanPakar2();
    } else {
        alert('Hitung atau cari weton terlebih dahulu!');
    }
}

function transferKeWanita() {
    if (window.lastWetonResult) {
        document.getElementById('wanita-hari').value = window.lastWetonResult.hari;
        document.getElementById('wanita-pasaran').value = window.lastWetonResult.pasaran;
        document.getElementById('hamim-wanita-hari').value = window.lastWetonResult.hari;
        document.getElementById('hamim-wanita-pasaran').value = window.lastWetonResult.pasaran;
        hitungKecocokanPakar1();
        hitungKecocokanPakar2();
    } else {
        alert('Hitung atau cari weton terlebih dahulu!');
    }
}

// ==================== TAB NAVIGATION ====================

document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            tabContents.forEach(c => c.classList.remove('active'));
            document.getElementById('tab-' + tabId).classList.add('active');
        });
    });
    
    cariWeton();
    hitungKecocokanPakar1();
    hitungKecocokanPakar2();
    loadGlossary();
    loadMythology();
    loadGuide();
});

// ==================== GLOSARIUM ====================

function loadGlossary() {
    const container = document.getElementById('glossary-container');
    let html = '';
    
    glossaryData.forEach(item => {
        html += `
            <div class="glossary-item">
                <div class="glossary-term">${item.term}</div>
                <div class="glossary-definition">${item.definition}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ==================== MITOLOGI & FILOSOFI ====================

function loadMythology() {
    const container = document.getElementById('mythology-container');
    let html = '';
    
    mythologyData.forEach(item => {
        html += `
            <div class="mythology-item">
                <div class="mythology-title">${item.title}</div>
                <div class="mythology-story">📖 ${item.story}</div>
                <div class="mythology-philosophy">🧘 ${item.philosophy}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ==================== PANDUAN PERNIKAHAN ====================

function loadGuide() {
    const container = document.getElementById('guide-container');
    let html = '';
    
    guideData.forEach(item => {
        const contentList = item.content.split('\n').filter(line => line.trim() !== '');
        let contentHtml = contentList.map(line => `<li>${line.trim()}</li>`).join('');
        
        html += `
            <div class="guide-item">
                <div class="guide-icon">${item.icon}</div>
                <div class="guide-title">${item.title}</div>
                <ul class="guide-list">${contentHtml}</ul>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ==================== FUNGSI PAKAR 1 ====================

function hitungKecocokanPakar1() {
    const priaHari = document.getElementById('pria-hari').value;
    const priaPasaran = document.getElementById('pria-pasaran').value;
    const wanitaHari = document.getElementById('wanita-hari').value;
    const wanitaPasaran = document.getElementById('wanita-pasaran').value;
    
    const { neptuPria, neptuWanita, total } = hitungTotalNeptu(priaHari, priaPasaran, wanitaHari, wanitaPasaran);
    const sisa = hitungSisaBagi10(total);
    const ramalan = getKesimpulanSaiman(sisa);
    const isPantangan = cekPantanganKhusus(neptuPria, neptuWanita);
    const isTotal25Aman = cekTotal25TapiAman(total, neptuPria, neptuWanita);
    
    tampilkanHasilPakar1({
        priaHari, priaPasaran, neptuPria,
        wanitaHari, wanitaPasaran, neptuWanita,
        total, sisa, ramalan, isPantangan, isTotal25Aman
    });
}

function tampilkanHasilPakar1(data) {
    const { priaHari, priaPasaran, neptuPria, wanitaHari, wanitaPasaran, neptuWanita, total, sisa, ramalan, isPantangan, isTotal25Aman } = data;
    
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
                    Kombinasi total Neptu berjumlah ${total} (${neptuPria} + ${neptuWanita}) terdeteksi sebagai LARANGAN MUTLAK.<br>
                    <strong>Hukum Tradisi: Sangat tidak disarankan untuk melanjutkan jenjang pernikahan.</strong>
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
    
    let html = `
        <div class="hasil-card" style="border-left: 4px solid #f59e0b;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin-bottom: 16px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="background: #f59e0b; color: #0a0f1d; padding: 4px 16px; border-radius: 100px; font-weight: 700; font-size: 0.8rem;">PAKAR 1</span>
                    <span style="color: var(--text-muted); font-size: 0.8rem;">Bapak Saiman</span>
                </div>
                <span style="color: var(--text-muted); font-size: 0.75rem;">Metode Sisa Bagi 10</span>
            </div>
            
            <div class="hasil-weton-info">
                👨 ${priaHari} ${priaPasaran} (${neptuPria}) &nbsp;❤️&nbsp; 👩 ${wanitaHari} ${wanitaPasaran} (${neptuWanita})
                <div style="margin-top: 6px; font-size:0.85rem; color:var(--text-muted);">
                    Total Neptu: <strong>${total}</strong> | 
                    Sisa Bagi 10: <strong>${sisa}</strong>
                </div>
            </div>
            
            <div class="ramalan-box">
                <div class="ramalan-judul" style="background: ${warnaBgJudul}; color: ${warnaUtama}; border: 1px solid ${warnaUtama}40;">
                    ${ramalan.nama}
                </div>
                <div class="ramalan-deskripsi">
                    ${deskripsiTambahan}
                    
                    ${ramalan.mitologi ? `
                        <div style="background: rgba(139,92,246,0.1); padding: 16px; border-radius: 12px; margin-top: 16px; border-left: 3px solid #8b5cf6;">
                            <strong style="color: #a78bfa;">📖 Mitologi & Filosofi:</strong><br>
                            <p style="margin-top: 8px; font-style: italic; color: #c4b5fd;">${ramalan.mitologi}</p>
                            <p style="margin-top: 8px; color: #a78bfa;">🧘 ${ramalan.filosofi}</p>
                        </div>
                    ` : ''}
                </div>
            </div>

            <div class="skor-container">
                <p>🎯 Tingkat Kecocokan (Pakar Saiman)</p>
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
    const existingPakar2 = hasilDiv.querySelector('.pakar2-result');
    if (existingPakar2) {
        hasilDiv.innerHTML = html + '<div class="pakar2-result" style="margin-top: 24px;">' + existingPakar2.innerHTML + '</div>';
        hasilDiv.classList.add('show');
    } else {
        hasilDiv.innerHTML = html;
        hasilDiv.classList.add('show');
    }
    hasilDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ==================== FUNGSI PAKAR 2 ====================

function hitungKecocokanPakar2() {
    const priaHari = document.getElementById('hamim-pria-hari').value;
    const priaPasaran = document.getElementById('hamim-pria-pasaran').value;
    const wanitaHari = document.getElementById('hamim-wanita-hari').value;
    const wanitaPasaran = document.getElementById('hamim-wanita-pasaran').value;
    
    const { neptuPria, neptuWanita, total } = hitungTotalNeptu(priaHari, priaPasaran, wanitaHari, wanitaPasaran);
    const sisa = hitungSisaBagi3(total);
    const ramalan = getKesimpulanHamim(sisa);
    const isPantangan = cekPantanganKhusus(neptuPria, neptuWanita);
    
    tampilkanHasilPakar2({
        priaHari, priaPasaran, neptuPria,
        wanitaHari, wanitaPasaran, neptuWanita,
        total, sisa, ramalan, isPantangan
    });
}

function tampilkanHasilPakar2(data) {
    const { priaHari, priaPasaran, neptuPria, wanitaHari, wanitaPasaran, neptuWanita, total, sisa, ramalan, isPantangan } = data;
    
    const warna = ramalan.warna;
    
    let warningHtml = '';
    if (isPantangan) {
        warningHtml = `
            <div class="warning-banner danger" style="margin-top: 16px;">
                <span class="warning-icon">🚫</span>
                <div class="warning-content">
                    <strong>⚠️ PANTANGAN UTAMA PRIMBON (NEPTU 10 + 15) ⚠️</strong><br>
                    Kombinasi ini tetap menjadi perhatian khusus meskipun dari sisi metode sisa bagi 3 masuk dalam kategori ${ramalan.nama}.
                </div>
            </div>
        `;
    }
    
    let deskripsiDetail = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 12px 0;">
            <div style="background: rgba(15,23,42,0.4); padding: 12px; border-radius: 12px; text-align: center;">
                <div style="font-size: 0.7rem; color: var(--text-muted);">Neptu Pria</div>
                <div style="font-size: 1.8rem; font-weight: 800; color: #38bdf8;">${neptuPria}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${priaHari} ${priaPasaran}</div>
            </div>
            <div style="background: rgba(15,23,42,0.4); padding: 12px; border-radius: 12px; text-align: center;">
                <div style="font-size: 0.7rem; color: var(--text-muted);">Neptu Wanita</div>
                <div style="font-size: 1.8rem; font-weight: 800; color: #f472b6;">${neptuWanita}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${wanitaHari} ${wanitaPasaran}</div>
            </div>
        </div>
        <div style="text-align: center; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 12px; margin: 8px 0;">
            <span style="color: var(--text-muted);">Total Neptu: </span>
            <strong style="font-size: 1.2rem; color: ${warna};">${total}</strong>
            <span style="color: var(--text-muted); margin-left: 16px;">Sisa Bagi 3: </span>
            <strong style="font-size: 1.2rem; color: ${warna};">${sisa}</strong>
        </div>
        <div style="display: flex; gap: 8px; justify-content: center; font-size: 0.7rem; margin-top: 8px; flex-wrap: wrap;">
            <span style="color: #22c55e;">✅ Sisa 1 = Wasesa Segara (Beruntung)</span>
            <span style="color: #f59e0b;">⚡ Sisa 2 = Tunggak Semi (Cobaan)</span>
            <span style="color: #ef4444;">🌪️ Sisa 0 = Satriya Wibawa (Rintangan Berat)</span>
        </div>
    `;
    
    let html = `
        <div class="hasil-card pakar2-result" style="border-left: 4px solid ${warna};">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin-bottom: 16px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="background: #38bdf8; color: #0a0f1d; padding: 4px 16px; border-radius: 100px; font-weight: 700; font-size: 0.8rem;">PAKAR 2</span>
                    <span style="color: var(--text-muted); font-size: 0.8rem;">Bapak Moh. Hamim, S.Pd</span>
                </div>
                <span style="color: var(--text-muted); font-size: 0.75rem;">Metode Sisa Bagi 3</span>
            </div>
            
            <div class="hasil-weton-info">
                👨 ${priaHari} ${priaPasaran} (${neptuPria}) &nbsp;❤️&nbsp; 👩 ${wanitaHari} ${wanitaPasaran} (${neptuWanita})
                <div style="margin-top: 6px; font-size:0.85rem; color:var(--text-muted);">
                    Total Neptu: <strong style="color: ${warna};">${total}</strong> | 
                    Sisa Bagi 3: <strong style="color: ${warna};">${sisa}</strong>
                </div>
            </div>
            
            <div class="ramalan-box">
                <div class="ramalan-judul" style="background: ${warna}20; color: ${warna}; border: 2px solid ${warna}40;">
                    ${ramalan.ikon} ${ramalan.nama}
                </div>
                <div class="ramalan-deskripsi">
                    <p>${ramalan.deskripsi}</p>
                    ${deskripsiDetail}
                    
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
                    
                    ${ramalan.solusi ? `
                        <div style="background: rgba(245,158,11,0.1); padding: 16px; border-radius: 12px; margin-top: 12px; border: 1px solid rgba(245,158,11,0.2);">
                            <strong style="color: #fcd34d;">💡 Solusi yang Disarankan:</strong><br>
                            ${ramalan.solusi}
                        </div>
                    ` : ''}
                </div>
            </div>

            <div class="skor-container">
                <p>🎯 Tingkat Kecocokan (Pakar Hamim)</p>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${ramalan.skor}%; background: ${warna};">
                        ${ramalan.skor}%
                    </div>
                </div>
            </div>
            ${warningHtml}
        </div>
    `;
    
    const hasilDiv = document.getElementById('hasil');
    const existingPakar1 = hasilDiv.querySelector('.hasil-card:not(.pakar2-result)');
    
    if (existingPakar1) {
        const oldPakar2 = hasilDiv.querySelector('.pakar2-result');
        if (oldPakar2) {
            oldPakar2.remove();
        }
        const pakar1Html = hasilDiv.innerHTML;
        hasilDiv.innerHTML = pakar1Html + html;
        hasilDiv.classList.add('show');
    } else {
        hasilDiv.innerHTML = html;
        hasilDiv.classList.add('show');
    }
    hasilDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
