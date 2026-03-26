import React from 'react';
import './ProviderComponent.css';
import { globalConfig } from '../config';
const { text  } = globalConfig
const Provider: React.FC = () => {
  
  return (
    <div className="container">
      <div className="icon-container">
        <img
          src="https://module-federation.io/svg.svg"
          alt="logo"
          className="logo-image"
        />
      </div>
      <h1 className="title">Hello {text}</h1>
    </div>
  );
};

export default Provider;
