const errorHandler = (err, req, res, next) => {
    console.log("🚀 ~ errorHandler ~ err:", err)
    // // Default status code (500 - Internal Server Error) and error message
    // let statusCode = err.status || 500;
    // let message = err.message || 'Internal Server Error';

    // // If Mongoose validation error occurs, format the error response
    // if (err.name === 'ValidationError') {
    //     statusCode = 422; // Unprocessable Entity
    //     const errors = {};

    //     // Extract error messages from each validation error
    //     Object.keys(err.errors).forEach(key => {
    //         errors[key] = err.errors[key].message;
    //     });

       
    //     message = { errors };
    // }

    // // Log the error for debugging purposes
    // console.error(err.stack);

    // // Send the error response to the client
    // res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
