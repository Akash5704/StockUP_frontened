import { useState } from 'react';
import styles from './Navbar.module.css';
import { AuthModal } from '../AuthModal/AuthModal';
import { FaBars, FaTimes } from 'react-icons/fa';

export function Navbar() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        StockUP
      </div>
      
      <button className={styles.menuToggle} onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`${styles.navContent} ${isMenuOpen ? styles.active : ''}`}>
        {/* <div className={styles.navLinks}>
          <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#learn" onClick={() => setIsMenuOpen(false)}>Learn</a>
          <a href="#markets" onClick={() => setIsMenuOpen(false)}>Markets</a>
          <a href="#portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
        </div> */}

        <div className={styles.authButtons}>
          <button 
            className={styles.loginBtn}
            onClick={() => handleAuthClick('login')}
          >
            Login
          </button>
          <button 
            className={styles.signupBtn}
            onClick={() => handleAuthClick('signup')}
          >
            Sign Up
          </button>
        </div>
      </div>

      {showAuthModal && (
        <AuthModal 
          mode={authMode} 
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </nav>
  );
}