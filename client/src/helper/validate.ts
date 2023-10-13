const validateInput = (e: any, key: string, username: string, mail: string) =>{
    const value = e.target.value
    if (key === "username" && value === username) return false;
    if (key === "mail" && value === mail) return false;
    if (key === "username" && value.length < 3) return false;
    if (key === "mail" && !value.includes("@")) return false;
}

export {
    validateInput
}