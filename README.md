<p align="center">
  <a href="https://www.plasmic.app">
    <img alt="Plasmic" role="img" src="https://cdn-images-1.medium.com/max/176/1*D1nV2o_le9dJEO3G80P4xg@2x.png" width="120">
  </a>
</p>

# Plasmic example: authentication using next-auth

This is a demo of how you can connect Plasmic with [next-auth](https://authjs.dev) (recently renamed to auth.js) to implement authentication.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fplasmicapp%2Fplasmic-next-auth-example&env=AUTH_SECRET,AUTH_GOOGLE_SECRET,AUTH_GOOGLE_ID&envDescription=You%20would%20need%20to%20set%20up%20.env%20keys%20for%20next-auth%20to%20work%20properly&envLink=https%3A%2F%2Fgithub.com%2Fplasmicapp%2Fplasmic-next-auth-example%2Fblob%2Fmaster%2FREADME.md)

Demo link - https://plasmic-next-auth-example.vercel.app/

Project - https://studio.plasmic.app/projects/21yfH8a5FQ3G5YYAEZCSx

## Getting Started

1. Hit the Deploy with Vercel, that should create a separate repo for you

1. Configure the `plasmic-init` to use use project id and public api token

1. Run `npx auth secret` to generate a secret for next-auth

1. [Get the API keys from google](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid) to setup the Google OAuth.

1. Run `yarn` to install dependencies

1. Run the development server: `yarn dev`

1. Open your browser to see the result at http://localhost:3000

## Learn More

With Plasmic, you can enable non-developers on your team to publish pages and content into your website or app.

To learn more about Plasmic, take a look at the following resources:

- [Plasmic Website](https://www.plasmic.app/)
- [Plasmic Documentation](https://docs.plasmic.app/learn/)
- [Plasmic Community Forum](https://forum.plasmic.app/)

You can check out [the Plasmic GitHub repository](https://github.com/plasmicapp/plasmic) - your feedback and contributions are welcome!

Note: This Next.js project was bootstrapped with [`create-plasmic-app`](https://www.npmjs.com/package/create-plasmic-app).
