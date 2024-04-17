export const request = async ({ url, method = 'GET', body = null, headers = {} }) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // Retrieve the auth token if it exists
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    defaultHeaders['Authorization'] = `Bearer ${authToken}`;
  }

  // Merge the provided headers with the default headers
  const mergedHeaders = { ...defaultHeaders, ...headers };

  const fetchOptions = {
    method,
    headers: mergedHeaders,
  };

  // Include the body in the request if it's provided and the method is not GET or HEAD
  if (body && method !== 'GET' && method !== 'HEAD') {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      // Convert non-2xx HTTP responses into errors
      const errorBody = await response.text();
      throw new Error(`Network response was not ok: ${errorBody}`);
    }

    // Attempt to parse the response body as JSON
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
