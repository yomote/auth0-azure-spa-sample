#!/usr/bin/env bash

suffix="frontend-stateful-auth0-spa"
rg_name="rg-${suffix}"
redis_name="redis-${suffix}"
app_name="app-${suffix}"
asp_name="asp-${suffix}"

# Create resource group
az group create \
    --name $rg_name \
    --location japaneast

# Create redis cache
az redis create \
    --name $redis_name \
    --resource-group $rg_name \
    --location japaneast \
    --sku Basic \
    --vm-size c0

# Get redis host and password
redis_host=$(az redis show \
    --name $redis_name \
    --resource-group $rg_name \
    --query hostName \
    --output tsv)

redis_password=$(az redis list-keys \
    --name $redis_name \
    --resource-group $rg_name \
    --query primaryKey \
    --output tsv)

# Create and deploy app service
# Note: app service plan are not created, they will be created automatically.
az webapp up \
    -n $app_name \
    -g $rg_name \
    -p $asp_name \
    --sku F1 \
    --location japaneast

# Set environment variables
az webapp config appsettings set \
    --name $app_name \
    --resource-group $rg_name \
    --settings \
    BASE_URL=$BASE_URL \
    ISSUER_BASE_URL=$ISSUER_BASE_URL \
    CLIENT_ID=$CLIENT_ID \
    CLIENT_SECRET=$CLIENT_SECRET \
    SECRET=$SECRET \
    AUDIENCE=$BACKEND_IDENTIFIER \
    REDIS_HOST=$redis_host \
    REDIS_PASSWORD=$redis_password
