import { FC } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  title: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export const Button: FC<ButtonProps> = ({
  onClick,
  title,
  variant = "primary",
}) => {
  return (
    <button
      className={`${styles.button} ${
        variant === "primary" ? styles.buttonPrimary : styles.buttonSecondary
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
