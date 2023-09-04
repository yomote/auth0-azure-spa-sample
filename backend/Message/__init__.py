import azure.functions as func
from utils.auth.functions_oauth2 import require_auth


@require_auth("read:message")
def main(req: func.HttpRequest) -> func.HttpResponse:
    message = "Get message API connection is successful"

    return func.HttpResponse(message, status_code=200)
