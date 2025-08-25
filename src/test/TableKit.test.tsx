import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TableKit } from "../index";

describe("TableKit", () => {
  it("renders with dummy data by default", () => {
    render(<TableKit />);
    expect(screen.getByText(/All users/)).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    render(<TableKit title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders loading state", () => {
    render(<TableKit loading={true} />);
    // Should render skeleton rows when loading
    expect(document.querySelector(".skeletonRow")).toBeInTheDocument();
  });

  it("renders empty state when no data", () => {
    render(<TableKit data={[]} />);
    expect(screen.getByText("No data found")).toBeInTheDocument();
  });

  it("renders custom empty state", () => {
    const customEmpty = <div>Custom empty message</div>;
    render(<TableKit data={[]} emptyState={customEmpty} />);
    expect(screen.getByText("Custom empty message")).toBeInTheDocument();
  });
});
