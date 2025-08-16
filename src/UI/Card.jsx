export function Card({ title, children, footer }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl2 shadow-soft">
      {title && (
        <div className="px-4 py-3 border-b border-neutral-200 bg-brand-maroon/5">
          <h3 className="font-semibold text-brand-maroon">{title}</h3>
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && (
        <div className="px-4 py-3 border-t border-neutral-200 bg-neutral-50">
          {footer}
        </div>
      )}
    </div>
  );
}

    <div className="bg-white border border-neutral-200 rounded-xl2 shadow-soft">      
            <div className="px-4 py-3 border-b border-neutral-200 bg-brand-maroon/5">
            <h3 className="font-semibold text-brand-maroon">testing</h3>
            </div>      
        <div className="p-4">testing</div>      
            <div className="px-4 py-3 border-t border-neutral-200 bg-neutral-50">
            testing
            </div>      
        </div>