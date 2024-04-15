'use client';

import { redirect } from 'next/navigation'
import { useEffect } from 'react';

const Page = () => {
    useEffect(() => {
        redirect('https://youtu.be/L0k4ppzaMpg?si=u00y2rbi-eL1sVK-');
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Redirecting...</h1>
        </div>
    );
};

export default Page;