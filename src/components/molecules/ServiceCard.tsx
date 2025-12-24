import { motion } from "framer-motion";
import { Check, Sparkles, LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  price: string;
  priceDetail?: string;
  popular?: boolean;
  badge?: string;
}

export interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const {
    icon: Icon,
    title,
    description,
    features,
    price,
    priceDetail,
    popular,
    badge,
  } = service;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative h-full glass-panel p-6 rounded-2xl border transition-all duration-300 ${
        popular
          ? "border-primary/50 shadow-lg shadow-primary/20"
          : "border-surface-border hover:border-primary/30"
      }`}
    >
      {/* Popular Badge */}
      {badge && (
        <div
          className={`absolute -top-3 right-6 px-6 py-2 text-white text-xs font-bold rounded-full flex items-center gap-1 ${
            popular
              ? "bg-linear-to-r from-primary to-secondary"
              : "bg-surface-secondary border border-surface-border text-text-primary"
          }`}
        >
          {popular && <Sparkles size={12} />}
          {badge}
        </div>
      )}

      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
        <Icon className="text-primary" size={28} />
      </div>

      {/* Content */}
      <h3 className="font-display text-2xl font-bold text-text-primary mb-2">
        {title}
      </h3>
      <p className="font-body text-text-tertiary mb-6 leading-relaxed">
        {description}
      </p>

      {/* Price */}
      <div className="mb-6">
        <span className="text-4xl font-bold text-text-primary">{price}</span>
        {priceDetail && (
          <span className="text-text-tertiary text-lg">{priceDetail}</span>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-sm text-text-secondary"
          >
            <Check size={16} className="text-primary flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
          popular
            ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25"
            : "bg-surface-primary/10 border border-surface-border text-text-primary hover:bg-surface-primary/20"
        }`}
      >
        Get Started
      </motion.button>
    </motion.div>
  );
};
