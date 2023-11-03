import { createSlice } from "@reduxjs/toolkit";
import {
  addNewOrder,
  deleteOrder,
  getAllOrders,
  salleOrder,
  unsalleOrder,
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

    setInputsData: (state, { payload }) => {
      const [key] = Object.keys(payload);
      const newValues = { ...state.orderForm.ordersData[key], ...payload[key] };
      const newData = { [key]: newValues };
      state.orderForm.ordersData = {
        ...state.orderForm.ordersData,
        ...newData,
      };
    },

    deleteFormDataRecord: (state, { payload }) => {
      delete state.orderForm.ordersData[payload];
      state.orderForm.ordersData = { ...state.orderForm.ordersData };
    },

    initFormData: (state, { payload: { productsSelected } }) => {
      const initData = productsSelected.reduce((acc, { _id, ...rest }) => {
        return {
          ...acc,
          [_id]: {
            quantity: state.orderForm.ordersData[_id]?.quantity
              ? state.orderForm.ordersData[_id].quantity
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
      const count = Object.values({
        cobb: state.orderForm.ordersData["652686067170a8f5411dc752"] || {},
        ross: state.orderForm.ordersData["652686067170a8f5411dc753"] || {},
      }).reduce((acc, { quantity = 0 }) => (acc += Number(quantity)), 0);

      const {
        startCount = 1,
        growCount = 1,
        finishCount = 1,
      } = foodCalculator(count);

      state.orderForm.ordersData = {
        ...state.orderForm.ordersData,
        "652686067170a8f5411dc760": {
          quantity: startCount,
        },
        "652686067170a8f5411dc761": {
          quantity: growCount,
        },
        "652686067170a8f5411dc762": {
          quantity: finishCount,
        },
      };
    },
    ///////////??????///////////
    calculateMedicine: (state) => {
      const poultryCount = Object.values(state.orderForm.ordersData)
        .filter(({ subCategory }) => subCategory === "цыплята")
        .reduce((acc, { quantity = 0 }) => {
          return (acc += Number(quantity));
        }, 0);

      const medicineCount = medicineCalculator(poultryCount);

      state.orderForm.ordersData = {
        ...state.orderForm.ordersData,
        "652686067170a8f5411dc751": {
          quantity: medicineCount,
        },
      };
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
    resetLocation: (state) => {
      state.orderForm.location = initialFormState.location;
    },
    setMessage: (state) => {
      state.orderForm.message = initialFormState.message;
    },
    resetMessage: (state) => {
      state.orderForm.location = initialFormState.location;
    },
    setOrder: (state, { payload }) => {
      state.orderForm.ordersData = {
        ...payload,
      };
    },
    resetOrder: (state) => {
      state.orderForm.ordersData = initialFormState.ordersData;
    },
    setDate: (state, { payload }) => {
      state.orderForm.date = payload;
    },
    resetDate: (state) => {
      state.orderForm.date = new Date();
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllOrders.fulfilled, (state, { payload }) => {
      state.orders = payload.map((el) => ({ ...el, isChecked: false }));
      state.isLoading = false;
    });

    builder.addCase(addNewOrder.fulfilled, (state, { payload }) => {
      state.orders.unshift({ ...payload, isChecked: false });
      state.isLoading = false;
    });

    builder.addCase(updateOrder.fulfilled, (state, { payload }) => {
      const idx = state.orders.findIndex(({ _id }) => _id === payload._id);
      state.orders.splice(idx, 1, payload);
      state.isLoading = false;
    });

    builder.addCase(deleteOrder.fulfilled, (state, { payload }) => {
      payload.id.forEach((id) => {
        const idx = state.orders.findIndex(({ _id }) => _id === id);
        state.orders.splice(idx, 1);
      });
      state.isLoading = false;
    });

    builder.addCase(salleOrder.fulfilled, (state, { payload }) => {
      payload.id.forEach((id) => {
        const idx = state.orders.findIndex(({ _id }) => _id === id);
        const { isActive, ...rest } = state.orders[idx];
        state.orders.splice(idx, 1, { ...rest, isActive: false });
      });
      state.isLoading = false;
    });

    builder.addCase(unsalleOrder.fulfilled, (state, { payload }) => {
      const idx = state.orders.findIndex(({ _id }) => _id === payload._id);
      state.orders.splice(idx, 1, payload);
      state.isLoading = false;
    });

    builder.addCase(getAllOrders.pending, pending);
    builder.addCase(getAllOrders.rejected, rejected);

    builder.addCase(addNewOrder.pending, pending);
    builder.addCase(addNewOrder.rejected, rejected);

    builder.addCase(updateOrder.pending, pending);
    builder.addCase(updateOrder.rejected, rejected);

    builder.addCase(salleOrder.pending, pending);
    builder.addCase(salleOrder.rejected, rejected);

    builder.addCase(deleteOrder.pending, pending);
    builder.addCase(deleteOrder.rejected, rejected);

    builder.addCase(unsalleOrder.pending, pending);
    builder.addCase(unsalleOrder.rejected, rejected);
  },
});

export const {
  setChecked,
  unsetChecked,
  deleteFormDataRecord,
  initFormData,
  calculateBroilerFood,
  calculateMedicine,
  setClientData,
  resetClienData,
  setLocation,
  resetLocation,
  setMessage,
  resetMessage,
  setOrder,
  resetOrder,
  setDate,
  resetDate,
  setInputsData,
} = ordersSlice.actions;

export default ordersSlice.reducer;
