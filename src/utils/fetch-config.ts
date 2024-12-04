export const Config = Object.freeze({
  routes: {
    cart_get_url: '/cart.js',
    cart_add_url: '/cart/add.js',
    cart_change_url: '/cart/change.js',
    cart_update_url: '/cart/update.js',
    cart_clear_url: '/cart/clear.js',
  },
  fetchConfig: (method = 'POST', type = 'json') => {
    return {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: `application/${type}`,
      },
    };
  },
});
