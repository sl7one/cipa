import React, { useContext, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import "./create-client.scss";
import { animationsHelper } from "../../utils/animationsHelper";
import { addNewClient } from "../../store/clientsActions";
import { Toast } from "../../context/toast-context";
import { useDispatch } from "react-redux";
import { setClientData } from "../../store/ordersSlice";
import gsap from "gsap";
import ModalButtons from "../ModalButtons/ModalButtons";
import ButtonClose from "../ButtonClose/ButtonClose";
import ButtonOk from "../ButtonOk/ButtonOk";

const ClientSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Минимально 2 символа")
    .max(50, "Максимально 50 символов")
    .required("Заполните это поле"),
  phone: Yup.string()
    .min(13, "Минимально 13 символ")
    .max(13, "Максимально 13 символов")
    .matches(/^(\+380\d{9})$/)
    .required("Заполните это поле"),
});

const ErrorMessage = ({ message }) => {
  useEffect(() => {
    gsap.fromTo(".error-message", { opacity: 0 }, { opacity: 1 });
  }, [message]);
  return <div className="error-message">{message}</div>;
};

export default function ModalCreateClient() {
  const toast = useContext(Toast);
  const dispatch = useDispatch();

  const { createClient } = animationsHelper;

  const onSubmit = ({ userValues: { name, phone }, resetForm }) => {
    dispatch(
      addNewClient({
        data: { name, phone },
        success: (data) => {
          toast.success("Добавлен новый контакт");
          resetForm();
          dispatch(setClientData(data));
          createClient.hide();
        },
        failed: (error) => {
          toast.error(error);
        },
      })
    );
  };

  return (
    <>
      <div className="create-client-backdrop">
        <Formik
          initialValues={{
            name: "",
            phone: "",
          }}
          onSubmit={(userValues, actions) => {
            onSubmit({
              userValues,
              resetForm: () =>
                actions.resetForm({
                  values: { name: "", phone: "" },
                }),
            });
          }}
          validationSchema={ClientSchema}
        >
          {({ errors, touched }) => (
            <Form className="create-client">
              <div className="create-wrapper">
                <div className="create-field-wrapper">
                  <label htmlFor="name">Имя</label>
                  <Field id="name" type="text" name="name" placeholder="ФИО" />
                </div>
                {errors.name && touched.name ? (
                  <ErrorMessage message={errors.name} />
                ) : null}
              </div>
              <div className="input-wrapper ">
                <label htmlFor="phone">Телефон</label>
                <Field
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="+380ХХ-ХХХ-ХХ-ХХ"
                />

                {errors.phone && touched.phone ? (
                  <ErrorMessage message={errors.phone} />
                ) : null}
              </div>

              <ModalButtons>
                <ButtonOk title="Добавить" type="submit" />
                <ButtonClose title="Закрыть" onClose={createClient.hide} />
              </ModalButtons>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
