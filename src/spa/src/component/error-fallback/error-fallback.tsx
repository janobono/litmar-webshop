import { FallbackProps } from 'react-error-boundary';
import React from 'react';

function ErrorFallback(_props: FallbackProps) {
    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="font-mono text-xl text-red-500">Vyskytla sa neznáma chyba.</div>
        </div>
    );
}

export default ErrorFallback;
