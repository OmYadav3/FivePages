const BASE_URL = process.env.NEXT_PUBLIC_PORT;

export const getToken = () => {
  // if (typeof window !== "undefined") {
  //   const token = localStorage.getItem("user");
  //   if (!token || token === "undefined" || token.length < 80) return null;
  //   return token;
  // }
  // return null;

   if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    // console.log(user)
    if (!user || user === "undefined") return null;

    try {
      const parsedUser = JSON.parse(user);
      const token = parsedUser?.token;
      // console.log(token)


      // Validate token length
      if (!token || token.length < 80) return null;

      return token;
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      return null;
    }
  }
  return null;
};

export const fetchData = async (endpoint, { method = "GET", body = null, headers = {} } = {}) => {
  try {
    const token = getToken();
    // console.log(token)

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

    // console.log(response)
    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error.message);
    return { error: error.message };
  }
};
