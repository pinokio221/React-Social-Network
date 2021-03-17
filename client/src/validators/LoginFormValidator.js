export const required = value => {
    if(!value) return 'Required'
    else {
        if(value.trim().length !==0) return undefined;
        return 'Required'
    
    }
}

export const maxLength = value => {
    if(value.length > 1000) {
        return "Max length of post is 1000 symbols!"
    }
    return undefined;
}
