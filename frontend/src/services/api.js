const baseUrl = process.env.REACT_APP_API_URL;

async function get(path) {
  const config = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  };

  const response = await fetch(`${baseUrl}/${path}`, config);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json;
}

export default {
  get
};
