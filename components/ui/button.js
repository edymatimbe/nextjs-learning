import Link from 'next/link';

import classes from './button.module.css';

const ButtonComponent = (props) => {
  if (!props.link) {
    return (
      <button className={classes.btn} onClick={props.onClick}>
        {props.children}
      </button>
    );
  }

  return (
    <Link className={classes.btn} href={props.link}>
      {props.children}
    </Link>
  );
};

export default ButtonComponent;
