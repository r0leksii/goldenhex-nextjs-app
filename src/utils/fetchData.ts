export async function fetchData<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorBody = await response.text();
    console.error(
      `Fetch error ${response.status}: ${response.statusText}`,
      errorBody
    );
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${
        errorBody || response.statusText
      }`
    );
  }
  return response.json() as Promise<T>;
}
