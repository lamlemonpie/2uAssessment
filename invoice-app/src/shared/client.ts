const headers = {
  "Content-type": "application/json; charset=UTF-8",
};

const jsonFetch = async (endpoint: string, config: Record<string, unknown>) => {
  const response = await fetch(endpoint, config);
  const response_decoded = await response.json();
  if (response.ok) {
    const JSON = response_decoded;
    return JSON;
  } else {
    throw response_decoded;
  }
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

  return jsonFetch(endpoint, config);
}

export default client;
