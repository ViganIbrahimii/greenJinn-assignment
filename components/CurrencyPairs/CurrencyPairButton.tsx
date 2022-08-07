import styles from "./CurrencyPairButton.module.scss";
interface CurrencyPairButtonProps {
  name: string;
  onClick: any;
}
export const CurrencyPairButton: React.FC<CurrencyPairButtonProps> = ({
  name,
  onClick,
}) => {
  return (
    <button onClick={onClick} className={styles.currencyPairButton}>
      {name}
    </button>
  );
};
