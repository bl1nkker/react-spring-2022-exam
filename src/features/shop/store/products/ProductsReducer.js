import {
  CREATE_PRODUCT,
  ADD_PRODUCT_TO_CARD,
  CHANGE_VIEW,
  DECREASE_PRODUCT_QTY,
  INCREASE_PRODUCT_QTY,
  REMOVE_PRODUCT_FROM_CARD,
} from "./actionTypes";
const initialState = {
  products: [
    // { name, category, imageURL, price, quantity }
    {
      id: 1,
      name: "Цветок",
      category: "Fruits",
      imageURL: "https://i.ibb.co/7bQQYkX/Group-204.png",
      price: 10,
      quantity: 10,
    },
    {
      id: 2,
      name: "Orange",
      category: "Fruits",
      imageURL: "https://i.ibb.co/7bQQYkX/Group-204.png",
      price: 10,
      quantity: 10,
    },
  ],
  cart: {
    cartCount: 0,
    items: [],
    billing: {
      total: 0,
    },
  },
  view: "home",
};
export const productsReucer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const id =
        state.products.length <= 0
          ? 0
          : parseInt(state.products[state.products.length - 1].id) + 1;
      const obj = {
        id,
        ...action.payload.product,
      };
      return {
        ...state,
        products: [...state.products, obj],
      };
    case ADD_PRODUCT_TO_CARD:
      const selectedItem = state.products.filter(
        (item) => item.id === action.payload.id
      );

      if (selectedItem[0].quantity > 0) {
        const productOnCart = state.cart.items.filter((i) => {
          return i.id === action.payload.id;
        });
        const isNewProduct = productOnCart.length <= 0;
        let newCartItems = state.cart.items;
        if (isNewProduct) {
          newCartItems = [
            ...state.cart.items,
            {
              ...selectedItem[0],
              addedQuantity: 1,
              calculatedPrice: parseInt(selectedItem[0].price),
            },
          ];
        } else {
          newCartItems = state.cart.items.map((i) => {
            if (i.id === selectedItem[0].id) {
              i.addedQuantity = i.addedQuantity + 1;
              i.calculatedPrice = i.calculatedPrice + parseInt(i.price);
            }
            return i;
          });
        }

        let total = newCartItems.reduce(
          (totalPrice, item) => totalPrice + parseInt(item.calculatedPrice),
          0
        );
        // total += parseInt(selectedItem[0].price);
        return {
          ...state,
          products: state.products.map((item) => {
            if (item.id === action.payload.id) {
              item.quantity -= 1;
            }
            return item;
          }),
          cart: {
            ...state.cart,
            items: newCartItems,
            billing: {
              ...state.cart.billing,
              total: total,
            },
            cartCount: state.cart.cartCount + 1,
          },
        };
      } else {
        return state;
      }
    case DECREASE_PRODUCT_QTY:
      return {
        ...state,
        products: state.products.filter((i) => {
          if (i.id === action.payload.id) {
            i.quantity = i.quantity + 1;
          }
          return i;
        }),
        cart: {
          ...state.cart,
          items: state.cart.items.filter((i) => {
            if (i.id === action.payload.id) {
              if (i.addedQuantity > 1) {
                i.addedQuantity = i.addedQuantity - 1;
                i.calculatedPrice = Number(i.calculatedPrice) - Number(i.price);
              } else {
                return false;
              }
            }
            return i;
          }),
          cartCount: state.cart.cartCount - 1,
          billing: {
            total:
              state.cart.billing.total -
              state.cart.items.filter((i) => i.id === action.payload.id)[0]
                .price,
          },
        },
      };
    case INCREASE_PRODUCT_QTY:
      return {
        ...state,
        products: state.products.filter((i) => {
          if (i.id === action.payload.id) {
            i.quantity = i.quantity >= 1 ? i.quantity - 1 : i.quantity;
          }
          return i;
        }),
        cart: {
          ...state.cart,
          items: state.cart.items.filter((i) => {
            if (i.id === action.payload.id) {
              i.addedQuantity = i.addedQuantity + 1;
              i.calculatedPrice = Number(i.calculatedPrice) + Number(i.price);
            }
            return i;
          }),
          cartCount: state.cart.cartCount + 1,
          billing: {
            total:
              state.cart.billing.total +
              state.cart.items.filter((i) => i.id === action.payload.id)[0]
                .price,
          },
        },
      };
    case REMOVE_PRODUCT_FROM_CARD:
      return {
        ...state,
        products: state.products.filter((item, index) => {
          if (item.id === action.payload.id) {
            item.quantity =
              item.quantity +
              state.cart.items.filter((i) => i.id === item.id)[0].addedQuantity;
          }
          return item;
        }),
        cart: {
          ...state.cart,
          items: state.cart.items.filter((i) => i.id !== action.payload.id),
          cartCount:
            state.cart.cartCount -
            state.cart.items.filter((i) => i.id === action.payload.id)[0]
              .addedQuantity,
          billing: {
            total:
              state.cart.billing.total -
              state.cart.items.filter((i) => i.id === action.payload.id)[0]
                .calculatedPrice,
          },
        },
      };
    case CHANGE_VIEW:
      return {
        ...state,
        view: action.payload.name,
      };
    default:
      return state;
  }
};
export default productsReucer;
