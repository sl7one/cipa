import { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import gsap from "gsap";
import "./login-form.scss";
import { NavLink } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  phone: Yup.string()
    .min(13, "Минимально 13 символ")
    .max(13, "Максимально 13 символов")
    .matches(/^(\+380\d{9})$/)
    .required("Заполните это поле"),
  password: Yup.string()
    .min(6, "Минимально 6 символ")
    .max(100, "Максимально 100 символов")
    .required("Заполните это поле"),
});

const ErrorMessage = ({ message }) => {
  useEffect(() => {
    gsap.fromTo(".error-message", { opacity: 0 }, { opacity: 1 });
  }, [message]);
  return <div className="error-message">{message}</div>;
};

export default function LoginForm({ onSubmit, isLoading }) {
  return (
    <div className="login-form">
      <h1>
        <NavLink to="/signup">Зарегистрироваться</NavLink>
        <NavLink to="/login">Войти</NavLink>
      </h1>
      <Formik
        initialValues={{
          phone: "",
          password: "",
        }}
        onSubmit={(userValues) => onSubmit(userValues)}
        validationSchema={SignupSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="input-wrapper">
              <label htmlFor="phone">Телефон</label>
              <Field id="phone" name="phone" placeholder="+380ХХ-ХХХ-ХХ-ХХ" />
              {errors.phone && touched.phone ? (
                <ErrorMessage message={errors.phone} />
              ) : null}
            </div>

            <div className="input-wrapper">
              <label htmlFor="password">Пароль</label>
              <Field
                id="password"
                name="password"
                placeholder="Пароль"
                type="password"
              />
              {errors.password && touched.password ? (
                <ErrorMessage message={errors.password} />
              ) : null}
            </div>

            <button type="submit">Войти</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
