const PREVIEW_NEW_LOOK_KEY = 'previewNewLook';

export function getPreviewNewLook() {
    return localStorage.getItem(PREVIEW_NEW_LOOK_KEY) !== 'false';
}

export function setPreviewNewLook(enabled) {
    localStorage.setItem(PREVIEW_NEW_LOOK_KEY, String(enabled));
    document.body.classList.toggle('new-look-active', enabled);
}

export function syncPreviewNewLook() {
    const enabled = getPreviewNewLook();
    document.body.classList.toggle('new-look-active', enabled);
    return enabled;
}
