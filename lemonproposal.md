# Best Virtual Pet by Lemon Superb
## name pending

* Chris Lyons
* Raul Camilo
* Zach Saegesser
* Derek Pulaski
* Ryan Edelstein

## Description
We want to make the best virtual pet site there is. Nothing is more relaxing than getting home, and logging into see how your little virtual buddy is doing.

## Users

The user collection will store the user login info, session info, and virtual pet names.

```
{
    "_id":"7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "sessionId":"b3988882-627f-4c59-8d5d-54b7a43b030e",
    "hashedPassword":"$2a$08$XdvNkfdNIL8Fq7l8xsuIUeSbNOFgK0M0iV5HOskfVn7.PWncShU.O",
    "petIds":["7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310","7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310"]
}
```

| Name | Type | Description |
|------|------|-------------|
| _id  | string | A globally unique identifier to represent the user |
| sessionId | string | A globally unique identifier to represent the user's current session |
| hashedPassword | string | A bcrypted string that is a hashed version of the user's password |
|petIds|Array| Array of petIds corresponding to each pet

## Pet (subdocument of Habitat)
This subdocument is used to store pet information
```js
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



| Name | Type | Description |
|------|------|-------------|
| name | string | The user's name. |
| _id  | string | A globally unique identifier to represent the pet |
|species|int|An int representing which species from a predetermined list of species|
|color|string|Hex value representing color|
|age|int|value representing pet's name|
|hunger|int|value representing pet's hunger meter out of 10|
|thirst|int|value representing pet's thirst meter out of 10|
|sick|bool|0 for sick 1 for not sick, pet can be healed with medicine|

## Habitat (Collection)

The habitats
```js
{
    "name":"Rain-forest",
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
| Name | Type | Description |
|------|------|-------------|
| name | string | The habitat's name |
|background|int|one of five preexisting backgrounds|
|_id|string|unique identifier for each habitat|
|pets_in_habitat|array|all the pets in the habitat|
---
