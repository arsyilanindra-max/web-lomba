import { MessageCircle, ExternalLink, Users, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Greeting from '@/components/Greeting';

const LINK_GURU_BK = 'https://wa.me/6281234567890'; // GANTI NOMOR

// PESAN OTOMATIS yang akan terisi saat user membuka WA guru BK yup
const PESAN_OTOMATIS_BK = 'Halo Pak/Bu, saya ingin berkonsultasi mengenai kondisi saya.';

// Biar bisa dapatkan link grup WA: buka grup → Info Grup → Undang via tautan
const GRUP_LIST = [
  { label: 'Kelas XI IF-43-01', link: 'https://chat.whatsapp.com/invite/contoh1', type: 'class' },
  { label: 'Kelas XI IF-43-02', link: 'https://chat.whatsapp.com/invite/contoh2', type: 'class' },
  { label: 'Kelas XI IF-43-03', link: 'https://chat.whatsapp.com/invite/contoh3', type: 'class' },
  { label: 'Kelas XII IF-44-01', link: 'https://chat.whatsapp.com/invite/contoh4', type: 'class' },
  { label: 'OSIS 2024/2025', link: 'https://chat.whatsapp.com/invite/contoh5', type: 'community' },
  { label: 'Komunitas Anti-Bullying SKOMDA', link: 'https://chat.whatsapp.com/invite/contoh6', type: 'community' },
];

const buildWaLink = (number, pesan) =>
  `${number}?text=${encodeURIComponent(pesan)}`;

export default function WhatsAppDirectory() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
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
            <MessageCircle className="w-6 h-6 text-primary" />
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            Direktori WhatsApp
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            Akses cepat ke guru BK dan grup kelas komunitasmu.
          </p>

          {/* Kartu Guru BK */}
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
              Konsultasi Langsung
            </p>
            <a
              href={buildWaLink(LINK_GURU_BK, PESAN_OTOMATIS_BK)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 bg-primary text-primary-foreground rounded-2xl p-5 hover:opacity-90 active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary-foreground/10">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">Chat Guru BK</p>
                  <p className="text-sm text-primary-foreground/70">
                    Konsultasi rahasia dengan guru bimbingan konseling
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
            </a>
          </div>

          {/* Daftar Grup */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
              Grup Kelas & Komunitas
            </p>
            {GRUP_LIST.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center text-muted-foreground">
                Link grup segera hadir — administrator akan memperbarui daftar ini.
              </div>
            ) : (
              <div className="space-y-3">
                {GRUP_LIST.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="group flex items-center justify-between gap-4 bg-card border border-border rounded-2xl p-4 hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{item.label}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </motion.a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}