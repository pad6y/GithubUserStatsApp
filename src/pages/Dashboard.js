import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';

const Dashboard = () => {
  const { loading } = React.useContext(GithubContext);

  return (
    <main>
      <Navbar></Navbar>
      <Search />
      {loading ? (
        <img src={loadingImage} alt="loading" className="loading-img" />
      ) : (
        <>
          <Info />
          <User />
          <Repos />
        </>
      )}
    </main>
  );
};

export default Dashboard;
