import axios, { AxiosError, AxiosResponse } from 'axios';

export interface IApifilters {
  q?: string
  diet?: Array<string>;
  cuisineType?: Array<string>;
  dishType?: Array<string>;
  health?: Array<string>;
  mealType?: Array<string>;
}

class Api {
  private static instance: Api | null = null;
  private baseUrl: string = 'https://api.edamam.com/api/recipes/v2?type=public';
  private apiID: string = 'df53c267';
  private apiKey: string = 'bd80595496a524a833554462aa41a04c'

  private axiosInstance = axios.create({
    baseURL: this.apiURL,
  });

  // Private constructor for singleton pattern
  private constructor() { }

  private get apiURL(): string {
    const apiURL = `${this.baseUrl}&app_id=${this.apiID}&app_key=${this.apiKey}`
    // Add validation or logic to fetch base URL securely
    return apiURL;
  }

  static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  private handleError(error: AxiosError): Promise<never> {
    console.error('API error:', error);
    // Re-throw for further handling
    throw error;
  }

  /** Used for serializing array of parameters */
  handleQuery = (query: IApifilters) => {
    return Object.entries(query).filter(([key, value], i) => value).map(([key, value], i) => Array.isArray(value) ? `${key}=${value.join('&' + key + '=')}` : `${key}=${value}`).join('&');
  }

  /**
   * 
   * @param params IApifilters
   * @returns Edamam Api Response
   */
  async getRecipes<T = any>(params?: IApifilters): Promise<AxiosResponse<T>> {
    try {
      const url = `${this.apiURL}`;
      const response = await this.axiosInstance.get(url, { params, paramsSerializer: this.handleQuery });
      return response;
    } catch (error) {
      return this.handleError(error as AxiosError);
    }
  }

  async loadMoreRecipes<T = any>(nextUrl: string): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.get(nextUrl);
      return response;
    } catch (error) {
      return this.handleError(error as AxiosError);
    }
  }
}

export default Api;
