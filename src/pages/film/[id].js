import Layout from "../../components/Layout/Layout";
import styles from "./film.module.css";

const film = ({ film }) => {

  return (
    <Layout title={film.title}>
      <div className={styles.titulofilme}>
        <div>

          <div>{film.title}</div>
        </div>
      </div>

      <div className={styles.descricao}>
        <div>Synopsis:</div>
      </div>

      <div className={styles.descricaofilme}>
        <div>{film.description}</div>
      </div>

      <hr></hr>
      
      <div className={styles.informacao}>
        <div>Directed by {film.director} and produced by {film.producer}, this movie from {film.release_date} is {film.running_time} minutes long. It was received by critics with a score of {film.rt_score} out of 100.</div>
      </div>
        
      
    </Layout>
  );
};

export default film;

export async function getStaticPaths() {
  return {
      paths: [],
      fallback: 'blocking'
  }
}


export const getStaticProps = async ({ params }) => {
  const id = params.id;
  const res = await fetch(`https://ghibliapi.herokuapp.com/films/${id}`);
  const film = await res.json();
  return {
    props: {
      film,
    },
  };
};
