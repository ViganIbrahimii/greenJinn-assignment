import { GJNumberLabel } from "./GJNumberLabel";
import styles from "./GJNumbersView.module.scss";
import ClipLoader from "react-spinners/ClipLoader";
import { CurrencyPairProps } from "../interfaces/CurrencyChart";

interface GJNumbersViewProps {
  specificPair: CurrencyPairProps | {};
  specificPairTitle: string;
  showView: boolean;
  loading: boolean;
}

export const GJNumbersView: React.FC<GJNumbersViewProps> = ({
  specificPair,
  specificPairTitle,
  showView,
  loading,
}) => {
  return (
    <div className={styles.container}>
      {loading ? (
        <ClipLoader color={"#000000"} loading={loading} size={50} />
      ) : (
        <div></div>
      )}
      {showView && (
        <div className={styles.currencyContainer}>
          <h1>{specificPairTitle}</h1>
          <div className={styles.labelContainer}>
            {Object.keys(specificPair).map((values: string, i: number) => {
              return (
                <GJNumberLabel
                  key={i}
                  values={values}
                  specificPairValue={
                    specificPair[values as keyof typeof specificPair]
                  }
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
