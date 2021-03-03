import Layout from "../components/Layout";
import styles from "../styles/components/ranking.module.css";
export default function Ranking() {
  return (
    <Layout>
      <div className={styles.rankingContainer}>
        <h1>Leaderboard</h1>

        <div>
          <table>
            <thead>
              <tr>
                <th scope="col">Posição</th>
                <th scope="col">Usuário</th>
                <th scope="col">Desafios</th>
                <th scope="col">Experiência</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <div className={styles.rackingPositionUser}>
                    <img
                      src="https://avatars.githubusercontent.com/u/1099832?v=4"
                      alt=""
                    />
                    <div>
                      <strong>Anderson Silva</strong>
                      <span>
                        <img src="./icons/level.svg" alt="" /> level 43
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <strong>127</strong>
                  <span>Completados</span>
                </td>
                <td>
                  <strong>154000</strong>
                  <span>xp</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
