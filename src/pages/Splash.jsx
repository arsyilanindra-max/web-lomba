import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUsername } from '@/lib/useUsername';

export default function Splash() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const { username, setUsername } = useUsername();
  const navigate = useNavigate();

  useEffect(() => {
    if (username) navigate('/dashboard', { replace: true });
  }, [username, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed.length < 2) {
      setError('Please enter at least 2 characters.');
      return;
    }
    setError('');
    setUsername(trimmed);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10 relative overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 sm:p-10 shadow-xl shadow-primary/5">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground mb-6"
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-3 leading-[1.05]"
          >
            Selamat Datang.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground mb-8 leading-relaxed"
          >
            Siapa nama kamu? Nama depan atau inisial saja sudah cukup ^^
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Nama kamu
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  if (error) setError('');
                }}
                placeholder="mis. Budi atau B.S."
                autoFocus
                className={`w-full px-5 py-4 rounded-2xl border-2 bg-background text-foreground text-lg placeholder:text-muted-foreground/60 focus:outline-none transition-all ${
                  error ? 'border-destructive' : 'border-border focus:border-primary'
                }`}
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive mt-2 ml-1"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-2xl font-medium text-base hover:opacity-90 active:scale-[0.98] transition-all group"
            >
              Lanjutkan
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.form>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-xs text-muted-foreground mt-6"
        >
          Nama kamu hanya disimpan di perangkat ini.
        </motion.p>
      </motion.div>
    </div>
  );
}