import { Alpine as AlpineType } from 'alpinejs';
import { ModalList } from '~/types';

export default (Alpine: AlpineType) => {
  Alpine.store('modal', {
    activeModalId: null as null | ModalList,

    openModal(modalId: ModalList): void {
      this.activeModalId = modalId;
    },

    closeModal(): void {
      this.activeModalId = null;
    },

    get modalIsActive(): boolean {
      return this.activeModalId !== null;
    },
  });
};
