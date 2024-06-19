import React, { useEffect, useState } from "react";

import TextEditor from "../components/TextEditor";

import { Link } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import client from "../../utils/ApolloClient";
import { gql } from "@apollo/client";
import { Ability } from "@casl/ability";
import { useNavigate } from "react-router-dom";
const CreateBlogPost = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ability, setAbility] = useState(new Ability());
  const navigate = useNavigate();

  useEffect(() => {
    const getAbilities = async () => {
      const query = gql`
        query {
          abilities {
            action
            subject
          }
        }
      `;

      try {
        const result = await client.query({
          query,
        });

        if (result.errors) {
          console.error(result.errors);
        } else {
          const ability = new Ability(result.data.abilities);
          setAbility(ability);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    getAbilities();
  }, []);

  useEffect(() => {
    if (ability.cannot("manage", "all")) {
      navigate("/", { replace: true });
    }
  }, [ability]);

  const savePost = async (text) => {
    let { data_url: img } = images[0];

    const response = await fetch("http://localhost:4000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
            mutation {
                createBlogPost(input: {
                    author: "Harun Abdi",
                    title: "${title}",
                    content: ${JSON.stringify(content)},
                    img: "${img}"
                  }) {
                    author,
                    title,
                    content,
                    img
                }
            }`,
      }),
    });

    const responseData = await response.json();
  };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  const saveText = (text) => {
    setContent(text);
  };
  return (
    <>
      <div className="mb-6 flex justify-start">
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={30}
            height={30}
            viewBox="0 0 512 512"
          >
            <path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z" />
          </svg>
        </Link>
      </div>

      <div className="mt-12 flex justify-center">
        <input
          placeholder="Title.."
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 rounded-lg"
          type="text"
        ></input>

        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={1}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Add thumbnail
              </button>
              &nbsp;
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image["data_url"]} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                    <button onClick={() => onImageRemove(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
      <div className="mt-6">
        <TextEditor saveText={saveText}></TextEditor>
      </div>
      <div className="flex justify-center mt-6">
        <button
          className=" mb-12 bg-secondary text-secondary-foreground shadow-sm bg-orange-200 hover:bg-sky-400 "
          onClick={() => savePost()}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default CreateBlogPost;
