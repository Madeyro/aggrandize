# NoSQL Database

## Application document

```json
{
  "_id": "69ed65d157cf0e9787439b708e010944",
  "_rev": "3-783824eec11f4516afc0578103f5565e",
  "type": "app",
  "name": "Pivotal Application",
  "admin": {
    "name": "Administrator",
    "mail": "admin@pivotal.com"
  },
  "users": {
    "john@domain.com": "5",
    "betty@domain.com": "7",
    "paul@anotherdomain.com": "0",
    "mark@domain.com": "4",
    "laura@anotherdomain.com": "1"
  }
}
```

## Invitation document

```json
{
  "_id": "69ed65d157cf0e9787439b708e011717",
  "_rev": "2-d3128d303e107ef07ffa762c60923f39",
  "type": "inv",
  "appID": "69ed65d157cf0e9787439b708e010944",
  "from": "john@domain.com",
  "to": "laura@anotherdomain.com",
  "sent": "2017-12-12",
  "accepted": {
    "date": "2017-12-18",
    "location": "Czechia"
  }
}
```