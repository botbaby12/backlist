import { useEffect } from 'react';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

interface CalendlyInlineWidgetProps {
  url: string;
}

export function CalendlyInlineWidget({ url }: CalendlyInlineWidgetProps) {
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

    // Initialize inline widget after script loads
    script.onload = () => {
      const element = document.getElementById('calendly-inline-widget');
      if (element && window.Calendly) {
        window.Calendly.initInlineWidget({
          url,
          parentElement: element,
        });
      }
    };

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, [url]);

  return (
    <div 
      id="calendly-inline-widget" 
      style={{ minWidth: '320px', height: '700px' }}
      className="mx-auto max-w-4xl"
    />
  );
}
