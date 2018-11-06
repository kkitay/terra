import React from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import Logo from '../assets/raccoon.png';
import { graphql } from 'gatsby';

import Version from '../components/version';
import './index.css';

export default ({ data }) => {
  const page = data.allPrismicRaccoontechnologyHomepage.edges[0].node.data;
  return (
    <div className="Index">
      <Helmet>
        <title>Raccoon</title>
        <link rel="icon" href={Logo} />
      </Helmet>
      <h1>{page.title.text}</h1>
      <h2>{page.subtitle.text}</h2>
      <Version data={data} />
      {/* <Link to="/feedback">
        Have feedback or problems? Share it with the Raccoon.
      </Link> */}
      <p>
        Raccoon is made by <a href="https://kitay.co">Kat Kitay</a>.
      </p>
    </div>
  );
};

export const query = graphql`
  query {
    allGithubRelease(
      sort: { fields: publishedAt, order: DESC }
      limit: 1
      filter: { draft: { eq: false } }
    ) {
      edges {
        node {
          assets {
            browserDownloadUrl
          }
          body
          name
          tagName
          publishedAt
          draft
        }
      }
    }
    allPrismicRaccoontechnologyHomepage {
      edges {
        node {
          data {
            title {
              text
            }
            subtitle {
              text
            }
            screenshot {
              url
            }
            specs {
              text
            }
          }
        }
      }
    }
  }

`;
