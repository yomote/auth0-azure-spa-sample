#!/usr/bin/env bash

suffix="frontend-stateless-auth0-spa"
rg_name="rg-${suffix}"
stapp_name="stapp-${suffix}"

# Build
swa build --auto

# Deploy static web app
swa deploy ./dist \
    -T $TENANT_ID \
    -R $rg_name \
    -n $stapp_name \
    --env production \
    -nu
