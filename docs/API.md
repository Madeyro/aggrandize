# API

The API is prefixed with : `/api/{version}`

## API v0

### Users

**Get user**  
`GET /api/0/users/{USER}`

**Register user**  
`POST /api/0/users/{USER}`  
Specify attributes in body  
```
mail: Email,
password: Password
```

**Send invitation**  
`PUT /api/0/users/{USER}/{APP}/sendinv/{INVITED}`

**List apps to which user is admin**  
`GET /api/0/users/{USER}/adminto`

**List all apps user can access**  
`GET /api/0/users/{USER}/apps`

**List all waiting lists user is applied to**  
`GET /api/0/users/{USER}/waitlists`

**List all invitations which user sent**  
`GET /api/0/users/{USER}/sentinvs`


### Apps

**Get app**  
`GET /api/0/apps/{APP}`

**Add new app (start new program)**  
`PUT /api/0/apps/`  
Specify attributes in body  
```
id: Name,
admin: Mail,
listsize: Size of waiting list
```

**Delete app (cancel program)**  
`DELETE /api/0/apps/{APP}`

**Update app**  
`POST /api/0/apps/{APP}`  
Specify attributes in body  
```
id: Name,
admin: Mail,
listsize: Size of waiting list
```

**Add user to app (grant access)**  
`PUT /api/0/apps/{APP}/users/{USER}`  
Specify number of invitations in body  
`invs: #`

**Delete user from app (remove access)**  
`DELETE /api/0/apps/{APP}/users/{USER}`

**Get all users in app**  
`GET /api/0/apps/{APP}/users`

**Get number of users in app**  
`GET /api/0/apps/{APP}/users/count`

**Get all sent invitations to app**  
`GET /api/0/apps/{APP}/ivs/sent`

**Get all available invitations froma ll users under app**  
`GET /api/0/apps/{APP}/invs/available`

**Get users in waiting list**  
`GET /api/0/apps/{APP}/waitlist`

**Get used slots in waiting lists**  
`GET /api/0/apps/{APP}/waitlist/occupied`

**Resize waiting list**  
`PUT /api/0/apps/{APP}/waitlist/newsize/{SIZE}`

**Change number of invitations for user**  
`PUT /api/0/apps/{APP}/users/{USER}/newinvs/{SIZE}`

**Accept all from waiting list**  
(Clear waiting list so other users can apply to it)  
`PUT /api/0/apps/{APP}/waitlist/acceptall`

**Apply for waiting list (as user)**  
`PUT /api/0/apps/{APP}/waitlist/{MAIL}`

**Cancel subscription to waiting list (as user)**  
`DELETE /api/0/apps/{APP}/waitlist/{MAIL}`



### Invs

**Accept invitation**  
`PUT /api/0/inv/{ID}`  
It will be auto-generated link

**Decline invitation**  
`DELETE /inv/{ID}`  
It will be auto-generated link
