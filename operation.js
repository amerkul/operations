const sum = (a, b) => {
    a = [...a].reverse()
    b = [...b].reverse()
    for(let i = 0; i < a.length; ++i) {
        if ((~~a[i] + ~~b[i]) > 9) {
            b[i] = ~~a[i] + ~~b[i] - 10
            a[i + 1] = 1 + ~~a[i + 1]
        } else {
            b[i] = ~~a[i] + ~~b[i]
        }
    }
    return b.reverse().join("");
}

const minus = (a, b) => {
    a = [...a].reverse()
    b = [...b].reverse()
    let differ = 0
    let result = []
    for(let i = 0; i < a.length; ++i) {
        if ((~~a[i] - ~~b[i] - differ) < 0) {
            result[i] = ~~a[i] - ~~b[i] - differ + 10
            differ = 1
        } else {
            result[i] = ~~a[i] - ~~b[i] - differ
            differ = 0
        }
    }
    let temp = 0
    result = result.reverse()
    for (let i = 0; i < result.length; i++) {
        if (result[i] === 0) {
            ++temp
        } else {
            break
        }
    }
    if (temp !== -1) {
        result.splice(0, temp)
    }
    return result.join("") === "" ? "0" : result.join("")
}

const multiply = (a, b) => {
    let firstArray = []
    let secondArray = []
    if (a.length <= b.length) {
        firstArray = [...a].reverse()
        secondArray = [...b].reverse()
    } else {
        firstArray = [...b].reverse()
        secondArray = [...a].reverse()
    }
    const result = []
    for (let i = 0; i < firstArray.length; i++) {
        for (let j = 0; j < secondArray.length; j++) {
            if (~~firstArray[i] * ~~secondArray[j] > 9) {
                let splitArray = [...(~~firstArray[i] * ~~secondArray[j]).toString()]
                result[j + i] = ~~splitArray[1] + ~~result[j + i]
                result[j + 1 + i] = ~~splitArray[0] + ~~result[j + i + 1]
            } else {
                result[j + i] = ~~firstArray[i] * ~~secondArray[j] + ~~result[j + i]
            }
        }
    }
    for (let i = 0; i < result.length; i++) {
        if (result[i].toString().length > 1) {
            let splitArray = [...result[i].toString()].reverse()
            result[i] = ~~splitArray[0]
            for (let j = 1; j < splitArray.length; j++) {
                result[j + i] = ~~result[j + i] + ~~splitArray[j]
            }
        } 
    }
    return result.reverse().join("")
}

const divide = (a, b) => {
    if(a === "0") {
        return "0"
    }
    if(a === b) {
        return "1"
    }
    if(b === "1") {
        return a
    }
    a = [...a]
    b = [...b]
    let temp = []
    let result = ""
    for (let i = 0; i < a.length; i++) {
        temp[i] = a[i]
        if (temp[0] === "0") {
            result = result + "0"
            a.splice(0, temp.length);
            i = -1
            temp = []
        } else if (compare(temp, b) === 0) {
            result = result + "1"
            temp = []
        } else if (compare(temp, b) === 1) {
            for(let j = 2; j < 11; j++) {
                if(compare([...multiply(b.join(""), j.toString())], temp) === 1) {
                    result = result + (j - 1)
                    let rest = minus(temp.join(""), multiply(b.join(""), (j - 1).toString()))
                    if (rest === '0') {
                        a.splice(0, temp.length);
                    } else {
                        a.splice(0, temp.length, ...rest);
                    }
                    i = -1
                    temp = []
                    break
                }
            }
        }
    }
    return result
}

const compare = (firstNumberArray, secondNumberArray) => {
    if (firstNumberArray.toString() === secondNumberArray.toString()) {
        return 0
    }
    if (firstNumberArray.length > secondNumberArray.length) {
        return 1
    } else if (firstNumberArray.length < secondNumberArray.length) {
        return -1
    }
    for(let i = 0; i < firstNumberArray.length; i++) {
        if (firstNumberArray[i] > secondNumberArray[i]) {
            return 1
        } else if (firstNumberArray[i] < secondNumberArray[i]) {
            return -1
        }
    }
}

console.log(sum("999999999999999999999999999999999", "999999999999999999999999999999999"))
console.log(minus("99", "99"))
console.log(multiply("654834834897438348834838349832892", "74747"))
console.log(divide("48946939404078824260357662134959178324", "654834834897438348834838349832892"))
