import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders blog", () => {
  const blog = {
    title: "climate change",
    author: "Robert patrition",
    url: "url.com",
    likes: 10,
  };
  const { container } = render(<Blog blog={blog} />);
  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("climate change");
  expect(div).toHaveTextContent("Robert patrition");
});
