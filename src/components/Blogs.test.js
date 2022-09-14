import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders title and author", () => {
  const blog = {
    title: "the first test for frontend",
    author: "Admin@1234",
  };

  const component = render(<Blog blog={blog} />);
  expect(component.container).toHaveTextContent(
    "the first test for frontend - Admin@1234"
  );
});
