import React from 'react';

interface CountProps {
  label?: string;
  count?: number;
}

const Count: React.FC<CountProps> = ({ label, count }) => {
  const getContent = () => {
    if (!count) {
      return <div>Loading...</div>;
    }

    return (
      <div className="w-auto flex-column">
        <div className="count w-auto h1 lh-1 m-0">{ count }</div>
        {label && <div className="label w-auto text-secondary lh-1 h5">{ label }</div>}
      </div>
    );
  }

  return (
    <div className="Count d-flex justify-content-center pt-2 pb-5 py-md-5 px-4">
      {getContent()}
    </div>
  );
};

export default Count;