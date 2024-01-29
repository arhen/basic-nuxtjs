export const isEmail = (value: string) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);

export const isContainSpecialChar = (value: string) => /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);

export const isContainNumber = (value: string) => /[0-9]/.test(value);

export const isContainAlpha = (value: string) => /[a-zA-Z]/g.test(value);

export const isContainAlphaLower = (value: string) => /[a-z]/g.test(value);

export const isContainAlphaUpper = (value: string) => /[A-Z]/g.test(value);

export const isPhoneNumber = (value: string) => {
    let tempValue = '0' + value?.substring(0, 20);
    const regex = /^08([1-3]|[5-9])[0-9]*$/;
    return regex.test(tempValue) && tempValue.length > 9;
}