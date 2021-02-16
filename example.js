const graphrc = new (require('./index.js')).base();

for(let l of graphrc.render([4,5,12,4,2,4,9,16,6,4,14,5,11,8,5,12,4,2,4,9,16,6,4,14,5,11,8,5,12,4,2,4,9,16,6,4,14,5,11,8,1]))
    console.log(l);
