import React from 'react';
import dashboard1 from './../Images/dashboard1png.png';
import dashboard2 from './../Images/dashboard2.png';
import dashboard3 from './../Images/dashboard3.png';

function Dash() {
  return (
    <>
        <div className="row m-5 justify-content-evenly ">
            <div className="col-4">
                <img src={dashboard1} alt="" className='w-100 p-2 bg-warning rounded-3'/>
            </div>
            <div className="col-4">
                <img src={dashboard2} alt="" className='w-100 p-2 bg-danger-subtle rounded-3' />
            </div>
            <div className="col-3">
                <img src={dashboard3} alt="" className='w-100 p-3 h-75 rounded-2 bg-info'/>
            </div>
        </div>
    </>
  )
}

export default Dash