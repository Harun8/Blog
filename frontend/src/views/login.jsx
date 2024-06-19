import React, { useState } from "react";
import Forms from "../components/Form";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const login = async (credentials) => {
    setIsSubmitting(true);
    let { email, password } = credentials;

    const response = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query {
              login(input : {
                email: "${email}",
                password :"${password}"
      })           {
          token
          user {
            email
            _id
          }
        }
                
            }
    `,
      }),
    });

    const result = await response.json();

    if (result.errors) {
      setIsSubmitting(false);

      const error = result.errors[0];

      // should be a toast

      toast.error("Email or password is wrong");
    } else {
      toast.success("Welcome back! :)");
      localStorage.setItem("auth", JSON.stringify(result.data.login));
      navigate("/", { replace: true });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster></Toaster>
      <div class=" flex justify-center md:grid md:grid-cols-2 md:gap-1 h-dvh ">
        <div className="">
          <div className="flex justify-center">
            <Forms
              isSubmitting={isSubmitting}
              showPassword={true}
              onSubmit={login}
              link="singup"
              title="Log in"
              redirect="Don't have an account? Sign up"
            ></Forms>
          </div>
        </div>
        <div className="hidden md:flex md:justify-center md:items-center md:p-12 md:bg-blue-200  ">
          <div className="flex justify-center">
            {isSubmitting ? "processing.." : "welcome back :)"}{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
