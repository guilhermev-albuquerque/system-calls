import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';

import './styles.css';
import avatar from '../../assets/avatar.png';

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div>
        <img
          src={user.avatarUrl === null ? avatar : user.avatarUrl}
          alt="avatar"
        />
      </div>
      <Link to="/dashboard">
        <FiHome color="#FFF" size={24} />
        Calls
      </Link>
      <Link to="/customers">
        <FiUser color="#FFF" size={24} />
        Customers
      </Link>
      <Link to="/profile">
        <FiSettings color="#FFF" size={24} />
        Settings
      </Link>
    </div>
  );
}

export default Header;
