import React from 'react';
import Head from 'next/head';

interface JSONLDProps {
    data: object;
}

const JSONLD: React.FC<JSONLDProps> = ({ data }) => {
    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
            />
        </Head>
    );
};

export default JSONLD;
