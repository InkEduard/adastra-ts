import { Alpine as AlpineType } from 'alpinejs';
import type { ProductData, VariantData } from '~/types';
import { formatPrice } from '~/utils/format-price';

export default (Alpine: AlpineType) => {
  Alpine.data('variants', (productId, optionsCount, productUrl, prefix) => ({
    isValid: true,
    productId: productId as string,
    optionsCount: optionsCount as number,
    productUrl: productUrl as string,
    options: {} as { [index: string]: string },
    variantData: [] as VariantData[],
    hoverImage: '',
    variantsImages: [] as { [index: string]: string }[],
    currentColorImages: [] as string[],
    currentVariant: {} as VariantData,
    availableVariants: [] as string[],
    splittedProductsData: [] as ProductData[],
    splittedSelectedValue: '' as string,
    initedSingleOptions: [] as string[],
    backInStockDates: '' as string,
    prefix: prefix as string,

    init() {
      const variantsData = document.querySelector(
        `[x-ref="variants-data-${this.productId}"]`
      ) as HTMLScriptElement;
      const variantsImages = document.querySelector(
        `[x-ref="variants-images-${this.productId}"]`
      ) as HTMLScriptElement;
      const missedOptions = document.querySelector(
        `[x-ref="missed-options-${this.productId}"]`
      ) as HTMLScriptElement;
      const backInStockDates = document.querySelector(
        `[x-ref="variants-back-in-stock-date-${this.productId}"]`
      ) as HTMLScriptElement;

      if (variantsData) {
        this.variantData = JSON.parse(variantsData.innerText);
      }

      if (variantsImages) {
        this.variantsImages = JSON.parse(variantsImages.innerText);
      }

      if (missedOptions) {
        const splittedProductsElement = document.querySelector(
          `[x-ref="splitted-products-data-${this.productId}"]`
        ) as HTMLScriptElement;

        if (splittedProductsElement) {
          const splittedProductsData = JSON.parse(
            splittedProductsElement.innerText
          );
          const missedOptionsData = JSON.parse(missedOptions.innerText);

          missedOptionsData.forEach((option: string) => {
            splittedProductsData.forEach(product => {
              product.variants.forEach(variant => {
                if (variant.options.includes(option)) {
                  this.variantData.push(variant);
                }
              });
            });
          });
        }
      }

      if (backInStockDates && prefix === 'main') {
        this.$store.productStatus.updateBackInStockDates(
          backInStockDates.innerText
        );

        this.backInStockDates = backInStockDates.innerText;
      }

      this.addAvailableVariants();

      if (this.productUrl) {
        this.updateURL();
      }
    },

    addAvailableVariants() {
      let allOptions: string[] = [];
      const availableOptions: string[] = [];

      this.variantData.forEach(variant => allOptions.push(...variant.options));

      allOptions = [...new Set(allOptions)];

      if (prefix === 'main') {
        allOptions.forEach((option, i) => {
          const isContains = this.variantData.filter(
            variant => variant.options.includes(option) && variant.available
          ).length;

          if (isContains) availableOptions.push(option);
        });
      } else {
        availableOptions.push(...allOptions);
      }

      this.availableVariants.push(...availableOptions);
    },

    addImages(value: string | null, isSplitted?: boolean) {
      const images: string[] = [];

      if (value) {
        this.variantsImages.forEach(imageData => {
          if (images.length) return;

          const featuredKey = isSplitted
            ? 'splitted_featured_image'
            : 'featured_image';
          const galleryKey = isSplitted ? 'splitted_gallery' : 'gallery';

          if (imageData[featuredKey]) {
            for (const key in imageData[featuredKey]) {
              const keyValues = key.split(',').filter(el => el !== '');

              if (keyValues.includes(value)) {
                images.push(imageData[featuredKey][key]);
              }
            }
          }

          if (imageData[galleryKey]) {
            for (const key in imageData[galleryKey]) {
              const keyValues = key.split(',').filter(el => el !== '');

              if (keyValues.includes(value)) {
                images.push(imageData[galleryKey][key]);
              }
            }
          }
        });

        this.currentColorImages = [];
        this.currentColorImages.push(...images);
      } else {
        this.currentColorImages = [];
      }
    },

    getOptionsLength(variantData: VariantData[]) {
      return variantData.reduce(
        (max, variant) => Math.max(max, variant.options.length),
        0
      );
    },

    onVariantChange(
      key: string,
      value: string,
      optionName: string,
      prefix: string
    ) {
      const optionsLength = this.getOptionsLength(this.variantData);

      if (this.options[key] && this.options[key] === value) {
        delete this.options[key];
      } else {
        this.options[key] = value;
      }

      const selectedOptionsLength = Object.keys(this.options).length;

      this.options = Object.fromEntries(Object.entries(this.options).sort());
      this.setCurrentVariant(this.variantData);

      if (selectedOptionsLength) {
        this.updateVariantStatuses(this.variantData);

        if (optionName.includes('color')) {
          this.addImages(value);
        }
      } else {
        this.addAvailableVariants();
        this.addImages(null);
      }

      if (this.productUrl) {
        this.updateURL();
      }

      if (prefix === 'main') {
        this.updateProductStatus(optionsLength, selectedOptionsLength);
      }
    },

    updateProductStatus(optionsLength: number, selectedOptionsLength: number) {
      if (optionsLength === selectedOptionsLength) {
        if (this.currentVariant) {
          const backInStockDate =
            this.$store.productStatus.getBackInStockDates()[
              this.currentVariant.id
            ];

          this.setProductStatus(
            !this.currentVariant.available,
            backInStockDate
          );
        } else {
          this.setProductStatus(true, null);
        }
      } else {
        this.resetProductStatus();
      }
    },

    resetProductStatus() {
      this.$store.productStatus.isOutOfStock = false;
      this.$store.productStatus.backInStockDate = null;
    },

    setProductStatus(isOutOfStock: boolean, backInStockDate: any) {
      this.$store.productStatus.isOutOfStock = isOutOfStock;
      this.$store.productStatus.backInStockDate = backInStockDate;
    },

    setCurrentVariant(data: VariantData[]) {
      this.currentVariant = data.find(variant => {
        return !variant.options
          .map((option, index) => {
            return this.options[`option${index + 1}`] === option;
          })
          .includes(false);
      }) as VariantData;
    },

    updateVariantStatuses(data: VariantData[]) {
      const selectedOptions = Object.values(this.options);
      const availableOptionInputsValue: string[] = [];
      const backInStockProducts = this.backInStockDates
        ? this.$store.productStatus.getBackInStockDates()
        : {};

      availableOptionInputsValue.push(...selectedOptions);

      data.forEach(variant => {
        for (const selectedOptionKey in this.options) {
          const variantSelectedOptionKeyValue = variant[selectedOptionKey];
          let tmpOptions = JSON.parse(JSON.stringify(this.options));

          tmpOptions[selectedOptionKey] = variantSelectedOptionKeyValue;
          tmpOptions = Object.values(tmpOptions);

          const isTmpOptionsContains = tmpOptions.every(
            (variantOption: string) => variant.options.includes(variantOption)
          );

          if (isTmpOptionsContains) {
            if (
              (!availableOptionInputsValue.includes(
                variantSelectedOptionKeyValue
              ) &&
                variant.available) ||
              (!variant.available &&
                backInStockProducts.hasOwnProperty(variant.id) &&
                prefix === 'main')
            ) {
              availableOptionInputsValue.push(variantSelectedOptionKeyValue);
            }
          }
        }

        const isVariantContainsSelectedOptions = selectedOptions.every(
          selectedOption => variant.options.includes(selectedOption)
        );

        if (
          (isVariantContainsSelectedOptions && variant.available) ||
          (isVariantContainsSelectedOptions &&
            prefix === 'main' &&
            backInStockProducts.hasOwnProperty(variant.id))
        ) {
          variant.options.forEach(variantOption => {
            if (!availableOptionInputsValue.includes(variantOption)) {
              availableOptionInputsValue.push(variantOption);
            }
          });
        }
      });

      this.availableVariants = [];
      this.availableVariants.push(...availableOptionInputsValue);
    },

    isChecked(
      productId: string,
      position: string,
      value: string,
      size: number,
      optionName: string,
      prefix: string
    ) {
      const optionId = `${productId}-${position}-${value}`;

      if (size === 1 && !this.initedSingleOptions.includes(optionId)) {
        this.initedSingleOptions.push(optionId);
        this.onVariantChange(`option${position}`, value, optionName, prefix);
      }

      return this.options[`option${position}`] === value;
    },

    getPrice(value: number | null): string {
      if (!value) return '';

      return formatPrice(value);
    },

    updateURL() {
      const url =
        this.currentVariant && this.currentVariant.id
          ? `${this.productUrl}?variant=${this.currentVariant.id}`
          : this.productUrl;

      window.history.replaceState({}, '', url);
    },
  }));
};
