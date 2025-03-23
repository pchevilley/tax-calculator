import { describe, it, expect, vi, beforeEach } from "vitest";
import { ApiService, TaxBracket } from "./api-service"; // Replace './your-file' with the actual path

const API_URL = "http://localhost:5001";

describe("ApiService", () => {
  let apiService: ApiService;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    apiService = new ApiService();
    fetchMock = vi.fn();
    globalThis.fetch = fetchMock; 
  });

  it("should fetch tax brackets and cache them", async () => {
    const mockTaxBrackets: TaxBracket[] = [
      { min: 0, max: 10000, rate: 0.1 },
      { min: 10001, rate: 0.2 },
    ];

    fetchMock.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({ success: true, tax_brackets: mockTaxBrackets }),
    });

    const response = await apiService.getTaxBrackets(2023);

    expect(response).toEqual({ success: true, tax_brackets: mockTaxBrackets });
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_URL}/tax-calculator/tax-year/2023`,
    );

    // Test teh cache
    fetchMock.mockClear();
    const cachedResponse = await apiService.getTaxBrackets(2023);
    expect(cachedResponse).toEqual({
      success: true,
      tax_brackets: mockTaxBrackets,
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
