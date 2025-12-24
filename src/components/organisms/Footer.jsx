import React from 'react';
import { Dumbbell, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoIcon from '../../assets/images/Logo4.png';

const Footer = () => {
  return (
    <footer className="bg-background text-text-tertiary pt-12 pb-8 border-t border-surface-border">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-6">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={logoIcon} 
              alt="GymTrack" 
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
            Empowering you to reach your peak performance through AI-driven tracking and personalized workout plans.
          </p>
          <div className="flex gap-4">
             <a href="#" className="p-2 rounded-full bg-surface-primary/5 hover:bg-primary/10 hover:text-primary transition-all duration-300 group"><Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" /></a>
             <a href="#" className="p-2 rounded-full bg-surface-primary/5 hover:bg-primary/10 hover:text-primary transition-all duration-300 group"><Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" /></a>
             <a href="#" className="p-2 rounded-full bg-surface-primary/5 hover:bg-primary/10 hover:text-primary transition-all duration-300 group"><Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-text-primary font-bold mb-6 text-lg">Workouts</h4>
          <ul className="space-y-4 text-sm">
             <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Strength Training</a></li>
             <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Cardio & HIIT</a></li>
             <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Yoga & Flexibility</a></li>
             <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Custom Plans</a></li>
          </ul>
        </div>

        <div>
           <h4 className="text-text-primary font-bold mb-6 text-lg">Resources</h4>
           <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Fitness Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Nutrition Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">ROI Calculator</a></li>
              <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Help Center</a></li>
           </ul>
        </div>
        
        <div>
           <h4 className="text-text-primary font-bold mb-6 text-lg">Get the App</h4>
           <p className="text-sm mb-4">Track workouts on the go.</p>
           <div className="flex flex-col gap-3">
             <button className="flex items-center gap-3 bg-surface-primary border border-surface-border hover:border-primary/50 text-text-primary px-4 py-3 rounded-xl transition-all duration-300 group hover:bg-surface-primary/80">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-white group-hover:text-primary transition-colors" xmlns="http://www.w3.org/2000/svg"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-semibold text-text-tertiary">Get it on</div>
                  <div className="text-sm font-bold leading-none">Google Play</div>
                </div>
             </button>
           </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-8 border-t border-surface-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="text-center md:text-left">
               <p className="font-medium text-text-primary mb-2">&copy; {new Date().getFullYear()} GymTrackRD</p>
               <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-text-tertiary">
                 <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                 <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                 <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
               </div>
            </div>

            <div className="flex items-center gap-2 text-text-tertiary bg-surface-primary/30 px-4 py-2 rounded-full border border-surface-border/50">
               <span>Developed by</span>
               <a href="https://github.com/hytech-isaias" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:text-white transition-colors flex items-center gap-1 group">
                 Badia Innovations
                 <span className="block w-1.5 h-1.5 rounded-full bg-primary group-hover:animate-pulse" />
               </a>
            </div>
          </div>
      </div>
    </footer>
  );
};

export { Footer };
