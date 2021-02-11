exports.UnauthorizedError = class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
};

const prepareUserResponse = (userResponse) => ({
    user: {
        email: userResponse.email,
        subscription: userResponse.subscription,
    }
});

module.exports = prepareUserResponse;