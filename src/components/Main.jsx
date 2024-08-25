import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize, faWindowMaximize, faTimes, faFolder } from '@fortawesome/free-solid-svg-icons';
import { DiReact, DiAngularSimple, DiNodejsSmall } from 'react-icons/di';
import { SiVuedotjs, SiPuppeteer } from 'react-icons/si';
import '../styles/main.scss';

const Main = () => {
  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Philippe OURSEL</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"><FontAwesomeIcon icon={faWindowMinimize} /></button>
          <button aria-label="Maximize"><FontAwesomeIcon icon={faWindowMaximize} /></button>
          <button aria-label="Close"><FontAwesomeIcon icon={faTimes} /></button>
        </div>
      </div>
      <div className="window-body">
        <div className="address-bar">
          <span>Compétences (C:)</span>
        </div>
        <div className="content-wrapper">
          <div className="navigation-pane">
            <div className="folder-item">
              <FontAwesomeIcon icon={faFolder} />
              <span>Compétences</span>
            </div>
            <div className="folder-item">
              <FontAwesomeIcon icon={faFolder} />
              <span>Projets</span>
            </div>
          </div>
          <div className="content">
            <div className="program-icon">
              <DiReact />
              <span>React</span>
            </div>
            <div className="program-icon">
              <SiVuedotjs />
              <span>Vue</span>
            </div>
            <div className="program-icon">
              <DiAngularSimple />
              <span>Angular</span>
            </div>
            <div className="program-icon">
              <DiNodejsSmall />
              <span>NodeJS</span>
            </div>
            <div className="program-icon">
              <SiPuppeteer />
              <span>Puppeteer</span>
            </div>
          </div>
        </div>
      </div>
      <div className="status-bar">
        <div className="status-bar-field">5 objets</div>
        <div className="status-bar-field">Software Engineer</div>
      </div>
    </div>
  );
};

export default Main;