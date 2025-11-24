import { FC } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  title: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  size?: "small" | "big";
}

export const Button: FC<ButtonProps> = ({
  onClick,
  title,
  variant = "primary",
  size = "big",
}) => {
  return (
    <button
      className={`${styles.button} ${
        variant === "primary" ? styles.buttonPrimary : styles.buttonSecondary
      } ${size === "small" ? styles.buttonSmall : styles.buttonBig}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
