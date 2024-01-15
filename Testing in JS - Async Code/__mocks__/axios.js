const get = (url) => {
    console.log("inside mocked get request")
    return Promise.resolve({data:{title:'delectus aut autem'}});
}
exports.get = get