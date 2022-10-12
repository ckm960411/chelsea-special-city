export const scrollToSection = (el: Element, exceptHeight?: number, smooth = true) => {
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - (exceptHeight ? exceptHeight : 0);
  window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
};
