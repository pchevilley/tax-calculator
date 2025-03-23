const API_URL = "http://localhost:5001";
const NB_MAX_RETRY = 3;
const RETRY_TIMEOUT = 3000;

export type TaxBracket = {
  max?: number;
  min: number;
  rate: number;
};

export type ApiError = {
  code: string;
  field: string;
  message: string;
};

type GetTaxBracketsResponse =
  | { success: true; tax_brackets: TaxBracket[] }
  | { success: false; errors: ApiError[] };

export class ApiService {
  private cache: { getTaxBrackets: Record<number, TaxBracket[]> } = {
    getTaxBrackets: {},
  };

  async getTaxBrackets(year: number): Promise<GetTaxBracketsResponse> {
    const cachedResult = this.cache.getTaxBrackets[year];

    if (cachedResult) {
      return {
        success: true,
        tax_brackets: cachedResult,
      };
    }

    return this._fetch<GetTaxBracketsResponse>(
      `${API_URL}/tax-calculator/tax-year/${year}`,
    ).then((resp: GetTaxBracketsResponse) => {
      if (resp.success) {
        this.cache.getTaxBrackets[year] = resp.tax_brackets;
      }

      return resp;
    });
  }

  private async _fetch<T>(url: string, nbTry: number = 1): Promise<T> {
    return new Promise((resolve) => {
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.errors?.length ) {
            if (nbTry < NB_MAX_RETRY) {
              setTimeout(() => {
                this._fetch<T>(url, nbTry + 1).then(resolve);
              }, RETRY_TIMEOUT);
            } else {
              resp.success = false;
              resolve(resp);
            }
          } else {
            resp.success = true;
            resolve(resp);
          }
        })
        .catch(() => {
          if (nbTry < NB_MAX_RETRY) {
            setTimeout(() => {
              this._fetch<T>(url, nbTry + 1).then(resolve);
            }, RETRY_TIMEOUT);
          } else {
            resolve({
              success: false,
              errors: [{
                message: 'An error occured'
              }],
            } as T);
          }
        });
    });
  }
}

export const apiService = new ApiService();
