import React, { useState } from 'react';

const Report = () => {
  const [formData, setFormData] = useState({
    isAnonymous: false,
    bullyIdentity: '',
    evidence: null,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending report to Guru BK...', formData);
    alert('Laporan Anda telah terkirim ke Guru BK secara aman.');
    setFormData({
      isAnonymous: false,
      bullyIdentity: '',
      evidence: null,
      description: '',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 px-8 py-6">
          <h1 className="text-3xl font-extrabold text-white">Lapor Tindakan Bullying</h1>
          <p className="mt-2 text-indigo-100">Bantu kami menciptakan lingkungan sekolah yang aman.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="flex items-center space-x-3 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <input
              type="checkbox"
              id="isAnonymous"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleChange}
              className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="isAnonymous" className="text-sm font-semibold text-indigo-900">
              Kirim sebagai Anonim (Identitas Anda akan disembunyikan)
            </label>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Identitas Pelaku</label>
            <input
              type="text"
              name="bullyIdentity"
              value={formData.bullyIdentity}
              onChange={handleChange}
              required
              placeholder="Nama pelaku, kelas, atau ciri fisik"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Foto Bukti (Opsional)</label>
            <input
              type="file"
              name="evidence"
              onChange={handleChange}
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Keterangan Singkat</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Jelaskan kronologi kejadian secara singkat..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-lg hover:bg-indigo-700 transition transform active:scale-[0.98] shadow-lg"
          >
            Kirim Laporan ke Guru BK
          </button>
        </form>
      </div>
    </div>
  );
};

export default Report;
