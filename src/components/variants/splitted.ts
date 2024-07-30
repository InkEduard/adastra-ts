import { Alpine as AlpineType } from 'alpinejs';
import type { ProductData, VariantData } from '~/types';

export default (Alpine: AlpineType) => {
  Alpine.data('splittedVariants', (productId, prefix, variantsInstance) => ({
    productId: productId as string,
    variantsInstance: variantsInstance as any,
    splittedProductsData: [] as ProductData[],
    splittedSelectedValue: '' as string,
    splittedAvailableVariants: [] as string[],
    backInStockDates: '' as string,
    prefix: prefix as string,

    init() {
      const splittedProductsData = document.querySelector(
        `[x-ref="splitted-products-data-${this.productId}"]`
      ) as HTMLScriptElement;
      const backInStockDates = document.querySelectorAll(
        `[x-ref="variants-back-in-stock-date"]`
      );

      if (splittedProductsData) {
        this.splittedProductsData = JSON.parse(splittedProductsData.innerText);

        this.addSplittedAvailableVariants();
      }

      if (backInStockDates && prefix === 'main') {
        backInStockDates.forEach(dates => {
          this.$store.productStatus.updateBackInStockDates(dates.innerText);
        });
      }

      this.variantsInstance.splittedProductsData = this.splittedProductsData;
      this.variantsInstance.onVariantChange = (
        key: string,
        value: string,
        optionName: string,
        prefix: string
      ) => {
        const variantData = this.splittedSelectedValue
          ? this._getSplittedVariants(this.splittedSelectedValue)
          : this.variantsInstance.variantData;
        const optionsLength =
          this.variantsInstance.getOptionsLength(variantData);

        if (
          this.variantsInstance.options[key] &&
          this.variantsInstance.options[key] === value
        ) {
          delete this.variantsInstance.options[key];
        } else {
          this.variantsInstance.options[key] = value;
        }

        const selectedOptionsLength = Object.keys(
          this.variantsInstance.options
        ).length;

        this.variantsInstance.options = Object.fromEntries(
          Object.entries(this.variantsInstance.options).sort()
        );

        if (this.splittedSelectedValue) {
          this.variantsInstance.setCurrentVariant(variantData);
        } else {
          this.variantsInstance.currentVariant = {};
        }

        if (selectedOptionsLength) {
          this.variantsInstance.updateVariantStatuses(variantData);

          if (optionName.includes('color')) {
            this.variantsInstance.addImages(value);
          }

          if (this.splittedProductsData.length) {
            this.updateSplittedVariantStatuses();
          }
        } else {
          this.addSplittedAvailableVariants();

          if (this.splittedSelectedValue) {
            this.variantsInstance.updateVariantStatuses(variantData);
          } else {
            this.variantsInstance.addAvailableVariants();
            this.variantsInstance.addImages(null);
          }
        }

        if (this.variantsInstance.productUrl) {
          this.variantsInstance.updateURL();
        }

        if (prefix === 'main') {
          this.updateProductStatus(optionsLength, selectedOptionsLength);
        }
      };
    },

    updateProductStatus(optionsLength: number, selectedOptionsLength: number) {
      if (
        optionsLength === selectedOptionsLength &&
        this.splittedSelectedValue
      ) {
        if (this.variantsInstance.currentVariant) {
          const backInStockDate =
            this.$store.productStatus.getBackInStockDates()[
              this.currentVariant.id
            ];

          this.variantsInstance.setProductStatus(
            !this.currentVariant.available,
            backInStockDate
          );
        } else {
          this.variantsInstance.setProductStatus(true, null);
        }
      } else {
        this.variantsInstance.resetProductStatus();
      }
    },

    addSplittedAvailableVariants() {
      this.splittedAvailableVariants = this.splittedProductsData.map(
        product => product.title.split(' | ')[1]
      );
    },

    onSplittedVariantChange(value: string, optionName: string, prefix: string) {
      const variants = this._getSplittedVariants(value);

      if (this.splittedSelectedValue === value) {
        this.splittedSelectedValue = '';
        this.variantsInstance.currentVariant = {};
        this.variantsInstance.updateVariantStatuses(
          this.variantsInstance.variantData
        );

        if (optionName.includes('color')) {
          this.variantsInstance.addImages(null);
        }
      } else {
        this.splittedSelectedValue = value;
        this.variantsInstance.setCurrentVariant(variants);
        this.variantsInstance.updateVariantStatuses(variants);

        if (optionName.includes('color')) {
          this.variantsInstance.addImages(value, true);
        }
      }

      this.variantsInstance.splittedSelectedValue = this.splittedSelectedValue;
      this.updateSplittedVariantStatuses();

      if (this.variantsInstance.productUrl) {
        this.variantsInstance.updateURL();
      }

      const optionsLength = this.variantsInstance.getOptionsLength(
        this.variantsInstance.variantData
      );
      const selectedOptionsLength = Object.keys(
        this.variantsInstance.options
      ).length;

      if (prefix === 'main') {
        this.updateProductStatus(optionsLength, selectedOptionsLength);
      }
    },

    updateSplittedVariantStatuses() {
      const splittedAvailableVariantsTmp: string[] = [];

      this.splittedProductsData.forEach(product => {
        product.variants.forEach(variant => {
          const isVariantContainsSelectedOptions = Object.values(
            this.variantsInstance.options
          ).every(selectedOption =>
            variant.options.includes(selectedOption as string)
          );

          if (isVariantContainsSelectedOptions) {
            const key = this._getSplittedProductKey(product.title);

            if (!splittedAvailableVariantsTmp.includes(key)) {
              splittedAvailableVariantsTmp.push(key);
            }
          }
        });
      });

      this.splittedAvailableVariants = splittedAvailableVariantsTmp;
    },

    _getSplittedVariants(value: string): VariantData[] {
      const splittedProduct = this.splittedProductsData.filter(el => {
        const key = this._getSplittedProductKey(el.title);

        if (key === value) return el;
      })[0];

      return splittedProduct.variants;
    },

    _getSplittedProductKey(str: string) {
      return str.split('|')[1]?.replace(/ /, '');
    },
  }));
};
