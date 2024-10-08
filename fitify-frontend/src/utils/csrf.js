export const getCSRFToken = () => {
  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="));
  return csrfToken ? csrfToken.split("=")[1] : null;
};

export const fetchCSRFToken = async () => {
  try {
    const response = await fetch("http://localhost:8000/csrf/", {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
  }
};
