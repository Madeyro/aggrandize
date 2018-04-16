# API

The API is prefixed with : `/api/{version}`

## API v0

### Users

#### Get user
`GET /users/{USER}`

#### Send invitation
`PUT /users/{USER}/{APP}/sendinv/{INVITED}`

### Apps

#### Get app
`GET /apps/{APP}`

#### Add app (start new program)
`PUT /apps/`  
Specify attributes in body  
`id: Name,  
admin: Mail  
listsize: Size of waiting list`

#### Delete app (cancel program)
`DELETE /apps/{APP}`

#### Add user to app (grant access)
`PUT /apps/{APP}/users/{USER}`  
Specify number of invitations in body  
`invs: #`

#### Delete user (remove access)
`DELETE /apps/{APP}/users/{USER}`

#### Get all users in app
`GET /apps/{APP}/users`

#### Get users in waiting list
`GET /apps/{APP}/waitlist`

#### Resize waiting list
`PUT /apps/{APP}/waitlist/newsize/{SIZE}`

#### Change number of invitations for user
`PUT /apps/{APP}/users/{USER}/newinvs/{SIZE}`

#### Accept all from waiting list
(Clear waiting list so other users can apply to it)  
`PUT /apps/{APP}/waitlist/acceptall`

#### Apply for waiting list (as user)
`PUT /apps/{APP}/waitlist/{MAIL}`

#### Accept invitation
`PUT /inv/{ID}`  
It will be auto-generated link

#### Decline invitation
`DELETE /inv/{ID}`  
It will be auto-generated link

