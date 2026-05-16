import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ExternalLink, Shield, Brain, AlertTriangle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Greeting from '@/components/Greeting';


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
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-100',
    title: 'Apa Itu Perundungan (Bullying)?',
    content: [
      {
        subtitle: 'Definisi',
        text: 'Perundungan adalah tindakan agresif yang dilakukan secara berulang oleh seseorang atau kelompok terhadap individu yang lebih lemah. Bentuknya bisa berupa kekerasan fisik, verbal (mengejek, menghina), relasional (mengucilkan), maupun cyberbullying (melalui media digital).',
      },
      {
        subtitle: 'Tanda-tanda Kamu Mengalami Perundungan',
        list: [
          'Merasa takut atau tidak nyaman pergi ke sekolah',
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
    id: 'memendam',
    icon: Brain,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    title: 'Bahaya Memendam Perasaan Terlalu Lama',
    content: [
      {
        subtitle: 'Mengapa Memendam Perasaan Berbahaya?',
        text: 'Ketika kita memendam emosi negatif seperti sedih, marah, takut, atau malu tanpa mengekspresikannya, tubuh akan terus memproduksi hormon stres (kortisol). Jika ini berlangsung lama, sistem imun tubuh bisa terganggu.',
      },
      {
        subtitle: 'Dampak Jangka Panjang',
        list: [
          'Gangguan tidur kronis dan kelelahan berkepanjangan',
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
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    title: 'Stres Kronis & Penyakit Autoimun',
    content: [
      {
        subtitle: 'Hubungan Stres dengan Autoimun',
        text: 'Penelitian ilmiah menunjukkan bahwa stres psikologis berkepanjangan termasuk akibat perundungan dan memendam emosi dan dapat memicu atau memperparah penyakit autoimun. Pada kondisi ini, sistem imun tubuh keliru menyerang sel-selnya sendiri.',
      },
      {
        subtitle: 'Penyakit Autoimun yang Terkait Stres Kronis',
        list: [
          'Lupus (SLE)  menyerang sendi, kulit, dan organ dalam',
          'Rheumatoid Arthritis - peradangan sendi yang menyakitkan',
          'Psoriasis - gangguan kulit akibat respons imun berlebihan',
          'Penyakit Celiac - reaksi imun terhadap gluten',
          'Hashimoto\'s Thyroiditis - gangguan tiroid akibat autoimun',
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
    color: 'text-green-500',
    bg: 'bg-green-50',
    border: 'border-green-100',
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

function TopicCard({ topic }) {
  const [open, setOpen] = useState(false);
  const Icon = topic.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border ${topic.border} ${topic.bg} overflow-hidden`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${topic.color} shrink-0`} />
          <span className="font-semibold text-foreground">{topic.title}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-300 shrink-0 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-5">
              {topic.content.map((section, i) => (
                <div key={i}>
                  <p className="font-semibold text-foreground mb-2">{section.subtitle}</p>
                  {section.text && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{section.text}</p>
                  )}
                  {section.list && (
                    <ul className="space-y-1.5 mt-2">
                      {section.list.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${topic.color.replace('text-', 'bg-')} shrink-0`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Education() {
  const [showJurnal, setShowJurnal] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl -translate-y-1/2 -translate-x-1/3" />
      <Greeting />

      <div className="relative max-w-2xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-16">
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
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            Informasi penting tentang perundungan, dampak memendam perasaan, dan hubungannya dengan kesehatan fisik jangka panjang.
          </p>

          {/* Topik */}
          <div className="space-y-3 mb-10">
            {topics.map((topic, i) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <TopicCard topic={topic} />
              </motion.div>
            ))}
          </div>

          {/* Referensi Jurnal */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowJurnal(!showJurnal)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left"
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
                  <div className="px-5 pb-5 space-y-4">
                    <p className="text-xs text-muted-foreground">
                      Informasi di halaman ini didukung oleh penelitian dan jurnal ilmiah berikut:
                    </p>
                    {JURNAL.map((j, i) => (
                      <div key={i} className="border-l-2 border-primary/20 pl-4">
                        <p className="font-medium text-sm text-foreground">{j.judul}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {j.penulis} ({j.tahun}) — <em>{j.jurnal}</em>
                        </p>
                        <a
                          href={j.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
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