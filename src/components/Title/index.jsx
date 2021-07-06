import PropTypes from 'prop-types';
import './styles.css';

function Title({ children, name }) {
  return (
    <div className="title">
      {children} <span>{name}</span>{' '}
    </div>
  );
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
};

export default Title;
