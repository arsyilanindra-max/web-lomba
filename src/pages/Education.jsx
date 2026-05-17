import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ChevronDown,
  ExternalLink,
  Shield,
  Brain,
  AlertTriangle,
  Heart,
  X,
  Users,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const JURNAL = [
  {
    judul: 'Bullying and Its Association with Autoimmune Disease in Adolescents',
    penulis: 'Danese, A., et al.',
    tahun: '2020',
    jurnal: 'Journal of Adolescent Health',
    link: 'https://www.jahonline.org',
  },
  {
    judul: 'Childhood Stress and the Development of Autoimmune Disorders',
    penulis: 'Coelho, R., et al.',
    tahun: '2018',
    jurnal: 'Psychosomatic Medicine',
    link: 'https://journals.lww.com/psychosomaticmedicine',
  },
  {
    judul: 'Emotional Suppression and Physical Health: A Meta-Analytic Review',
    penulis: 'Gross, J.J. & John, O.P.',
    tahun: '2003',
    jurnal: 'Journal of Personality and Social Psychology',
    link: 'https://psycnet.apa.org',
  },
  {
    judul: 'The Effects of Bullying on Mental and Physical Health Among School-Aged Children',
    penulis: 'Gini, G. & Pozzoli, T.',
    tahun: '2009',
    jurnal: 'Pediatrics',
    link: 'https://publications.aap.org/pediatrics',
  },
  {
    judul: 'Memendam Emosi dan Dampaknya pada Sistem Imun: Tinjauan Literatur',
    penulis: 'Sari, D.P. & Rahmawati, F.',
    tahun: '2021',
    jurnal: 'Jurnal Psikologi Indonesia',
    link: 'https://jurnal.psikologi.ugm.ac.id',
  },
];

const topics = [
  {
    id: 'bullying',
    icon: Shield,
    cardBg: 'bg-rose-50/80 border border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30',
    cardShadow: 'hover:shadow-rose-100/50 hover:border-rose-200',
    iconBg: 'bg-rose-100/60 dark:bg-rose-900/40',
    iconColor: 'text-rose-600 dark:text-rose-400',
    solidBg: 'bg-rose-400 dark:bg-rose-600',
    linkColor: 'text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 transition-colors',
    btnBg: 'bg-rose-100/60 hover:bg-rose-200/60 dark:bg-rose-900/30 dark:hover:bg-rose-900/50',
    btnTextColor: 'text-rose-700 dark:text-rose-300',
    title: 'Apa Itu Perundungan (Bullying)?',
    content: [
      {
        subtitle: 'Definisi',
        text: 'Perundungan adalah tindakan agresif yang dilakukan secara berulang oleh seseorang atau kelompok terhadap individu yang lebih lemah. Bentuknya bisa berupa kekerasan fisik, verbal (mengejek, menghina), relasional (mengucilkan), maupun cyberbullying (melalui media digital).',
      },
      {
        subtitle: 'Tanda-tanda Kamu Mengalami Perundungan',
        list: [
          'Merasa takut atau tidak nyaman pergi to sekolah',
          'Sering "hilang" barang atau uang tanpa alasan jelas',
          'Mengalami luka fisik yang tidak bisa dijelaskan',
          'Merasa tidak punya teman atau sering dikucilkan',
          'Sering mimpi buruk atau sulit tidur',
          'Menarik diri dari aktivitas yang biasanya disukai',
        ],
      },
      {
        subtitle: 'Apa yang Harus Dilakukan?',
        list: [
          'Ceritakan kepada orang dewasa yang kamu percaya (guru, orang tua)',
          'Jangan balas dengan kekerasan, tapi catat kejadiannya!',
          'Cari dukungan dari teman atau kelompok yang aman.',
          'Hubungi guru BK atau konselor sekolahmu',
          'Ingat: ini bukan salahmu',
        ],
      },
    ],
  },
  {
    id: 'jenis-bullying',
    icon: Users,
    cardBg: 'bg-violet-50/80 border border-violet-100 dark:bg-violet-950/20 dark:border-violet-900/30',
    cardShadow: 'hover:shadow-violet-100/50 hover:border-violet-200',
    iconBg: 'bg-violet-100/60 dark:bg-violet-900/40',
    iconColor: 'text-violet-600 dark:text-violet-400',
    solidBg: 'bg-violet-400 dark:bg-violet-600',
    linkColor: 'text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors',
    btnBg: 'bg-violet-100/60 hover:bg-violet-200/60 dark:bg-violet-900/30 dark:hover:bg-violet-900/50',
    btnTextColor: 'text-violet-700 dark:text-violet-300',
    title: 'Jenis-Jenis Bullying',
    content: [
      {
        subtitle: '1) Bullying Fisik',
        list: [
          'Memukul, menendang, mendorong',
          'Mengunci atau merusak barang',
          'Melukai secara langsung',
        ],
      },
      {
        subtitle: '2) Bullying Verbal',
        list: [
          'Mengejek, menghina, memberikan julukan',
          'Mengancam atau mempermalukan di depan umum',
          'Menghina penampilan, suku, atau kondisi pribadi',
        ],
      },
      {
        subtitle: '3) Bullying Relasional/Sosial',
        list: [
          'Mengucilkan dari pergaulan',
          'Menyebarkan gosip untuk menjatuhkan',
          'Membuat korban dijauhi atau diputus akses sosialnya',
        ],
      },
      {
        subtitle: '4) Cyberbullying',
        list: [
          'Menyebar konten memalukan di media sosial',
          'Mengancam lewat chat atau komentar',
          'Membuat akun palsu atau menyebarkan rumor online',
        ],
      },
      {
        subtitle: 'Catatan Penting',
        text: 'Bentuk bullying bisa muncul sendiri atau bersamaan. Jika kamu mengalaminya, kamu berhak mendapat bantuan dan dukungan.',
      },
    ],
  },
  {
    id: 'memendam',
    icon: Brain,
    cardBg: 'bg-amber-50/80 border border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30',
    cardShadow: 'hover:shadow-amber-100/50 hover:border-amber-200',
    iconBg: 'bg-amber-100/60 dark:bg-amber-900/40',
    iconColor: 'text-amber-600 dark:text-amber-400',
    solidBg: 'bg-amber-400 dark:bg-amber-600',
    linkColor: 'text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors',
    btnBg: 'bg-amber-100/60 hover:bg-amber-200/60 dark:bg-amber-900/30 dark:hover:bg-amber-900/50',
    btnTextColor: 'text-amber-700 dark:text-amber-300',
    title: 'Bahaya Memendam Perasaan Terlalu Lama',
    content: [
      {
        subtitle: 'Mengapa Memendam Perasaan Berbahaya?',
        text: 'Ketika kita memendam emosi negatif seperti sedih, marah, takut, atau malu tanpa mengekspresikannya, tubuh akan terus memproduksi hormon stres (kortisol). Jika ini berlangsung lama, sistem imun tubuh bisa terganggu.',
      },
      {
        subtitle: 'Dampak Jangka Panjang',
        list: [
          'Gangguan tidur kronis and kelelahan berkepanjangan',
          'Penurunan daya tahan tubuh (sering sakit)',
          'Peningkatan risiko gangguan autoimun seperti lupus, rheumatoid arthritis, psoriasis',
          'Depresi dan gangguan kecemasan',
          'Gangguan pencernaan (IBS, maag kronis)',
          'Tekanan darah tinggi dan risiko penyakit jantung',
        ],
      },
      {
        subtitle: 'Cara Sehat Mengelola Perasaan',
        list: [
          'Tulis perasaanmu di jurnal harian! ekspresikan tanpa filter',
          'Bicarakan dengan orang yang kamu percaya',
          'Lakukan aktivitas fisik secara rutin (minimal 30 menit/hari)',
          'Praktikkan teknik pernapasan dalam saat stres',
          'Cari bantuan profesional jika merasa kewalahan',
        ],
      },
    ],
  },
  {
    id: 'autoimun',
    icon: AlertTriangle,
    cardBg: 'bg-orange-50/80 border border-orange-100 dark:bg-orange-950/20 dark:border-orange-900/30',
    cardShadow: 'hover:shadow-orange-100/50 hover:border-orange-200',
    iconBg: 'bg-orange-100/60 dark:bg-orange-900/40',
    iconColor: 'text-orange-600 dark:text-orange-400',
    solidBg: 'bg-orange-400 dark:bg-orange-600',
    linkColor: 'text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 transition-colors',
    btnBg: 'bg-orange-100/60 hover:bg-orange-200/60 dark:bg-orange-900/30 dark:hover:bg-orange-900/50',
    btnTextColor: 'text-orange-700 dark:text-orange-300',
    title: 'Stres Kronis & Penyakit Autoimun',
    content: [
      {
        subtitle: 'Hubungan Stres dengan Autoimun',
        text: 'Penelitian ilmiah menunjukkan bahwa stres psikologis berkepanjangan termasuk akibat perundungan dan memendam emosi dan dapat memicu atau memperparah penyakit autoimun. Pada kondisi ini, sistem imun tubuh keliru menyerang sel-selnya sendiri.',
      },
      {
        subtitle: 'Penyakit Autoimun yang Terkait Stres Kronis',
        list: [
          'Lupus (SLE) menyerang sendi, kulit, and organ dalam',
          'Rheumatoid Arthritis - peradangan sendi yang menyakitkan',
          'Psoriasis - gangguan kulit akibat respons imun berlebihan',
          'Penyakit Celiac - reaksi imun terhadap gluten',
          "Hashimoto's Thyroiditis - gangguan tiroid akibat autoimun",
          'Irritable Bowel Syndrome (IBS) terkait stres',
        ],
      },
      {
        subtitle: 'Kenali Gejalanya Sejak Dini',
        list: [
          'Kelelahan ekstrem yang tidak membaik dengan istirahat',
          'Nyeri sendi atau otot tanpa sebab jelas',
          'Demam ringan yang berulang',
          'Ruam kulit yang tidak biasa',
          'Rambut rontok berlebihan',
          'Jika mengalami gejala di atas, segera konsultasi ke dokter',
        ],
      },
    ],
  },
  {
    id: 'pemulihan',
    icon: Heart,
    cardBg: 'bg-emerald-50/80 border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30',
    cardShadow: 'hover:shadow-emerald-100/50 hover:border-emerald-200',
    iconBg: 'bg-emerald-100/60 dark:bg-emerald-900/40',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    solidBg: 'bg-emerald-400 dark:bg-emerald-600',
    linkColor: 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors',
    btnBg: 'bg-emerald-100/60 hover:bg-emerald-200/60 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50',
    btnTextColor: 'text-emerald-700 dark:text-emerald-300',
    title: 'Langkah Menuju Pemulihan & Kesehatan Mental',
    content: [
      {
        subtitle: 'Kamu Tidak Sendirian',
        text: 'Kesehatan mental sama pentingnya dengan kesehatan fisik. Meminta bantuan adalah tanda keberanian, bukan kelemahan. Ada banyak cara untuk pulih dan hidup lebih baik.',
      },
      {
        subtitle: 'Praktik Harian untuk Kesehatan Mental',
        list: [
          'Journaling: tulis 3 hal yang kamu syukuri setiap hari',
          'Mindfulness: luangkan 5–10 menit untuk bernapas dengan sadar',
          'Gerakan tubuh: jalan kaki, olahraga ringan, atau menari',
          'Tidur cukup: targetkan 7–9 jam setiap malam',
          'Batasi media sosial yang memicu perasaan negatif',
          'Terhubung dengan orang-orang yang mendukungmu',
        ],
      },
      {
        subtitle: 'Kapan Harus Mencari Bantuan Profesional?',
        list: [
          'Perasaan sedih atau cemas berlangsung lebih dari 2 minggu',
          'Sulit menjalani aktivitas sehari-hari',
          'Muncul pikiran untuk menyakiti diri sendiri',
          'Merasa tidak ada harapan atau tidak berharga',
          'Dalam situasi ini, hubungi guru BK atau psikolog segera',
        ],
      },
    ],
  },
];

export default function Education() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showJurnal, setShowJurnal] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl -translate-y-1/2 -translate-x-1/3" />
      <Navbar />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke dashboard
          </Link>

          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary mb-6">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            Edukasi
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl">
            Informasi penting tentang perundungan, dampak memendam perasaan, dan hubungannya dengan kesehatan fisik jangka panjang.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {topics.map((topic, i) => (
              <motion.button
                key={topic.id}
                type="button"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setSelectedTopic(topic)}
                className={`group relative flex flex-col justify-between text-left cursor-pointer rounded-3xl p-6 sm:p-8 hover:-translate-y-1.5 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary/30 shadow-lg hover:shadow-2xl ${topic.cardBg} ${topic.cardShadow}`}
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${topic.iconBg} ${topic.iconColor}`}
                  >
                    <topic.icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight mb-3 text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                    {topic.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-8">
                    {topic.content[0].text || topic.content[0].list?.[0]}
                  </p>
                </div>

                <div className={`flex items-center gap-1.5 text-xs font-bold mt-auto ${topic.linkColor}`}>
                  <span>Pelajari Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {selectedTopic && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedTopic(null)}
                  className="absolute inset-0 bg-background/80 backdrop-blur-md"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 30 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  className="relative w-full max-w-2xl bg-card border border-border/80 shadow-2xl rounded-3xl overflow-hidden max-h-[85vh] flex flex-col"
                >
                  <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-gradient-to-r from-card to-background z-10">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-1.5 h-6 rounded-full ${selectedTopic.solidBg}`} />
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${selectedTopic.iconBg} ${selectedTopic.iconColor}`}>
                        <selectedTopic.icon className="w-4.5 h-4.5" />
                      </div>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-foreground tracking-tight">{selectedTopic.title}</h3>
                    </div>
                    <button onClick={() => setSelectedTopic(null)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-all duration-300">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-6 overflow-y-auto space-y-5 bg-secondary/5">
                    {selectedTopic.content.map((section, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 hover:shadow-md ${selectedTopic.cardBg}`}
                      >
                        <h4 className={`font-display font-bold text-base sm:text-lg mb-3 flex items-center gap-2.5 ${selectedTopic.iconColor}`}>
                          <span className={`w-2 h-2 rounded-full ${selectedTopic.solidBg}`} />
                          {section.subtitle}
                        </h4>
                        {section.text && <p className="text-sm text-muted-foreground leading-relaxed">{section.text}</p>}
                        {section.list && (
                          <ul className="space-y-2.5 mt-3">
                            {section.list.map((item, j) => (
                              <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                                <div className="w-5 h-5 rounded-md flex items-center justify-center bg-white dark:bg-card border border-border/60 shrink-0 mt-0.5 shadow-sm">
                                  <span className={`w-1.5 h-1.5 rounded-full ${selectedTopic.solidBg}`} />
                                </div>
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-6 border-t border-border bg-gradient-to-b from-card/50 to-secondary/30 flex items-center justify-end gap-3">
                    <button onClick={() => setSelectedTopic(null)} className="px-5 py-3 hover:bg-secondary text-muted-foreground font-semibold rounded-2xl transition-all duration-300">
                      Batal
                    </button>
                    <button onClick={() => setSelectedTopic(null)} className={`px-8 py-3.5 font-bold rounded-2xl active:scale-[0.98] transition-all shadow-md ${selectedTopic.btnBg} ${selectedTopic.btnTextColor}`}>
                      Tutup Materi
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            <button
              onClick={() => setShowJurnal(!showJurnal)}
              className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-secondary/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary shrink-0" />
                <span className="font-semibold text-foreground">Referensi Jurnal Ilmiah</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform duration-300 shrink-0 ${showJurnal ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {showJurnal && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 space-y-4">
                    <p className="text-xs text-muted-foreground">
                      Informasi di halaman ini didukung oleh penelitian dan jurnal ilmiah berikut:
                    </p>
                    {JURNAL.map((j, i) => (
                      <div key={i} className="border-l-2 border-primary/20 pl-4 hover:border-primary transition-colors py-0.5">
                        <p className="font-medium text-sm text-foreground leading-snug">{j.judul}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {j.penulis} ({j.tahun}) — <em>{j.jurnal}</em>
                        </p>
                        <a
                          href={j.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1.5 font-medium"
                        >
                          Buka jurnal <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}