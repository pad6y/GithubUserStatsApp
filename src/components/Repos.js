import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext);

  //Reusable Fusion Chart data sorting function
  const sortedRequiredChartValue = (obj, whichVal) => {
    return Object.values(obj)
      .sort((a, b) => {
        return b[whichVal] - a[whichVal];
      })
      .map((item) => {
        return { label: item.label, value: item[whichVal] };
      })
      .slice(0, 5);
  };

  // Preparing Chart Data
  const languages = repos.reduce((total, lang) => {
    const { language, stargazers_count } = lang;
    if (!language) return total;

    if (!total[language]) {
      total[language] = {
        label: language,
        value: 1,
        stars: stargazers_count,
      };
    } else {
      total[language].value++;
      total[language].stars += stargazers_count;
    }
    return total;
  }, {});
  // console.log(languages);

  const { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D chartData={sortedRequiredChartValue(languages, 'value')} />
        <Column3D chartData={sortedRequiredChartValue(stars, 'value')} />
        <Doughnut2D chartData={sortedRequiredChartValue(languages, 'stars')} />
        <Bar3D chartData={sortedRequiredChartValue(forks, 'value')} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
