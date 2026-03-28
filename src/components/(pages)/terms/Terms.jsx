import React from 'react';
import EditSection from './../../editor/EditSection';
import Reusable_Header from '../../reusable_components/Reusable_Header';

const Terms = () => {
    return (
        <div className='space-y-12'>
              <Reusable_Header header={'Terms of Service'} />
             <EditSection section={'terms'} data={'asdasd asfas foiasnilon aisnfs'} />
        </div>
    );
};

export default Terms;