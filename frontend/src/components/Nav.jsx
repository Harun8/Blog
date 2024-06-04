import React from "react";

import { Link } from "react-router-dom";
const Nav = (props) => {
  return (
    <div className="fixed top-10 left-10 right-10 flex justify-between items-center  px-4 py-2 z-10">
      <p className="text-slate-800 font-bold">
        <Link
          to={props.back ? props.back : "/create"}
          style={{ textDecoration: "none", color: "black" }}>
          hitTop
        </Link>
      </p>
      <div className="text-slate-800 font-bold	">More</div>
    </div>
  );
};

export default Nav;
