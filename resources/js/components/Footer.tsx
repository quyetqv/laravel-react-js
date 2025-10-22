import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-600 py-6 mt-10">
            <div className="container mx-auto text-center">
                &copy; {new Date().getFullYear()} Cửa hàng demo. All rights reserved.
            </div>
        </footer>
    );
}
