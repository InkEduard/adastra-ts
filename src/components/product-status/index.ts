import { Alpine as AlpineType } from 'alpinejs';

export default (Alpine: AlpineType) => {
  Alpine.store('productStatus', {
    isOutOfStock: false,
    backInStockDates: null,
    backInStockDate: null,

    setIsOutOfStock(value: string, availableVariants: string[]) {
      this.isOutOfStock = !availableVariants.includes(value);
    },

    updateBackInStockDates(backInStockDates: Record<string, string>) {
      this.backInStockDates = backInStockDates;
    },

    getBackInStockDates() {
      return JSON.parse(`{${this.backInStockDates}}`);
    },

    updateBackInStockDate(variantId: string) {
      this.backInStockDate = this.getBackInStockDates()[variantId] || null;
    },
  });
};
