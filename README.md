# dataverse-people

dataverse-people is a webapp with an Single Page Application (SPA) architecture that powers https://people.dataverse.org and consists of the following:

- a [backend][backend] providing an API
- a [frontend][frontend] providing a UI (multiple, actually)

## Development

See [backend][] and [frontend][] for how to build and run the code.

## Production

See [backend][] and [frontend][] for how to build and run the code.

The following configuration is used in Apache to proxy the backend to the frontend:

```
ProxyPass /api/ http://localhost:8080/dataverse-people/api/
```

The frontend is simply a static site. Note that configuration (especially for the API URL) at build time can be required.

## API paths

```
/api/v1/people/list
```

[backend]: backend
[frontend]: frontend
