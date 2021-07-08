import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';

import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from 'react-icons/fi';
import './styles.css';
import { format } from 'date-fns';

const listRef = firebase
  .firestore()
  .collection('calls')
  .orderBy('created', 'desc');

function Dashboard() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();

  useEffect(() => {
    loadCalls();

    return () => {};
  }, []);

  async function loadCalls() {
    await listRef
      .limit(5)
      .get()
      .then((snapshot) => {
        updateState(snapshot);
      })
      .catch((error) => {
        console.log(error);
        setLoadingMore(false);
      });

    setLoading(false);
  }

  async function updateState(snapshot) {
    const isCollectionEmpty = snapshot.size === 0;

    if (!isCollectionEmpty) {
      let list = [];

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          subject: doc.data().subject,
          customer: doc.data().customer,
          customerId: doc.data().customerId,
          created: doc.data().created,
          createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          status: doc.data().status,
          complement: doc.data().complement,
        });
      });

      const lastDoc = snapshot.docs[snapshot.docs.length - 1];

      setCalls((calls) => [...calls, ...list]);
      setLastDocs(lastDoc);
    } else {
      setIsEmpty(true);
    }

    setLoadingMore(false);
  }

  async function handleMore() {
    setLoadingMore(true);
    await listRef
      .startAfter(lastDocs)
      .limit(5)
      .get()
      .then((snapshot) => {
        updateState(snapshot);
      });
  }

  if (loading) {
    return (
      <div>
        <Header />

        <div className="content">
          <Title name="Calls">
            <FiMessageSquare size={25} />
          </Title>

          <div className="container-dashboard">
            <span>Looking for calls</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Calls">
          <FiMessageSquare size={25} />
        </Title>

        {calls.length === 0 ? (
          <div className="container-dashboard">
            <span>No calls registered</span>

            <Link to="/new" className="new">
              <FiPlus size={25} color="white" />
              New Call
            </Link>
          </div>
        ) : (
          <>
            <Link to="/new" className="new">
              <FiPlus size={25} color="white" />
              New Call
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope="col">Customers</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Status</th>
                  <th scope="col">Registered in</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                {calls.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="Customers">{item.customer}</td>
                      <td data-label="Subject">{item.subject}</td>
                      <td data-label="Status">
                        <span
                          className="badge"
                          style={{
                            backgroundColor:
                              item.status === 'Opened'
                                ? '#5151f3'
                                : item.status === 'Progress'
                                ? '#999'
                                : '#5cb85c',
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td data-label="Registered">{item.createdFormated}</td>
                      <td data-label="#">
                        <button
                          className="action"
                          style={{ backgroundColor: '#3583f6' }}
                        >
                          <FiSearch size={17} color="#FFF" />
                        </button>
                        <button
                          className="action"
                          style={{ backgroundColor: '#F6a935' }}
                        >
                          <FiEdit2 size={17} color="#FFF" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {loadingMore && (
              <h3 style={{ textAlign: 'center', marginTop: 15 }}>
                Looking for data
              </h3>
            )}
            {!loadingMore && !isEmpty && (
              <button className="btn-more" onClick={handleMore}>
                Load more
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
