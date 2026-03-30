const StatCard = ({ title, value, subtitle }) => (
  <div className="bg-white rounded-lg border-[#60606080]/50 border p-5 flex flex-col gap-1">
    <p className="text-[16px] rob font-normal text-gray-500">{title || 'No title'}</p>
    <p className="text-xl font-semibold rob text-gray-900">{value|| '0'}</p>
    <p className="text-xs rob font-normal text-green-600">{subtitle }</p>
  </div>
);

export default StatCard