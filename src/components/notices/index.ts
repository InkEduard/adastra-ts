import { Alpine as AlpineType } from 'alpinejs';
import { Notice } from '~/types';

export default (Alpine: AlpineType) => {
  Alpine.data('notices', () => ({
    notices: [] as Notice[],
    visible: [] as Notice[],

    addNotice(notice: Notice) {
      notice.id = Date.now();
      this.notices.push(notice);
      this.updateNotice(notice.id);
    },

    updateNotice(id: number) {
      const notice = this.notices.find(notice => notice.id === id);

      if (!notice) return;

      this.visible.push(notice);
      const timeShown = 5000 * this.visible.length;

      setTimeout(() => {
        this.removeNotice(id);
      }, timeShown);
    },

    removeNotice(id: number) {
      const notice = this.visible.find(notice => notice.id === id);

      if (!notice) return;

      this.visible.splice(this.visible.indexOf(notice), 1);
    },
  }));
};
