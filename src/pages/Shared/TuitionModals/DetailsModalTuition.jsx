import moment from 'moment';
import React from 'react';

const DetailsModalTuition = ({ detailsModalRef, selectTuition }) => {

    // Display Gender
    const displayGender = selectTuition?.tutorGender
        ? selectTuition.tutorGender.charAt(0).toUpperCase() + selectTuition.tutorGender.slice(1)
        : 'No Gender Preference';

    return (
        <dialog ref={detailsModalRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-semibold text-lg text-dark-08">{selectTuition.subject}</h3>
                <ul className='mt-4 space-y-2'>
                    <li><span className='text-dark-08 font-medium'>Class/Grad:</span> {selectTuition.class}</li>
                    <li><span className='text-dark-08 font-medium'>Location:</span> {selectTuition.location}</li>
                    <li><span className='text-dark-08 font-medium'>Budget:</span> ${selectTuition.budget}</li>
                    <li><span className='text-dark-08 font-medium'>Schedule:</span> {selectTuition.schedule}</li>
                    <li><span className='text-dark-08 font-medium'>Preferred Tutor Gender:</span> {displayGender}</li>
                    <li><span className='text-dark-08 font-medium'>Notes:</span> {selectTuition.notes || 'No Notes Provided'}</li>
                    <li><span className='text-dark-08 font-medium inline-block mr-2'>Created At: </span>
                        <p className='inline-block'>{moment(selectTuition.createdAt).format('ll')} | {moment(selectTuition.createdAt).format('LTS')}</p>
                    </li>
                    {selectTuition.updatedAt &&
                        <li><span className='text-dark-08 font-medium inline-block mr-2'>Updated At: </span>
                            <p className='inline-block'>{moment(selectTuition.updatedAt).format('ll')} | {moment(selectTuition.updatedAt).format('LTS')}</p>
                        </li>}
                    <li><span className='text-dark-08 font-medium'>Status:</span> <span className={`
                    ${selectTuition.status === 'approved' ? 'text-green-500' : selectTuition.status === 'pending' ? 'text-amber-500' : selectTuition.status === 'closed' ? 'text-violet-500' : 'text-red-500'}`}>{(selectTuition?.status || 'unknown').toUpperCase()}</span></li>
                </ul>
                <span className='text-sm py-4 block text-dark-09 font-medium'>Personal Info:</span>
                <ul className='space-y-2'>
                    <li><span className='text-dark-08 font-medium'>Name:</span> {selectTuition.name}</li>
                    <li><span className='text-dark-08 font-medium'>Email:</span> {selectTuition.email}</li>
                    <li><span className='text-dark-08 font-medium'>Phone:</span> {selectTuition.phone}</li>
                </ul>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default DetailsModalTuition;