import { useState } from "react";

import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Homepage from "./views/Hompage";
import CreateBlogPost from "./views/CreateBlogPost";
import Blog from "./components/Blog";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/blog/:blogId" element={<Blog></Blog>}></Route>

      <Route path="create" element={<CreateBlogPost />}></Route>
    </Route>
  )
);

function App({ routes }) {
  return (
    <>
      <div className="App"></div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
