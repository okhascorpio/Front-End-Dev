In this short demo I use chatgpt to create moc dataset for an ecommerce site, 
and use json server to provide quick fake restful APIs which I can use to develop Frontend, 
without waiting for the backend team to provide the APIs

Here is how to setup:
Prompt chatgpt to make a json of 10 moc items with 7 fields including unique id field.
Copy json data into db.json and make it into an object by wrapping the array in {} and adding "products" key.
and array from chatgpt as the value.
Initiate package.json npm init --yes
Install json-server as dev dependency npm i json-server -D
Add script to run db.json "serve-json": "json-server --watch db.json --port 4000"
Run npm run serve-json
Use thunderclient extention to make new GET request , change localhoast to [::1]
Supports pagination http://[::1]:4000/products?_page=1&_limit=5
as well as sorting http://[::1]:4000/products?_sort=price&_order=desc
Add items by making post request to http://[::1]:4000/products with a json item with unique id in Body, 