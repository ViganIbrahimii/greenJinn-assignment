import styles from "./GJNumberLabel.module.scss";
interface GJNumberLabelProps {
  values: string;
  specificPair: string;
}

export const GJNumberLabel: React.FC<GJNumberLabelProps> = ({
  values,
  specificPair,
}) => {
  return (
    <div className={styles.container}>
      <h1>{specificPair}</h1>
      <p>{values}</p>
    </div>
  );
};
