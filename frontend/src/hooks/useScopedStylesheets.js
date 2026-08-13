import { useEffect } from 'react';

// A fingerprint rule unique to the mobile App's globally-imported stylesheets
// (Phone2.css etc.) — used to find and temporarily disable them while a
// second platform with its own colliding generic class names (.header,
// .sidebar, .content, .active...) is on screen. Cascade order alone isn't
// enough here: per-property mixing between equal-specificity same-name rules
// from different files (e.g. one file's width + another file's transform
// both matching the same element) can produce nonsensical combined results
// no amount of load-order juggling reliably prevents.
const APP_STYLESHEET_FINGERPRINT = '.iphone';

function isAppStylesheet(sheet) {
    try {
        return [...sheet.cssRules].some((r) => r.selectorText === APP_STYLESHEET_FINGERPRINT);
    } catch {
        return false;
    }
}

// Loads the given stylesheet URLs into document.head only while the calling
// component is mounted (removed again on unmount), AND disables every
// App-platform stylesheet for the same duration so their generic class names
// can't bleed into this platform's markup. Both effects fully reverse on
// unmount, restoring the App experience exactly as it was.
export default function useScopedStylesheets(hrefs) {
    useEffect(() => {
        const links = hrefs.map((href) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
            return link;
        });

        const disabledSheets = [...document.styleSheets].filter(isAppStylesheet);
        disabledSheets.forEach((sheet) => { sheet.disabled = true; });

        return () => {
            links.forEach((link) => document.head.removeChild(link));
            disabledSheets.forEach((sheet) => { sheet.disabled = false; });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
