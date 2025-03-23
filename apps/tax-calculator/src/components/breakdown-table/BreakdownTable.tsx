import { IncomeTaxesBreakdown } from "@plusgrade/utils";

import "./BreakdownTable.css";

type BreakdownTableProps = {
  breakdown: IncomeTaxesBreakdown;
};
export function BreakdownTable(props: BreakdownTableProps) {
  const { breakdown } = props;
  return (
    <table className="breakdown-table">
      <thead>
        <tr>
          <td className="breakdown-table__header-cell">Tax bracket</td>
          <td className="breakdown-table__header-cell">Marginal tax rate</td>
          <td className="breakdown-table__header-cell">Amount taxable</td>
          <td className="breakdown-table__header-cell">Tax payable</td>
        </tr>
      </thead>
      <tbody>
        {breakdown.details.map((b) => (
          <tr key={b.min} className="breakdown-table__row">
            <td className="breakdown-table__cell">
              {b.max ? (
                <>
                  ${b.min} - ${b.max}
                </>
              ) : (
                <>${b.min}+</>
              )}
            </td>
            <td className="breakdown-table__cell">
              {Math.round(b.rate * 100)}%
            </td>
            <td className="breakdown-table__cell">
              $
              {b.taxable.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </td>
            <td className="breakdown-table__cell">
              ${b.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
