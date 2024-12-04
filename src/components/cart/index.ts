import { Alpine as AlpineType } from 'alpinejs';
import { Config, ResponseError, fetcher } from '~/utils';

export default (Alpine: AlpineType) => {
  Alpine.store('drawerCartState', {
    minicartOpen: false,
    showMinicartOverlay: false,
  });

  Alpine.data('cart', () => ({
    added: false,
    loading: false,
    disabled: false,
    formData: {
      quantity: 1,
      productId: null,
    },

    init() {
      window.addEventListener('update-cart', ({ detail }) => {
        this.updateCartItem(
          detail.cartLine,
          detail.quantity,
          detail.isMinicart
        );
      });
    },

    setHeightMinicart(showMinicart: boolean) {
      const minicartHeaderHeight = this.$refs.minicartHeader.offsetHeight;
      const minicartFooterHeight = this.$refs.minicartFooter.offsetHeight;

      if (showMinicart) {
        this.$refs.minicartItems.style.height = `calc(100dvh - ${minicartHeaderHeight}px - ${minicartFooterHeight}px)`;
      }
    },

    async add(): Promise<void> {
      this.loading = true;
      this.disabled = true;

      try {
        const response = await this._addToCart();

        this.successHandler(response);
        this.$store.drawerCartState.minicartOpen = true;
      } catch (error) {
        if (error instanceof ResponseError) {
          this.$dispatch('notice', {
            type: 'error',
            text: `${error.response.statusText} (${error.response.status}): ${error.message}`,
          });
        }

        this._errorHandler();
      }
    },

    async _addToCart(): Promise<Response> {
      return await fetcher(Config.routes.cart_add_url, {
        ...Config.fetchConfig(),
        body: JSON.stringify({
          items: [
            {
              id: this.formData.productId,
              quantity: this.formData.quantity,
            },
          ],
          sections: `${this.getDrawerCartSectionId()},header`,
        }),
      });
    },

    async updateCartItem(
      cartLine: number,
      quantity: number,
      isMinicart: boolean
    ): Promise<void> {
      if (quantity < 1) {
        return;
      }

      try {
        const response = await this._updateCartItem(cartLine, quantity);
        this.successHandler(response, isMinicart);
      } catch (error) {
        if (error instanceof ResponseError) {
          this.$dispatch('notice', {
            type: 'error',
            text: `${error.response.statusText} (${error.response.status}): ${error.message}`,
          });
        }

        this._errorHandler();
      }
    },

    async removeCartItem(cartLine: number, isMinicart: boolean): Promise<void> {
      try {
        const response = await this._updateCartItem(cartLine, 0);
        this.successHandler(response, isMinicart);
        // Alpine.store('wishlistData').updateWishlist();
      } catch (error) {
        if (error instanceof ResponseError) {
          this.$dispatch('notice', {
            type: 'error',
            text: `${error.response.statusText} (${error.response.status}): ${error.message}`,
          });
        }

        this._errorHandler();
      }
    },

    getCartSectionId(): string {
      const cartSectionElement = document.querySelector('.section-cart');

      if (cartSectionElement) {
        let cartSectionId = cartSectionElement.getAttribute('id');
        if (cartSectionId) {
          return cartSectionId.replace('shopify-section-', '');
        }
        return '';
      }
    },

    getDrawerCartSectionId(): string {
      const cartSectionElement = document.querySelector('.section-drawer-cart');

      if (cartSectionElement) {
        let cartSectionId = cartSectionElement.getAttribute('id');
        if (cartSectionId) {
          return cartSectionId.replace('shopify-section-', '');
        }
        return '';
      }
    },

    async _updateCartItem(
      cartLine: number,
      quantity: number
    ): Promise<Response> {
      const payload = {
        line: cartLine,
        quantity: quantity,
        sections: `${this.getCartSectionId()},${this.getDrawerCartSectionId()},header`,
      };

      return await fetcher(Config.routes.cart_change_url, {
        ...Config.fetchConfig(),
        body: JSON.stringify(payload),
      });
    },

    async successHandler(
      response: Response,
      isMinicart: boolean,
      parsedData?: Object
    ): Promise<void> {
      const data = parsedData || (await response.json());
      const selectorCount = '[data-cart-count]';
      const container = document.getElementById(
        `shopify-section-${this.getCartSectionId()}`
      );

      if (container)
        Alpine.morph(container, data.sections[this.getCartSectionId()]);

      const drawer = document.getElementById(
        `shopify-section-${this.getDrawerCartSectionId()}`
      );

      if (drawer)
        Alpine.morph(drawer, data.sections[this.getDrawerCartSectionId()]);

      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(
        data.sections.header,
        'text/html'
      );
      const desiredElement = htmlDocument.querySelector(selectorCount);
      if (desiredElement) {
        document.querySelector(selectorCount).innerHTML =
          desiredElement.innerHTML;
      }

      this.formData.quantity = 1;
      this.added = true;
      this.loading = false;

      setTimeout(() => {
        this.added = false;
        this.disabled = false;

        if (isMinicart) {
          this.setHeightMinicart(true);
        }
      }, 2000);
    },

    _errorHandler(): void {
      this.formData.quantity = 1;
      this.loading = false;
      this.disabled = false;
    },
  }));
};
