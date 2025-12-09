import React from 'react';
import Swal from 'sweetalert2';

const SweetAlert = ({ type, message, position = 'center', timer = 2000 }) => {
    return (
        Swal.fire({
            position: position,
            icon: type,
            title: message,
            showConfirmButton: false,
            timer: timer
        })
    );
};

export default SweetAlert;