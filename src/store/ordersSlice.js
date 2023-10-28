import { createSlice } from "@reduxjs/toolkit";
import {
  deleteOrder,
  getAllOrders,
  postOrder,
  updateOrder,
} from "./ordersActions";
import { foodCalculator } from "../utils/foodCalculator";
import { medicineCalculator } from "../utils/medicineCalculator";
import { pending, rejected } from "../utils/storeUtils";

const initialFormState = {
  date: new Date(),
  ordersData: {},
  clientData: { name: "", phone: "", _id: "" },
  location: "",
  message: "",
};

const initialState = {
  orders: [],
  isLoading: false,
  error: "",
  orderForm: initialFormState,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    setChecked: (state, { payload }) => {
      state.orders = state.orders.map((el) =>
        el._id === payload ? { ...el, isChecked: true } : el
      );
    },
    unsetChecked: (state, { payload }) => {
      state.orders = state.orders.map((el) =>
        el._id === payload ? { ...el, isChecked: false } : el
      );
    },

    setOrdersData: (state, { payload }) => {
      const [key] = Object.keys(payload);
      const newValues = { ...state.orderForm.ordersData[key], ...payload[key] };
      const newData = { [key]: newValues };
      state.formData = { ...state.orderForm.ordersData, ...newData };
    },
    deleteFormDataRecord: (state, { payload }) => {
      delete state.orderForm.ordersData[payload];
      state.orderForm.ordersData = { ...state.orderForm.ordersData };
    },
    //////??????????////////////
    // setFormDataByHistoryButtons: (state, { payload: { key, value } }) => {
    //   Object.entries({ ...state.orderForm.ordersData })
    //     .filter(([_, { category }]) => category === "птица")
    //     .forEach(([id, _]) => {
    //       state.orderForm.ordersData[id][key] = value;
    //     });

    //   state.orderForm.ordersData = { ...state.orderForm.ordersData };
    // },
    initFormData: (state, { payload: { productsSelected } }) => {
      const initData = productsSelected.reduce((acc, { _id, ...rest }) => {
        return {
          ...acc,
          [_id]: {
            order: state.orderForm.ordersData[_id]?.order
              ? state.orderForm.ordersData[_id].order
              : "",
            price: state.orderForm.ordersData[_id]?.price
              ? state.orderForm.ordersData[_id].price
              : "",
            ...rest,
          },
        };
      }, {});

      state.orderForm.ordersData = { ...initData };
    },
    ////////???????////////////
    calculateBroilerFood: (state) => {
      const cobb = state.orderForm.ordersData["652686067170a8f5411dc752"];
      const ross = state.orderForm.ordersData["652686067170a8f5411dc753"];
      if (!cobb && !ross) return;

      const poultry = {};
      if (cobb) poultry.cobb = cobb;
      if (ross) poultry.ross = ross;

      const count = Object.values(poultry).reduce((acc, { order = 0 }) => {
        return (acc += Number(order));
      }, 0);

      const {
        startCount = 1,
        growCount = 1,
        finishCount = 1,
      } = foodCalculator(count);

      state.orderForm.ordersData = {
        ...state.orderForm.ordersData,
        "652686067170a8f5411dc760": {
          order: !startCount ? 1 : startCount,
          price: "",
          ...state.orderForm.ordersData["652686067170a8f5411dc760"],
        },
        "652686067170a8f5411dc761": {
          order: !growCount ? 1 : growCount,
          price: "",
          ...state.orderForm.ordersData["652686067170a8f5411dc761"],
        },
        "652686067170a8f5411dc762": {
          order: !finishCount ? 1 : finishCount,
          price: "",
          ...state.orderForm.ordersData["652686067170a8f5411dc762"],
        },
      };
    },
    ///////////??????///////////
    calculateMedicine: (state) => {
      const count = Object.values(state.orderForm.ordersData)
        .filter((el) => el?.subCategory === "chickens")
        .reduce((acc, { order = 0 }) => {
          return (acc += Number(order));
        }, 0);

      if (!count) return;

      const medicine = medicineCalculator(count);

      state.orderForm.ordersData = {
        ...state.orderForm.ordersData,
        "652686067170a8f5411dc751": {
          order: !medicine ? 1 : medicine,
          price: "",
          ...state.orderForm.ordersData["652686067170a8f5411dc751"],
        },
      };
    },
    resetFormData: (state) => {
      state.orderForm.ordersData = initialFormState.ordersData;
      state.orderForm.clientData = initialFormState.clientData;
      state.orderForm.location = initialFormState.location;
      state.orderForm.message = initialFormState.message;
    },
    setClientData: (state, { payload }) => {
      state.orderForm.clientData = {
        ...state.orderForm.clientData,
        ...payload,
      };
    },
    resetClienData: (state) => {
      state.orderForm.clientData = initialFormState.clientData;
    },
    setLocation: (state, { payload }) => {
      state.orderForm.location = payload;
    },
    setMessage: (state, { payload }) => {
      state.orderForm.message = payload;
    },
    setOrder: (state, { payload }) => {
      const [[key, value]] = Object.entries(payload);
      state.orderForm.ordersData = {
        ...state.orderForm.ordersData,
        [key]: { ...state.orderForm.ordersData[key], ...value },
      };
    },
    setDate: (state, { payload }) => {
      state.orderForm.date = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllOrders.fulfilled, (state, { payload }) => {
      state.orders = payload.map((el) => ({ ...el, isChecked: false }));
      state.isLoading = false;
    });

    builder.addCase(postOrder.fulfilled, (state, { payload }) => {
      state.orders.unshift({ ...payload, isChecked: false });
      // state.orders = [...state.orders];
      state.isLoading = false;
    });

    builder.addCase(deleteOrder.fulfilled, (state, { payload }) => {
      const idx = payload.id.reduce((acc, id) => {
        const idx = state.orders.findIndex(({ _id }) => _id === id);
        acc.push(idx);
        return acc;
      }, []);

      idx.forEach((id) => state.orders.splice(idx, 1));
      state.orders = [...state.orders];
      state.isLoading = false;
    });

    builder.addCase(updateOrder.fulfilled, (state, { payload }) => {
      const idx = payload.id.reduce((acc, id) => {
        const idx = state.orders.findIndex(({ _id }) => _id === id);
        acc.push(idx);
        return acc;
      }, []);

      idx.forEach((idx) => (state.orders[idx].isActive = false));
      state.orders = [...state.orders];
      state.isLoading = false;
    });

    builder.addCase(getAllOrders.pending, pending);
    builder.addCase(getAllOrders.rejected, rejected);

    builder.addCase(postOrder.pending, pending);
    builder.addCase(postOrder.rejected, rejected);

    builder.addCase(updateOrder.pending, pending);
    builder.addCase(updateOrder.rejected, rejected);

    builder.addCase(deleteOrder.pending, pending);
    builder.addCase(deleteOrder.rejected, rejected);
  },
});

export const {
  setChecked,
  unsetChecked,
  deleteFormDataRecord,
  // setFormDataByHistoryButtons,
  initFormData,
  calculateBroilerFood,
  calculateMedicine,
  setClientData,
  setLocation,
  setMessage,
  resetFormData,
  resetClienData,
  setOrder,
  setDate,
} = ordersSlice.actions;

export default ordersSlice.reducer;
