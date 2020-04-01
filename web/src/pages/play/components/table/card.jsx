import React from "react";
import classNames from "classnames";
import styles from "pages/play/components/table/card.module.css";

const Card = ({ number, show }) => {
  return (
    <div
      className={classNames(
        number === "undef"
          ? styles.emptyCard
          : show === true
          ? styles.openHand
          : styles.closeHand
      )}
    >
      <p>{number}</p>
    </div>
  );
};

export default Card;
