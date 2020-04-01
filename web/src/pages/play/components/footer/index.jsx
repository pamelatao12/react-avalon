import React from "react";
import styles from "pages/play/components/footer/index.module.scss";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <a
        href="https://www.buymeacoffee.com/dcho"
        target="_blank"
        rel="noopener noreferrer"
      >
        Buy the developer a coffee
      </a>
    </div>
  );
};
