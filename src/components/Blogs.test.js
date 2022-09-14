import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Blog component tests", () => {
  let blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };

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

  test("clicking the view button displays url and number of likes", async () => {
    const component = render(<Blog blog={blog} />);

    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    expect(component.container).toHaveTextContent("https://reactpatterns.com/");

    expect(component.container).toHaveTextContent("7");
  });
});
