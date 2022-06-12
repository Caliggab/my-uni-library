import React from "react";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <div className={classes.container}>
      <div className={classes.copy}>Copyright&#169; 2022</div>
      <div className={classes.name}>Gabriel Arriaza</div>
    </div>
  );
}

export default Footer;
