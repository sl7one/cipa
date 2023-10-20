import { createSlice } from "@reduxjs/toolkit";
import { foodCalculator } from "../utils/foodCalculator";
import { medicineCalculator } from "../utils/medicineCalculator";

const initialState = {
  date: new Date(),
  formData: {},
  clientData: { name: "", phone: "", _id: "" },
  location: "",
  message: "",
};

export const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setFormData: (state, { payload }) => {
      const [key] = Object.keys(payload);
      const newValues = { ...state.formData[key], ...payload[key] };
      const newData = { [key]: newValues };
      state.formData = { ...state.formData, ...newData };
    },
    deleteFormDataRecord: (state, { payload }) => {
      delete state.formData[payload];
      state.formData = { ...state.formData };
    },
    setFormDataByHistoryButtons: (state, { payload: { key, value } }) => {
      Object.entries({ ...state.formData })
        .filter(([_, { category }]) => category === "poultry")
        .forEach(([id, _]) => {
          state.formData[id][key] = value;
        });

      state.formData = { ...state.formData };
    },
    initFormData: (state, { payload: { productsSelected } }) => {
      const initData = productsSelected.reduce((acc, { _id, ...rest }) => {
        return {
          ...acc,
          [_id]: {
            order: state.formData[_id]?.order ? state.formData[_id].order : "",
            price: state.formData[_id]?.price ? state.formData[_id].price : "",
            ...rest,
          },
        };
      }, {});

      state.formData = { ...initData };
    },
    calculateBroilerFood: (state) => {
      const cobb = state.formData["652686067170a8f5411dc752"];
      const ross = state.formData["652686067170a8f5411dc753"];
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

      state.formData = {
        ...state.formData,
        "652686067170a8f5411dc760": {
          order: !startCount ? 1 : startCount,
          price: "",
          ...state.formData["652686067170a8f5411dc760"],
        },
        "652686067170a8f5411dc761": {
          order: !growCount ? 1 : growCount,
          price: "",
          ...state.formData["652686067170a8f5411dc761"],
        },
        "652686067170a8f5411dc762": {
          order: !finishCount ? 1 : finishCount,
          price: "",
          ...state.formData["652686067170a8f5411dc762"],
        },
      };
    },
    calculateMedicine: (state) => {
      const count = Object.values(state.formData)
        .filter((el) => el?.subCategory === "chickens")
        .reduce((acc, { order = 0 }) => {
          return (acc += Number(order));
        }, 0);

      if (!count) return;

      const medicine = medicineCalculator(count);

      state.formData = {
        ...state.formData,
        "652686067170a8f5411dc751": {
          order: !medicine ? 1 : medicine,
          price: "",
          ...state.formData["652686067170a8f5411dc751"],
        },
      };
    },
    resetFormData: (state) => {
      state.formData = {};
      state.clientData = initialState.clientData;
      state.location = "";
      state.message = "";
    },
    setClientData: (state, { payload }) => {
      state.clientData = { ...state.clientData, ...payload };
    },
    resetClienData: (state) => {
      state.clientData = { name: "", phone: "", _id: "" };
    },
    setLocation: (state, { payload }) => {
      state.location = payload;
    },
    setMessage: (state, { payload }) => {
      state.message = payload;
    },
    setOrder: (state, { payload: { formData, clientData } }) => {
      state.clientData = { ...clientData };
      state.formData = { ...formData };
    },
    setDate: (state, { payload }) => {
      state.date = payload;
    },
  },
});

export const {
  setFormData,
  deleteFormDataRecord,
  setFormDataByHistoryButtons,
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
} = formDataSlice.actions;

export default formDataSlice.reducer;
