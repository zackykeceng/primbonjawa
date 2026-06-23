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
    'Minggu': 5, 
    'Senin': 4, 
    'Selasa': 3, 
    'Rabu': 7, 
    'Kamis': 8, 
    'Jumat': 6, 
    'Sabtu': 9
};

const neptuPasaran = { 
    'Legi': 5, 
    'Pahing': 9, 
    'Pon': 7, 
    'Wage': 4, 
    'Kliwon': 8
};

const hariList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const pasaranList = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const bulanList = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

window.lastWetonResult = null;

// ==================== PAKAR 1: BAPAK SAIMAN ====================

const hasilRamalanSaiman = {
    0: { 
        nama: "Langgeng Sempurna",
        deskripsi: "🏆 INILAH KOMBINASI SEMPURNA! Pasangan ini diprediksi akan memiliki keharmonisan yang abadi dan jalinan cinta yang langgeng hingga ajal memisahkan. Mereka adalah pasangan yang diciptakan untuk saling melengkapi dan menjadi satu sama lain. Kehidupan rumah tangga mereka akan dipenuhi dengan kebahagiaan, kasih sayang, dan kedamaian yang tiada tara.",
        skor: 100,
        solusi: "Jaga selalu komunikasi yang baik, jangan pernah lupa untuk saling menghargai, dan selalu tanamkan rasa syukur atas kehadiran pasangan dalam hidup Anda. Rayakan setiap momen kecil bersama dan jangan biarkan kesibukan merenggut waktu berkualitas.",
        karakter: "Saling mencintai, harmonis, saling memahami, setia, dan dewasa dalam menghadapi setiap masalah",
        kelebihan: "Hubungan langgeng, dipenuhi cinta, tidak pernah bosan, saling melengkapi dengan sempurna, dan menjadi panutan bagi pasangan lain",
        kekurangan: "Tidak ada kekurangan yang berarti, namun perlu menjaga agar tidak terjadi kebosanan dalam hubungan dengan terus melakukan hal-hal baru bersama",
        mitologi: "Langgeng Sempurna adalah cita-cita tertinggi dalam primbon Jawa. Konon, pasangan dengan ramalan ini memiliki ikatan batin yang sangat kuat, seakan-akan mereka adalah dua bagian dari satu jiwa yang sama.",
        filosofi: "Angka 0 melambangkan kesempurnaan dan keabadian. Seperti lingkaran yang tidak memiliki ujung, cinta mereka akan terus berputar tanpa henti. Dalam ajaran Jawa, ini mengajarkan bahwa cinta sejati adalah yang mampu bertahan melewati segala badai kehidupan."
    },
    1: { 
        nama: "Wasesa Segara",
        deskripsi: "👑 Pasangan ini memiliki hati yang mulia dan budi pekerti yang luhur. Mereka akan mudah mendapatkan kekayaan, wibawa, dan penghormatan dari masyarakat sekitarnya. Keberadaan mereka akan memberikan pengaruh positif bagi lingkungan sekitar dan menjadi teladan bagi banyak orang.",
        skor: 95,
        solusi: "Pertahankan sikap rendah hati dan teruslah berbuat baik kepada sesama. Jangan sampai wibawa yang dimiliki membuat Anda menjadi sombong dan lupa diri. Gunakan kelebihan Anda untuk membantu orang lain yang membutuhkan.",
        karakter: "Mulia, dermawan, berwibawa, bijaksana, dan rendah hati meskipun memiliki segalanya",
        kelebihan: "Mudah mendapatkan rezeki, dihormati banyak orang, hubungan harmonis, dan memiliki pengaruh yang baik di masyarakat",
        kekurangan: "Cenderung terlalu percaya diri dan mudah dimanfaatkan oleh orang lain yang tidak bertanggung jawab, perlu lebih selektif dalam memilih teman",
        mitologi: "Wasesa Segara berasal dari kata 'Wasesa' (kekuasaan) dan 'Segara' (lautan). Konon, pasangan ini memiliki kekuatan seperti lautan yang luas - mampu menampung segala kebaikan dan keburukan, serta memiliki kedalaman hati yang luar biasa.",
        filosofi: "Air laut selalu mengalir ke tempat yang lebih rendah, mengajarkan kerendahan hati. Semakin luas ilmu dan kekuasaan seseorang, semakin rendah hati ia seharusnya. Ini adalah filosofi utama dari ramalan Wasesa Segara."
    },
    2: { 
        nama: "Tunggak Semi",
        deskripsi: "✅ Pasangan ini adalah tipe pekerja keras dan pantang menyerah. Mereka memiliki semangat juang yang tinggi dalam meraih kesuksesan dan tidak pernah mudah putus asa menghadapi berbagai rintangan kehidupan. Kegagalan bagi mereka adalah batu loncatan menuju kesuksesan.",
        skor: 85,
        solusi: "Jaga keseimbangan antara bekerja dan beristirahat. Luangkan waktu untuk keluarga dan jangan terlalu larut dalam kesibukan pekerjaan. Ingatlah bahwa kesehatan adalah investasi terbaik untuk masa depan.",
        karakter: "Ulet, pekerja keras, tangguh, pantang menyerah, dan ambisius dalam mencapai tujuan hidup",
        kelebihan: "Rezeki berlimpah, karir cemerlang, mental baja, disiplin tinggi, dan menjadi inspirasi bagi orang lain",
        kekurangan: "Cenderung workaholic dan kurang memperhatikan kesehatan, sehingga rentan terhadap penyakit akibat kelelahan dan stres berkepanjangan",
        mitologi: "Tunggak Semi dalam bahasa Jawa berarti 'tumbuh kembali' atau 'pohon yang bertunas'. Konon, pasangan ini seperti pohon yang selalu mampu tumbuh kembali setelah ditebang - simbol ketahanan dan regenerasi yang luar biasa.",
        filosofi: "Kehidupan bagaikan musim - ada masa tanam, masa panen, dan masa istirahat. Filosofi Tunggak Semi mengajarkan bahwa kesuksesan sejati bukanlah tentang seberapa cepat kita mencapai tujuan, tetapi tentang kemampuan untuk bangkit kembali setiap kali kita jatuh."
    },
    3: { 
        nama: "Satriya Wibawa",
        deskripsi: "✨ Pasangan ini ditakdirkan untuk mendapatkan kemuliaan dan keluhuran derajat. Mereka akan memiliki kedudukan yang tinggi dan dihormati oleh banyak orang. Nama baik mereka akan selalu terjaga dan menjadi teladan bagi masyarakat luas.",
        skor: 90,
        solusi: "Gunakan kedudukan dan pengaruh yang dimiliki untuk membantu orang lain. Jadilah pemimpin yang melayani, bukan pemimpin yang dilayani. Ingatlah bahwa amanah yang diberikan harus dipertanggungjawabkan dengan baik.",
        karakter: "Berwibawa, pemimpin alami, bijaksana, disegani, dan tegas dalam mengambil keputusan yang adil",
        kelebihan: "Mudah mendapat kepercayaan orang, karir cemerlang, dihormati banyak orang, dan memiliki pengaruh yang luas di berbagai kalangan",
        kekurangan: "Cenderung otoriter dan kurang mendengarkan saran orang lain, terkadang terlalu percaya diri dengan pendapatnya sendiri tanpa mempertimbangkan masukan",
        mitologi: "Satriya Wibawa berarti 'kesatria yang berwibawa'. Dalam pewayangan, karakter ini sering dikaitkan dengan sosok Arjuna - kesatria yang sempurna dalam segala hal, memiliki kesaktian dan kebijaksanaan yang luar biasa.",
        filosofi: "Kewibawaan bukanlah tentang kekuasaan yang memaksa, tetapi tentang pengaruh yang menginspirasi. Seorang Satriya Wibawa memahami bahwa kekuatan sejati terletak pada kemampuan untuk membimbing dan melindungi, bukan untuk mendominasi dan menindas."
    },
    4: { 
        nama: "Sumur Sinobo",
        deskripsi: "🏠 Rezeki pasangan ini bagaikan sumur yang tak pernah kering. Mereka akan selalu hidup dalam kecukupan dan kebahagiaan, tidak pernah kekurangan sandang, pangan, dan papan. Keberkahan akan selalu menyertai setiap langkah kehidupan mereka.",
        skor: 80,
        solusi: "Syukuri setiap nikmat yang diberikan. Jangan lupa untuk berbagi dengan orang yang membutuhkan dan jangan pernah merasa cukup dengan apa yang dimiliki. Semakin banyak memberi, semakin banyak pula yang akan diterima.",
        karakter: "Dermawan, murah hati, bahagia, syukur, dan ramah terhadap siapapun tanpa memandang status",
        kelebihan: "Rezeki berlimpah, banyak teman, hidup bahagia, dan dikelilingi oleh orang-orang baik yang tulus dan setia",
        kekurangan: "Cenderung boros dan kurang pandai mengelola keuangan, sehingga perlu belajar untuk lebih bijak dalam berbelanja dan menabung",
        mitologi: "Sumur Sinobo dalam bahasa Jawa berarti 'sumur yang melimpah'. Konon, pasangan ini seperti sumur ajaib yang airnya tidak pernah habis meskipun terus diambil, selalu memberikan berkah tanpa henti.",
        filosofi: "Seperti sumur yang terus memberi tanpa pernah kehabisan, kita diajarkan bahwa kebahagiaan sejati datang dari memberi, bukan menerima. Semakin banyak kita berbagi, semakin banyak pula rezeki yang akan datang."
    },
    5: { 
        nama: "Satriya Wirang",
        deskripsi: "⚠️ Pasangan ini sering kali mengalami kesusahan dan rintangan dalam kehidupan sosialnya. Mereka sering mendapat cobaan berupa fitnah, penghinaan, dan kesulitan dalam pergaulan masyarakat. Namun semua ini adalah ujian untuk menguatkan iman dan kesabaran.",
        skor: 40,
        solusi: "Perbanyak sedekah, rajin berdoa memohon restu orang tua, dan selalu introspeksi diri. Jangan mudah tersinggung dan selalu berpikir positif. Ingatlah bahwa setiap cobaan pasti ada hikmah di baliknya.",
        karakter: "Pemberani, ulet, tetapi sering mendapat tantangan dan hambatan dalam hidup yang datang dari berbagai arah dan pihak",
        kelebihan: "Memiliki ketahanan mental yang kuat, tidak mudah menyerah, dan menjadi pribadi yang lebih tangguh setelah melewati berbagai ujian",
        kekurangan: "Cenderung mendapat musuh, sering difitnah, mengalami kesulitan sosial yang berkepanjangan, dan mudah stres menghadapi tekanan",
        mitologi: "Satriya Wirang berarti 'kesatria yang mendapat aib'. Dalam kisah pewayangan, ini mengingatkan pada tokoh yang harus melalui ujian berat sebelum mencapai kejayaannya, seperti kisah Arjuna yang harus menjalani berbagai ujian.",
        filosofi: "Wirang (aib) bukanlah akhir segalanya, melainkan awal dari kebijaksanaan. Dalam filosofi Jawa, setiap kekalahan adalah pelajaran, setiap aib adalah batu loncatan menuju kesempurnaan dan ketabahan hati."
    },
    6: { 
        nama: "Bumi Kapetak",
        deskripsi: "🌍 Pasangan ini memiliki kekuatan mental yang bagaikan bumi yang kokoh. Mereka adalah fondasi yang kuat bagi keluarga dan lingkungan sekitarnya. Orang-orang selalu merasa aman dan nyaman berada di dekat mereka karena ketenangan yang dipancarkan.",
        skor: 75,
        solusi: "Pertahankan kesabaran dan keteguhan hati. Jadilah fondasi yang kuat bagi keluarga dan jangan ragu untuk menunjukkan inisiatif dalam mengambil keputusan. Terkadang Anda perlu keluar dari zona nyaman untuk bertumbuh.",
        karakter: "Sabar, tabah, kokoh, dapat diandalkan, dan memiliki mental yang kuat serta stabil dalam menghadapi berbagai situasi",
        kelebihan: "Tahan banting, dapat menjadi sandaran bagi banyak orang, selalu tenang dalam menghadapi situasi apapun, dan menjadi tempat curhat yang nyaman",
        kekurangan: "Cenderung pasif dan kurang berinisiatif dalam mengambil keputusan, terlalu mengandalkan orang lain, dan sering melewatkan peluang karena kurang percaya diri",
        mitologi: "Bumi Kapetak berarti 'bumi yang telah digemburkan'. Konon, pasangan ini seperti tanah yang telah siap ditanami - mereka adalah fondasi yang kokoh bagi keluarga dan masyarakat, siap untuk menumbuhkan hal-hal baik.",
        filosofi: "Bumi selalu diam, tetapi memiliki kekuatan yang luar biasa. Diam bukan berarti pasif, tetapi menunjukkan kebijaksanaan untuk memilih kapan harus bergerak dan kapan harus tetap teguh. Kesabaran adalah kekuatan."
    },
    7: { 
        nama: "Lebur Ketinggang",
        deskripsi: "⚠️ Pasangan ini berpotensi sering mengalami cekcok dan pertengkaran. Konflik kecil dapat dengan mudah berkembang menjadi pertengkaran besar jika tidak segera diselesaikan dengan kepala dingin. Perlu usaha ekstra untuk menjaga keharmonisan.",
        skor: 30,
        solusi: "Tingkatkan komunikasi intensif, selalu saling mengalah, dan jangan biarkan ego menguasai diri. Belajarlah untuk mendengarkan dan memahami pasangan. Jika perlu, cari bantuan konseling untuk menyelesaikan masalah.",
        karakter: "Emosional, mudah tersulut, egois, dan keras kepala yang sulit untuk dikendalikan dan disembunyikan",
        kelebihan: "Memiliki semangat yang besar jika sesuatu sesuai dengan keinginannya, mampu bekerja keras untuk mencapai tujuan yang diinginkan",
        kekurangan: "Sering bertengkar, usaha mudah hancur, hubungan tidak harmonis, dan sering menimbulkan penyesalan di kemudian hari",
        mitologi: "Lebur Ketinggang berarti 'hancur tergantung'. Dalam pewayangan, ini adalah peringatan tentang kekuatan ego yang dapat menghancurkan hubungan, seperti kisah tokoh yang hancur karena kesombongannya sendiri.",
        filosofi: "Kehancuran sering kali datang bukan dari luar, tetapi dari dalam. Lebur Ketinggang mengajarkan bahwa pertengkaran kecil jika dibiarkan akan menjadi badai besar. Kunci kebahagiaan adalah mengendalikan ego dan saling memahami dengan tulus."
    },
    8: { 
        nama: "Padu",
        deskripsi: "🔥 Pasangan ini sering kali terlibat dalam pertengkaran hebat yang berpotensi memicu perpisahan. Perbedaan pendapat yang sepele sering berkembang menjadi konflik besar yang menguras energi dan perasaan. Hubungan mereka bagaikan api dan air yang sulit disatukan.",
        skor: 25,
        solusi: "Hindari konflik yang tidak perlu, pelajari teknik mengendalikan ego, dan jangan pernah membawa emosi saat berdiskusi. Berikan waktu untuk menenangkan diri sebelum menyelesaikan masalah. Jangan biarkan amarah menguasai akal sehat.",
        karakter: "Mudah marah, keras kepala, kurang sabar, dan sulit mengendalikan emosi yang meledak-ledak tanpa terkendali",
        kelebihan: "Memiliki pendirian yang teguh, tidak mudah terpengaruh oleh orang lain, dan berani memperjuangkan pendapatnya dengan gigih",
        kekurangan: "Sering konflik, rentan perceraian, emosi yang tidak stabil, dan hubungan yang selalu tegang penuh dengan ketidakpastian",
        mitologi: "Padu berarti 'bertemu dan berbenturan'. Dalam mitologi Jawa, ini adalah simbol dari dua kekuatan yang saling bertabrakan, seperti pertemuan antara langit dan bumi yang menimbulkan gempa.",
        filosofi: "Padu mengajarkan bahwa dalam setiap pertemuan ada potensi untuk berbenturan, tetapi juga ada potensi untuk menyatu. Kuncinya adalah menemukan titik keseimbangan antara mempertahankan prinsip dan mengakomodasi pasangan dengan bijak."
    },
    9: { 
        nama: "Pegat",
        deskripsi: "💔 Menurut tradisi primbon, PEGAT memiliki makna yang sangat buruk yaitu perceraian atau perpisahan yang berat. Pasangan ini akan menghadapi ujian yang sangat berat yang dapat memisahkan mereka. Ini adalah peringatan untuk tidak memaksakan hubungan yang tidak cocok.",
        skor: 10,
        solusi: "Sangat tidak disarankan untuk melanjutkan ke jenjang pernikahan. Jika tetap ingin melanjutkan, lakukan ritual ruwatan dan konsultasi dengan ahli spiritual untuk meminimalisir dampak buruk. Pikirkan matang-matang sebelum mengambil keputusan.",
        karakter: "Cenderung saling bertolak belakang dan sulit menemukan titik temu dalam berbagai hal, seperti air dan minyak yang sulit menyatu",
        kelebihan: "Masing-masing memiliki kelebihan yang mungkin bisa saling melengkapi jika dikelola dengan sangat baik dan penuh kesabaran",
        kekurangan: "Sangat rentan terhadap perceraian, perpisahan, konflik berkepanjangan, dan penderitaan batin yang mendalam serta berkepanjangan",
        mitologi: "Pegat berarti 'terputus' atau 'patah'. Dalam cerita rakyat Jawa, ini adalah peringatan dari para leluhur tentang ketidakcocokan yang mendasar, seperti benang yang mudah putus karena tidak memiliki daya rekat yang cukup.",
        filosofi: "Pegat mengajarkan bahwa tidak semua pertemuan adalah takdir. Terkadang, perpisahan adalah bentuk kebaikan yang tertinggi - karena dengan berpisah, kita memberi kesempatan pada diri sendiri dan orang lain untuk menemukan jodoh yang lebih sesuai dan membahagiakan."
    }
};

// ==================== PAKAR 2: BAPAK MOH. HAMIM, S.Pd ====================

const hasilRamalanHamim = {
    1: {
        nama: "Wasesa Segara (Begja - Beruntung)",
        deskripsi: "🌊 Rumah tangga pasangan ini diramalkan akan dianugerahi keberuntungan yang melimpah, rezeki yang mengalir deras bagaikan air laut, dan kehidupan yang tenteram serta sejahtera. Pasangan ini akan merasakan kemudahan dalam segala urusan dan dikelilingi oleh berkah yang tak terduga. Kehidupan mereka akan dipenuhi dengan kebahagiaan dan kecukupan, sehingga mampu membangun rumah tangga yang harmonis dan penuh cinta kasih.",
        skor: 95,
        solusi: "Syukuri setiap nikmat yang diberikan, jaga sikap rendah hati, dan jangan lupa untuk berbagi dengan sesama agar keberuntungan tetap abadi. Hindari sifat sombong dan lalai, karena kesombongan dapat menghilangkan berkah yang telah diberikan. Teruslah berbuat baik dan menjadi berkah bagi orang lain.",
        karakter: "Beruntung, sejahtera, tenteram, rendah hati, dermawan, dan penuh syukur dalam setiap keadaan",
        kelebihan: "Rezeki melimpah, kehidupan tenteram, mudah dalam segala urusan, dikelilingi berkah, dan hubungan harmonis yang langgeng",
        kekurangan: "Cenderung lalai dalam bersyukur dan mudah terlena dengan kemudahan yang didapat, sehingga perlu selalu mengingat asal-usul nikmat yang diperoleh",
        warna: "#22c55e",
        ikon: "🌊",
        detail: "Sisa 1 (Wasesa Segara / Begja / Beruntung)"
    },
    2: {
        nama: "Tunggak Semi (Lara - Cobaan)",
        deskripsi: "🌱 Rumah tangga pasangan ini akan sering menghadapi berbagai cobaan dan ujian, terutama berupa kesulitan ekonomi yang datang silih berganti atau masalah kesehatan yang mengganggu ketentraman. Namun seperti tunas yang selalu tumbuh kembali, pasangan ini diajarkan untuk tetap tegar dan bangkit dari setiap keterpurukan. Cobaan yang datang bukanlah akhir dari segalanya, melainkan proses untuk mematangkan diri dan memperkuat ikatan batin.",
        skor: 60,
        solusi: "Perbanyak sabar dan tawakal, jaga kesehatan dengan pola hidup yang baik, kelola keuangan dengan bijak, perbanyak doa memohon perlindungan, dan jangan pernah putus asa dalam menghadapi setiap ujian. Setiap cobaan pasti ada hikmah di baliknya yang akan membuat Anda lebih kuat.",
        karakter: "Tangguh, ulet, sabar, tabah, pantang menyerah, dan memiliki ketahanan mental yang kuat dalam menghadapi badai kehidupan",
        kelebihan: "Memiliki ketahanan mental yang kuat, mampu bangkit dari keterpurukan, menjadi pribadi yang lebih bijaksana, dan hubungan semakin erat karena saling mendukung dalam suka dan duka",
        kekurangan: "Sering dilanda kesulitan ekonomi, gangguan kesehatan, ujian yang datang bertubi-tubi, dan perlu usaha ekstra untuk menjaga keharmonisan di tengah tekanan",
        warna: "#f59e0b",
        ikon: "🌱",
        detail: "Sisa 2 (Tunggak Semi / Lara / Cobaan)"
    },
    0: {
        nama: "Satriya Wibawa (Pati - Rintangan Berat)",
        deskripsi: "⚔️ Rumah tangga pasangan ini akan mengalami banyak rintangan dan halangan yang berat, penderitaan batin yang mendalam, serta cobaan yang menguji kesabaran. Bahkan tidak menutup kemungkinan akan terjadi perpisahan atau kehilangan yang menyakitkan. Namun seperti kesatria yang berwibawa, pasangan ini dituntut untuk tetap teguh menghadapi segala ujian dengan ketabahan hati. Rintangan yang berat ini mengajarkan bahwa kehidupan bukanlah selalu tentang kemudahan, tetapi juga tentang bagaimana kita menghadapi tantangan dengan kepala tegak.",
        skor: 30,
        solusi: "Perbanyak ibadah dan doa, konsultasikan masalah dengan orang tua dan ahli spiritual, jangan mengambil keputusan besar dalam keadaan emosi, persiapkan mental untuk menghadapi segala kemungkinan terburuk, dan jika memungkinkan lakukan ritual ruwatan untuk membersihkan energi negatif yang menghambat.",
        karakter: "Teguh, tabah, berwibawa, tetapi sering dilanda penderitaan batin dan rintangan berat yang menguji kesabaran dan keteguhan hati",
        kelebihan: "Memiliki keteguhan hati yang luar biasa, mampu bertahan dalam situasi sulit, menjadi pribadi yang lebih dewasa dan bijaksana, serta memiliki wibawa yang muncul dari penderitaan yang dilalui dengan tabah",
        kekurangan: "Rentan terhadap perpisahan, kehilangan, penderitaan batin, rintangan hidup yang berat, dan konflik berkepanjangan yang menguras energi fisik maupun mental",
        warna: "#ef4444",
        ikon: "⚔️",
        detail: "Sisa 0 (Satriya Wibawa / Pati / Rintangan Berat)"
    }
};

// ==================== GLOSARIUM ====================

const glossaryData = [
    { term: "Weton", definition: "Hari kelahiran dalam penanggalan Jawa yang merupakan gabungan dari hari dan pasaran. Weton dipercaya memiliki pengaruh terhadap karakter dan nasib seseorang. Setiap weton memiliki energi dan makna tersendiri dalam kehidupan." },
    { term: "Neptu", definition: "Nilai numerik dari hari dan pasaran. Neptu digunakan sebagai dasar perhitungan dalam primbon Jawa untuk berbagai keperluan, termasuk kecocokan jodoh, hari baik, dan ramalan nasib." },
    { term: "Pasaran", definition: "Siklus lima hari dalam kalender Jawa yaitu Legi, Pahing, Pon, Wage, dan Kliwon. Setiap pasaran memiliki nilai neptu yang berbeda dan pengaruh yang unik terhadap karakter seseorang." },
    { term: "Primbon", definition: "Kitab warisan leluhur Jawa yang berisi ramalan, perhitungan, dan petunjuk tentang berbagai aspek kehidupan termasuk pernikahan, karier, kesehatan, dan spiritualitas." },
    { term: "Forward Chaining", definition: "Metode penalaran dari fakta menuju kesimpulan. Dalam sistem pakar, metode ini menggunakan data yang diketahui untuk mencari solusi yang tepat. Prosesnya dimulai dari fakta-fakta yang ada, kemudian ditarik kesimpulan berdasarkan aturan yang telah ditentukan." },
    { term: "Sisa Bagi 10", definition: "Hasil pembagian total neptu dengan angka 10. Digunakan dalam metode Pakar 1: Bapak Saiman. Sisa pembagian (0-9) menentukan kategori ramalan kecocokan pasangan." },
    { term: "Sisa Bagi 3", definition: "Hasil pembagian total neptu dengan angka 3. Digunakan dalam metode Pakar 2: Bapak Moh. Hamim, S.Pd. Sisa pembagian (0, 1, atau 2) menentukan kategori ramalan yang berbeda." },
    { term: "Langgeng Sempurna", definition: "Ramalan terbaik yang berarti 'abadi dan sempurna'. Pasangan ini diprediksi memiliki hubungan yang langgeng hingga akhir hayat. Mereka adalah jodoh sejati yang diciptakan untuk saling melengkapi." },
    { term: "Wasesa Segara", definition: "Ramalan yang berarti 'berkuasa seperti lautan'. Pasangan dengan ramalan ini diprediksi akan memiliki wibawa, kekayaan, dan keberuntungan yang melimpah bagaikan air laut." },
    { term: "Tunggak Semi", definition: "Ramalan yang berarti 'tumbuh kembali'. Pasangan ini akan selalu bangkit dari keterpurukan dan memiliki semangat yang tak pernah padam dalam menghadapi berbagai tantangan hidup." },
    { term: "Satriya Wibawa", definition: "Ramalan yang berarti 'kesatria berwibawa'. Pasangan ini akan mendapatkan kemuliaan dan dihormati banyak orang, namun harus siap menghadapi berbagai rintangan berat dalam perjalanan hidupnya." },
    { term: "Sumur Sinobo", definition: "Ramalan yang berarti 'sumur melimpah'. Pasangan ini akan memiliki rezeki yang berlimpah seperti air sumur yang tak pernah kering, selalu diberkahi dalam setiap aspek kehidupan." },
    { term: "Satriya Wirang", definition: "Ramalan yang berarti 'kesatria yang mendapat aib'. Pasangan ini akan menghadapi banyak cobaan dan tantangan dalam kehidupan sosial, namun semua itu akan membuat mereka lebih kuat." },
    { term: "Bumi Kapetak", definition: "Ramalan yang berarti 'bumi yang digemburkan'. Pasangan ini adalah fondasi yang kokoh dan dapat diandalkan oleh banyak orang, menjadi tempat bersandar yang aman." },
    { term: "Lebur Ketinggang", definition: "Ramalan yang berarti 'hancur tergantung'. Pasangan ini harus berhati-hati karena berpotensi sering bertengkar dan mengalami konflik yang dapat merusak hubungan." },
    { term: "Padu", definition: "Ramalan yang berarti 'bertemu dan berbenturan'. Pasangan ini akan sering berselisih dan rentan terhadap konflik yang berkepanjangan jika tidak dikelola dengan baik." },
    { term: "Pegat", definition: "Ramalan yang berarti 'terputus' atau 'patah'. Ini adalah ramalan terburuk yang menandakan potensi perceraian atau perpisahan. Sangat tidak disarankan untuk melanjutkan ke jenjang pernikahan." }
];

// ==================== MITOLOGI & FILOSOFI ====================

const mythologyData = [
    {
        title: "Wasesa Segara - Kekuatan Lautan",
        story: "📖 Dalam mitologi Jawa, Wasesa Segara terinspirasi dari kisah Nyi Roro Kidul, penguasa Laut Selatan. Konon, pasangan dengan ramalan ini memiliki perlindungan dari kekuatan lautan. Mereka diyakini memiliki hubungan spiritual dengan air laut yang mengajarkan tentang kebijaksanaan dan kedalaman hati. Lautan yang luas dan dalam melambangkan kebijaksanaan yang tak terbatas dan kemampuan untuk menerima segala sesuatu dengan lapang dada.",
        philosophy: "🧘 Lautan mengajarkan kita tentang kesabaran, kedalaman, dan kekuatan yang tak terlihat. Seperti ombak yang selalu datang dan pergi, kehidupan pasangan ini akan selalu penuh dengan pasang surut, namun mereka akan tetap teguh seperti karang di tepian. Air laut yang jernih mengajarkan tentang kejernihan hati dan pikiran dalam menghadapi segala masalah."
    },
    {
        title: "Tunggak Semi - Tunas Kehidupan",
        story: "📖 Kisah Tunggak Semi berasal dari legenda pohon Dewandaru yang selalu tumbuh kembali meskipun ditebang. Konon, pasangan ini memiliki semangat hidup seperti pohon tersebut - tidak pernah padam dan selalu mencari jalan untuk bertahan. Tunas yang selalu tumbuh kembali melambangkan ketahanan dan kemampuan untuk bangkit dari keterpurukan, seperti siklus kehidupan yang terus berputar.",
        philosophy: "🧘 Hidup adalah tentang proses tumbuh dan berkembang. Setiap jatuh adalah kesempatan untuk bangkit kembali dengan lebih kuat. Tunggak Semi mengajarkan bahwa dalam setiap kegagalan, selalu ada benih keberhasilan yang siap bertunas. Kesabaran dan ketekunan adalah kunci untuk mencapai kesuksesan sejati dalam hidup."
    },
    {
        title: "Satriya Wibawa - Kesatria Sejati",
        story: "📖 Terinspirasi dari sosok Arjuna dalam pewayangan, Satriya Wibawa melambangkan kesatria yang sempurna. Konon, pasangan ini memiliki 'kesaktian' yang membuat mereka selalu berada di jalur kebenaran dan keadilan. Mereka adalah teladan bagi masyarakat dan selalu berjuang untuk menegakkan kebenaran meskipun harus menghadapi berbagai rintangan dan pengorbanan.",
        philosophy: "🧘 Kewibawaan sejati bukanlah tentang seberapa banyak orang yang takut pada kita, tetapi tentang seberapa banyak orang yang terinspirasi oleh kita. Seorang Satriya Wibawa menggunakan kekuatannya untuk melindungi, bukan untuk menindas. Kemuliaan sejati datang dari pelayanan kepada sesama tanpa pamrih."
    },
    {
        title: "Sumur Sinobo - Sumber Kehidupan",
        story: "📖 Dalam cerita rakyat Jawa, Sumur Sinobo adalah sumur ajaib yang memberikan air tanpa henti. Konon, pasangan dengan ramalan ini memiliki 'sumur' rezeki yang tidak pernah kering - mereka selalu dikelilingi oleh keberuntungan dan berkah. Air yang tak pernah habis melambangkan rezeki yang terus mengalir dan keberkahan yang tak terbatas dari Yang Maha Kuasa.",
        philosophy: "🧘 Sumur Sinobo mengajarkan bahwa kebahagiaan sejati datang dari memberi, bukan menerima. Semakin banyak kita berbagi, semakin banyak pula yang akan kita terima. Ini adalah hukum alam yang tidak pernah berubah. Kebaikan yang kita tebar akan kembali kepada kita dalam bentuk yang lebih besar dan berlipat ganda."
    },
    {
        title: "Satriya Wirang - Ujian Kesatria",
        story: "📖 Satriya Wirang adalah kisah tentang kesatria yang harus melalui jalan terjal menuju kejayaan. Konon, setiap aib dan kekalahan yang dialami adalah bagian dari proses pembersihan diri yang akan membawa mereka pada kebijaksanaan sejati. Jalan yang terjal mengajarkan tentang ketabahan dan keteguhan hati dalam menghadapi berbagai ujian kehidupan.",
        philosophy: "🧘 Wirang (aib) adalah guru terbaik. Melalui kegagalan dan penghinaan, kita belajar untuk menjadi lebih rendah hati dan bijaksana. Tidak ada kesuksesan yang lahir tanpa perjuangan. Setiap penderitaan yang dialami adalah batu loncatan menuju pencapaian yang lebih tinggi dan bermakna."
    },
    {
        title: "Bumi Kapetak - Fondasi Kehidupan",
        story: "📖 Terinspirasi dari Dewi Pertiwi, Bumi Kapetak melambangkan kekuatan dan kesuburan. Konon, pasangan ini memiliki 'tanah' yang subur untuk menumbuhkan segala sesuatu - mulai dari cinta, keluarga, hingga karir. Bumi yang subur melambangkan potensi yang tak terbatas dan kemampuan untuk memberikan kehidupan bagi banyak orang.",
        philosophy: "🧘 Seperti bumi yang selalu menerima dan memberi kehidupan, pasangan Bumi Kapetak adalah fondasi yang kokoh. Mereka mengajarkan bahwa kesabaran dan ketabahan adalah kunci untuk membangun sesuatu yang abadi. Fondasi yang kuat akan menopang bangunan yang tinggi dan bertahan lama."
    },
    {
        title: "Lebur Ketinggang - Peringatan Ego",
        story: "📖 Kisah ini mengingatkan pada pertempuran antara Rama dan Rahwana dalam Ramayana. Konon, Lebur Ketinggang adalah peringatan bahwa ego dan kesombongan akan menghancurkan apa pun yang kita bangun. Pertempuran antara kebaikan dan kejahatan mengajarkan tentang pentingnya mengendalikan hawa nafsu dan ego yang berlebihan.",
        philosophy: "🧘 Lebur Ketinggang mengajarkan bahwa dalam setiap hubungan, kita harus belajar untuk mengalah. Tidak ada kemenangan dalam pertengkaran - yang ada hanya kehancuran. Cinta sejati adalah tentang memberi, bukan tentang menang. Kerendahan hati adalah kunci kebahagiaan yang abadi."
    },
    {
        title: "Padu - Pertemuan Dua Kekuatan",
        story: "📖 Padu terinspirasi dari kisah pertemuan dua kekuatan besar dalam mitologi Jawa - seperti pertemuan antara langit dan bumi. Konon, pasangan ini harus belajar untuk menemukan harmoni di antara perbedaan mereka. Pertemuan dua kekuatan yang berbeda dapat menciptakan keseimbangan yang sempurna jika dikelola dengan bijak.",
        philosophy: "🧘 Perbedaan bukanlah kutukan, tetapi karunia. Padu mengajarkan bahwa dua orang yang berbeda dapat bersatu dengan indah jika mereka mau saling melengkapi dan memahami. Perbedaan adalah bumbu kehidupan yang membuat hubungan menjadi lebih berwarna dan bermakna."
    },
    {
        title: "Pegat - Perpisahan yang Bijaksana",
        story: "📖 Pegat adalah peringatan dari para leluhur tentang pentingnya menyadari ketidakcocokan. Dalam kisah pewayangan, terkadang perpisahan adalah langkah terbaik yang diambil oleh orang-orang bijaksana. Menyadari bahwa tidak semua pertemuan adalah takdir adalah bentuk kebijaksanaan tertinggi yang harus dimiliki.",
        philosophy: "🧘 Tidak semua pertemuan adalah takdir. Terkadang, berpisah adalah bentuk cinta tertinggi - karena kita memberi kebebasan kepada orang yang kita cintai untuk menemukan kebahagiaan sejatinya. Melepaskan dengan ikhlas adalah bentuk cinta yang paling tulus dan bijaksana."
    },
    {
        title: "Langgeng Sempurna - Cinta Sejati",
        story: "📖 Ini adalah ramalan paling langka dan paling diinginkan. Konon, pasangan dengan ramalan ini adalah 'jodoh sejatining ati' - dua jiwa yang diciptakan untuk satu sama lain sejak awal waktu. Mereka adalah pasangan yang sempurna, saling melengkapi dalam segala hal, dan menjadi satu kesatuan yang utuh.",
        philosophy: "🧘 Cinta sejati tidak pernah berakhir. Langgeng Sempurna mengajarkan bahwa cinta bukan tentang menemukan orang yang sempurna, tetapi tentang melihat ketidaksempurnaan seseorang dan tetap mencintainya sepenuh hati. Cinta sejati adalah tentang penerimaan dan pengertian yang tulus tanpa syarat."
    }
];

// ==================== PANDUAN PERNIKAHAN ====================

const guideData = [
    {
        title: "💑 Panduan Umum Membina Rumah Tangga",
        content: "1. Selalu jaga komunikasi yang terbuka dan jujur dengan pasangan\n2. Saling menghormati dan menghargai perbedaan yang ada\n3. Bangun kepercayaan melalui konsistensi dan kesetiaan\n4. Luangkan waktu berkualitas bersama secara rutin\n5. Hadapi masalah bersama dengan kepala dingin\n6. Jangan pernah membawa masalah tidur ke tempat tidur\n7. Selalu tanamkan rasa syukur atas kehadiran pasangan",
        icon: "💑"
    },
    {
        title: "🏆 Tips untuk Pasangan Langgeng Sempurna",
        content: "1. Jangan pernah bosan menunjukkan kasih sayang setiap hari\n2. Teruslah bertumbuh bersama sebagai pasangan yang saling mendukung\n3. Jadikan setiap hari sebagai hari istimewa untuk pasangan\n4. Jaga api cinta tetap menyala dengan kejutan-kejutan kecil\n5. Selalu bersyukur atas kehadiran pasangan dalam hidup\n6. Bangun mimpi dan tujuan bersama untuk masa depan\n7. Jangan lupa untuk saling memaafkan dan melupakan kesalahan",
        icon: "🏆"
    },
    {
        title: "👑 Tips untuk Pasangan Wasesa Segara",
        content: "1. Gunakan wibawa untuk membantu orang lain yang membutuhkan\n2. Jaga kerendahan hati meskipun telah sukses dan berkuasa\n3. Jadilah teladan bagi keluarga dan masyarakat sekitar\n4. Seimbangkan kehidupan material dan spiritual dengan baik\n5. Perkuat ikatan dengan doa bersama setiap hari\n6. Jangan lupa bersedekah dan berbagi rezeki dengan sesama\n7. Hindari sifat sombong dan angkuh yang dapat merusak",
        icon: "👑"
    },
    {
        title: "🌱 Tips untuk Pasangan Tunggak Semi",
        content: "1. Jaga keseimbangan antara kerja dan istirahat yang cukup\n2. Prioritaskan keluarga di tengah kesibukan pekerjaan\n3. Bangun visi bersama untuk masa depan yang lebih baik\n4. Dukung karir masing-masing tanpa mengorbankan waktu bersama\n5. Belajar untuk menikmati proses, bukan hanya hasil akhir\n6. Jangan menyerah pada cobaan yang datang silih berganti\n7. Perkuat ikatan spiritual dan doa bersama dalam suka dan duka",
        icon: "🌱"
    },
    {
        title: "⚔️ Tips untuk Pasangan Satriya Wibawa",
        content: "1. Gunakan pengaruh untuk kebaikan banyak orang\n2. Dengarkan saran dan masukan dari pasangan dengan hati terbuka\n3. Bagilah tanggung jawab dalam rumah tangga secara adil\n4. Jadilah pemimpin yang melayani, bukan mendominasi\n5. Tetap rendah hati di tengah kemuliaan yang diraih\n6. Jangan lupa untuk selalu bermusyawarah dalam mengambil keputusan\n7. Perkuat hubungan dengan keluarga besar dan masyarakat",
        icon: "⚔️"
    },
    {
        title: "🏠 Tips untuk Pasangan Sumur Sinobo",
        content: "1. Kelola keuangan dengan bijak dan terencana\n2. Jangan lupa bersyukur dan berbagi dengan sesama\n3. Investasikan rezeki untuk masa depan yang lebih cerah\n4. Bangun dana darurat untuk situasi tak terduga\n5. Hindari gaya hidup konsumtif yang berlebihan\n6. Buat perencanaan keuangan jangka panjang yang matang\n7. Belajar untuk hidup sederhana namun tetap berkualitas",
        icon: "🏠"
    },
    {
        title: "🛡️ Tips untuk Pasangan Satriya Wirang",
        content: "1. Perbanyak sedekah dan amal kebaikan setiap hari\n2. Jaga hubungan baik dengan orang tua dan keluarga\n3. Perbanyak doa dan ibadah dengan khusyuk\n4. Hindari konflik yang tidak perlu dengan siapapun\n5. Fokus pada pengembangan diri dan karir\n6. Jangan mudah tersinggung dan selalu berpikir positif\n7. Perbanyak introspeksi diri dan perbaiki kekurangan",
        icon: "🛡️"
    },
    {
        title: "🌍 Tips untuk Pasangan Bumi Kapetak",
        content: "1. Jangan terlalu pasif, ambil inisiatif dalam berbagai hal\n2. Berani mengambil keputusan bersama dengan mantap\n3. Kembangkan keberanian dalam menghadapi tantangan\n4. Jangan takut untuk memulai sesuatu yang baru\n5. Bersikaplah lebih spontan dan menyenangkan\n6. Keluar dari zona nyaman untuk bertumbuh bersama\n7. Belajar untuk lebih ekspresif dalam mengungkapkan perasaan",
        icon: "🌍"
    },
    {
        title: "⚠️ Tips untuk Pasangan Lebur Ketinggang",
        content: "1. Pelajari teknik komunikasi yang baik dan efektif\n2. Kurangi ego dan belajar untuk saling mengalah\n3. Jangan memperbesar masalah kecil yang sepele\n4. Segera selesaikan konflik tanpa ditunda-tunda\n5. Cari bantuan konseling jika diperlukan\n6. Belajar mendengarkan dengan hati, bukan dengan ego\n7. Buat aturan main yang disepakati bersama",
        icon: "⚠️"
    },
    {
        title: "🔥 Tips untuk Pasangan Padu",
        content: "1. Hindari kata-kata yang menyakitkan dan kasar\n2. Belajar mengendalikan emosi dengan bijak\n3. Beri waktu untuk menenangkan diri sebelum berdiskusi\n4. Jangan berdebat di depan anak-anak\n5. Cari titik tengah dalam setiap perbedaan pendapat\n6. Fokus pada solusi, bukan pada siapa yang salah\n7. Belajar untuk memaafkan dan melupakan kesalahan masa lalu",
        icon: "🔥"
    },
    {
        title: "💔 Tips untuk Pasangan Pegat",
        content: "1. Pertimbangkan kembali dengan sangat matang\n2. Konsultasi dengan orang tua dan ahli spiritual\n3. Lakukan ritual ruwatan jika memungkinkan\n4. Siapkan mental untuk segala kemungkinan terburuk\n5. Jangan memaksakan diri jika sudah tidak cocok\n6. Prioritaskan kebahagiaan masing-masing\n7. Jika terpaksa berpisah, lakukan dengan baik-baik dan dewasa",
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
                <div class="mythology-story">${item.story}</div>
                <div class="mythology-philosophy">${item.philosophy}</div>
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

// ==================== FUNGSI PAKAR 1: BAPAK SAIMAN ====================

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
        <div class="hasil-card" style="border-left: 4px solid #f59e0b;" id="hasil-pakar1">
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
            
            <!-- Tombol scroll ke pakar 2 -->
            <div style="text-align: center; margin-top: 20px;">
                <button onclick="scrollKePakar2()" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: var(--text-muted); padding: 8px 20px; border-radius: 100px; cursor: pointer; font-family: var(--font-sans); font-size: 0.8rem; transition: all 0.3s ease;">
                    ⬇ Lihat Hasil Pakar 2 (Moh. Hamim)
                </button>
            </div>
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

// ==================== FUNGSI PAKAR 2: BAPAK MOH. HAMIM, S.Pd ====================

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
        <div class="hasil-card pakar2-result" style="border-left: 4px solid ${warna};" id="hasil-pakar2">
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
            
            <!-- Tombol scroll ke pakar 1 -->
            <div style="text-align: center; margin-top: 20px;">
                <button onclick="scrollKePakar1()" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: var(--text-muted); padding: 8px 20px; border-radius: 100px; cursor: pointer; font-family: var(--font-sans); font-size: 0.8rem; transition: all 0.3s ease;">
                    ⬆ Lihat Hasil Pakar 1 (Saiman)
                </button>
            </div>
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
    
    // === SCROLL KE HASIL PAKAR 2 ===
    setTimeout(function() {
        const hasilPakar2 = document.getElementById('hasil-pakar2');
        if (hasilPakar2) {
            const headerOffset = 80;
            const elementPosition = hasilPakar2.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Highlight effect
            hasilPakar2.style.transition = 'box-shadow 0.5s ease, border-color 0.5s ease';
            hasilPakar2.style.boxShadow = '0 0 0 3px rgba(56, 189, 248, 0.4), 0 20px 60px rgba(0,0,0,0.5)';
            hasilPakar2.style.borderColor = '#38bdf8';
            
            setTimeout(function() {
                hasilPakar2.style.boxShadow = '';
                hasilPakar2.style.borderColor = '';
            }, 2000);
        }
    }, 300);
}

// ==================== FUNGSI SCROLL ANTAR PAKAR ====================

function scrollKePakar1() {
    const hasilPakar1 = document.getElementById('hasil-pakar1');
    if (hasilPakar1) {
        const headerOffset = 80;
        const elementPosition = hasilPakar1.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Highlight effect
        hasilPakar1.style.transition = 'box-shadow 0.5s ease, border-color 0.5s ease';
        hasilPakar1.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.4), 0 20px 60px rgba(0,0,0,0.5)';
        hasilPakar1.style.borderColor = '#f59e0b';
        
        setTimeout(function() {
            hasilPakar1.style.boxShadow = '';
            hasilPakar1.style.borderColor = '';
        }, 2000);
    }
}

function scrollKePakar2() {
    const hasilPakar2 = document.getElementById('hasil-pakar2');
    if (hasilPakar2) {
        const headerOffset = 80;
        const elementPosition = hasilPakar2.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Highlight effect
        hasilPakar2.style.transition = 'box-shadow 0.5s ease, border-color 0.5s ease';
        hasilPakar2.style.boxShadow = '0 0 0 3px rgba(56, 189, 248, 0.4), 0 20px 60px rgba(0,0,0,0.5)';
        hasilPakar2.style.borderColor = '#38bdf8';
        
        setTimeout(function() {
            hasilPakar2.style.boxShadow = '';
            hasilPakar2.style.borderColor = '';
        }, 2000);
    }
}
