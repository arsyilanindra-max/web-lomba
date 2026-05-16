import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ChevronRight, RotateCcw, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Greeting from '@/components/Greeting';


// Setiap pertanyaan memiliki skor berdasarkan pilihan jawaban.
// Pertanyaan bertanda reversed: true berarti "Sangat Setuju" bernilai BAIK (skor dibalik).
const PERTANYAAN = [
  //  BAGIAN PENGALAMAN PERUNDUNGAN JGN DIUBAH
  { id: 1, teks: 'Saya pernah diejek atau dihina oleh teman-teman di sekolah.', reversed: false },
  { id: 2, teks: 'Ada orang yang sengaja mengucilkan saya dari kelompok pertemanan.', reversed: false },
  { id: 3, teks: 'Saya pernah menerima pesan atau komentar negatif/menyakitkan di media sosial.', reversed: false },
  { id: 4, teks: 'Teman-teman saya mendukung dan menghargai saya apa adanya.', reversed: true },
  { id: 5, teks: 'Saya pernah merasa takut berangkat ke sekolah karena seseorang di sana.', reversed: false },
  { id: 6, teks: 'Saya pernah menyaksikan teman lain diperlakukan tidak baik dan tidak ada yang menghentikannya.', reversed: false },
  { id: 7, teks: 'Saya merasa aman dan nyaman di lingkungan sekolah saya.', reversed: true },
  { id: 8, teks: 'Ada seseorang yang sering meremehkan kemampuan atau penampilan saya.', reversed: false },

  //  BAGIAN KONDISI EMOSI & MENTAL 
  { id: 9, teks: 'Saya sering menyimpan perasaan sedih atau marah sendiri tanpa menceritakannya kepada siapapun.', reversed: false },
  { id: 10, teks: 'Saya merasa tidak ada orang yang benar-benar memahami perasaan saya.', reversed: false },
  { id: 11, teks: 'Saya mudah merasa putus asa ketika menghadapi masalah.', reversed: false },
  { id: 12, teks: 'Saya memiliki seseorang yang bisa saya ajak bicara jujur tentang perasaan saya.', reversed: true },
  { id: 13, teks: 'Saya sering merasa cemas atau khawatir berlebihan tanpa alasan yang jelas.', reversed: false },
  { id: 14, teks: 'Saya merasa bangga dan nyaman dengan diri saya sendiri.', reversed: true },
  { id: 15, teks: 'Saya sering merasa lelah secara emosional meskipun tidak banyak beraktivitas.', reversed: false },
  { id: 16, teks: 'Saya menikmati kegiatan yang dulu saya sukai.', reversed: true },

  //  BAGIAN KESEHATAN FISIK & STRES 
  { id: 17, teks: 'Saya sering mengalami sakit kepala atau nyeri badan saat sedang banyak masalah.', reversed: false },
  { id: 18, teks: 'Saya mengalami gangguan tidur (sulit tidur atau tidur terlalu lama) dalam sebulan terakhir.', reversed: false },
  { id: 19, teks: 'Nafsu makan saya berubah drastis saat saya sedang stres atau tertekan.', reversed: false },
  { id: 20, teks: 'Saya merasa kondisi fisik saya baik-baik saja belakangan ini.', reversed: true },
  { id: 21, teks: 'Saya sering merasa jantung berdebar atau sesak napas ketika memikirkan masalah.', reversed: false },

  //  BAGIAN PERILAKU & DUKUNGAN SOSIAL 
  { id: 22, teks: 'Saya menarik diri dari pergaulan sosial karena merasa tidak nyaman.', reversed: false },
  { id: 23, teks: 'Saya merasa guru atau orang dewasa di sekolah peduli dengan kondisi saya.', reversed: true },
  { id: 24, teks: 'Saya punya cara sehat untuk melampiaskan emosi (olahraga, seni, menulis, dll).', reversed: true },
  { id: 25, teks: 'Saya percaya bahwa meminta bantuan psikolog atau konselor adalah hal yang wajar.', reversed: true },
];

const PILIHAN = [
  { label: 'Sangat Setuju', skor: 4, warna: 'bg-green-500', warnaRing: 'ring-green-400', warnaHover: 'hover:bg-green-50 hover:border-green-300' },
  { label: 'Setuju', skor: 3, warna: 'bg-lime-400', warnaRing: 'ring-lime-300', warnaHover: 'hover:bg-lime-50 hover:border-lime-300' },
  { label: 'Netral', skor: 2, warna: 'bg-yellow-400', warnaRing: 'ring-yellow-300', warnaHover: 'hover:bg-yellow-50 hover:border-yellow-300' },
  { label: 'Tidak Setuju', skor: 1, warna: 'bg-orange-400', warnaRing: 'ring-orange-300', warnaHover: 'hover:bg-orange-50 hover:border-orange-300' },
  { label: 'Sangat Tidak Setuju', skor: 0, warna: 'bg-red-500', warnaRing: 'ring-red-400', warnaHover: 'hover:bg-red-50 hover:border-red-300' },
];

// CONST HITUNG SKOR

function hitungSkor(jawaban) {
  let total = 0;
  PERTANYAAN.forEach((q) => {
    const pilihanIdx = jawaban[q.id];
    if (pilihanIdx === undefined) return;
    const skorMentah = PILIHAN[pilihanIdx].skor;
    total += q.reversed ? skorMentah : (4 - skorMentah);
  });
  return total;
}

function getHasil(persen) {
  if (persen <= 30) return {
    label: 'Kondisi Baik',
    warna: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    deskripsi: 'Kondisi mentalmu terlihat cukup baik. Teruskan kebiasaan positif dan jaga lingkungan sosialmu.',
    saran: 'Pertahankan rutinitas sehat dan tetap terbuka jika ada perubahan kondisi.',
  };
  if (persen <= 55) return {
    label: 'Perlu Perhatian',
    warna: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    deskripsi: 'Ada beberapa tanda yang perlu kamu perhatikan. Jangan abaikan perasaan yang mengganggu.',
    saran: 'Coba bicarakan perasaanmu dengan orang terpercaya. Pertimbangkan untuk berkonsultasi dengan guru BK.',
  };
  if (persen <= 75) return {
    label: 'Kondisi Mengkhawatirkan',
    warna: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    deskripsi: 'Kamu menunjukkan beberapa tanda stres atau tekanan yang signifikan. Ini membutuhkan perhatian serius.',
    saran: 'Sangat disarankan untuk segera berbicara dengan guru BK atau konselor sekolahmu. Kamu tidak harus menanggung ini sendirian.',
  };
  return {
    label: 'Butuh Bantuan Segera',
    warna: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    deskripsi: 'Hasil tesmu menunjukkan kondisi yang memerlukan perhatian segera. Ini bukan hal yang bisa diabaikan.',
    saran: 'Tolong ceritakan kepada orang dewasa yang kamu percaya hari ini — guru BK, orang tua, atau konselor. Bantuan tersedia dan kamu berhak mendapatkannya.',
  };
}

export default function Quiz() {
  const [fase, setFase] = useState('intro'); // 'intro' | 'soal' | 'hasil'
  const [jawaban, setJawaban] = useState({});
  const [current, setCurrent] = useState(0);

  const soal = PERTANYAAN[current];
  const totalSoal = PERTANYAAN.length;
  const progress = (current / totalSoal) * 100;

  const pilihJawaban = (idx) => {
    const newJawaban = { ...jawaban, [soal.id]: idx };
    setJawaban(newJawaban);
    setTimeout(() => {
      if (current < totalSoal - 1) {
        setCurrent(current + 1);
      } else {
        setFase('hasil');
      }
    }, 350);
  };

  const reset = () => {
    setJawaban({});
    setCurrent(0);
    setFase('intro');
  };

  const totalSkor = hitungSkor(jawaban);
  const maxSkor = totalSoal * 4;
  const persen = Math.round((totalSkor / maxSkor) * 100);
  const hasil = getHasil(persen);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
      <Greeting />

      <div className="relative max-w-2xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-16">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke dashboard
        </Link>

        <AnimatePresence mode="wait">
          {/* INTRO */}
          {fase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary mb-6">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
                Tes Kesehatan Mental
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Tes ini membantu kamu memahami kondisi mentalmu seputar perundungan, tekanan emosi, dan kesejahteraan diri.
              </p>

              {/* Panduan cara menjawab */}
              <div className="bg-card border border-border rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-sm">Cara Menjawab</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Pilih jawaban berdasarkan kondisi yang paling sesuai dengan pengalamanmu dalam <strong>sebulan terakhir</strong>. Tidak ada jawaban benar atau salah.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {PILIHAN.map((p) => (
                    <div key={p.label} className="flex sm:flex-col items-center gap-2 sm:gap-1 sm:text-center">
                      <div className={`w-5 h-5 sm:w-8 sm:h-8 rounded-full ${p.warna} shrink-0`} />
                      <span className="text-xs text-muted-foreground">{p.label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3 px-1">
                  <span className="text-xs text-green-600 font-medium">← Kondisi baik</span>
                  <span className="text-xs text-red-600 font-medium">Kondisi berat →</span>
                </div>
              </div>

              <div className="bg-secondary/60 rounded-2xl p-4 mb-8 text-sm text-muted-foreground">
                🔒 <strong>Privasimu terjaga.</strong> Hasil tes ini hanya tampil di layarmu dan tidak disimpan di server manapun.
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
                <Brain className="w-4 h-4" />
                <span>{totalSoal} pertanyaan · estimasi 5-7 menit</span>
              </div>

              <button
                onClick={() => setFase('soal')}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-2xl font-medium text-base hover:opacity-90 active:scale-[0.98] transition-all group"
              >
                Mulai Tes
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          )}

          {/* SOAL */}
          {fase === 'soal' && (
            <motion.div
              key={`soal-${current}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Pertanyaan {current + 1} dari {totalSoal}</span>
                  <span>{Math.round(progress)}% selesai</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              <p className="font-display text-2xl sm:text-3xl font-semibold leading-snug mb-8 text-foreground">
                {soal.teks}
              </p>

              {/* Pilihan jawaban */}
              <div className="space-y-3">
                {PILIHAN.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => pilihJawaban(idx)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 border-border bg-card transition-all ${p.warnaHover} active:scale-[0.98] text-left group`}
                  >
                    <div className={`w-5 h-5 rounded-full ${p.warna} shrink-0 transition-transform group-hover:scale-110`} />
                    <span className="text-sm font-medium text-foreground">{p.label}</span>
                  </button>
                ))}
              </div>

              {current > 0 && (
                <button
                  onClick={() => setCurrent(current - 1)}
                  className="mt-6 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  ← Pertanyaan sebelumnya
                </button>
              )}
            </motion.div>
          )}

          {/* HASIL */}
          {fase === 'hasil' && (
            <motion.div
              key="hasil"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary mb-6">
                <Brain className="w-6 h-6 text-primary" />
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-2">
                Hasil Tesmu
              </h1>
              <p className="text-muted-foreground mb-8">
                Berdasarkan {totalSoal} pertanyaan yang kamu jawab.
              </p>

              {/* Kartu hasil */}
              <div className={`rounded-2xl border ${hasil.border} ${hasil.bg} p-6 mb-6`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-display text-2xl font-semibold ${hasil.warna}`}>
                    {hasil.label}
                  </span>
                  <span className={`text-3xl font-bold ${hasil.warna}`}>{persen}%</span>
                </div>

                {/* Bar skor */}
                <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${persen}%`,
                      background: persen <= 30
                        ? '#22c55e'
                        : persen <= 55
                        ? '#eab308'
                        : persen <= 75
                        ? '#f97316'
                        : '#ef4444',
                    }}
                  />
                </div>

                <p className="text-sm text-foreground leading-relaxed mb-3">{hasil.deskripsi}</p>
                <div className="bg-white/50 rounded-xl p-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Saran</p>
                  <p className="text-sm text-foreground leading-relaxed">{hasil.saran}</p>
                </div>
              </div>

              {/* Skala referensi */}
              <div className="bg-card border border-border rounded-2xl p-5 mb-6">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Skala Referensi</p>
                <div className="space-y-2">
                  {[
                    { label: 'Kondisi Baik', range: '0–30%', warna: 'bg-green-500' },
                    { label: 'Perlu Perhatian', range: '31–55%', warna: 'bg-yellow-400' },
                    { label: 'Kondisi Mengkhawatirkan', range: '56–75%', warna: 'bg-orange-400' },
                    { label: 'Butuh Bantuan Segera', range: '76–100%', warna: 'bg-red-500' },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3 text-sm">
                      <div className={`w-3 h-3 rounded-full ${s.warna} shrink-0`} />
                      <span className="text-foreground">{s.label}</span>
                      <span className="text-muted-foreground ml-auto">{s.range}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center mb-6">
                
                 Tes ini bukan diagnosis klinis. Untuk evaluasi lebih lanjut, konsultasikan dengan profesional kesehatan mental.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={reset}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-border text-foreground py-4 rounded-2xl font-medium hover:bg-secondary transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Ulangi Tes
                </button>
                <Link
                  to="/counseling"
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-2xl font-medium hover:opacity-90 transition-all"
                >
                  Hubungi Konselor
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}