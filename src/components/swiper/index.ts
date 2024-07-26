import { Alpine as AlpineType } from 'alpinejs';
import 'swiper/css';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types/swiper-options';

export default (Alpine: AlpineType) => {
  Alpine.data('swiper', config => ({
    config: config as SwiperOptions,
    slider: null as null | Swiper,
    isVisibleNavigation: false as boolean,
    isVisiblePagination: false as boolean,

    async init() {
      const { default: Swiper } = await import('swiper');

      this.config.modules = [Pagination, Navigation, Autoplay];
      this.slider = new Swiper(this.$el, this.config);

      const slideCount = this.$el.querySelectorAll('.swiper-slide')
        .length as number;

      if (slideCount > 1) {
        this.visibleNavigation();
        this.visiblePagination();
      }
    },

    visibleNavigation() {
      this.isVisibleNavigation = true;
    },

    visiblePagination() {
      this.isVisiblePagination = true;
    },
  }));
};
