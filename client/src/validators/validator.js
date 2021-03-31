export const required = value => {
    if(!value) return 'This field cannot be empty'
    else {
        if(value.trim().length !==0) return undefined;
        return 'This field cannot be empty'
    }
}

export const maxLengthCreator = (maxLength) => (value) => {
    if(value.length > maxLength) {
        return `Max length of post is ${maxLength} symbols!`
    }
    return undefined;
}
