import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Admin Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email().required(),
          password: Yup.string().min(4).required()
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const data = await loginUser("auth", values);
            localStorage.setItem("token", data.token);
            navigate("/dashboard/Admin");
          } catch (err) {
            setErrors({ email: err.msg || "Login failed" });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors }) => (
          <Form>
            <Field name="email" type="email" placeholder="Email" />
            {errors.email && <div>{errors.email}</div>}
            <Field name="password" type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
