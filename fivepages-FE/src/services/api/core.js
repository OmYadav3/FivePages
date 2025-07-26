const BASE_URL = process.env.NEXT_PUBLIC_PORT;

export const getToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("user");
    if (!token || token === "undefined" || token.length < 80) return null;
    return token;
  }
  return null;
};

export const fetchData = async (endpoint, { method = "GET", body = null, headers = {} } = {}) => {
  try {
    const token = getToken();

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `HTTP ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error.message);
    return { error: error.message };
  }
};
