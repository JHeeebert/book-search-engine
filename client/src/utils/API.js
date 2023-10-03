const handleResponse = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};
export const getMe = async (token) => {
  const response = await fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};
export const createUser = async (userData) => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};
export const loginUser = async (userData) => {
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};
export const saveBook = async (bookData, token) => {
  const response = await fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
  return handleResponse(response);
};
export const deleteBook = (bookId, token) => {
  return fetch(`/api/users/books/${bookId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
};
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`).then(
    handleResponse
  );
};
