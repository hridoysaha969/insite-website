## Getting Started

First, create an account on our platform:
 1. Navigate to Signup page.
 2. Click on Sign Up with google.
 3. Once registered, navigate to dashboard.

After navigating to dashboard:
 1. Click on Add Website.
 2. Enter your website's domain (e.g., https://yourdomain.com).
 3. Copy the generated script tag.

To enable tracking, integrate the script tag into your website:
 1. Open your website's HTML file or template.
 2. Paste the script tag in the <head> tag, like so:
<script defer data-domain="[your-website-id]" src="https://insite-metrics.vercel.app/tracking-script.js?utm={source}"></script>
 3. Save your changes and deploy your website 

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
