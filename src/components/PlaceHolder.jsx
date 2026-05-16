import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Greeting from './Greeting';

export default function PlaceholderPage({ icon: Icon, title, description, children }) {
  return (
    <div className="min-h-screen bg-background">
      <Greeting />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-24 sm:pt-28 pb-16">
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
            <Icon className="w-6 h-6 text-primary" />
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            {description}
          </p>

          {children}
        </motion.div>
      </div>
    </div>
  );
}