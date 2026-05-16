import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function SectionCard({ to, icon: Icon, title, description, index = 0, accent = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      <Link
        to={to}
        className={`group relative block h-full overflow-hidden rounded-3xl border border-border p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 ${
          accent ? 'bg-primary text-primary-foreground' : 'bg-card'
        }`}
      >
        <div className="flex items-start justify-between mb-6">
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-transform duration-500 group-hover:scale-110 ${
              accent ? 'bg-primary-foreground/10' : 'bg-secondary'
            }`}
          >
            <Icon className={`w-5 h-5 ${accent ? 'text-primary-foreground' : 'text-primary'}`} />
          </div>
          <ArrowUpRight
            className={`w-5 h-5 transition-all duration-500 opacity-40 group-hover:opacity-100 group-hover:rotate-45 ${
              accent ? 'text-primary-foreground' : 'text-muted-foreground'
            }`}
          />
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-2 leading-tight">
          {title}
        </h3>
        <p className={`text-sm leading-relaxed ${accent ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
          {description}
        </p>
      </Link>
    </motion.div>
  );
}