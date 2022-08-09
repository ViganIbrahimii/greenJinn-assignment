First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Choices during development

Used Next.js 'rewrites' which allowed me to bypass the CORS policy by masking the destination path allowing us to make requests from the client-side.

## Deploy on Vercel

First step on building and deploying a site is to connect your vercel account to your github account. Add new project and select the repository which you want to be deployed, in this case the project was developed with nextjs, where vercel automatically runs next build for the project and deploys it.
