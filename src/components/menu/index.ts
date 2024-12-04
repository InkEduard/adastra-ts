import { Alpine as AlpineType } from 'alpinejs';

export default (Alpine: AlpineType) => {
  Alpine.store('menuState', {
    isMenuOpened: false as boolean
  });

  Alpine.data('menu', () => ({
    selected: null as null | string,
    breakpoint: 1279 as number,
    breakpointMobile: 1023 as number,

    toggleSelected(event: Event, index: string) {
      if (event.type === 'mouseover' && window.innerWidth < this.breakpoint) return;
      if (event.type === 'click' && window.innerWidth > this.breakpoint) return;

      this.selected = this.selected !== index ? index : null;
    },

    menuOut(event: Event) {
      if (event.type === 'mouseleave' && window.innerWidth < this.breakpoint) return;

      this.selected = null;
    },

    desktopCloseMenu() {
      if (window.innerWidth > this.breakpointMobile) {
        this.selected = null;
      }
    }
  }));
};
