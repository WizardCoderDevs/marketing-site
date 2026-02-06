import { Cookie } from 'lucide-react';

interface FakeCookiesPopupProps {
  /**
   * The URL to redirect to when the user accepts.
   */
  redirectUrl: string;
  /**
   * Optional control to show/hide the popup programmatically.
   * Note: In this static version, this prop controls rendering at the server level.
   */
  isVisible?: boolean;
}

export default function FakeCookiesPopup({ redirectUrl, isVisible = true }: FakeCookiesPopupProps) {
  if (!isVisible) return null;

  return (
    // Overlay Container - Blocks interaction with everything behind it
    // Overlay Container - Blocks interaction with everything behind it
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center">
      
      {/* Semi-transparent Backdrop - Increased blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" aria-hidden="true" />

      {/* Popup Content - Centered */}
      <div className="relative z-10 w-full p-4 md:p-6 animate-in zoom-in-95 fade-in duration-500">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 md:flex md:items-center md:justify-between gap-6 ring-1 ring-black/5">
          
          <div className="flex items-start gap-4 mb-4 md:mb-0">
            <div className="p-3 bg-slate-100 rounded-full flex-shrink-0">
              <Cookie className="w-6 h-6 text-slate-700" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 text-lg">
                Cookie Consent
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
                We use cookies and similar technologies to improve your experience, 
                analyze traffic, and personalize content. By clicking "Accept", you agree 
                to the use of these technologies and will be redirected to the full content.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href={redirectUrl}
              className="flex items-center justify-center px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200 text-sm cursor-pointer no-underline"
            >
              Decline
            </a>
            <a
              href={redirectUrl}
              className="flex items-center justify-center px-8 py-2.5 rounded-xl font-semibold bg-slate-900 text-white hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-slate-900/20 text-sm cursor-pointer no-underline"
            >
              Accept
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
