import React, { useState } from 'react';
import './styling/appprogress.css';

const ApplicationProgress = () => {
  const [activetablet, setActivetablet] = useState('successful');

  const handletabletClick = (tabletName) => {
    setActivetablet(tabletName);
  };

  const tabContents = {
    pending: [
      { id: 1, courseName: 'CSC2001F', description: 'Data Structures and Databases', status: 'Pending' },
      { id: 3, courseName: 'CSC1016S', description: 'Fundamentals of Java', status: 'Pending' },
    ],
    successful: [
      { id: 2, courseName: 'CSC1015F', description: 'Fundamentals of Python', status: 'Successful' },
    ],
  };

  return (
    <div>
      <div className="tablets">
        {/* <button
          className={`tablet ${activetablet === 'pending' ? 'active' : ''}`}
          onClick={() => handletabletClick('pending')}
        >
          Pending
        </button> */}
        <button
          className={`tablet ${activetablet === 'successful' ? 'active' : ''}`}
          onClick={() => handletabletClick('successful')}
        >
          Successful
        </button>
      </div>
      {Object.keys(tabContents).map((tabName) => (
        <div
          key={tabName}
          className="content"
          style={{ display: activetablet === tabName ? 'block' : 'none' }}
        >
          <h2>{tabName === 'pending' ? 'Pending' : 'Successful'} Applications</h2>
          <ul className="application-list">
            {tabContents[tabName].map((application) => (
              <li key={application.id} className={`application ${tabName}`}>
                <div>
                  <h3>{application.courseName}</h3>
                  <p>{application.description}</p>
                </div>
                <div className="status">{application.status}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ApplicationProgress;


