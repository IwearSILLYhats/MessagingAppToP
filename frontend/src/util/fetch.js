export default async function apiFetch(endpoint, options) {
  const token = JSON.parse(localStorage.getItem("token"));
  const url = `${import.meta.env.VITE_API_URL}/${endpoint}`;
  const request = await fetch(url, {
    ...options,
    headers: {
      "Authorization": token,
      "Content-Type": "application/json",
    },
  });
  const response = await request.json();
  return response;
}
