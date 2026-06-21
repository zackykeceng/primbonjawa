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
 */
const hasilRamalan = {
    0: { 
        nama: "Langgeng Sempurna",
        deskripsi: "🏆 INILAH KOMBINASI SEMPURNA! Pasangan ini diprediksi akan memiliki keharmonisan yang abadi dan jalinan cinta yang langgeng hingga ajal memisahkan.",
        skor: 100,
        solusi: "Jaga selalu komunikasi yang baik dan jangan pernah lupa untuk saling menghargai.",
        karakter: "Saling mencintai, harmonis, saling memahami, setia, dan dewasa",
        kelebihan: "Hubungan langgeng, dipenuhi cinta, tidak pernah bosan, dan saling melengkapi",
        kekurangan: "Tidak ada kekurangan yang berarti, perlu menjaga agar tidak terjadi kebosanan",
        // Mitologi & Filosofi
        mitologi: "Langgeng Sempurna adalah cita-cita tertinggi dalam primbon Jawa. Konon, pasangan dengan ramalan ini memiliki ikatan batin yang sangat kuat, seakan-akan mereka adalah dua bagian dari satu jiwa yang sama. Dalam filosofi Jawa, ini disebut 'jodoh sejatining ati' - jodoh yang sejati dari hati yang paling dalam.",
        filosofi: "Angka 0 melambangkan kesempurnaan dan keabadian. Seperti lingkaran yang tidak memiliki ujung, cinta mereka akan terus berputar tanpa henti. Dalam ajaran Jawa, ini mengajarkan bahwa cinta sejati adalah yang mampu bertahan melewati segala badai kehidupan."
    },
    1: { 
        nama: "Wasesa Segara",
        deskripsi: "👑 Pasangan ini memiliki hati yang mulia dan budi pekerti yang luhur. Mereka akan mudah mendapatkan kekayaan, wibawa, dan penghormatan dari masyarakat sekitarnya.",
        skor: 95,
        solusi: "Pertahankan sikap rendah hati dan teruslah berbuat baik kepada sesama.",
        karakter: "Mulia, dermawan, berwibawa, bijaksana, dan rendah hati",
        kelebihan: "Mudah mendapatkan rezeki, dihormati banyak orang, hubungan harmonis",
        kekurangan: "Cenderung terlalu percaya diri dan mudah dimanfaatkan orang lain",
        mitologi: "Wasesa Segara berasal dari kata 'Wasesa' (kekuasaan) dan 'Segara' (lautan). Konon, pasangan ini memiliki kekuatan seperti lautan yang luas - mampu menampung segala kebaikan dan keburukan. Dalam mitologi Jawa, mereka diibaratkan sebagai penjaga kebijaksanaan yang dilimpahi kekuatan dari para dewa.",
        filosofi: "Air laut selalu mengalir ke tempat yang lebih rendah, mengajarkan kerendahan hati. Semakin luas ilmu dan kekuasaan seseorang, semakin rendah hati ia seharusnya. Ini adalah filosofi utama dari ramalan Wasesa Segara."
    },
    2: { 
        nama: "Tunggak Semi",
        deskripsi: "✅ Pasangan ini adalah tipe pekerja keras dan pantang menyerah. Mereka memiliki semangat juang yang tinggi dalam meraih kesuksesan.",
        skor: 85,
        solusi: "Jaga keseimbangan antara bekerja dan beristirahat. Luangkan waktu untuk keluarga.",
        karakter: "Ulet, pekerja keras, tangguh, pantang menyerah, dan ambisius",
        kelebihan: "Rezeki berlimpah, karir cemerlang, mental baja, dan disiplin tinggi",
        kekurangan: "Cenderung workaholic dan kurang memperhatikan kesehatan",
        mitologi: "Tunggak Semi dalam bahasa Jawa berarti 'tumbuh kembali' atau 'pohon yang bertunas'. Konon, pasangan ini seperti pohon yang selalu mampu tumbuh kembali setelah ditebang - simbol ketahanan dan regenerasi. Dalam cerita rakyat, mereka digambarkan sebagai petani yang ulet yang selalu berhasil memanen meskipun dalam kondisi sulit.",
        filosofi: "Kehidupan bagaikan musim - ada masa tanam, masa panen, dan masa istirahat. Filosofi Tunggak Semi mengajarkan bahwa kesuksesan sejati bukanlah tentang seberapa cepat kita mencapai tujuan, tetapi tentang kemampuan untuk bangkit kembali setiap kali kita jatuh."
    },
    3: { 
        nama: "Satriya Wibawa",
        deskripsi: "✨ Pasangan ini ditakdirkan untuk mendapatkan kemuliaan dan keluhuran derajat. Mereka akan memiliki kedudukan yang tinggi dan dihormati oleh banyak orang.",
        skor: 90,
        solusi: "Gunakan kedudukan dan pengaruh yang dimiliki untuk membantu orang lain.",
        karakter: "Berwibawa, pemimpin alami, bijaksana, disegani, dan tegas",
        kelebihan: "Mudah mendapat kepercayaan orang, karir cemerlang, dihormati",
        kekurangan: "Cenderung otoriter dan kurang mendengarkan saran orang lain",
        mitologi: "Satriya Wibawa berarti 'kesatria yang berwibawa'. Dalam pewayangan, karakter ini sering dikaitkan dengan sosok Arjuna - kesatria yang sempurna dalam segala hal. Konon, pasangan ini memiliki 'panji-panji' kehidupan yang selalu berkibar dengan kehormatan.",
        filosofi: "Kewibawaan bukanlah tentang kekuasaan yang memaksa, tetapi tentang pengaruh yang menginspirasi. Seorang Satriya Wibawa memahami bahwa kekuatan sejati terletak pada kemampuan untuk membimbing dan melindungi, bukan untuk mendominasi."
    },
    4: { 
        nama: "Sumur Sinobo",
        deskripsi: "🏠 Rezeki pasangan ini bagaikan sumur yang tak pernah kering. Mereka akan selalu hidup dalam kecukupan dan kebahagiaan.",
        skor: 80,
        solusi: "Syukuri setiap nikmat yang diberikan. Jangan lupa untuk berbagi dengan orang yang membutuhkan.",
        karakter: "Dermawan, murah hati, bahagia, syukur, dan ramah",
        kelebihan: "Rezeki berlimpah, banyak teman, hidup bahagia, dan dikelilingi orang baik",
        kekurangan: "Cenderung boros dan kurang pandai mengelola keuangan",
        mitologi: "Sumur Sinobo dalam bahasa Jawa berarti 'sumur yang melimpah'. Konon, pasangan ini seperti sumur ajaib yang airnya tidak pernah habis meskipun terus diambil. Dalam legenda, sumur ini sering dikaitkan dengan sumber kehidupan yang tidak pernah berhenti memberi berkah.",
        filosofi: "Seperti sumur yang terus memberi tanpa pernah kehabisan, kita diajarkan bahwa kebahagiaan sejati datang dari memberi, bukan menerima. Semakin banyak kita berbagi, semakin banyak pula rezeki yang akan datang."
    },
    5: { 
        nama: "Satriya Wirang",
        deskripsi: "⚠️ Pasangan ini sering kali mengalami kesusahan dan rintangan dalam kehidupan sosialnya.",
        skor: 40,
        solusi: "Perbanyak sedekah, rajin berdoa memohon restu orang tua, dan selalu introspeksi diri.",
        karakter: "Pemberani, ulet, tetapi sering mendapat tantangan dan hambatan dalam hidup",
        kelebihan: "Memiliki ketahanan mental yang kuat dan tidak mudah menyerah",
        kekurangan: "Cenderung mendapat musuh, sering difitnah, dan mengalami kesulitan sosial",
        mitologi: "Satriya Wirang berarti 'kesatria yang mendapat aib'. Dalam kisah pewayangan, ini mengingatkan pada tokoh yang harus melalui ujian berat sebelum mencapai kejayaannya. Konon, pasangan ini sedang berada dalam fase 'pembersihan' - dimana mereka harus membersihkan karma buruk dari kehidupan sebelumnya.",
        filosofi: "Wirang (aib) bukanlah akhir segalanya, melainkan awal dari kebijaksanaan. Dalam filosofi Jawa, setiap kekalahan adalah pelajaran, setiap aib adalah batu loncatan menuju kesempurnaan."
    },
    6: { 
        nama: "Bumi Kapetak",
        deskripsi: "🌍 Pasangan ini memiliki kekuatan mental yang bagaikan bumi yang kokoh.",
        skor: 75,
        solusi: "Pertahankan kesabaran dan keteguhan hati. Jadilah fondasi yang kuat bagi keluarga.",
        karakter: "Sabar, tabah, kokoh, dapat diandalkan, dan kuat mentalnya",
        kelebihan: "Tahan banting, dapat menjadi sandaran, dan selalu tenang",
        kekurangan: "Cenderung pasif dan kurang berinisiatif dalam mengambil keputusan",
        mitologi: "Bumi Kapetak berarti 'bumi yang telah digemburkan'. Konon, pasangan ini seperti tanah yang telah siap ditanami - mereka adalah fondasi yang kokoh bagi keluarga dan masyarakat. Dalam mitologi Jawa, mereka diibaratkan sebagai Dewi Pertiwi (Dewi Bumi) yang melindungi dan menopang semua kehidupan.",
        filosofi: "Bumi selalu diam, tetapi memiliki kekuatan yang luar biasa. Diam bukan berarti pasif, tetapi menunjukkan kebijaksanaan untuk memilih kapan harus bergerak dan kapan harus tetap teguh."
    },
    7: { 
        nama: "Lebur Ketinggang",
        deskripsi: "⚠️ Pasangan ini berpotensi sering mengalami cekcok dan pertengkaran.",
        skor: 30,
        solusi: "Tingkatkan komunikasi intensif, selalu saling mengalah, dan jangan biarkan ego menguasai.",
        karakter: "Emosional, mudah tersulut, egois, dan keras kepala",
        kelebihan: "Memiliki semangat yang besar jika sesuatu sesuai dengan keinginannya",
        kekurangan: "Sering bertengkar, usaha mudah hancur, dan hubungan tidak harmonis",
        mitologi: "Lebur Ketinggang berarti 'hancur tergantung'. Dalam pewayangan, ini adalah peringatan tentang kekuatan ego yang dapat menghancurkan hubungan. Konon, pasangan ini seperti dua ekor kera yang saling tarik-menarik rantai - semakin keras ditarik, semakin kuat ikatan yang terjebak.",
        filosofi: "Kehancuran sering kali datang bukan dari luar, tetapi dari dalam. Lebur Ketinggang mengajarkan bahwa pertengkaran kecil jika dibiarkan akan menjadi badai besar. Kunci kebahagiaan adalah mengendalikan ego dan saling memahami."
    },
    8: { 
        nama: "Padu",
        deskripsi: "🔥 Pasangan ini sering kali terlibat dalam pertengkaran hebat yang berpotensi memicu perpisahan.",
        skor: 25,
        solusi: "Hindari konflik yang tidak perlu, pelajari teknik mengendalikan ego, dan jangan pernah membawa emosi saat berdiskusi.",
        karakter: "Mudah marah, keras kepala, kurang sabar, dan sulit mengendalikan emosi",
        kelebihan: "Memiliki pendirian yang teguh dan tidak mudah terpengaruh",
        kekurangan: "Sering konflik, rentan perceraian, dan emosi yang tidak stabil",
        mitologi: "Padu berarti 'bertemu dan berbenturan'. Dalam mitologi Jawa, ini adalah simbol dari dua kekuatan yang saling bertabrakan. Konon, pasangan ini seperti dua batu karang yang terus menerus dihantam ombak - pada akhirnya, salah satunya akan hancur jika tidak ada yang mengalah.",
        filosofi: "Padu mengajarkan bahwa dalam setiap pertemuan ada potensi untuk berbenturan, tetapi juga ada potensi untuk menyatu. Kuncinya adalah menemukan titik keseimbangan antara mempertahankan prinsip dan mengakomodasi pasangan."
    },
    9: { 
        nama: "Pegat",
        deskripsi: "💔 Menurut tradisi primbon, PEGAT memiliki makna yang sangat buruk yaitu perceraian atau perpisahan yang berat.",
        skor: 10,
        solusi: "Sangat tidak disarankan untuk melanjutkan ke jenjang pernikahan. Jika tetap ingin melanjutkan, lakukan ritual ruwatan dan konsultasi dengan ahli spiritual.",
        karakter: "Cenderung saling bertolak belakang dan sulit menemukan titik temu",
        kelebihan: "Masing-masing memiliki kelebihan yang mungkin bisa melengkapi",
        kekurangan: "Sangat rentan terhadap perceraian, perpisahan, dan konflik berkepanjangan",
        mitologi: "Pegat berarti 'terputus' atau 'patah'. Dalam cerita rakyat Jawa, ini adalah peringatan dari para leluhur tentang ketidakcocokan yang mendasar. Konon, pasangan ini seperti dua utas benang yang berbeda jenis - bisa dijalin menjadi satu, tetapi akan mudah putus karena tidak memiliki daya rekat yang kuat.",
        filosofi: "Pegat mengajarkan bahwa tidak semua pertemuan adalah takdir. Terkadang, perpisahan adalah bentuk kebaikan yang tertinggi - karena dengan berpisah, kita memberi kesempatan pada diri sendiri dan orang lain untuk menemukan jodoh yang lebih sesuai."
    }
};

// Data pendukung
const hariList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const pasaranList = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const bulanList = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

window.lastWetonResult = null;

// ==================== GLOSARIUM ====================
const glossaryData = [
    { term: "Weton", definition: "Hari kelahiran dalam penanggalan Jawa yang merupakan gabungan dari hari dan pasaran. Weton dipercaya memiliki pengaruh terhadap karakter dan nasib seseorang." },
    { term: "Neptu", definition: "Nilai numerik dari hari dan pasaran. Neptu digunakan sebagai dasar perhitungan dalam primbon Jawa untuk berbagai keperluan, termasuk kecocokan jodoh." },
    { term: "Pasaran", definition: "Siklus lima hari dalam kalender Jawa yaitu Legi, Pahing, Pon, Wage, dan Kliwon. Setiap pasaran memiliki nilai neptu yang berbeda." },
    { term: "Primbon", definition: "Kitab warisan leluhur Jawa yang berisi ramalan, perhitungan, dan petunjuk tentang berbagai aspek kehidupan termasuk pernikahan, karier, dan kesehatan." },
    { term: "Forward Chaining", definition: "Metode penalaran dari fakta menuju kesimpulan. Dalam sistem pakar, metode ini menggunakan data yang diketahui untuk mencari solusi yang tepat." },
    { term: "Sisa Bagi", definition: "Hasil pembagian total neptu dengan angka 10. Sisa bagi ini yang menentukan kategori ramalan kecocokan pasangan." },
    { term: "Wasesa Segara", definition: "Ramalan yang berarti 'berkuasa seperti lautan'. Pasangan dengan ramalan ini diprediksi akan memiliki wibawa dan kekayaan." },
    { term: "Tunggak Semi", definition: "Ramalan yang berarti 'tumbuh kembali'. Pasangan ini akan selalu bangkit dari keterpurukan dan memiliki semangat yang tak pernah padam." },
    { term: "Satriya Wibawa", definition: "Ramalan yang berarti 'kesatria berwibawa'. Pasangan ini akan mendapatkan kemuliaan dan dihormati banyak orang." },
    { term: "Sumur Sinobo", definition: "Ramalan yang berarti 'sumur melimpah'. Pasangan ini akan memiliki rezeki yang berlimpah seperti air sumur yang tak pernah kering." },
    { term: "Satriya Wirang", definition: "Ramalan yang berarti 'kesatria yang mendapat aib'. Pasangan ini akan menghadapi banyak cobaan dan tantangan." },
    { term: "Bumi Kapetak", definition: "Ramalan yang berarti 'bumi yang digemburkan'. Pasangan ini adalah fondasi yang kokoh dan dapat diandalkan." },
    { term: "Lebur Ketinggang", definition: "Ramalan yang berarti 'hancur tergantung'. Pasangan ini harus berhati-hati karena berpotensi sering bertengkar." },
    { term: "Padu", definition: "Ramalan yang berarti 'bertemu dan berbenturan'. Pasangan ini akan sering berselisih dan rentan konflik." },
    { term: "Pegat", definition: "Ramalan yang berarti 'terputus' atau 'patah'. Ini adalah ramalan terburuk yang menandakan potensi perceraian atau perpisahan." },
    { term: "Langgeng Sempurna", definition: "Ramalan terbaik yang berarti 'abadi dan sempurna'. Pasangan ini diprediksi memiliki hubungan yang langgeng hingga akhir hayat." }
];

// ==================== MITOLOGI & FILOSOFI ====================
const mythologyData = [
    {
        title: "Wasesa Segara - Kekuatan Lautan",
        story: "Dalam mitologi Jawa, Wasesa Segara terinspirasi dari kisah Nyi Roro Kidul, penguasa Laut Selatan. Konon, pasangan dengan ramalan ini memiliki perlindungan dari kekuatan lautan. Mereka diyakini memiliki hubungan spiritual dengan air laut yang mengajarkan tentang kebijaksanaan dan kedalaman hati.",
        philosophy: "Lautan mengajarkan kita tentang kesabaran, kedalaman, dan kekuatan yang tak terlihat. Seperti ombak yang selalu datang dan pergi, kehidupan pasangan ini akan selalu penuh dengan pasang surut, namun mereka akan tetap teguh seperti karang di tepian."
    },
    {
        title: "Tunggak Semi - Tunas Kehidupan",
        story: "Kisah Tunggak Semi berasal dari legenda pohon Dewandaru yang selalu tumbuh kembali meskipun ditebang. Konon, pasangan ini memiliki semangat hidup seperti pohon tersebut - tidak pernah padam dan selalu mencari jalan untuk bertahan.",
        philosophy: "Hidup adalah tentang proses tumbuh dan berkembang. Setiap jatuh adalah kesempatan untuk bangkit kembali dengan lebih kuat. Tunggak Semi mengajarkan bahwa dalam setiap kegagalan, selalu ada benih keberhasilan yang siap bertunas."
    },
    {
        title: "Satriya Wibawa - Kesatria Sejati",
        story: "Terinspirasi dari sosok Arjuna dalam pewayangan, Satriya Wibawa melambangkan kesatria yang sempurna. Konon, pasangan ini memiliki 'kesaktian' yang membuat mereka selalu berada di jalur kebenaran dan keadilan.",
        philosophy: "Kewibawaan sejati bukanlah tentang seberapa banyak orang yang takut pada kita, tetapi tentang seberapa banyak orang yang terinspirasi oleh kita. Seorang Satriya Wibawa menggunakan kekuatannya untuk melindungi, bukan untuk menindas."
    },
    {
        title: "Sumur Sinobo - Sumber Kehidupan",
        story: "Dalam cerita rakyat Jawa, Sumur Sinobo adalah sumur ajaib yang memberikan air tanpa henti. Konon, pasangan dengan ramalan ini memiliki 'sumur' rezeki yang tidak pernah kering - mereka selalu dikelilingi oleh keberuntungan dan berkah.",
        philosophy: "Sumur Sinobo mengajarkan bahwa kebahagiaan sejati datang dari memberi, bukan menerima. Semakin banyak kita berbagi, semakin banyak pula yang akan kita terima. Ini adalah hukum alam yang tidak pernah berubah."
    },
    {
        title: "Satriya Wirang - Ujian Kesatria",
        story: "Satriya Wirang adalah kisah tentang kesatria yang harus melalui jalan terjal menuju kejayaan. Konon, setiap aib dan kekalahan yang dialami adalah bagian dari proses pembersihan diri yang akan membawa mereka pada kebijaksanaan sejati.",
        philosophy: "Wirang (aib) adalah guru terbaik. Melalui kegagalan dan penghinaan, kita belajar untuk menjadi lebih rendah hati dan bijaksana. Tidak ada kesuksesan yang lahir tanpa perjuangan."
    },
    {
        title: "Bumi Kapetak - Fondasi Kehidupan",
        story: "Terinspirasi dari Dewi Pertiwi, Bumi Kapetak melambangkan kekuatan dan kesuburan. Konon, pasangan ini memiliki 'tanah' yang subur untuk menumbuhkan segala sesuatu - mulai dari cinta, keluarga, hingga karir.",
        philosophy: "Seperti bumi yang selalu menerima dan memberi kehidupan, pasangan Bumi Kapetak adalah fondasi yang kokoh. Mereka mengajarkan bahwa kesabaran dan ketabahan adalah kunci untuk membangun sesuatu yang abadi."
    },
    {
        title: "Lebur Ketinggang - Peringatan Ego",
        story: "Kisah ini mengingatkan pada pertempuran antara Rama dan Rahwana dalam Ramayana. Konon, Lebur Ketinggang adalah peringatan bahwa ego dan kesombongan akan menghancurkan apa pun yang kita bangun.",
        philosophy: "Lebur Ketinggang mengajarkan bahwa dalam setiap hubungan, kita harus belajar untuk mengalah. Tidak ada kemenangan dalam pertengkaran - yang ada hanya kehancuran. Cinta sejati adalah tentang memberi, bukan tentang menang."
    },
    {
        title: "Padu - Pertemuan Dua Kekuatan",
        story: "Padu terinspirasi dari kisah pertemuan dua kekuatan besar dalam mitologi Jawa - seperti pertemuan antara langit dan bumi. Konon, pasangan ini harus belajar untuk menemukan harmoni di antara perbedaan mereka.",
        philosophy: "Perbedaan bukanlah kutukan, tetapi karunia. Padu mengajarkan bahwa dua orang yang berbeda dapat bersatu dengan indah jika mereka mau saling melengkapi dan memahami."
    },
    {
        title: "Pegat - Perpisahan yang Bijaksana",
        story: "Pegat adalah peringatan dari para leluhur tentang pentingnya menyadari ketidakcocokan. Dalam kisah pewayangan, terkadang perpisahan adalah langkah terbaik yang diambil oleh orang-orang bijaksana.",
        philosophy: "Tidak semua pertemuan adalah takdir. Terkadang, berpisah adalah bentuk cinta tertinggi - karena kita memberi kebebasan kepada orang yang kita cintai untuk menemukan kebahagiaan sejatinya."
    },
    {
        title: "Langgeng Sempurna - Cinta Sejati",
        story: "Ini adalah ramalan paling langka dan paling diinginkan. Konon, pasangan dengan ramalan ini adalah 'jodoh sejatining ati' - dua jiwa yang diciptakan untuk satu sama lain sejak awal waktu.",
        philosophy: "Cinta sejati tidak pernah berakhir. Langgeng Sempurna mengajarkan bahwa cinta bukan tentang menemukan orang yang sempurna, tetapi tentang melihat ketidaksempurnaan seseorang dan tetap mencintainya sepenuh hati."
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
    return neptuPria + neptuWanita;
}

function hitungSisaBagi(totalNeptu) {
    return totalNeptu > 10 ? totalNeptu % 10 : totalNeptu;
}

function getKesimpulan(sisa) {
    if (hasilRamalan[sisa]) {
        return hasilRamalan[sisa];
    }
    return hasilRamalan[0];
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
        hitungKecocokan();
    } else {
        alert('Hitung atau cari weton terlebih dahulu!');
    }
}

function transferKeWanita() {
    if (window.lastWetonResult) {
        document.getElementById('wanita-hari').value = window.lastWetonResult.hari;
        document.getElementById('wanita-pasaran').value = window.lastWetonResult.pasaran;
        hitungKecocokan();
    } else {
        alert('Hitung atau cari weton terlebih dahulu!');
    }
}

// ==================== TAB NAVIGATION ====================

document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            tabContents.forEach(c => c.classList.remove('active'));
            document.getElementById('tab-' + tabId).classList.add('active');
        });
    });
    
    // Load initial data
    cariWeton();
    hitungKecocokan();
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

// ==================== FUNGSI UTAMA KECOCOKAN ====================

function hitungKecocokan() {
    const priaHari = document.getElementById('pria-hari').value;
    const priaPasaran = document.getElementById('pria-pasaran').value;
    const wanitaHari = document.getElementById('wanita-hari').value;
    const wanitaPasaran = document.getElementById('wanita-pasaran').value;
    
    const neptuPria = neptuHari[priaHari] + neptuPasaran[priaPasaran];
    const neptuWanita = neptuHari[wanitaHari] + neptuPasaran[wanitaPasaran];
    const totalNeptu = neptuPria + neptuWanita;
    const sisa = hitungSisaBagi(totalNeptu);
    const ramalan = getKesimpulan(sisa);
    const isPantangan = cekPantanganKhusus(neptuPria, neptuWanita);
    const isTotal25Aman = cekTotal25TapiAman(totalNeptu, neptuPria, neptuWanita);
    
    tampilkanHasilDiagnosis({
        priaHari, priaPasaran, neptuPria,
        wanitaHari, wanitaPasaran, neptuWanita,
        totalNeptu, sisa, ramalan, isPantangan, isTotal25Aman
    });
}

function tampilkanHasilDiagnosis(data) {
    const { priaHari, priaPasaran, neptuPria, wanitaHari, wanitaPasaran, neptuWanita, totalNeptu, sisa, ramalan, isPantangan, isTotal25Aman } = data;
    
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
                    Kombinasi total Neptu berjumlah ${totalNeptu} (${neptuPria} + ${neptuWanita}) terdeteksi sebagai LARANGAN MUTLAK.<br>
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
                    
                    <!-- Mitologi & Filosofi -->
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

// ==================== HARI BAIK PERNIKAHAN ====================

function hitungHariBaik() {
    const priaHari = document.getElementById('wedding-pria-hari').value;
    const priaPasaran = document.getElementById('wedding-pria-pasaran').value;
    const wanitaHari = document.getElementById('wedding-wanita-hari').value;
    const wanitaPasaran = document.getElementById('wedding-wanita-pasaran').value;
    const tahun = parseInt(document.getElementById('wedding-tahun').value);
    const bulan = parseInt(document.getElementById('wedding-bulan').value);
    
    if (isNaN(tahun) || tahun < 2024 || tahun > 2035) {
        alert('Masukkan tahun yang valid (2024-2035)');
        return;
    }
    
    const neptuPria = neptuHari[priaHari] + neptuPasaran[priaPasaran];
    const neptuWanita = neptuHari[wanitaHari] + neptuPasaran[wanitaPasaran];
    const totalNeptu = neptuPria + neptuWanita;
    
    // Cari hari baik dalam bulan yang dipilih
    let goodDays = [];
    const daysInMonth = new Date(tahun, bulan, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const weton = getWetonFromDate(day, bulan, tahun);
        const neptuHariIni = neptuHari[weton.hari] + neptuPasaran[weton.pasaran];
        
        // Perhitungan hari baik: total neptu hari + total neptu pasangan
        const total = neptuHariIni + totalNeptu;
        const sisa = hitungSisaBagi(total);
        
        // Hari baik jika sisa 0, 1, 2, 3, 4, 6 (angka baik dalam primbon)
        const isGood = [0, 1, 2, 3, 4, 6].includes(sisa);
        
        if (isGood) {
            goodDays.push({
                tanggal: day,
                weton: weton.weton,
                neptu: neptuHariIni,
                sisa: sisa,
                makna: getMaknaSisa(sisa)
            });
        }
    }
    
    // Tampilkan hasil
    let html = `
        <div class="hasil-card" style="margin-top: 24px;">
            <div class="panel-header">
                <h2>📅 Hasil Pencarian Hari Baik</h2>
            </div>
            <p style="color: var(--text-muted); margin-bottom: 16px;">
                Bulan ${bulanList[bulan-1]} ${tahun} | Total Neptu Pasangan: <strong>${totalNeptu}</strong>
            </p>
    `;
    
    if (goodDays.length === 0) {
        html += `
            <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                <p>😔 Tidak ditemukan hari baik di bulan ini.</p>
                <p>Coba cari di bulan lain atau tahun yang berbeda.</p>
            </div>
        `;
    } else {
        html += `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; max-height: 400px; overflow-y: auto; padding-right: 8px;">
        `;
        
        goodDays.forEach(day => {
            const color = day.sisa === 0 ? '#22c55e' : (day.sisa <= 4 ? '#f59e0b' : '#8b5cf6');
            html += `
                <div style="background: rgba(15,23,42,0.4); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 16px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 800; color: #ffffff;">${day.tanggal}</div>
                    <div style="color: ${color}; font-weight: 600; margin: 4px 0;">${day.weton}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">
                        Neptu: ${day.neptu} | Sisa: ${day.sisa}
                    </div>
                    <div style="font-size: 0.7rem; color: ${color}; margin-top: 4px;">${day.makna}</div>
                    <button class="btn btn-gold" style="margin-top: 8px; padding: 6px 12px; font-size: 0.7rem; width: auto;" onclick="alert('Hari ${day.tanggal} ${bulanList[bulan-1]} ${tahun} dipilih sebagai hari baik pernikahan!')">
                        Pilih Hari Ini
                    </button>
                </div>
            `;
        });
        
        html += `</div>`;
        
        // Rekomendasi
        const bestDay = goodDays[0];
        html += `
            <div style="margin-top: 20px; padding: 16px; background: rgba(34,197,94,0.1); border-radius: 12px; border: 1px solid rgba(34,197,94,0.2);">
                <strong style="color: #86efac;">💍 Rekomendasi Terbaik:</strong><br>
                <span style="color: #ffffff;">Tanggal <strong>${bestDay.tanggal} ${bulanList[bulan-1]} ${tahun}</strong> (${bestDay.weton})</span><br>
                <span style="color: var(--text-muted); font-size: 0.9rem;">Makna: ${bestDay.makna}</span>
            </div>
        `;
    }
    
    html += `</div>`;
    
    const container = document.getElementById('hasil-hari-baik');
    container.innerHTML = html;
    container.classList.add('show');
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function getMaknaSisa(sisa) {
    const makna = {
        0: 'Sempurna, sangat baik',
        1: 'Mulia, berwibawa',
        2: 'Kuat, pekerja keras',
        3: 'Dihormati, beruntung',
        4: 'Rezeki berlimpah',
        5: 'Penuh cobaan (kurang baik)',
        6: 'Kokoh, dapat diandalkan',
        7: 'Cenderung konflik (kurang baik)',
        8: 'Sering berselisih (kurang baik)',
        9: 'Sangat tidak baik'
    };
    return makna[sisa] || 'Tidak diketahui';
}

// ==================== INISIALISASI AWAL ====================

window.onload = function() {
    document.getElementById('tgl').value = 17;
    document.getElementById('bln').value = 8;
    document.getElementById('thn').value = 1945;
    
    cariWeton();
    hitungKecocokan();
};
