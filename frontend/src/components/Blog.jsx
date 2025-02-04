import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

import Nav from "./Nav";

const Blog = () => {
  const [blogPost, setBlogPost] = useState([]);
  const { blogId } = useParams();
  useEffect(() => {
    const getBlog = async () => {
      const query = `
      query GetBlogPost($id: ID!) {
        blogPost(id: $id) {
          _id
          author
          title
          content
          img
        }
      }
    `;

      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { id: blogId },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        console.error(result.errors);
      } else {
        setBlogPost(result.data.blogPost);
      }
    };

    if (blogId) {
      getBlog();
    }
  }, [blogId]);
  return (
    <>
      <div className="mb-12">
        <Nav back={"/"}></Nav>
      </div>

      {blogPost.length > 0 ? (
        <>
          <div className="row">
            <img
              class="rounded-t-lg mx-auto"
              width={300}
              height={300}
              src={blogPost[0].img}
              alt=""
            />
          </div>
          <div className="flex justify-center">
            <p className="font-sans text-5xl my-4 mx-auto">
              {" "}
              {blogPost[0].title}
            </p>
          </div>

          <div className="ql-editor">
            <div
              className="px-44 text-wrap"
              dangerouslySetInnerHTML={{ __html: blogPost[0].content }}
            ></div>
          </div>
        </>
      ) : (
        <h3>Loading content ...</h3>
      )}
    </>
  );
};

export default Blog;
