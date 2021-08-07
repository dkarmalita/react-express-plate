Coinfirm platform provides AML/CTF solution for compliance analysis of blockchain-based transactions and related addresses. This is the documentation of platform’s API extension.

## Authentication

This API uses token authentication (Bearer in HTTP Header). First you retrieve a new Bearer token using login/password authentication. After that you can use it to access other resources.


**Bearer token example**


`sYFuat5lz1y5v0LrCt7LfqJpo1AkdLgm7LbY6eRibN4NYw9Srf6aMIRJM8KbTwM6`


The URL examples throughout this documentation use `token` as a placeholder. For these examples to work, you need to substitute the value with your own access token.


## Media Type

Where applicable this API uses the JSON media-type. Requests with a message-body are using plain JSON to set or update resource states.


The API accepts JSON in request bodies and requires that the `Content-type: application/json` header be specified for all such requests. The API will always respond with a JSON object, unless stated otherwise. Depending on context, resources may be returned as single objects or as arrays of objects, nested within the response object.


`Content-type: application/json` and `Accept: application/json` headers **should** be set on all requests if not stated otherwise.


## Status codes

This API uses HTTP status codes to communicate with the API consumer.

+ `200 OK` - Response to a successful GET, PUT, PATCH or DELETE.

+ `201 Created` - Response to a POST that results in a creation.

+ `202 Accepted` - The request has been accepted for processing, but the processing has not been completed.

+ `204 No Content` - Response to a successful request that won't be returning a body (like a DELETE request).

+ `302 Found` - Tells the client to look at (browse to) another url.

+ `304 Not Modified` - Response has not been modified since the previous transmission.

+ `400 Bad Request` - Malformed request; request body validation errors.

+ `401 Unauthorized` - When no or invalid authentication details are provided.

+ `402 Payment required` - When payment check has failed

+ `403 Forbidden` - When authentication succeeded but authenticated user doesn't have access to the resource.

+ `404 Not Found` - When a non-existent resource is requested.

+ `405 Method Not Allowed` - Method not allowed.

+ `409 Conflict` - When the request could not be completed due to a conflict with the current state of the resource.

+ `422 Unprocessable Entity` - The request was well-formed but was unable to be followed due to semantic errors.

+ `500 Server Error` - Something went wrong on the API end.

+ `501 Not Implemented` - The server either does not recognize the request method, or it lacks the ability to fulfill the request.    


## Roles

Each API endpoint has described minimal role to access. Only users with specific roles can access those endpoints. For insufficient role `403 Forbidden` HTTP response will be returned.


User roles:

  + `1 (unconfirmed)` - registered user with not confirmed e-mail address
  + `2 (confirmed)` - registered user with confirmed e-mail address
  + `9 (network member)` - user who can have access to Network Member Panel
  + `11 (moderator)`
  + `12 (visualizer)` - user who can have access to Visualizer Tool


## Encoding

Every string passed to and from the API needs to be UTF-8 encoded. For maximum compatibility, normalize to Unicode Normalization Form C (NFC) before UTF-8 encoding.


## Representation of dates and times

All exchange of date and time-related data MUST be done according to ISO 8601 standard and stored in UTC.

All dates in the API are strings in the following format: `YYYY-MM-DDThh:mm:ss.SSSZ`. 


## Pagintation

This API uses the [Link header - RFC 5988](http://tools.ietf.org/html/rfc5988#page-6) to include pagination details.

An example of a Link header used properly is described in [GitHub documentation](https://developer.github.com/guides/traversing-with-pagination/).

This API returns total count of resources in `Collection-Total-Count` HTTP header.
