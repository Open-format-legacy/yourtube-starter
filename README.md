# 🎥 YourTube

A basic decentralised video platform build on top of the the whitelabel protocol.

## Getting Started

These instructions will give you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

Install JavaScript dependencies.

```
yarn install OR npm install
```

Setup your environment variables.

```
cp .env.local.example .env.local
```

#### Environment variable configuration

| Variable                        | Description                                                                                                                                                                                                                                                                                                             |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_NFT_STORAGE_TOKEN` | This is used for uploading metadata to IPFS. You can get an API Token from https://nft.storage/                                                                                                                                                                                                                         |
| `NEXT_PUBLIC_FACTORY_ID`        | This is used for filtering the subgraph to only show releases from your Factory frontend. See https://simpleweb.gitbook.io/whitelabel/developers/the-factory/deployment-arguments#metadata-best-practises. This can be any string value, but for uniqueness, we recommend using UUIDv4 - https://www.uuidgenerator.net/ |

## Development

### Running

```
yarn run dev
```

This will run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### Testing

```
yarn run test
```

Launches the test runner in the interactive watch mode.

## Learn More

This project was created using [NextJS](https://nextjs.org/).

Find out more about the packages used in this project:

- [TailwindCSS](https://tailwindcss.com)
- [OnboardJS](https://stripe.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [nft.storage](https://nft.storage/)
