
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@/types';

// Sample translations
const translations: Record<string, Record<string, string>> = {
  en: {
    home: 'Home',
    products: 'Products',
    cart: 'Cart',
    checkout: 'Checkout',
    account: 'Account',
    search: 'Search',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',
    lowStock: 'Low Stock',
    onlyLeft: 'Only {count} left',
    welcome: 'Welcome to our store',
    featuredProducts: 'Featured Products',
    newArrivals: 'New Arrivals',
    bestSellers: 'Best Sellers',
    newsletter: 'Subscribe to our newsletter',
    newsletterDescription: 'Get the latest updates on new products and special promotions',
    subscribe: 'Subscribe',
  },
  fr: {
    home: 'Accueil',
    products: 'Produits',
    cart: 'Panier',
    checkout: 'Paiement',
    account: 'Compte',
    search: 'Recherche',
    addToCart: 'Ajouter au Panier',
    buyNow: 'Acheter Maintenant',
    outOfStock: 'Rupture de Stock',
    inStock: 'En Stock',
    lowStock: 'Stock Faible',
    onlyLeft: 'Seulement {count} restants',
    welcome: 'Bienvenue dans notre boutique',
    featuredProducts: 'Produits Vedettes',
    newArrivals: 'Nouveautés',
    bestSellers: 'Meilleures Ventes',
    newsletter: 'Abonnez-vous à notre newsletter',
    newsletterDescription: 'Recevez les dernières mises à jour sur les nouveaux produits et les promotions spéciales',
    subscribe: 'S\'abonner',
  },
  es: {
    home: 'Inicio',
    products: 'Productos',
    cart: 'Carrito',
    checkout: 'Finalizar Compra',
    account: 'Cuenta',
    search: 'Buscar',
    addToCart: 'Añadir al Carrito',
    buyNow: 'Comprar Ahora',
    outOfStock: 'Agotado',
    inStock: 'En Existencia',
    lowStock: 'Pocas Unidades',
    onlyLeft: 'Solo quedan {count}',
    welcome: 'Bienvenido a nuestra tienda',
    featuredProducts: 'Productos Destacados',
    newArrivals: 'Novedades',
    bestSellers: 'Los Más Vendidos',
    newsletter: 'Suscríbase a nuestro boletín',
    newsletterDescription: 'Reciba las últimas actualizaciones sobre nuevos productos y promociones especiales',
    subscribe: 'Suscribirse',
  },
};

// Available languages
const availableLanguages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', isDefault: true },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

interface LanguageContextType {
  currentLanguage: Language;
  availableLanguages: Language[];
  setLanguage: (languageCode: string) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    availableLanguages.find(lang => lang.isDefault) || availableLanguages[0]
  );

  useEffect(() => {
    // Check if user has previously selected a language
    const savedLanguage = localStorage.getItem('userLanguage');
    if (savedLanguage) {
      const language = availableLanguages.find(l => l.code === savedLanguage);
      if (language) {
        setCurrentLanguage(language);
      }
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      const language = availableLanguages.find(l => l.code === browserLang);
      if (language) {
        setCurrentLanguage(language);
        localStorage.setItem('userLanguage', language.code);
      }
    }
  }, []);

  const setLanguage = (languageCode: string) => {
    const language = availableLanguages.find(l => l.code === languageCode);
    if (language) {
      setCurrentLanguage(language);
      localStorage.setItem('userLanguage', language.code);
      // Update HTML lang attribute
      document.documentElement.lang = language.code;
      // Update direction for RTL languages
      document.documentElement.dir = language.isRTL ? 'rtl' : 'ltr';
    }
  };

  // Translation function
  const t = (key: string, params?: Record<string, string | number>) => {
    const langTranslations = translations[currentLanguage.code] || translations.en;
    let translation = langTranslations[key] || key;
    
    // Replace parameters in the translation
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(`{${paramKey}}`, String(paramValue));
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      availableLanguages, 
      setLanguage,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
