import Swal from "sweetalert2";

export const getSavedBookIds = () => {
  const savedBookIds = localStorage.getItem("saved_books")
    ? JSON.parse(localStorage.getItem("saved_books"))
    : [];
  return savedBookIds;
};

export const saveBookIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem("saved_books", JSON.stringify(bookIdArr));
    Swal.fire({
      icon: "success",
      title: "Books Saved",
      text: "The books have been successfully saved.",
    });
  } else {
    localStorage.removeItem("saved_books");
  }
};

export const removeBookId = (bookId) => {
  let savedBookIds = JSON.parse(localStorage.getItem("saved_books")) || [];
  if (!savedBookIds) {
    return false;
  }
  savedBookIds = savedBookIds.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem("saved_books", JSON.stringify(savedBookIds));
  Swal.fire({
    icon: "success",
    title: "Book Removed",
    text: "The book has been successfully removed.",
  });
  return true;
};
