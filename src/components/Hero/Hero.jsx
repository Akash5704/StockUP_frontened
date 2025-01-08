import styles from './Hero.module.css';
import { useState } from 'react';
import { AuthModal } from '../AuthModal/AuthModal';
export function Hero() {
  const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const handleAuthClick = (mode) => {
      setAuthMode(mode);
      setShowAuthModal(true);
      setIsMenuOpen(false);
    };
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <h1>Invest in Your Future</h1>
        <p>Start your investment journey today with StockWise. Get expert insights, real-time market data, and powerful tools to make informed investment decisions.</p>
        <button className={styles.ctaButton} 
          onClick={() => handleAuthClick('signup')}
        >

          Get Started
          </button>
      </div>
      <div className={styles.imageContainer}>
        <img 
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80" 
          alt="Stock market visualization" 
          className={styles.heroImage}
        />
      </div>
      {showAuthModal && (
              <AuthModal 
                mode={authMode} 
                onClose={() => setShowAuthModal(false)}
              />
            )}
    </div>

    
  );
}