import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const getArticles = async () => {
      const query = `
        query {
          blogPost {
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
        }),
      });

      const result = await response.json();
      console.log(result); // Log the full result

      if (result.errors) {
        console.error(result.errors);
      } else {
        console.log(result.data.blogPost); // Log the data
        setArticles(result.data.blogPost);
      }
    };

    getArticles();
  }, []);

  return (
    <>
      <Nav></Nav>
      <div>
        <Header></Header>
      </div>

      <div className=" gap-6 p-6  mt-24 flex justify-center">
        {articles.map((ar) => {
          return <Card id={ar._id} title={ar.title} img={ar.img}></Card>;
        })}
      </div>
    </>
  );
};

export default Homepage;
