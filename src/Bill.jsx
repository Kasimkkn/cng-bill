import React, { forwardRef } from 'react';
import { useBillContext } from './BillContext';
import { ToWords } from 'to-words';
const Bill = forwardRef((props, ref) => {
    const { billData } = useBillContext();
    const toWords = new ToWords({ localeCode: 'en-IN', currency: 'INR' });
    if (!billData) return null;

    const {
        billTo, mobileNo, address, gstNo,
        invoiceNo, date, vehicleNo, typeOfVehicle,
        items, cgst, sgst, igst
    } = billData;

    // Calculate totals and taxes
    const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);
    const cgstAmount = (subtotal * (cgst / 100)).toFixed(2);
    const sgstAmount = (subtotal * (sgst / 100)).toFixed(2);
    const igstAmount = (subtotal * (igst / 100)).toFixed(2);
    const total = (parseFloat(subtotal) + parseFloat(cgstAmount) + parseFloat(sgstAmount) + parseFloat(igstAmount)).toFixed(2);

    return (
        <div ref={ref} className="py-2 px-4 max-w-4xl mx-auto border border-gray-300">
            <div className="flex flex-col w-full gap-3 justify-between items-center pb-4">
                <div className='w-full text-center items-center flex flex-col'>
                    <img src="/logo.png" alt="" className='object-cover w-96' />
                    <p className='italic font-semibold'>New Online CNG Kit Fitting & Cylinder Retesting</p>
                    <p className='topBorder font-bold p-1 w-full bottomBorder'>G72 Apple Plaza , Sidhpur , Patan - 384290 (Gujarat)</p>
                </div>
                <div>
                    <p className="font-semibold">TAX INVOICE</p>
                </div>
            </div>

            <div className="topBorder leftBorder rightBorder pl-1">
                <div className="flex justify-between">
                    <div className=''>
                        <p><span className="font-semibold uppercase">Bill To:</span> {billTo}</p>
                        <p><span className="font-semibold uppercase">Mob:</span> {mobileNo}</p>
                        <p><span className="font-semibold uppercase">Add:</span> {address}</p>
                    </div>
                    <div className='leftBorder' style={{ width: '44%' }}>
                        <div className='flex justify-between'>
                            <p className='w-full pl-1 py-1'>
                                <span className="w-full font-semibold flex flex-col gap-1">Invoice No:</span> {invoiceNo}</p>
                            <p className='w-full pl-1 py-1 leftBorder'>
                                <span className="w-full font-semibold flex flex-col gap-1">Date:</span> {date}</p>
                        </div>

                        <p className='w-full pl-1 py-1 topBorder'><span className="w-full font-semibold">Vehicle No.:</span> {vehicleNo}</p>
                        <p className='w-full pl-1 py-1 topBorder'><span className="w-full font-semibold">Type of Vehicle:</span> {typeOfVehicle}</p>
                    </div>
                </div>
            </div>

            <table className="min-w-full bg-white">
                <thead>
                    <tr className='bg-gray-300 table-head'>
                        <th className="py-2 table-cal">Sr. No</th>
                        <th className="py-2 table-cal">DESCRIPTION</th>
                        <th className="py-2 table-cal">HSN</th>
                        <th className="py-2 table-cal">QTY</th>
                        <th className="py-2 table-cal">UNITPRICE</th>
                        <th className="py-2 table-cal">LINE TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td className="table-cal py-2 text-center">{index + 1}</td>
                            <td className="table-cal py-2">{item.description}</td>
                            <td className="table-cal py-2 text-center">{item.hsn}</td>
                            <td className="table-cal py-2 text-center">{item.qty}</td>
                            <td className="table-cal py-2 text-center">{item.unitPrice}</td>
                            <td className="table-cal py-2 text-center">{item.lineTotal}</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="table-cal py-2 text-center"></td>
                        <td className="table-cal py-2 text-center"></td>
                        <td className="table-cal py-2 text-center"></td>
                        <td className="table-cal py-2 text-center"></td>
                        <td className="table-cal table-count py-2 text-center">SUBTOTAL</td>
                        <td className="table-cal table-count py-2 text-center bg-gray-300">{subtotal}</td>
                    </tr>
                    <tr>
                        <td className="table-cal py-2 text-center"></td>
                        <td className="table-cal py-2 text-center"></td>
                        <td className="table-cal py-2 text-center"></td>
                        <td className="table-cal py-2 text-center"></td>
                        <td className="table-cal table-count py-2 text-center">CGST {cgst}%</td>
                        <td className="table-cal table-count py-2 text-center bg-gray-300">{cgstAmount}</td>
                    </tr>
                    <tr>
                        <td className="table-cal py-2 text-center"></td>
                        <td className="table-cal py-2 text-center"></td>
                        <td className="table-cal py-2 text-center"></td>
                        <td className="table-cal py-2 text-center"></td>
                        <td className="table-cal table-count py-2 text-center">SGST {sgst}%</td>
                        <td className="table-cal table-count py-2 text-center bg-gray-300">{sgstAmount}</td>
                    </tr>
                    <tr>
                        <td className="table-cal py-2 text-center"></td>
                        <td className="table-cal py-2 text-center"></td>
                        <td className="table-cal py-2 text-center"></td>
                        <td className="table-cal py-2 text-center"></td>
                        <td className="table-cal table-count py-2 text-center">TOTAL</td>
                        <td className="table-cal table-count py-2 text-center bg-gray-300">{total}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td className="py-2 table-foot text-center" colspan="6">Amount in Words: {toWords.convert(total)}</td>
                    </tr>
                </tfoot>
            </table>

            <div className="mt-4 px-2">
                <div className='flex justify-between'>
                    <p>Make All Checks Payable To <span className="font-bold">Kadiwala Auto Gas</span></p>
                    <p>For. Kadiwala Auto Gas</p>
                </div>
                <p className="mt-2">GST No: <span className='font-bold'>24FZJPR5253K1ZT</span></p>
            </div>

            <div className="mt-8 flex justify-center flex-col items-center gap-1">
                <p className="font-semibold">THANK YOU FOR VISIT AGAIN</p>
            </div>
        </div>
    )
})
export default Bill