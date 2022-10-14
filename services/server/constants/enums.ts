enum Status {
    ServerError= 500,
    Success = 200,
    NewData = 201,
    Cached = 301,
    BadRequest = 400,
    Unauthorized = 401,
    InvalidSession = 403,
    NotFound = 404,
}

module.exports = {
    Status
}