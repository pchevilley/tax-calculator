import { useState } from "react";
import { CalculatorForm } from "../calculator-form/CalculatorForm";

import "./CalculatorSection.css";
import { getIncomeTaxes, IncomeTaxesBreakdown } from "@plusgrade/utils";
import { ApiError } from "@plusgrade/api-service";
import { BreakdownTable } from "../breakdown-table/BreakdownTable";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

export function CalculatorSection() {
  const [result, setResult] = useState<IncomeTaxesBreakdown | null>();
  const [errors, setErrors] = useState<ApiError[]>([]);
  const [loading, setLoading] = useState(false);

  const updateResult = async (income: number, year: number) => {
    setErrors([]);
    setResult(null);
    setLoading(true);

    const breakdown = await getIncomeTaxes(income, year);
    if (!breakdown.errors) {
      setResult(breakdown);
    } else {
      setErrors(breakdown.errors);
    }
    setLoading(false);
  };

  return (
    <section className="calculator-section">
      <CalculatorForm
        className="calculator-section__form"
        onSubmit={updateResult}
        loading={loading}
      />
      <div className="calculator-section__result">
        {result && (
          <>
            <div className="calculator-section__result__total">
              <span className="calculator-section__result__total__value" data-test="total-tax-payable">
                ${result?.total.toLocaleString()}
              </span>
              <span>Total tax payable</span>
            </div>
            <div className="calculator-section__result__breakdown">
              <BreakdownTable breakdown={result} />
            </div>
          </>
        )}
        {errors.length > 0 && (
          <div data-test="error-message">
            An error occured while calculating the tax. Please try again...
          </div>
        )}
        {loading && (
          <div className="loader">
            <Skeleton height={120} />
            <Skeleton count={6} height={45} />
          </div>
        )}
      </div>
    </section>
  );
}
