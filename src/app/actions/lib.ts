const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const SUCCESS_STATUSES = [200, 201, 204];

export function is_status_success(status: number) {
  return SUCCESS_STATUSES.includes(status);
}

export async function fetch_api<T>(url: string, ...otherParams: RequestInit[]): Promise<Response_Success<T> | Response_Error> {
  const res = await fetch(BASE_URL + url, ...otherParams);
  const data = await res.json();
  
  if (!is_status_success(res.status)) {
    return new Response_Error(res.status, data);
  }

  return new Response_Success<T>(res.status, data);
}

export class Response_Error {
  status: number;
  data: { message: string };

  constructor(status: number, data: { message: string }) {
    const date = new Date(Date.now()).toUTCString();
    console.debug(`${date}: ${data.message}`);
    this.status = status;
    this.data = data;
  }
} 

export class Response_Success<T> {
  status: number;
  data: T;

  constructor(status: number, data: T) {
    this.status = status;
    this.data = data;
  }
} 