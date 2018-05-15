{
  "_id": "_design/views",
  "views": {
    "revisions": {
      "map": "function (doc) {\n  if(doc.type === \"app\") {\n    emit(doc._id, doc._rev)\n  }\n}\n\n"
    },
    "all_users": {
      "map": "function (doc) {\n  if(doc.type === \"user\") {\n    for (app in doc.apps) {\n      emit(doc.apps[app].id, {id: doc._id, used: doc.apps[app].used_inv, free: doc.apps[app].free_inv})\n    }\n  }\n}"
    },
    "waitlist_docs": {
      "map": "function (doc) {\n  if (doc.type === \"waitlist\") {\n    emit(doc.app, doc);\n  }\n}"
    },
    "waitlist_users": {
      "map": "function (doc) {\n  if (doc.type === \"waitlist\") {\n    emit(doc.app, {rev: doc._rev, users: doc.users});\n  }\n}"
    },
    "admins": {
      "map": "function (doc) {\n  if (doc.type === \"app\") {\n    emit(doc.admin, doc._id);\n  }\n}"
    },
    "apps_per_user": {
      "map": "function (doc) {\n  var list = []\n  if (doc.type === \"user\") {\n    for (var i in doc.apps) {\n      list.push(doc.apps[i].id)\n    }\n    emit(doc._id, list)\n  }\n}"
    },
    "user_count": {
      "map": "function (doc) {\n  if(doc.type === \"user\") {\n    for (app in doc.apps) {\n      emit(doc.apps[app].id, 1)\n    }\n  }\n}",
      "reduce": "_count"
    },
    "sent_invs": {
      "map": "function (doc) {\n  if (doc.type === 'inv') {\n    emit(doc.app, 1);\n  }\n}",
      "reduce": "_count"
    },
    "free_invs": {
      "map": "function (doc) {\n  if(doc.type === \"user\") {\n    for (app in doc.apps) {\n      emit(doc.apps[app].id, doc.apps[app].free_inv)\n    }\n  }\n}",
      "reduce": "_sum"
    },
    "waitlist_occupied": {
      "map": "function (doc) {\n  if (doc.type === 'waitlist' && !doc.appDeleted) {\n    emit(doc.app, doc.users.length)\n  }\n}"
    },
    "users_invs": {
      "map": "function (doc) {\n  if(doc.type === 'inv') {\n    emit(doc.from, { \"recipient\": doc.to, \"app\": doc.app })\n  }\n}"
    }
  },
  "language": "javascript"
}
