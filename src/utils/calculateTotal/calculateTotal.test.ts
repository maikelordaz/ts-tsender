// calculateTotal.test.ts
import { describe, it, expect } from "vitest";
import { calculateTotal } from "./calculateTotal";

describe("calculateTotal", () => {
  it("should return 0 for empty input", () => {
    expect(calculateTotal("")).toBe(0);
    expect(calculateTotal("   ")).toBe(0);
  });

  it("should handle single numbers", () => {
    expect(calculateTotal("100")).toBe(100);
    expect(calculateTotal(" 150.50 ")).toBe(150.5);
    expect(calculateTotal("-25")).toBe(-25);
  });

  it("should handle newline-separated values", () => {
    const input = `
      100
      200
      300
    `;
    expect(calculateTotal(input)).toBe(600);
  });

  it("should handle comma-separated values", () => {
    expect(calculateTotal("100,200,300")).toBe(600);
    expect(calculateTotal("150.25, 75.75")).toBe(226);
  });

  it("should handle mixed delimiters", () => {
    const input = `
      100,200
      300
      400,500
    `;
    expect(calculateTotal(input)).toBe(1500);
  });

  it("should ignore empty lines and invalid entries", () => {
    const input = `
      100
      invalid
      200
      
      not a number
      300
      ,,,
    `;
    expect(calculateTotal(input)).toBe(600);
  });

  it("should handle negative numbers and decimals", () => {
    const input = `
      100.50
      -25.25
      50
      -75
    `;
    expect(calculateTotal(input)).toBe(50.25);
  });

  it("should handle numbers with currency symbols", () => {
    const input = `
      $100
      €200
      ¥300
      CAD400
    `;
    expect(calculateTotal(input)).toBe(0); // All invalid after parseFloat
  });

  it("should handle numbers with text annotations", () => {
    const input = `
      100 USD
      200 EUR
      300 (bonus)
      -50 refund
    `;
    expect(calculateTotal(input)).toBe(550); // parseFloat grabs leading numbers
  });

  it("should handle large numbers", () => {
    const input = "1000000, 2000000, 3000000";
    expect(calculateTotal(input)).toBe(6000000);
  });

  it("should handle scientific notation", () => {
    expect(calculateTotal("1e3, 2e2")).toBe(1200); // 1000 + 200
  });
});
