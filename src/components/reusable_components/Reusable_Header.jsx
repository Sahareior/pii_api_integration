import React from 'react';

const Reusable_Header = ({header,subHeader}) => {
    return (
        <div>
            <div>
        <h2 className='rob font-medium text-[26px]'>{header}</h2>
        <p className='rob font-normal text-[17px] text-[#717182]'>{subHeader}</p>
    </div>
        </div>
    );
};

export default Reusable_Header;