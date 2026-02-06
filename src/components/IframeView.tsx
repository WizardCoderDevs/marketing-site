import FakeCookiesPopup from './FakeCookiesPopup';

interface IframeViewProps {
  /**
   * The URL of the page to display in the iframe.
   */
  url: string;
  /**
   * Title for the iframe (accessibility).
   */
  title?: string;
  /**
   * Additional classes for the container.
   */
  className?: string;
}

export default function IframeView({ 
  url, 
  title = 'Conteúdo Externo', 
  className = '' 
}: IframeViewProps) {

  return (
    <div className={`relative w-full h-[calc(100vh-64px)] min-h-[600px] bg-slate-50 dark:bg-slate-900 overflow-hidden ${className}`}>

      {/* Iframe */}
      <iframe
        src={`/api/proxy-view?url=${encodeURIComponent(url)}`}
        title={title}
        className="w-full h-full border-0"
        loading="lazy"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        referrerPolicy="no-referrer"
      />

      {/* Fake Cookies Popup Integration */}
      <FakeCookiesPopup redirectUrl={url} />
    </div>
  );
}
