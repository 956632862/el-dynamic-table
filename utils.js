


export function isEmpty(data){
    // 先判断空数组或者空对象
    getDataType(data) === 'Object' && (data = Object.keys(data))
    if (getDataType(data) === 'Array') return data.length === 0
    return !data
}

export function getDataType(data){
    return Object.prototype.toString.call(data).slice(8, -1)
}


export const debounce  = () => {
    let timer = null
    return function (fn, delay) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn()
        }, delay)
    }
}

