import React, { createContext, useContext, useState } from 'react';

const BillContext = createContext();

export const useBillContext = () => {
    const context = useContext(BillContext);
    if (context === undefined) {
        console.error('useBillContext must be used within a BillProvider');
        throw new Error('useBillContext must be used within a BillProvider');
    }
    return context;
};

export const BillProvider = ({ children }) => {
    const [billData, setBillData] = useState({
        billTo: '',
        mobileNo: '',
        address: '',
        gstNo: '',
        invoiceNo: '',
        date: '',
        vehicleNo: '',
        typeOfVehicle: '',
        items: [],
        cgst: 0,
        sgst: 0,
        igst: 0
    });

    return (
        <BillContext.Provider value={{ billData, setBillData }}>
            {children}
        </BillContext.Provider>
    );
};
