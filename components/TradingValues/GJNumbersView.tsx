import { GJNumberLabel } from "./GJNumberLabel";
import styles from "./GJNumbersView.module.scss";

interface GJNumbersViewProps {
  specificPair: { [index: string]: string };
  specificPairTitle: string;
}

export const GJNumbersView: React.FC<GJNumbersViewProps> = ({
  specificPair,
  specificPairTitle,
}) => {
  return (
    <div className={styles.container}>
      <h1>{specificPairTitle}</h1>
      <div className={styles.labelContainer}>
        {Object.keys(specificPair).map((values: string, i: number) => {
          return (
            <GJNumberLabel
              key={i}
              values={values}
              specificPair={specificPair[values]}
            />
          );
        })}
      </div>
    </div>
  );
};
