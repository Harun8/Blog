import React, { useState } from "react";
import Forms from "../components/Form";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signup = async (credentials) => {
    setIsSubmitting(true);
    let { email, password } = credentials;
    console.log(credentials, email, password);

    const response = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation {
  createUser (input: {
                  email: "${email}",
                password :"${password}"
  }) {
    email
  
  }
}
    `,
      }),
    });

    const result = await response.json();
    console.log(result); // Log the full result

    if (result.errors) {
      setIsSubmitting(false);

      console.error(result.errors);
    } else {
      setIsSubmitting(false);
      console.log(result.data); // Log the data
    }
  };

  return (
    <>
      <div class=" flex justify-center md:grid md:grid-cols-2 md:gap-1 h-dvh ">
        <div className="">
          <div className="flex justify-center">
            <Forms
              isSubmitting={isSubmitting}
              showPassword={true}
              onSubmit={signup}
              link="login"
              title="Sign Up"
              redirect="Already have an account? Log in"></Forms>
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

export default SignUp;
