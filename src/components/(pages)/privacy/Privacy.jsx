import React from 'react';
import EditSection from '../../editor/EditSection';
import Reusable_Header from '../../reusable_components/Reusable_Header';

const Privacy = () => {
    return (
        <div className='space-y-12'>
            <Reusable_Header header={'Privacy Policy'} />
             <EditSection section={'terms'} data={'asdsad fasdf fcff wert asdf'} />
        </div>
    );
};

export default Privacy;