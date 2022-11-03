import Link from "next/link";
import React from "react";

const BookList = ({ books }: any) => {
  async function handleDeleteBook(bookId: number) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _method: "DELETE",
        }),
      }
    );

    if (response.ok) return window.location.reload();
  }

  return (
    <>
      <h1>BookPage</h1>
      <ul data-cy="book-list">
        {books.map((book: any) => (
          <li key={`book-${book.id}`}>
            <h4>{book.title}</h4>
            <p>{book.description}</p>
            <hr />
            <Link
              href={`/books/${book.id}`}
              data-cy={`link-to-visit-book-${book.id}`}
            >
              Details
            </Link>{" "}
            <Link
              href={`/books/${book.id}/edit`}
              data-cy={`link-to-edit-book-${book.id}`}
            >
              Edit
            </Link>{" "}
            -
            <button
              onClick={() => handleDeleteBook(book.id)}
              data-cy={`link-to-delete-book-${book.id}`}
            >
              Eliminar libro
            </button>
          </li>
        ))}
      </ul>
      <Link href={"/books/create"}>Create a book</Link>
    </>
  );
};

export default BookList;

export async function getStaticProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`
  );

  const data = await response.json();

  return {
    props: {
      books: data,
    },
  };
}
