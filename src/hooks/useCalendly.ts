import { useEffect } from 'react';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      closePopupWidget: () => void;
    };
  }
}

export const useCalendly = () => {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Load Calendly CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  const openCalendly = (url: string) => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
    }
  };

  const closeCalendly = () => {
    if (window.Calendly) {
      window.Calendly.closePopupWidget();
    }
  };

  return { openCalendly, closeCalendly };
};
