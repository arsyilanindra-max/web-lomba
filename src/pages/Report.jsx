import { useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon, ShieldCheck, FileText, UserCircle2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let num = bytes;
  while (num >= 1024 && i < units.length - 1) {
    num /= 1024;
    i += 1;
  }
  return `${num.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export default function Report() {
  const navigate = useNavigate();
  const inputFileRef = useRef(null);

  const [formData, setFormData] = useState({
    isAnonymous: true,
    bullyIdentity: '',
    evidence: null,
    description: '',
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

  const setField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onEvidenceChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setField('evidence', null);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, evidence: 'File harus berupa gambar.' }));
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setField('evidence', file);
  };

  const validate = () => {
    const next = {};
    if (!formData.description.trim()) next.description = 'Keterangan singkat wajib diisi.';
    if (!formData.isAnonymous && !formData.bullyIdentity.trim()) {
      next.bullyIdentity = 'Identitas pelaku wajib diisi saat tidak anonim.';
    }
    return next;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setToast({
      title: 'Laporan Terkirim',
      message: 'Laporan Anda sudah dikirim ke Guru BK secara aman (simulasi).',
      kind: 'success',
    });

    setFormData({
      isAnonymous: true,
      bullyIdentity: '',
      evidence: null,
      description: '',
    });

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);

    if (inputFileRef.current) inputFileRef.current.value = '';

    setTimeout(() => {
      setToast(null);
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl -translate-y-1/2 -translate-x-1/3" />
      <Navbar />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-16">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke dashboard
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">Lapor Bullying</h1>
              <p className="text-base text-muted-foreground leading-relaxed mt-1">
                Kirim laporan secara aman untuk membantu Guru BK menindaklanjuti.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-3xl p-5 sm:p-7 shadow-sm">
                <form onSubmit={onSubmit} className="space-y-6">
                  <section className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-bold text-lg">Form Laporan</h2>
                        <p className="text-sm text-muted-foreground">Pastikan informasi yang kamu tulis jelas dan singkat.</p>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                      <label className="flex items-center gap-3 bg-secondary/30 border border-border rounded-2xl px-4 py-3 cursor-pointer hover:bg-secondary/50 transition-colors">
                        <input
                          type="radio"
                          name="anon"
                          checked={formData.isAnonymous}
                          onChange={() => setField('isAnonymous', true)}
                          className="accent-primary"
                        />
                        <span className="font-semibold">Lapor Anonim</span>
                      </label>
                      <label className="flex items-center gap-3 bg-secondary/30 border border-border rounded-2xl px-4 py-3 cursor-pointer hover:bg-secondary/50 transition-colors">
                        <input
                          type="radio"
                          name="anon"
                          checked={!formData.isAnonymous}
                          onChange={() => setField('isAnonymous', false)}
                          className="accent-primary"
                        />
                        <span className="font-semibold">Tampilkan Identitas Pelaku</span>
                      </label>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <div className="flex items-center gap-3">
                      <UserCircle2 className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-base">Identitas yang Membully</h3>
                    </div>

                    <div className={`space-y-2 ${formData.isAnonymous ? 'opacity-60' : 'opacity-100'}`}>
                      <input
                        type="text"
                        value={formData.bullyIdentity}
                        onChange={(e) => setField('bullyIdentity', e.target.value)}
                        placeholder={formData.isAnonymous ? 'Pilih “Tampilkan Identitas Pelaku” untuk mengisi.' : 'Nama pelaku, kelas, atau ciri fisik'}
                        disabled={formData.isAnonymous}
                        className={`w-full px-4 py-3 rounded-2xl border outline-none transition bg-background ${formData.isAnonymous ? 'cursor-not-allowed' : 'focus:ring-2 focus:ring-primary/25 focus:border-primary/50'}`}
                      />
                      {errors.bullyIdentity && <p className="text-sm text-destructive">{errors.bullyIdentity}</p>}
                    </div>
                  </section>

                  <section className="space-y-3">
                    <div className="flex items-center gap-3">
                      <ImageIcon className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-base">Foto Bukti</h3>
                    </div>

                    <div className="rounded-2xl border border-dashed border-border bg-secondary/20 p-4">
                      <input
                        ref={inputFileRef}
                        type="file"
                        accept="image/*"
                        onChange={onEvidenceChange}
                        className="hidden"
                        id="evidence"
                      />

                      <label
                        htmlFor="evidence"
                        className="flex flex-col sm:flex-row sm:items-center gap-3 cursor-pointer"
                      >
                        <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">Unggah foto bukti (opsional)</p>
                          <p className="text-sm text-muted-foreground">Format gambar. Ukuran file tidak diproses (simulasi).</p>
                        </div>
                        <div className="text-sm font-semibold text-primary">Pilih File</div>
                      </label>

                      <AnimatePresence>
                        {previewUrl && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            className="mt-4"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold">Preview Bukti</p>
                                <p className="text-xs text-muted-foreground">
                                  {formData.evidence?.name} {formData.evidence ? `(${formatBytes(formData.evidence.size)})` : ''}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setField('evidence', null);
                                  if (previewUrl) URL.revokeObjectURL(previewUrl);
                                  setPreviewUrl(null);
                                  if (inputFileRef.current) inputFileRef.current.value = '';
                                }}
                                className="text-sm font-semibold text-destructive hover:underline"
                              >
                                Hapus
                              </button>
                            </div>
                            <div className="mt-3 overflow-hidden rounded-2xl border bg-background">
                              <img src={previewUrl} alt="preview bukti" className="w-full h-56 object-cover" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {errors.evidence && <p className="text-sm text-destructive mt-3">{errors.evidence}</p>}
                    </div>
                  </section>

                  <section className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-base">Keterangan Singkat</h3>
                    </div>

                    <textarea
                      value={formData.description}
                      onChange={(e) => setField('description', e.target.value)}
                      rows={7}
                      placeholder="Ceritakan kronologi kejadian secara singkat: kapan, di mana, dan apa yang terjadi."
                      className="w-full px-4 py-3 rounded-2xl border outline-none transition bg-background focus:ring-2 focus:ring-primary/25 focus:border-primary/50 resize-none"
                    />
                    {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}

                    <p className="text-xs text-muted-foreground">
                      Catatan: aplikasi ini melakukan simulasi pengiriman ke Guru BK.
                    </p>
                  </section>

                  <button
                    type="submit"
                    className="w-full mt-2 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-4 rounded-2xl hover:opacity-90 transition active:scale-[0.98]"
                  >
                    Kirim Laporan ke Guru BK
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

            <aside className="lg:col-span-2">
              <div className="bg-card border border-border rounded-3xl p-5 sm:p-7 shadow-sm sticky top-24">
                <h2 className="font-bold text-lg">Yang Akan Terjadi Setelah Dikirim</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Laporan kamu akan langsung ditangani oleh Guru BK untuk evaluasi dan tindak lanjut.
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      title: 'Aman',
                      desc: 'Data yang kamu kirim dilindungi sesuai pengaturan anonim.',
                    },
                    {
                      title: 'Terarah',
                      desc: 'Keterangan singkat membantu Guru BK memahami konteks kejadian.',
                    },
                    {
                      title: 'Bisa dilampirkan',
                      desc: 'Foto bukti membantu memperkuat informasi yang kamu laporkan.',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3 rounded-2xl bg-secondary/20 border border-border p-4">
                      <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-primary font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-border bg-secondary/20 p-4">
                  <p className="text-sm font-semibold">Tips Menulis Laporan</p>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground list-disc pl-5">
                    <li>Katakan waktu dan tempat kejadian.</li>
                    <li>Hindari menuliskan hal yang belum pasti.</li>
                    <li>Jika anonim, jangan isi identitas pelaku.</li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] w-[92vw] max-w-md"
          >
            <div className="rounded-3xl border border-border bg-card shadow-xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-bold">{toast.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{toast.message}</p>
              </div>
              <button
                type="button"
                onClick={() => setToast(null)}
                className="p-2 rounded-full hover:bg-secondary transition"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

