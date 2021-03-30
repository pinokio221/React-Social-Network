export const required = value => {
    if(!value) return 'This field cannot be empty'
    else {
        if(value.trim().length !==0) return undefined;
        return 'This field cannot be empty'
    }
}

export const maxLength = value => {
    if(value.length > 5000) {
        return "Max length of post is 1000 symbols!"
    }
    return undefined;
}
