import { UserInteractionEvents } from '~/types';

const init = async () => {
  const { default: Alpine } = await import('alpinejs');
  const { default: morph } = await import('@alpinejs/morph');
  const { default: Notices } = await import('~/components/notices');
  const { default: Cart } = await import('~/components/cart');
  const { default: Variants } = await import('~/components/variants');
  const { default: ProductStatus } = await import('~/components/product-status');
  const { default: Modal } = await import('~/components/modal');

  if (document.querySelector('[x-data*="menu"]')) {
    const { default: Menu } = await import('~/components/menu');

    Alpine.plugin(Menu);
  }

  if (document.querySelector('[x-data*="swiper"]')) {
    const { default: Swiper } = await import('~/components/swiper');

    Alpine.plugin(Swiper);
  }

  Alpine.plugin(Notices);
  Alpine.plugin(morph);
  Alpine.plugin(Cart);
  Alpine.plugin(Variants);
  Alpine.plugin(ProductStatus);
  Alpine.plugin(Modal);
  

  Alpine.start();
  window.Alpine = Alpine;
};

const timeout = setTimeout(() => {
  _eventHandler();
}, 800);

const _eventHandler = () => {
  clearTimeout(timeout);

  Object.values(UserInteractionEvents).forEach(event =>
    document.removeEventListener(event, _eventHandler, {
      capture: true,
    })
  );

  init();
};

const _addEventListeners = (event: UserInteractionEvents) => {
  document.addEventListener(event, _eventHandler, {
    capture: true,
  });
};

Object.values(UserInteractionEvents).forEach(event => {
  _addEventListeners(event);
});
