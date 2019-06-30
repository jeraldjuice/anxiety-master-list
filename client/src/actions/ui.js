export const OPEN_MODAL = 'UI.OPEN_MODAL';
export const CLEAR_MODALS = 'UI.CLEAR_MODALS';

export function openModal( modalType, modalData = {} ) {
    return {
        type: OPEN_MODAL,
        modalType,
        modalData,
    };
}

export function clearModals() {
    return {
        type: CLEAR_MODALS,
    };
}