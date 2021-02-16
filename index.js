/*
 *  @Soldy\consolegraphrc\2021.02.07\GPL3
 */
'use strict';

/*
 * @prototype
 */
const graphrcBase=function(){
    this.render = function (data, number){
        return render(data, number);
    }
    let bar = [
        " ",
        "\u2581",
        "\u2582",
        "\u2583",
        "\u2584",
        "\u2585",
        "\u2586",
        "\u2587",
        "\u2588",
     ];
     const start  = function(length, number){
        if (
            (typeof number !== 'number')||
            (60 > length)||
            (0 > number)
        )
            return  0;
        if (60 > (length - number))
            return (length - 60);
        return number;
     }
     const end = function(length, first){
        if (60 > length - first) 
            return length;
        return first+60;
     }
     const minCalc = function(data){
        let min = data[0];
        for (let i of data)
            if (min > parseFloat(i))
                min = Math.floor(i);
        return min;
     }
     const maxCalc = function(data){
        let max = data[0];
        for (let i of data)
            if (parseFloat(i) > max)
                max = Math.ceil(i);
        return max;
     }
     const diffCalc = function(max, min){
         return max-min;
     }
     const divCalc = function(diff){
         return diff / 100;
     }
     const poolCalc = function(data, div, min){
         let pool = [];
         for (let i of data)
              pool.push(
                  parseInt(
                      (i - min) / div
                  )
              );
         return pool;
     }
     const firstLine = function(){
         return (' \u25B2').padEnd(60, ' ');
     }
     const line = function(data, line_num){
        const modify = ((14-line_num)*8);
        let out = " \u2502";
        for (let i of data ) {
             let minus = parseInt(i - modify);
             if (1 > minus)
                 minus = 0;
             if (minus > 7)
                 minus = 8;
             out+= bar[minus];
        }
        return out.padEnd(62, ' ');

     }
     const lastLine = function(){
         return (
             (' \u2514').padEnd(60, '\u2500')+
             '\u25B6 '
         );
     }
 
     const render = function (data, number){
        let graph =[];
        const length = data.length-1;
        const first = start(length, number);
        const last = end(length, first);
        data = data.slice(first, last);
        const min = minCalc(data);
        const max = maxCalc(data);
        const diff = diffCalc(max, min);
        const div = divCalc(diff);
        const pool = poolCalc(data, div, min);
        graph.push(
            firstLine()
        );
        for (let i = 0; 14> i ; i++)
            graph.push(
                 line(pool, i)
            );
        graph.push(
            lastLine()
        );
        return graph;
     }
}

exports.base = graphrcBase;
