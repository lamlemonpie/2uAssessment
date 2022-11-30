const headers = {
  "Content-type": "application/json; charset=UTF-8",
};

const jsonFetch = async (endpoint: string, config: Record<string, unknown>) => {
  const response = await fetch(endpoint, config);
  const JSON = await response.json();
  return JSON;
};

async function client(
  HTTPmethod: string,
  endpoint: string,
  bodyData?: Record<string, unknown>
) {
  const config = {
    method: HTTPmethod,
    headers: headers,
    body: bodyData ? JSON.stringify(bodyData) : undefined,
  };
  try {
    return await jsonFetch(endpoint, config);
  } catch (error: unknown) {
    console.error(error);
  }
}

export default client;
