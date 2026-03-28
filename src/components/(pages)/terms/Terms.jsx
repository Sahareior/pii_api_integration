import { useAdminMiscellaneousQuery } from '../../../redux/features/sijanSlice/sijan.slice';
import EditSection from '../../editor/EditSection';
import Reusable_Header from '../../reusable_components/Reusable_Header';

const Terms = () => {
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
            <p className="text-red-500 text-lg font-semibold mb-2">Failed to load terms of service</p>
            <p className="text-gray-500">{error?.data?.message || error?.status || "Something went wrong"}</p>
          </div>
        );
    }

    const termsItem = adminMiscellaneous?.find((item) => item.key === 'terms_and_condtions');

    return (
        <div className='space-y-12'>
              <Reusable_Header header={'Terms of Service'} />
             <EditSection 
               section={'terms_and_condtions'} 
               id={termsItem?.id} 
               data={termsItem?.value} 
             />
        </div>
    );
};

export default Terms;