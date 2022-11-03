import Link from "next/link";
import React from "react";

const BookDetail = ({ book }: any) => {
  return (
    <>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <br />
      <Link href={"/books"}>Book list</Link>
    </>
  );
};

export default BookDetail;

export async function getStaticProps({ params }: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`
  );

  const data = await response.json();

  return {
    props: {
      book: data,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch(`http://localhost:8000/api/books`);

  const data = await response.json();

  const paths = data.map((book: any) => ({
    params: {
      bid: String(book.id),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
