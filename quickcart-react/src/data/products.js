import groundPork from '../assets/ground-pork.png';

export const PRODUCTS = {
  groundPork: {
    id: 'ground-pork',
    name: 'Ground Pork',
    unit: '250G',
    price: 99,
    image: groundPork,
  },
};

// Items currently in the cart. Quantity comes from here.
export const INITIAL_CART = [{ productId: 'groundPork', quantity: 1 }];

export const FLAT_SHIPPING_FEE = 49;

// Demo discount codes (no backend yet).
export const DISCOUNT_CODES = {
  QUICKCART10: 0.1,
  FRESH5: 0.05,
};

export const formatPeso = (n) =>
  '\u20B1' + n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
