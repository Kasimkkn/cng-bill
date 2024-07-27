import React, { useEffect, useState } from 'react';
import { useBillContext } from './BillContext';

const BillForm = () => {
    const { billData, setBillData } = useBillContext();
    const [formData, setFormData] = useState(billData);
    useEffect(() => {
        setFormData(billData);
    }, [billData]);

    useEffect(() => {
        setBillData(formData);
    }, [formData, setBillData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddItem = () => {
        setFormData(prevData => ({
            ...prevData,
            items: [...prevData.items, { description: '', hsn: '', qty: 1, unitPrice: 0, lineTotal: 0 }]
        }));
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        setFormData(prevData => {
            const newItems = prevData.items.map((item, i) =>
                i === index ? { ...item, [name]: value, lineTotal: item.qty * item.unitPrice } : item
            );
            return {
                ...prevData,
                items: newItems
            };
        });
    };

    return (
        <form className='p-4 flex flex-wrap gap-2'>
            <div className='flex flex-col gap-2'>
                <label>Bill To:</label>
                <input type='text' className='input-field' name='billTo' value={formData.billTo} onChange={handleChange} placeholder='Enter Bill no' />
            </div>
            <div className='flex flex-col gap-2'>
                <label>Mobile No:</label>
                <input type='text' className='input-field' name='mobileNo' max={10} maxLength={10} value={formData.mobileNo} onChange={handleChange} placeholder='Enter Mobile No' />
            </div>
            <div className='flex flex-col gap-2'>
                <label>Address:</label>
                <input type='text' className='input-field' name='address' value={formData.address} onChange={handleChange} placeholder='Enter Address' />
            </div>
            <div className='flex flex-col gap-2'>
                <label>Invoice No:</label>
                <input type='text' className='input-field' name='invoiceNo' value={formData.invoiceNo} onChange={handleChange} placeholder='Enter Invoice No' />
            </div>
            <div className='flex flex-col gap-2'>
                <label>Date:</label>
                <input type='date' name='date' className='input-field' value={formData.date} onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-2'>
                <label>Vehicle No:</label>
                <input type='text' className='input-field' name='vehicleNo' value={formData.vehicleNo} onChange={handleChange} placeholder='Enter Vehicle No' />
            </div>
            <div className='flex flex-col gap-2'>
                <label>Type of Vehicle:</label>
                <input type='text' className='input-field' name='typeOfVehicle' value={formData.typeOfVehicle} onChange={handleChange} placeholder='Enter Type Of Vehicle' />
            </div>
            <div className='flex flex-col gap-2'>
                <label>CGST %:</label>
                <input type='number' className='input-field' name='cgst' value={formData.cgst} onChange={handleChange} placeholder='Enter CGST' />
            </div>
            <div className='flex flex-col gap-2'>
                <label>SGST %:</label>
                <input type='number' className='input-field' name='sgst' value={formData.sgst} onChange={handleChange} placeholder='Enter SGST' />
            </div>
            <div className='w-full'>
                {formData.items.map((item, index) => (
                    <div key={index} className='border border-gray-300 p-1 rounded-sm'>
                        <h3 className='bg-black text-white text-center'>Item {index + 1}</h3>
                        <div className='flex flex-wrap gap-2'>
                            <div className="flex flex-col gap-2">
                                <label>Description:</label>
                                <input type='text' className='input-field' name='description' value={item.description} onChange={(e) => handleItemChange(index, e)} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>HSN:</label>
                                <input type='number' className='input-field' name='hsn' value={item.hsn} onChange={(e) => handleItemChange(index, e)} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Qty:</label>
                                <input type='number' className='input-field' name='qty' value={item.qty} onChange={(e) => handleItemChange(index, e)} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Unit Price:</label>
                                <input type='number' className='input-field' name='unitPrice' value={item.unitPrice} onChange={(e) => handleItemChange(index, e)} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Line Total:</label>
                                <input type='number' className='input-field' name='lineTotal' disabled value={item.lineTotal} onChange={(e) => handleItemChange(index, e)} />
                            </div>
                        </div>
                    </div>
                ))}
                <button
                    className='border border-black px-2 py-1 bg-black text-white rounded-md'
                    type='button' onClick={handleAddItem}>Add Item</button>
            </div>
        </form>
    );
};

export default BillForm;
