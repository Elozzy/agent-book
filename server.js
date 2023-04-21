// if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
    // }
    
    const express = require('express');
    const path = require('path');
    const cors = require('cors');
    
    
    const allRoutes = require('./routes');
    const swaggerUi = require('swagger-ui-express');
    const swaggerDocument = require('./agentbookdoc.json');
    const ErrorHandler = require('./utils/ErrorHandler');
    const errorMiddleware = require('./middleware/errors');
    const app = express();
    const server = require("http").Server(app);
    
    app.use(cors());
    
    const PORT = process.env.PORT || 4600;
    
    
    
    //body paswer
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use('/static', express.static(path.join(__dirname, 'public')));
    
    // api documentation
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    
    // Route
    
    app.use('/v1', allRoutes);
    
    //entry point
    app.get('/', (req, res) =>
        res.status(200).json({
            message: 'Welcome to agent book api',
        })
    );
    
    // catch 404 and forward to error handler
    // Handle unhandled routes
    app.all('*', (req, res, next) => {
        next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
    });
    
    // error handler
    app.use(errorMiddleware);
    
    server.listen(PORT, () => console.log(`listening on port: ${PORT}`));
    module.exports = server;
    