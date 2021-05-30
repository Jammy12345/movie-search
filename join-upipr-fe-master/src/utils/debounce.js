export const debounce = (callback, timeout = 1000) => {
    let timer;
    return (e) => {
        console.log(timer,e.target.value)
        timer && clearTimeout(timer)
        let val = e.target.value
        timer = setTimeout(() => {
            callback(val)
        }, timeout);
    }
}
