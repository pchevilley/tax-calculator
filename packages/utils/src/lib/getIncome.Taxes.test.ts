import { describe, expect, it } from "vitest";
import { getBreakdown } from "./getIncomeTaxes";

describe("getIncomeTaxes", () => {
  it("should calculate the breakdown", () => {
    const brackets = [
      {
        max: 47630,
        min: 0,
        rate: 0.15,
      },
      {
        max: 95259,
        min: 47630,
        rate: 0.205,
      },
      {
        max: 147667,
        min: 95259,
        rate: 0.26,
      },
      {
        max: 210371,
        min: 147667,
        rate: 0.29,
      },
      {
        min: 210371,
        rate: 0.33,
      },
    ];

    const expected = {
      details: [
        {
          max: 47630,
          min: 0,
          rate: 0.15,
          taxable: 47630,
          value: 7144.5,
        },
        {
          max: 95259,
          min: 47630,
          rate: 0.205,
          taxable: 47629,
          value: 9763.945,
        },
        {
          max: 147667,
          min: 95259,
          rate: 0.26,
          taxable: 4741,
          value: 1232.66,
        },
        {
          max: 210371,
          min: 147667,
          rate: 0.29,
          taxable: 0,
          value: 0,
        },
        {
          min: 210371,
          rate: 0.33,
          taxable: 0,
          value: 0,
        },
      ],
      errors: null,
      total: 18141.105,
    };

    expect(getBreakdown(100000, brackets)).toEqual(expected);
  });
});
