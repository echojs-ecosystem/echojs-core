const BASE_URL = "https://jsonplaceholder.typicode.com";

export type JpUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string; catchPhrase: string; bs: string };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
};

export type JpPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type CreatePostInput = {
  userId: number;
  title: string;
  body: string;
};

export const jpFetch = async <T>(
  path: string,
  init?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`JSONPlaceholder ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};
