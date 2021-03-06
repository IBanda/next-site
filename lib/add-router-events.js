function hasModifier(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

/**
 * Util to add router events to anchors that weren't added with React Components
 */
export default function addRouterEvents(node, router, { href }) {
  function onClick(e) {
    const linkTarget = e.currentTarget.target;

    if (!(e.defaultPrevented || hasModifier(e) || (linkTarget && linkTarget !== '_self'))) {
      e.preventDefault();
      router.push(href).then(success => {
        if (success) {
          window.scrollTo(0, 0);
          document.body.focus();
        }
      });
    }
  }
  function onMouseEnter() {
    router.prefetch(href, href, { priority: true });
  }

  node.addEventListener('click', onClick);
  node.addEventListener('mouseenter', onMouseEnter);

  return () => {
    node.removeEventListener('click', onClick);
    node.removeEventListener('mouseenter', onMouseEnter);
  };
}
