// App.jsx
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useBillContext } from './BillContext';
import Bill from './Bill';
import BillForm from './BillForm';

const App = () => {
  const billRef = useRef();
  const { billData } = useBillContext();
  const handlePrint = useReactToPrint({
    content: () => billRef.current,
  });

  return (
    <div className='flex flex-col items-center mt-2 w-full'>
      <button
        className='border border-black px-2 py-1 bg-black text-white rounded-md'
        onClick={handlePrint} disabled={!billData} > Print Bill
      </button>
      <div className='flex mt-4 justify-between mb-8'>
        <div className='w-1/2'>
          <BillForm />
        </div>
        <div className='w-1/2'>
          {billData && <Bill ref={billRef} />}
        </div>
      </div>
    </div>
  );
};

export default App;
