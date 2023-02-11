const fs = require('fs');

function createDeploymentVars() {
    fs.writeFileSync(
        './deploymentVars.ts',
        `export const NEXT_PUBLIC_VERCEL_ENV: undefined | typeof process.env.NEXT_PUBLIC_VERCEL_ENV = ${
            process.env.NEXT_PUBLIC_VERCEL_ENV
                ? `"${process.env.NEXT_PUBLIC_VERCEL_ENV}"`
                : 'undefined'
        };\nexport const NEXT_PUBLIC_VERCEL_URL: undefined | typeof process.env.NEXT_PUBLIC_VERCEL_URL = ${
            process.env.NEXT_PUBLIC_VERCEL_URL
                ? `"${process.env.NEXT_PUBLIC_VERCEL_URL}"`
                : 'undefined'
        };`
    );
}

createDeploymentVars();
