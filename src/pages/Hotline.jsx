import Navbar from '@/components/Navbar';
import { Phone, Clock, ExternalLink, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


const HOTLINES = [
  {
    nama: 'Into The Light Indonesia',
    nomor: '119 ext 8',
    deskripsi: 'Layanan konseling & krisis nasional, gratis 24 jam.',
    jam: '24 Jam',
    kategori: 'Nasional',
    warna: 'bg-blue-50 border-blue-200',
    warnaIcon: 'text-blue-600',
    warnaBadge: 'bg-blue-100 text-blue-700',
  },
  {
    nama: 'Yayasan Pulih',
    nomor: '(021) 788-42580',
    deskripsi: 'Konsultasi psikologi, trauma, dan kekerasan. Jakarta.',
    jam: 'Sen–Jum, 09.00–17.00',
    kategori: 'Psikologi',
    warna: 'bg-purple-50 border-purple-200',
    warnaIcon: 'text-purple-600',
    warnaBadge: 'bg-purple-100 text-purple-700',
  },
  {
    nama: 'Komnas Perlindungan Anak',
    nomor: '(021) 319-01556',
    deskripsi: 'Pelaporan kasus kekerasan dan perundungan terhadap anak.',
    jam: 'Sen–Jum, 08.00–16.00',
    kategori: 'Perlindungan',
    warna: 'bg-red-50 border-red-200',
    warnaIcon: 'text-red-600',
    warnaBadge: 'bg-red-100 text-red-700',
  },
  {
    nama: 'SEBAYA (Sebaya Pedia)',
    nomor: '1500-454',
    deskripsi: 'Hotline remaja — bicara dengan konselor sebaya yang memahami situasimu.',
    jam: 'Sen–Sab, 08.00–22.00',
    kategori: 'Remaja',
    warna: 'bg-green-50 border-green-200',
    warnaIcon: 'text-green-600',
    warnaBadge: 'bg-green-100 text-green-700',
  },
  {
    nama: 'Guru BK Sekolah',
    nomor: 'Lihat direktori WhatsApp',
    deskripsi: 'Konselor bimbingan di sekolahmu — orang pertama yang harus kamu hubungi.',
    jam: 'Jam sekolah',
    kategori: 'Sekolah',
    warna: 'bg-amber-50 border-amber-200',
    warnaIcon: 'text-amber-600',
    warnaBadge: 'bg-amber-100 text-amber-700',
    isInternal: true,
  },
];

export default function Hotline() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
      <Navbar />

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
            <Phone className="w-6 h-6 text-primary" />
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            Hotline Bantuan
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Nomor darurat dan layanan konseling yang bisa kamu hubungi kapanpun kamu butuh seseorang untuk diajak bicara.
          </p>

          <div className="bg-secondary/60 rounded-2xl p-4 mb-8 flex items-start gap-3">
            <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Ingat:</strong> Menghubungi bantuan adalah tanda keberanian, bukan kelemahan. Semua layanan di bawah ini menjaga kerahasiaanmu.
            </p>
          </div>

          <div className="space-y-3">
            {HOTLINES.map((h, i) => (
              <motion.div
                key={h.nama}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl border p-5 ${h.warna}`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-foreground">{h.nama}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${h.warnaBadge}`}>
                      {h.kategori}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{h.deskripsi}</p>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {h.jam}
                  </div>
                  {h.isInternal ? (
                    <Link
                      to="/whatsapp"
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold ${h.warnaIcon} hover:underline`}
                    >
                      Buka Direktori <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <a
                      href={`tel:${h.nomor.replace(/\s|\(|\)|-/g, '')}`}
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold ${h.warnaIcon} hover:underline`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {h.nomor}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}