#!/usr/bin/env bash

suffix="backend-auth0-spa"
rg_name="rg-${suffix}"
func_name="func-${suffix}"

# Set environment variables
az functionapp config appsettings set \
    --name $func_name \
    --resource-group $rg_name \
    --settings \
    AUTH0_DOMAIN=$AUTH0_DOMAIN \
    BACKEND_IDENTIFIER=$BACKEND_IDENTIFIER

# Set CORS for stateless frontend
az functionapp cors add \
    --name $func_name \
    --resource-group $rg_name \
    --allowed-origins $STATELESS_FRONTEND_ORIGIN

# Deploy
func azure functionapp publish $func_name
