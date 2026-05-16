import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { BookOpen, MessageCircle, Brain, Phone, HeartHandshake } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsername } from '@/lib/useUsername';
import SectionCard from '@/components/SectionCard';

const sections = [
  {
    to: '/education',
    icon: BookOpen,
    title: 'Edukasi',
    description: 'Sumber belajar, panduan, dan materi untuk mendukung studimu.',
  },
  {
    to: '/whatsapp',
    icon: MessageCircle,
    title: 'Direktori WhatsApp',
    description: 'Akses cepat ke grup kelas dan komunitas kampus.',
  },
  {
    to: '/quiz',
    icon: Brain,
    title: 'Tes Kesehatan Mental',
    description: 'Kenali tanda-tandanya. Karena diam bukan selalu aman.',
  },
  {
    to: '/hotline',
    icon: Phone,
    title: 'Hotline',
    description: 'Nomor bantuan segera ketika kamu butuh seseorang untuk diajak bicara.',
  },
];

export default function Dashboard() {
  const { username } = useUsername();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) navigate('/', { replace: true });
  }, [username, navigate]);

  if (!username) return null;

  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? 'pagi' : hour < 18 ? 'siang' : 'malam';

  return (
   <div className="min-h-screen relative overflow-hidden">
    <Navbar /> 
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="mesh-gradient" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-foreground/60 mb-4">
            Selamat {timeOfDay}
          </p>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02] mb-5">
            Apa yang ingin kamu <br className="hidden sm:block" />
            <em className="font-normal text-primary">pelajari</em> hari ini?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Ruang tenang untuk belajar, terhubung, dan mendapat dukungan. semua dalam satu tempat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {sections.map((section, i) => (
            <SectionCard key={section.to} {...section} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-5"
        >
          <SectionCard
            to="/counseling"
            icon={HeartHandshake}
            title="Butuh cerita? Hubungi konselor kami."
            description="Kirim pesan rahasia ke konselor SKOMDA, kami siap mendengarmu."
            accent
            index={4}
          />
        </motion.div>
      </div>
    </div>
  );
}