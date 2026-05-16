import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Send, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useUsername } from '@/lib/useUsername';


const COUNSELOR_EMAIL = 'konseling.skomda@gmail.com';

export default function Counseling() {
  const { username } = useUsername();
  const [form, setForm] = useState({
    name: username || '',
    className: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (form.name.trim().length < 2) newErrors.name = 'Masukkan minimal 2 karakter.';
    if (form.message.trim().length < 5) newErrors.message = 'Tuliskan pesan singkat dulu ya.';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const subject = encodeURIComponent(`Permintaan konseling dari ${form.name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${form.name.trim()}\n` +
      `Class: ${form.className.trim() || '—'}\n\n` +
      `Message:\n${form.message.trim()}`
    );

    // Opens the user's email client — no data is stored on the site
    window.location.href = `mailto:${COUNSELOR_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar /> 
      <div className="absolute top-0 left-0 w-[28rem] h-[28rem] rounded-full bg-accent/15 blur-3xl -translate-y-1/3 -translate-x-1/3" />

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

          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground mb-6">
            <HeartHandshake className="w-6 h-6" />
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            Curhat ke konselor
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            Kirim pesan singkat. Pesanmu langsung dikirim via email — tidak ada data yang disimpan di situs ini.
          </p>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-3xl p-8 text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary text-primary mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">Email siap dikirim</h3>
              <p className="text-muted-foreground mb-6">
                Aplikasi email kamu seharusnya sudah terbuka dengan pesan yang sudah diisi. Tinggal kirim!
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setForm({ name: username || '', className: '', message: '' });
                }}
                className="text-sm text-primary hover:underline"
              >
                Tulis pesan lain
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-5"
            >
              <Field
                label="Nama (inisial boleh)"
                value={form.name}
                onChange={(v) => update('name', v)}
                error={errors.name}
                placeholder="mis. B.S."
              />
              <Field
                label="Kelas"
                optional
                value={form.className}
                onChange={(v) => update('className', v)}
                placeholder="mis. IF-43-01"
              />
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Pesan singkat
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Apa yang sedang kamu rasakan?"
                  rows={5}
                  className={`w-full px-4 py-3 rounded-2xl border-2 bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all resize-none ${
                    errors.message ? 'border-destructive' : 'border-border focus:border-primary'
                  }`}
                />
                {errors.message && (
                  <p className="text-sm text-destructive mt-2 ml-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-2xl font-medium hover:opacity-90 active:scale-[0.98] transition-all"
              >
                <Send className="w-4 h-4" />
                Kirim pesan
              </button>

              <p className="text-xs text-muted-foreground text-center">
                Membuka aplikasi email — tidak ada data yang disimpan di situs ini.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, error = '', placeholder, optional = false }) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
        {label} {optional && <span className="normal-case tracking-normal text-muted-foreground/60">· opsional</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-2xl border-2 bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all ${
          error ? 'border-destructive' : 'border-border focus:border-primary'
        }`}
      />
      {error && <p className="text-sm text-destructive mt-2 ml-1">{error}</p>}
    </div>
  );
}