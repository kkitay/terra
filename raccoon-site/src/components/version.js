import React from 'react';
import './version.css';
import Markdown from 'react-markdown';

export default ({
  data: {
    allGithubRelease: { edges: repo }
  },
  data: {
    allPrismicRaccoontechnologyHomepage: { edges: prismic }
  }
}) => {
  const release = repo[0].node;
  release.downloadURL = release.assets[0]
    ? release.assets[0].browserDownloadUrl
    : false;

  return (
    <div className="Version">
      <div className="flex">
        <Markdown className="content" source={release.body} />
        <div className="logo">
          <img src={prismic[0].node.data.screenshot.url} alt="Raccoon Logo" />
        </div>
      </div>
      <p>
        {release.downloadURL && (
          <a href={release.downloadURL} className="download">
            Download {release.name}
            <span>{prismic[0].node.data.specs.text}</span>
          </a>
        )}
      </p>
    </div>
  );
};
