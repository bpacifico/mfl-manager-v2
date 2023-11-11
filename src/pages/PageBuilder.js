import React from 'react';
import "./PageBuilder.css";

interface PageBuilderProps {}

const PageBuilder: React.FC<PageBuilderProps> = () => {
  return (
    <div id="PageBuilder" className="d-flex align-items-center justify-content-center w-100 h-100">
      <img src="/media/images/mower.svg" className="mower" alt="Mower"/>
      <span>Gardeners are working on it...</span>
    </div>
  );
};

export default PageBuilder;