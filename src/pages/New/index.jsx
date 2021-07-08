import { useContext, useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import firebase from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { AuthContext } from '../../contexts/auth';

import { toast } from 'react-toastify';
import './styles.css';

function New() {
  const [customers, setCustomers] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [customerSelected, setCustomerSelected] = useState(0);

  const [subject, setSubject] = useState('Support');
  const [status, setStatus] = useState('Opened');
  const [complement, setComplement] = useState('');

  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function loadCustomers() {
      await firebase
        .firestore()
        .collection('customers')
        .get()
        .then((snapshot) => {
          let list = [];
          snapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              tradingName: doc.data().tradingName,
            });
          });

          if (list.length === 0) {
            console.log('No company results');
            setCustomers([{ id: '1', tradingName: 'FREELA' }]);
            setLoadingCustomers(false);
            return;
          }

          setCustomers(list);
          setLoadingCustomers(false);
        })
        .catch((error) => {
          console.log(error);
          setLoadingCustomers(false);
          setCustomers([{ id: '1', tradingName: '' }]);
        });
    }

    loadCustomers();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();

    await firebase
      .firestore()
      .collection('calls')
      .add({
        created: new Date(),
        customer: customers[customerSelected].tradingName,
        customerId: customers[customerSelected].id,
        subject: subject,
        status: status,
        complement: complement,
        userId: user.uid,
      })
      .then(() => {
        toast.success('Call registered successfully.');
        setCustomerSelected(0);
        setComplement('');
      })
      .catch((error) => {
        toast.error('Error registering, try later.');
        console.log(error);
      });
  }

  function handleSelectChange(e) {
    setSubject(e.target.value);
  }

  function handleOptionChange(e) {
    setStatus(e.target.value);
  }
  function handleCustomersChange(e) {
    setCustomerSelected(e.target.value);
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="New Call">
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Customers</label>

            {loadingCustomers ? (
              <input type="text" disabled={true} value="Loading customers" />
            ) : (
              <select value={customerSelected} onChange={handleCustomersChange}>
                {customers.map((item, index) => {
                  return (
                    <option key={item.id} value={index}>
                      {item.tradingName}
                    </option>
                  );
                })}
              </select>
            )}

            <label>Subject</label>
            <select value={subject} onChange={handleSelectChange}>
              <option value="Support">Support</option>
              <option value="Technical Visit">Technical Visit</option>
              <option value="Financial">Financial</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Opened"
                onChange={handleOptionChange}
                checked={status === 'Opened'}
              />
              <span>Opened</span>

              <input
                type="radio"
                name="radio"
                value="Progress"
                onChange={handleOptionChange}
                checked={status === 'Progress'}
              />
              <span>Progress</span>

              <input
                type="radio"
                name="radio"
                value="Finished"
                onChange={handleOptionChange}
                checked={status === 'Finished'}
              />
              <span>Finished</span>
            </div>

            <label>Complement</label>
            <textarea
              type="text"
              placeholder="Describe your problem."
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default New;
