#!/usr/bin/env bash

suffix="backend-auth0-spa"
rg_name="rg-${suffix}"
str_name="str$(echo ${suffix} | sed -e 's/-//g')"
func_name="func-${suffix}"

# Create resource group
az group create \
    --name $rg_name \
    --location japaneast

# Create storage account
az storage account create \
    --name $str_name \
    --resource-group $rg_name \
    --location japaneast \
    --sku Standard_LRS

# Create function app
az functionapp create \
    --name $func_name \
    --storage-account $str_name \
    --resource-group $rg_name \
    --consumption-plan-location japaneast \
    --runtime python \
    --runtime-version 3.9 \
    --functions-version 4 \
    --os-type linux
