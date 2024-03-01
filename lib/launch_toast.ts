import React, { useEffect } from 'react';

function launch_toast() {
    useEffect(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            window.location.href='http://localhost:3000/'
            
        }, 5000);
    }, []);
}

export default launch_toast;