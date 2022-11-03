import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Books app</h1>
      <Link href={"/books"} data-cy="link-to-books">
        See all books
      </Link>
    </div>
  );
}
