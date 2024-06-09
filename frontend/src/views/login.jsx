import React from "react";
import Forms from "../components/Form";

const Login = () => {
  return (
    <>
      <title>Login | AskPDFs</title>

      <div class=" flex justify-center md:grid md:grid-cols-2 md:gap-1 h-dvh ">
        <div className="">
          <div className="flex justify-center">
            <Forms
              // isSubmitting={isSubmitting}
              showPassword={true}
              // onSubmit={login}
              link="singup"
              title="Login"
              redirect="Don't have an account? Sign up?"></Forms>
          </div>
        </div>
        <div className="hidden md:flex md:justify-center md:items-center md:p-12 md:bg-blue-200  ">
          <div className="flex justify-center">
            {" "}
            {/* {isSubmitting ? "processing.." : "welcome back :)"}{" "} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
