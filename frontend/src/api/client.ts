import { BASE_URL } from '../config';

export async function fetchClient<T>(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));

    throw {
      message: 'Something went wrong',
      ...error,
      code: res.status,
    };
  }

  return res.json() as Promise<T>;
}
