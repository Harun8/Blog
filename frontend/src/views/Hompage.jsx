import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import client from "../../utils/ApolloClient";
import { gql } from "@apollo/client";

const Homepage = () => {
  const [articles, setArticles] = useState([]);
  const [token, setToken] = useState();

  useEffect(() => {
    let token = localStorage.getItem("auth");
    console.log("token", token);
    setToken(token);
    const getArticles = async () => {
      const query = gql`
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

      try {
        const result = await client.query({
          query,
        });
        console.log("result", result);

        if (result.errors) {
          console.error(result.errors);
        } else {
          console.log(result.data.blogPost); // Log the data
          setArticles(result.data.blogPost);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    getArticles();
  }, []);

  return (
    <>
      <Nav token={token}></Nav>
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
