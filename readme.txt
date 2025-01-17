Ecommerce application rest api 

Customers api
GET localhost:8000/api/customers
POST localhost:8000/api/customers/create
PUT localhost:8000/api/customers/create/1
DELETE localhost:8000/api/customers/1

Product api 

GET localhost:8000/api/products
POST localhost:8000/api/products/create
PUT localhost:8000/api/products/create/1
DELETE localhost:8000/api/products/1


Orders api 

GET localhost:8000/api/orders
POST localhost:8000/api/orders/create
PUT localhost:8000/api/orders/678a120001246442d3ebeee4
DELETE localhost:8000/api/orders/678a120001246442d3ebeee4

PUT localhost:8000/api/orders/678a120001246442d3ebeee4/products/add/678a03fa7da6c58f585318bb
PUT localhost:8000/api/orders/678a120001246442d3ebeee4/products/remove/678a03fa7da6c58f585318bb