export default async function apiFetch(endpoint, options) {
  const url = `${import.meta.env.VITE_API_URL}/${endpoint}`;
  const request = await fetch(url, options);
  const response = await request.json();
  return response;
}
