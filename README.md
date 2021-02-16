# consoolegraphrc 

The poolrc is a data pooling tool for science projects

## install

```bash

npm i consolegraphrc

```


## init

```javascript

const graphrc = new (require('consolegraphrc')).base()

```


## graph rendering


```javascript

let graph = graphrc.render(
    [4,5,12,4,2,4,9,16,6,4,14,5,11,8,5,12]
);
// return with an array

```

## graph with console.log

```javascript
for (let line of graph){
    console.log(line);
}
```


