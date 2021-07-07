import { useState } from 'react';
import { toast } from 'react-toastify';
import { FiUsers } from 'react-icons/fi';

import firebase from '../../services/firebaseConnection';
import Header from '../../components/Header';
import Title from '../../components/Title';
import './styles.css';

function Customers() {
  const [tradingName, setTradingName] = useState('');
  const [ein, setEin] = useState('');
  const [address, setAddress] = useState('');

  async function handleAdd(e) {
    e.preventDefault();

    if (tradingName !== '' && ein !== '' && address !== '') {
      await firebase
        .firestore()
        .collection('customers')
        .add({
          tradingName: tradingName,
          ein: ein,
          address: address,
        })
        .then(() => {
          setTradingName('');
          setEin('');
          setAddress('');
          toast.info('Successfully registered company!');
        })
        .catch((error) => {
          toast.error('Error when registering company.');
        });
    } else {
      toast.error('Please fill out all fields!');
    }
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Customers">
          <FiUsers size={25} />
        </Title>
        <div className="content2">
          <div className="container1">
            <form className="form-profile customers" onSubmit={handleAdd}>
              <label>Trading name:</label>
              <input
                type="text"
                value={tradingName}
                onChange={(e) => setTradingName(e.target.value)}
              />

              <label>EIN:</label>
              <input
                type="text"
                value={ein}
                onChange={(e) => setEin(e.target.value)}
              />

              <label>Address:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <button type="submit" className="btn">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customers;
