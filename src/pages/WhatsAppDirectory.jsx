import { MessageCircle, ExternalLink, User, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Greeting from '@/components/Greeting';

const LINK_GURU_BK = 'https://wa.me/6281234567890';
const PESAN_OTOMATIS_BK = 'Halo Pak/Bu, saya ingin berkonsultasi mengenai kondisi saya.';

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
            Akses cepat ke guru BK bimbingan konseling.
          </p>

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
        </motion.div>
      </div>
    </div>
  );
}