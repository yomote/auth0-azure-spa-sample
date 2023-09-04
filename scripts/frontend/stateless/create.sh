#!/usr/bin/env bash

suffix="frontend-stateless-auth0-spa"
rg_name="rg-${suffix}"
stapp_name="stapp-${suffix}"

# Create resource group
az group create \
    --name $rg_name \
    --location japaneast

# Create static web app
az staticwebapp create \
    -n $stapp_name \
    -g $rg_name
