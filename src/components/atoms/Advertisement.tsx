import { useEffect } from "react";
import { motion } from "framer-motion";

interface AdProps {
  position?: "top" | "sidebar" | "bottom" | "square";
  className?: string;
  adSlot?: string; // Google AdSense ad slot ID
  adClient?: string; // Google AdSense client ID
}

// Default ad slots - Replace these with your actual AdSense ad unit IDs
const DEFAULT_AD_SLOTS = {
  top: "1234567890",      // Replace with your horizontal banner ad slot
  sidebar: "2345678901",  // Replace with your vertical/square ad slot  
  bottom: "3456789012",   // Replace with your bottom banner ad slot
  square: "4567890123",   // Replace with your square ad slot
};

export const Advertisement = ({ 
  position = "top", 
  className = "",
  adSlot,
  adClient = "ca-pub-XXXXXXXXXXXXXXXX", // Replace with your AdSense publisher ID
}: AdProps) => {
  // Use provided adSlot or default based on position
  const finalAdSlot = adSlot || DEFAULT_AD_SLOTS[position];
  
  useEffect(() => {
    // Load Google AdSense script
    if (typeof window !== 'undefined') {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, []);

  // Ad size configurations based on position
  const adStyles = {
    top: "min-h-[90px] md:min-h-[90px]",      // Horizontal banner
    bottom: "min-h-[90px] md:min-h-[90px]",   // Horizontal banner
    sidebar: "min-h-[250px] md:min-h-[600px]", // Vertical/Large rectangle
    square: "min-h-[250px]",                    // Square/Medium rectangle
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative ${className}`}
    >
      {/* AdSense container with fallback placeholder */}
      <div className={`relative ${adStyles[position]} rounded-lg border border-surface-border bg-linear-to-br from-surface-secondary to-surface-secondary backdrop-blur-sm overflow-hidden`}>
        {/* Placeholder overlay with top-left label */}
        <div className="absolute inset-0">
          <div className="absolute top-3 left-3 px-2 py-1 rounded bg-surface-primary backdrop-blur-sm">
            <span className="text-[10px] text-text-tertiary uppercase tracking-wider font-medium">Advertisement</span>
          </div>
        </div>
        
        {/* Google AdSense */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={finalAdSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </motion.div>
  );
};
