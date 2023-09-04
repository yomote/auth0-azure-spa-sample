# Scripts

- Azure resource creation and deployment scripts from local environment
- works in Linux environment
- need the following packages:
  - [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/)
  - [Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/)
  - [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=linux%2Cisolated-process%2Cnode-v4%2Cpython-v2%2Chttp-trigger%2Ccontainer-apps&pivots=programming-language-python)

## Stateless frontend

- First, move to the `auth0-azure-spa-sample/frontend/stateless` directory

### Create resources

1. Run script

    ```bash
    ../../scripts/frontend/stateless/create.sh
    ```

### Deploy

1. Set environmental variables:
    - VITE_AUTH0_DOMAIN
    - VITE_AUTH0_CLIENT_ID
    - VITE_AUTH0_AUDIENCE
    - TENANT_ID

2. Run Script

    ```bash
    ../../scripts/frontend/stateless/deploy.sh
    ```

## Stateful frontend

- First, move to the `auth0-azure-spa-sample/frontend/stateful` directory

### Create resources and deploy

1. Set environmental variables:
    - BASE_URL
    - ISSUER_BASE_URL
    - CLIENT_ID
    - CLIENT_SECRET
    - AUDIENCE
    - SECRET

2. Run Script

    ```bash
    ../../scripts/frontend/stateful/create-and-deploy.sh
    ```

## Backend

- First, move to the `auth0-azure-spa-sample/backend` directory

### Create Resources

1. Run Script

    ```bash
    ../scripts/backend/create.sh
    ```

### Deploy

1. Set environmental variables:
    - AUTH0_DOMAIN
    - BACKEND_IDENTIFIER
    - STATELESS_FRONTEND_ORIGIN

2. Run Script

    ```bash
    ../scripts/backend/deploy.sh
    ```
