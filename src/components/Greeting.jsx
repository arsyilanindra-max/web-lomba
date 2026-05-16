import { motion } from 'framer-motion';
import { UserCog } from 'lucide-react';
import { useUsername } from '@/lib/useUsername';
import { useNavigate } from 'react-router-dom';

export default function Greeting() {
  const { username, clearUsername } = useUsername();
  const navigate = useNavigate();

  const handleChange = () => {
    clearUsername();
    navigate('/');
  };

  if (!username) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 bg-card/90 backdrop-blur-md border border-border rounded-full pl-4 pr-1.5 py-1.5 shadow-sm"
    >
      <span className="text-sm font-medium text-foreground">
        Halo, <span className="text-primary">{username}</span>!
      </span>
      <button
        onClick={handleChange}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary hover:bg-secondary transition-all rounded-full px-3 py-1.5"
        title="Ganti Nama"
      >
        <UserCog className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Ganti</span>
      </button>
    </motion.div>
  );
}