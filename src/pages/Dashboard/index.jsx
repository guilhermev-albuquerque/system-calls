import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from 'react-icons/fi';

import './styles.css';

function Dashboard() {
  const [calls, setCalls] = useState([1]);

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
                <tr>
                  <td data-label="Customers">Albuquerque</td>
                  <td data-label="Subject">Support</td>
                  <td data-label="Status">
                    <span className="badge">Opened</span>
                  </td>
                  <td data-label="Registered">06/07/2021</td>
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
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
