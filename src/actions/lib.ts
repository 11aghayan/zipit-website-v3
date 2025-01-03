const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const SUCCESS_STATUSES = [200, 201, 204];

export function is_status_success(status: number) {
  return SUCCESS_STATUSES.includes(status);
}

export async function fetch_api<T>(url: string, ...otherParams: RequestInit[]): Promise<Response_Success<T> | Response_Error> {
  otherParams = otherParams.map(p => ({...p, headers: p.headers ?? {'Accept': 'application/json', 'Content-Type': 'application/json' }}));
  const res = await fetch(BASE_URL + url, ...otherParams);
  const data = await res.json();
  
  if (!is_status_success(res.status)) {
    return new Response_Error(res.status, data, data.message);
  }
  return new Response_Success<T>(res.status, data);
}

export class Response_Error {
  status: number;
  data: { message: string };

  constructor(status: number, data: { message: string }, error: unknown) {
    const date = new Date(Date.now()).toUTCString();
    console.debug(`${date}: ${error}`);
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