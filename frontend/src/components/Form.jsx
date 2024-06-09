// import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";
import "../assets/form.css";
// import "@/public/styles/form.css";
const Forms = (props) => {
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Must be a valid email"),

    // password: Yup.string()
    //   .required("No password provided.")
    //   .min(8, "Password is too short - should be 8 chars minimum.")
    //   .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values) => props.onSubmit(values)}>
        {({ errors, touched }) => (
          <Form className="  rounded w-96 px-8 pt-6 pb-8 mb-4 align-middle mt-60 ">
            {/*    
              <h1 className="dark:text-white  flex justify-center text-3xl font-bold 		">
            Welcome back 
          </h1> */}

            <h1 className=" flex justify-center text-3xl font-bold 		">
              {props.title}
            </h1>

            <label
              className="  block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email">
              Email
            </label>
            <Field
              className=" autofill:bg-gray-900  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
            {errors.email && touched.email ? (
              <div className="text-red-500">{errors.email}</div>
            ) : null}
            {/* <ErrorMessage name="email" component="div" /> */}

            {props.showPassword && (
              <>
                <label
                  className="  block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password">
                  Password
                </label>
                <Field
                  className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-500">{errors.password}</div>
                ) : null}
              </>
            )}

            <div className="flex flex-col mt-5">
              <button
                className={`${`rounded-lg dark:bg-slate-950  
                 text-black text-white ${
                   props.isSubmitting
                     ? "bg-blue-600 hover:bg-blue-800"
                     : "bg-gray-900 hover:bg-gray-700  "
                 }
                 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}`}
                type="submit"
                disabled={props.isSubmitting}>
                {props.isSubmitting ? "Check your mail" : props.title}
              </button>
              <hr className="mt-6"></hr>
            </div>

            <Link
              className=" mt-2 inline-block align-baseline font-bold text-sm text-gray-400 hover:text-text-800"
              to={`/${props.link}`}>
              {props.redirect}
            </Link>
            {/* .props */}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Forms;
