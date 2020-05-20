# Project Design Notes and Decisions
## API Calls
Whenever the front end makes an AJAX request to an endpoint which has @auth_required on the 
route (ie a route requiring validation), the JSON token assigned at login needs to be included in the
header of the AJAX call

E.g.
```
fetch('/api/secure', {
    'headers': {
        'Authorization': 'Bearer {JWT}'
    }
})
```

## Faulty API Call Response Structure
If the front end makes an invalid call to an endpoint, this will be the response structure

```
{
    code: ''
    message: ''
    errors: [list of errors]
}
```