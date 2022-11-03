import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const BOOK_INITIAL_STATE = {
  title: "",
  description: "",
};

const BookCreate = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<any>([]);
  const [submitting, setSubmitting] = useState(false);
  const [book, setBook] = useState(BOOK_INITIAL_STATE);

  async function handleSubmit(evt: any) {
    evt.preventDefault();
    setSubmitting(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: book.title,
          description: book.description,
        }),
      }
    );

    if (response.ok) {
      setErrors([]);
      setBook(BOOK_INITIAL_STATE);
      return router.push("/books");
    }

    const data = await response.json();
    setErrors(data.errors);
    setSubmitting(false);
  }

  return (
    <>
      <h1>BookCreate</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={book.title}
            onChange={({ target }) =>
              setBook((prev) => ({ ...prev, title: target.value }))
            }
            name="title"
            disabled={submitting}
            data-cy="input-book-title"
          />
          {errors.title && (
            <span style={{ color: "red" }}>{errors.title[0]}</span>
          )}
        </div>
        <div>
          <textarea
            onChange={({ target }) =>
              setBook((prev) => ({ ...prev, description: target.value }))
            }
            name="title"
            cols={30}
            rows={10}
            disabled={submitting}
            data-cy="input-book-description"
          >
            {book.description}
          </textarea>
          {errors.description && (
            <span style={{ color: "red" }}>{errors.description[0]}</span>
          )}
        </div>
        <button
          type="submit"
          disabled={submitting}
          data-cy="button-submit-book"
        >
          {submitting ? "Sending..." : "Send"}
        </button>
      </form>
      <br />
      <Link href={"/books"}>Book list</Link>
    </>
  );
};

export default BookCreate;
