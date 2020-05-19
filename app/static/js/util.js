const requestStatus = function(res) {
    return !res.errors && !res.code ? true : false
}