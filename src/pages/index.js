import Head from "next/head";
import { useState } from "react";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";

export default function Home({ films }) {
  const [keyword, setKeyword] = useState("");

  const filteredfilms = films.filter(
    (films) =>
    films.title.toLowerCase().includes(keyword) ||
    films.original_title.toLowerCase().includes(keyword) ||
    films.original_title_romanised.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.inputContainer}>
        
        {/* <div className={styles.counts}>Found {films.length} films</div> */}

        <div className={styles.input}>
          <SearchInput
            placeholder="Search by original, romanised or translated title..."
            onChange={onInputChange}
          />
        </div>
      </div>

      <CountriesTable films={filteredfilms} />
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://ghibliapi.herokuapp.com/films');
  const films = await res.json();
  return {
    props: {
      films
    },
    revalidate: 10
  }
}
