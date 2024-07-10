import { Alpine as AlpineType } from 'alpinejs';

export default (Alpine: AlpineType) => {
  Alpine.store('menuState', {
    isMenuOpened: false as boolean
  });

  Alpine.data('menu', () => ({
    selected: null as null | string,
    breakpoint: 1024,

    toggleSelected(event: Event, index: string) {
      if (event.type === 'mouseover' && window.innerWidth < this.breakpoint) return;

      this.selected = this.selected !== index ? index : null;
    },
  }));
};
