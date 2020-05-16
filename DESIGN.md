# Project Design Notes and Decisions
## API Calls
Whenever the front end makes an AJAX request to an endpoint which has @auth_required on the 
route (ie a route requiring validation), the JSON token assigned at login needs to be included in the
header of the AJAX call

E.g.
```
fetch('/api/secure', {
    'headers': {
    // JWT requires the Authorization schema to be `Bearer`
    instead of `Basic`
        'Authorization': 'Bearer {JWT}'
    }
})
```