# Echo server

## Setup

Install with yarn:

```sh
yarn install
```

or via npm

```sh
npm install
```

## Run

Specify environment variables and run the application.  
Example:
```sh
PORT=3333 TOKEN=my-supersafe-token yarn start
```

## Usage

Access the server by hostname and the domain you specified in the environment variable.
The server will save any JSON data on the route you specify. After the data is saved
successfully the server will echo the data publicly via the same route you specified.

## Example

Saving the data

```sh
curl -X POST \
  http://localhost:3333/test \
  -H 'Authorization: my-supersafe-token' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3333' \
  -d '{
    "data": "Some json data i want to store on the /test route",
}'
```

Getting back saved data, with the request

```sh
curl -X GET \
  http://localhost:3333/test \
```

Will return previous saved value:
```JSON
{
    "data": "Some json data i want to store on the /test route",
}
```
