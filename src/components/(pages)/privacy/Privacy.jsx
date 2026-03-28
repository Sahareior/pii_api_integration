import React from 'react';
import EditSection from '../../editor/EditSection';
import Reusable_Header from '../../reusable_components/Reusable_Header';
import { useAdminMiscellaneousQuery } from '../../../redux/features/sijanSlice/sijan.slice';

const Privacy = () => {
    const { data: adminMiscellaneous, isLoading, isError, error } = useAdminMiscellaneousQuery();

    if (isLoading) {
        return (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        );
    }

    if (isError) {
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
            <p className="text-red-500 text-lg font-semibold mb-2">Failed to load privacy policy</p>
            <p className="text-gray-500">{error?.data?.message || error?.status || "Something went wrong"}</p>
          </div>
        );
    }

    const privacyPolicyItem = adminMiscellaneous?.find((item) => item.key === 'privacy_policy');

    return (
        <div className='space-y-12'>
            <Reusable_Header header={'Privacy Policy'} />
             <EditSection 
               section={'privacy_policy'} 
               id={privacyPolicyItem?.id} 
               data={privacyPolicyItem?.value} 
             />
        </div>
    );
};

export default Privacy;