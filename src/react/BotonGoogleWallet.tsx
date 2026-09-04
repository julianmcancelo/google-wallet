import React from 'react';

export interface PropsBotonGoogleWallet extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** URL generada de Google Wallet (pay.google.com/gp/v/save/...) */
  url?: string;
  /** Callback al hacer click si se maneja de forma asíncrona */
  alHacerClick?: () => void | Promise<void>;
  /** Texto del botón. Por defecto: "Guardar en Google Wallet" */
  texto?: string;
  /** Tema visual del botón ('oscuro' | 'claro'). Por defecto: 'oscuro' */
  tema?: 'oscuro' | 'claro';
  /** Si está en estado de carga */
  cargando?: boolean;
}

export const BotonGoogleWallet: React.FC<PropsBotonGoogleWallet> = ({
  url,
  alHacerClick,
  texto = 'Guardar en Google Wallet',
  tema = 'oscuro',
  cargando = false,
  className = '',
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || cargando) {
      e.preventDefault();
      return;
    }
    if (alHacerClick) {
      alHacerClick();
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const esOscuro = tema === 'oscuro';

  const estilosBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    padding: '0.65rem 1.25rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 500,
    cursor: disabled || cargando ? 'not-allowed' : 'pointer',
    opacity: disabled || cargando ? 0.6 : 1,
    backgroundColor: esOscuro ? '#1F1F1F' : '#FFFFFF',
    color: esOscuro ? '#FFFFFF' : '#1F1F1F',
    border: esOscuro ? '1px solid #3C4043' : '1px solid #DADCE0',
    boxShadow: esOscuro ? '0 1px 3px rgba(0,0,0,0.3)' : '0 1px 2px rgba(60,64,67,0.15)',
    transition: 'all 0.2s ease-in-out',
    textDecoration: 'none',
    userSelect: 'none',
    ...props.style
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || cargando}
      aria-label={texto}
      style={estilosBase}
      className={`
        inline-flex items-center justify-center gap-3 px-5 py-3 rounded-full font-medium text-sm
        transition-all duration-200 select-none
        ${esOscuro 
          ? 'bg-[#1F1F1F] hover:bg-[#2B2B2B] text-white border border-[#3C4043] shadow-md' 
          : 'bg-white hover:bg-slate-50 text-[#1F1F1F] border border-[#DADCE0] shadow-sm'}
        ${disabled || cargando ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer active:scale-98'}
        ${className}
      `.trim()}
      {...props}
    >
      {/* Icono Oficial Multi-color de Google Wallet */}
      <svg
        style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0 }}
        className="w-5 h-5 shrink-0"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="10" width="40" height="28" rx="4" fill="#4285F4" />
        <path d="M4 14C4 11.79 5.79 10 8 10H40C42.21 10 44 11.79 44 14V18H4V14Z" fill="#3367D6" />
        <circle cx="34" cy="27" r="4" fill="#34A853" />
        <circle cx="34" cy="27" r="2" fill="#FBBC04" />
        <path d="M40 25H36C34.9 25 34 25.9 34 27C34 28.1 34.9 29 36 29H40C42.21 29 44 27.21 44 25V25C44 25 42.21 25 40 25Z" fill="#EA4335" />
      </svg>

      <span style={{ fontWeight: 600, letterSpacing: '0.01em' }} className="font-semibold tracking-wide font-sans">
        {cargando ? 'Generando pase...' : texto}
      </span>
    </button>
  );
};
