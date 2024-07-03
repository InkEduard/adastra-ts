import { UserInteractionEvents } from '~/types';

const init = async () => {
  const { default: Alpine } = await import('alpinejs');

  // if (document.querySelector('[x-data*="swiper"]')) {
  //   const { default: Swiper } = await import('~/components/swiper');

  //   Alpine.plugin(Swiper);
  // }

  // const { default: Cart } = await import('~/components/cart');

  // Alpine.plugin(Cart);

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
