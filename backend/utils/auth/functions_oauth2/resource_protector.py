import functools
import json

from authlib.oauth2 import OAuth2Error
from authlib.oauth2 import ResourceProtector as _ResourceProtector
from authlib.oauth2.rfc6749 import HttpRequest, MissingAuthorizationError
from azure import functions


class ResourceProtector(_ResourceProtector):
    """A protecting method for resource servers. Creating a ``require_oauth``
    decorator easily with ResourceProtector.

    This code is implemented with reference to 'authlib.integrations.flask_oauth2.ResourceProtector'.
    """

    def raise_error_response(self, error):
        """Raise HTTPException for OAuth2Error. Developers can re-implement
        this method to customize the error response.

        :param error: OAuth2Error
        :raise: HTTPException
        """
        status = error.status_code
        body = json.dumps(dict(error.get_body()))
        return functions.HttpResponse(body, status_code=status)

    def acquire_token(self, req: functions.HttpRequest, scopes=None):
        """A method to acquire current valid token with the given scope.

        :param scopes: a list of scope values
        :return: token object
        """
        request = HttpRequest(req.method, req.url, None, req.headers)
        request.req = req
        # backward compatible
        if isinstance(scopes, str):
            scopes = [scopes]
        token = self.validate_request(scopes, request)
        return token

    def __call__(self, scopes=None, optional=False):
        def wrapper(f):
            @functools.wraps(f)
            def decorated(req: functions.HttpRequest):
                try:
                    self.acquire_token(req, scopes)
                except MissingAuthorizationError as error:
                    if optional:
                        return f(req)
                    return self.raise_error_response(error)
                except OAuth2Error as error:
                    return self.raise_error_response(error)
                return f(req)

            return decorated

        return wrapper
