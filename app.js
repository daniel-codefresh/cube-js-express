const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const CubejsServerCore = require('@cubejs-backend/server-core');
const { Driver } = require('./db');
const entityConstants = require('./entities');
const axios = require('axios');
const querystring = require('querystring');
const url = require('url');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// REDIS_URL=;CUBEJS_DB_BQ_PROJECT_ID=codefresh-dev-170600;CUBEJS_DB_TYPE=bigquery;CUBEJS_API_SECRET=0d656923e9bf6738e9ea239a9d8ca1f4ea294ca6d2131b234471c29c5c209059a8a6a6a62f25e692742de81e5ea6c55e0a3b8a986bae9a289edc21a9feb0b04c;CUBEJS_DB_BQ_KEY_FILE=express-analytics-dashboard/aim.json;NODE_ENV=production
const cubejsBasePath = '/test';

CubejsServerCore.create({
  basePath: cubejsBasePath,
  driverFactory: ({ dataSource }) => new Driver({ database: dataSource }),
  checkAuth: req => {
    req.authInfo = {u: {id: "5672d8deb6724b6e359adf62"}}
  }
}).initApp(app);


app.use('/workflow/analytics', async (req, res, next) => {
  const query = req
  const encodedQuery = querystring.stringify(query);
  const cubeResponse = await axios.get(`${cubejsBasePath}/v1/load?${encodedQuery}`);
});

// query = {
//   name: 'sumBuildMinutesByPack',
//   timeDimensions: {
//     dateRange: 'last quarter',
//       granularity: 'day'
//   },
// }

/**************************************************************************************/
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
