import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const [request, setRequest] = useState(0);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({ show: false, msg: '' });

  const checkRemainRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        const { remaining } = data.rate;
        setRequest(remaining);

        if (remaining === 0) {
          toggleError(
            true,
            'sorry, you ran out of requests, try again tomorrow'
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }
  useEffect(checkRemainRequests, []);

  const searchUser = async (searchTerm) => {
    toggleError();
    setLoading(true);
    try {
      const response = await axios(`${rootUrl}/users/${searchTerm}`);
      if (response) {
        setGithubUser(response.data);
        const { login, followers_url } = response.data;
        const { data: repos } = await axios(
          `${rootUrl}/users/${login}/repos?per_page=100`
        );
        const { data: followers } = await axios(
          `${followers_url}?per_page=100`
        );
        setRepos(repos);
        setFollowers(followers);

        setLoading(false);
      }
      checkRemainRequests();
    } catch (error) {
      toggleError(true, `no user found with ${searchTerm}`);
      setLoading(false);
      checkRemainRequests();
      console.log(error);
    }
  };

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        request,
        searchUser,
        loading,
        error,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
