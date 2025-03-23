import { ApiError, apiService, TaxBracket } from "@plusgrade/api-service";

type IncomeTaxesBreakdownDetail = {
  value: number;
  taxable: number;
} & TaxBracket;

export type IncomeTaxesBreakdown = {
  total: number;
  errors: null;
  details: IncomeTaxesBreakdownDetail[];
};

export async function getIncomeTaxes(
  income: number,
  year: number,
): Promise<IncomeTaxesBreakdown | { errors: ApiError[] }> {
  const brackets = await apiService.getTaxBrackets(year);

  if (brackets.success) {
    return getBreakdown(income, brackets.tax_brackets);
  }

  return brackets;
}

export function getBreakdown(income: number, brackets: TaxBracket[]): IncomeTaxesBreakdown{
  const sortedBrackets = [...brackets].sort((a, b) => a.min - b.min);
  let remainingIncome = income;
  let total = 0;

  const details = sortedBrackets.map((bracket) => {
    if (remainingIncome <= 0) {
      return {
        ...bracket,
        taxable: 0,
        value: 0,
      };
    }

    const size = bracket.max
      ? Math.min(bracket.max - bracket.min, remainingIncome)
      : remainingIncome;
    const taxable = Math.min(size, remainingIncome);
    const taxes = taxable * bracket.rate;

    remainingIncome -= taxable;
    total += taxes;

    return {
      ...bracket,
      taxable: taxable,
      value: taxes,
    };
  });

  return {
    details,
    total,
    errors: null,
  };
}
