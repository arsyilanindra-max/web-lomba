import { motion } from 'framer-motion';
import { UserCog } from 'lucide-react';
import { useUsername } from '@/lib/useUsername';
import { useNavigate } from 'react-router-dom';

import logo from '@/assets/logo.png'; 

export default function Navbar() {
  const { username, clearUsername } = useUsername();
  const navigate = useNavigate();

  const handleChange = () => {
    clearUsername();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between
                 px-5 sm:px-8 py-3 bg-card/80 backdrop-blur-md border-b border-border shadow-sm"
    >
      
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="ProtectMate Logo"
          className="w-12 h-12 rounded-lg object-contain"
        />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold tracking-tight">
            <span className="text-primary">SKOM</span>DA ProtectMate
          </span>
          <span className="text-[11px] text-muted-foreground">SMK Telkom Sidoarjo</span>
        </div>
      </div>

    
      {username && (
        <div className="flex items-center gap-2 bg-background/60 border border-border
                        rounded-full pl-3 pr-1.5 py-1.5">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center
                          text-primary-foreground text-xs font-bold uppercase">
            {username[0]}
          </div>
          <span className="text-sm font-medium hidden sm:block">
            Halo, <span className="text-primary">{username}</span>!
          </span>
          <button
            onClick={handleChange}
            className="flex items-center gap-1 text-xs text-muted-foreground
                       hover:text-primary hover:bg-secondary transition-all
                       rounded-full px-3 py-1.5"
            title="Ganti Nama"
          >
            <UserCog className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ganti</span>
          </button>
        </div>
      )}
    </motion.nav>
  );
}