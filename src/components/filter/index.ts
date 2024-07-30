import { Alpine as AlpineType } from 'alpinejs';

export default (Alpine: AlpineType) => {
  Alpine.data('filterForm', () => ({
    filters: {},
    init() {
      const params = new URLSearchParams(window.location.search);
      for (const [key, value] of params.entries()) {
        this.filters[key] = value.split(',');
      }
    },
    submitForm() {
      const params = new URLSearchParams();
      for (const key in this.filters) {
        if (this.filters[key] && this.filters[key].length > 0) {
          params.append(key, this.filters[key].join(','));
        }
      }
      window.location.search = params.toString();
    }
  }));
};
