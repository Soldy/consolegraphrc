/*
 *  @Soldy\consolegraphrc\2021.02.07\GPL3
 */
'use strict';

/*
 * @prototype
 */
const graphrcBase=function(){
    /*
     * @param {array}
     * @param {integer}
     * @public
     * @return {string}
     */
    this.render = function (data, number){
        return _render(data, number);
    };
    /*
     * @var {array}
     */
    let _bar = [
        ' ',
        '\u2581',
        '\u2582',
        '\u2583',
        '\u2584',
        '\u2585',
        '\u2586',
        '\u2587',
        '\u2588',
    ];
    /*
     * @param {integer}
     * @param {integer}
     * @private
     * @return {integer}
     */
    const _start  = function(length, number){
        if (
            (typeof number !== 'number')||
            (60 > length)||
            (0 > number)
        )
            return  0;
        if (60 > (length - number))
            return (length - 60);
        return number;
    };
    /*
     * @param {integer}
     * @param {integer}
     * @private
     * @return {integer}
     */
    const _end = function(length, first){
        if (60 > length - first) 
            return length;
        return first+60;
    };
    /*
     * @param {array}
     * @private
     * @return {integer}
     */
    const _minCalc = function(data){
        let min = data[0];
        for (let i of data)
            if (min > parseFloat(i))
                min = Math.floor(i);
        return min;
    };
    /*
     * @param {array}
     * @private
     * @return {integer}
     */
    const _maxCalc = function(data){
        let max = data[0];
        for (let i of data)
            if (parseFloat(i) > max)
                max = Math.ceil(i);
        return max;
    };
    /*
     * @param {integer}
     * @param {integer}
     * @private
     * @return {integer}
     */
    const _diffCalc = function(max, min){
        return max-min;
    };
    /*
     * @param {integer}
     * @private
     * @return {float}
     */
    const _divCalc = function(diff){
        return diff / 100;
    };
    /*
     * @param {array}
     * @param {float}
     * @param {integer}
     * @private
     * @return {array}
     */
    const _poolCalc = function(data, div, min){
        let pool = [];
        for (let i of data)
            pool.push(
                parseInt(
                    (i - min) / div
                )
            );
        return pool;
    };
    /*
     * @private
     * @return {string}
     */
    const _firstLine = function(){
        return (' \u25B2').padEnd(60, ' ');
    };
    /*
     * @param {array}
     * @param {integer}
     * @private
     * @return {string}
     */
    const _line = function(data, line_num){
        const modify = ((14-line_num)*8);
        let out = ' \u2502';
        for (let i of data ) {
            let minus = parseInt(i - modify);
            if (1 > minus)
                minus = 0;
            if (minus > 7)
                minus = 8;
            out+= _bar[minus];
        }
        return out.padEnd(62, ' ');

    };
    /*
     * @private
     * @return {string}
     */
    const _lastLine = function(){
        return (
            (' \u2514').padEnd(60, '\u2500')+
             '\u25B6 '
        );
    };
    /*
     * @param {array}
     * @param {integer}
     * @private
     * @return {string}
     */
    const _render = function (data, number){
        let graph =[];
        const length = data.length-1;
        const first  = _start(length, number);
        const last   = _end(length, first);
        data = data.slice(first, last);
        const min  = _minCalc(data);
        const max  = _maxCalc(data);
        const diff = _diffCalc(max, min);
        const div  = _divCalc(diff);
        const pool = _poolCalc(data, div, min);
        graph.push(
            _firstLine()
        );
        for (let i = 0; 14> i ; i++)
            graph.push(
                _line(pool, i)
            );
        graph.push(
            _lastLine()
        );
        return graph;
    };
};

exports.base = graphrcBase;
