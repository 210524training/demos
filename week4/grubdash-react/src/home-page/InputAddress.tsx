import React from 'react';

type Props = {

}

const InputAddress: React.FC<Props> = (props) => {

  return (
    <>
      <div className="row justify-content-center row-cols-3">
        <div className="col-4">
          <input className="form-control" type="text" placeholder="Enter delivery address" /> 
        </div>
        <div className="col-1">
          <input type="button" className="btn btn-success" value="Submit" />
        </div>
      </div>
    </>
  );
};

export default InputAddress;