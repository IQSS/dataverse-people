Using a Table from https://react-bootstrap.github.io/components/table/

To run in dev:

```
npm install
cp .env.local.dev .env.local
npm start
```

To run tests:

```
npm test
```

To build the static site for deployment (adjust URL as needed):

```
echo 'REACT_APP_API_URL="/api/message"' > .env.local
npm run build
```

(For more on the `.env.local` file see [Adding Custom Environment Variables][].)

[Adding Custom Environment Variables]: https://create-react-app.dev/docs/adding-custom-environment-variables/

Note that this was added to package.json for relative paths:

```
"homepage": ".",
```
