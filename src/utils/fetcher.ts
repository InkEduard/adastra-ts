interface ResponseErrorInterface {
  response: Response;
}

export class ResponseError extends Error implements ResponseErrorInterface {
  response: Response;

  constructor(message: string, result: Response) {
    super(message);
    this.response = result;
  }
}

export async function fetcher(url: string, options: object) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const result = await response.json();
    const message = result?.errors || result?.message || response.statusText;

    throw new ResponseError(message, response);
  }

  return response;
}
