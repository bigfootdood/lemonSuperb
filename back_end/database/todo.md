# Database TO Do:

* Implement functions to store the data found in the database proposal:

* Remember all this stuff is subject to change (we just made this up)

**Be sure to keep all of your code local to this folder (for now)**

## Users
```
{
    "_id":"7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "sessionId":"b3988882-627f-4c59-8d5d-54b7a43b030e",
    "userName": "derk123",
    "hashedPassword":"$2a$08$XdvNkfdNIL8Fq7l8xsuIUeSbNOFgK0M0iV5HOskfVn7.PWncShU.O",
    "petIds":"7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "newUser": "0"
}
```

## Pet (subdocument of Habitat)
```
{
    "name":"Franky",
    "_id":"c5d0fd67-7977-4fc5-9088-33d0347c932b",
    "species": "3",
    "color": "#8B4513",
    "age": "4",
    "hunger": "5",
    "thirst": "3",
    "sick": "0"
}
```

## Habitat Collection
```
{
    "name":"Beach",
    "background": "3",
    "_id": "c5d0fd67-7977-4fc5-9088-33d0347c932b",
    "pets_in_habitat": [{
        "name":"Franky",
        "_id":"c5d0fd67-7977-4fc5-9088-33d0347c932b",
        "species": "3",
        "color": "#8B4513",
        "age": "4",
        "hunger": "5",
        "thirst": "3",
        "sick": "0"
    }]
}
```
**Be sure to keep all of your code local to this folder (for now)**
