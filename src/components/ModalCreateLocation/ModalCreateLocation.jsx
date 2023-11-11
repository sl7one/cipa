import React, { useContext, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import "./create-location.scss";
import { animationsHelper } from "../../utils/animationsHelper";
import { Toast } from "../../context/toast-context";
import { useDispatch } from "react-redux";
import { setClientData } from "../../store/ordersSlice";
import gsap from "gsap";
import { addNewLocation } from "../../store/locationsActions";

const LocationSchema = Yup.object().shape({
  location: Yup.string()
    .min(2, "Минимально 2 символа")
    .max(50, "Максимально 50 символов")
    .required("Заполните это поле"),
});

const ErrorMessage = ({ message }) => {
  useEffect(() => {
    gsap.fromTo(".error-message", { opacity: 0 }, { opacity: 1 });
  }, [message]);
  return <div className="error-message">{message}</div>;
};

export default function ModalCreateLocation() {
  const toast = useContext(Toast);
  const dispatch = useDispatch();

  const { createLocation } = animationsHelper;

  const onSubmit = ({ location }) => {
    dispatch(
      addNewLocation({
        data: { location },
        success: (data) => {
          toast.success("Добавлена новая локация");
          dispatch(setClientData(data));
          createLocation.hide();
        },
        failed: (error) => {
          toast.error(error);
        },
      })
    );
  };

  return (
    <>
      <div className="create-location-backdrop">
        <Formik
          initialValues={{
            location: "",
          }}
          onSubmit={(userValues) => onSubmit(userValues)}
          validationSchema={LocationSchema}
        >
          {({ errors, touched }) => (
            <Form className="create-location">
              <div className="create-wrapper">
                <div className="create-field-wrapper">
                  <label htmlFor="name">Локация</label>
                  <Field
                    id="location"
                    type="text"
                    name="location"
                    placeholder="Локация"
                  />
                </div>
                {errors.location && touched.location ? (
                  <ErrorMessage message={errors.location} />
                ) : null}
              </div>

              <div className="create-location-buttons">
                <button
                  className="create-location-close"
                  type="button"
                  onClick={createLocation.hide}
                >
                  Закрыть
                </button>
                <button className="create-location-submit" type="submit">
                  Добавить
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
