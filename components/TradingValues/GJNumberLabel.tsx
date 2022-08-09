import styles from "./GJNumberLabel.module.scss";
interface GJNumberLabelProps {
  values: string;
  specificPairValue: string;
}

export const GJNumberLabel: React.FC<GJNumberLabelProps> = ({
  values,
  specificPairValue,
}) => {
  return (
    <div className={styles.container}>
      <h1>{specificPairValue}</h1>
      <p>{values}</p>
    </div>
  );
};
