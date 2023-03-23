const { Fragment } = require('react');
import HeaderComponent from './headerComponent';

const LayoutComponent = (props) => {
  return (
    <Fragment>
      <HeaderComponent />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default LayoutComponent;
