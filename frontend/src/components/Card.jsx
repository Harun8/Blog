import React from "react";
import vite from "../../public/vite.svg";
import luigi from "../../public/luigi.jpg";
import { Link } from "react-router-dom";

const Card = ({ title, img, id }) => {
  return (
    <div class=" max-w-sm  rounded-lg ">
      <Link to={`/blog/${id}`}>
        <img
          class="rounded-t-lg mx-auto"
          width={300}
          height={300}
          src={img}
          alt=""
        />
      </Link>
      <div class="p-5">
        <Link to={`/blog/${id}`}>
          <h5 class="mb-2 text-md font-bold tracking-tight text-gray-900 ">
            {title}
          </h5>
        </Link>

        <div className="flex justify-end">
          <Link
            to={`/blog/${id}`}
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-500 "
          >
            Read article
            <svg
              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
