import { Button, Input, Select } from "@plusgrade/design-system";
import "./CalculatorForm.css";
import classNames from "classnames";
import { FormEvent } from "react";

type CalculatorFormProps = {
  className?: string;
  onSubmit: (income: number, year: number) => void;
  loading: boolean;
};

const SUPPORTED_YEARS = [2019, 2020, 2021, 2022];

export function CalculatorForm(props: CalculatorFormProps) {
  const { className, onSubmit, loading } = props;

  const formClasses = classNames("calculator-form", className);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const income = formData.get("income");
    const year = formData.get("year");

    if (income && year) {
      onSubmit(Number(income), Number(year));
    }
  };

  return (
    <form onSubmit={submitForm} className={formClasses}>
      <Input
        required
        type="number"
        name="income"
        placeholder="Annual income"
        data-test="income-input"
        min="0"
      />
      <Select name="year" required>
        {SUPPORTED_YEARS.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
      <Button
        disabled={loading}
        data-test="form-submit-button"
        className="calculator-form__button"
        type="submit"
      >
        Calculate
      </Button>
    </form>
  );
}
