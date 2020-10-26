const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const CubejsServerCore = require('@cubejs-backend/server-core');
const sourceEntity = require('./sourceEntities');
const indexRouter = require('./routes/index');
const _ = require('lodash');
// const { Transform, Readable } = require('stream');

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
const cubejsBasePath = '/cubejs-api';
// let count = 0;
CubejsServerCore.create({
  basePath: cubejsBasePath,
  driverFactory: ({ dataSource }) => new sourceEntity.Driver({ database: dataSource }),
  checkAuth: req => {
    // if (!req.authInfo) {
      req.authInfo = {u: {id: "5672d8deb6724b6e359adf62"}}
    // }
  },
  // queryTransformer: (query, { authInfo }) => {
  //   if (authInfo.id) {
  //     query.filters.push({
  //       member: `${authInfo.targetCubeName}.accountId`,
  //       operator: 'equals',
  //       values: [authInfo.id]
  //     })
  //   }
  //   console.log("/**************************************************************************************/\n")
  //   console.log('query:\n',query)
  //   console.log('id:', authInfo.id)
  //   console.log("/**************************************************************************************/\n")
  //
  //   return query;
  // }
}).initApp(app);

function redirect(app, path, req, res, transformer) {
  req.url = path;
  req.originalUrl = path;
  const originalJson = res.json.bind(res);
  res.json = (str) => {
    originalJson(transformer(str));
  };
  app(req, res);
}

// TODO: add authentication check
app.use('/workflow/analytics', async (req, res, next) => {
  try {
    // ++count;
    // const authenticatedEntityId = count % 2 === 0 ? "5ddc647abe859ab8b2a8edda" : "5672d8deb6724b6e359adf62";

    const {cubeName, ...query} = sourceEntity.mapQueryToCubeQuery(req.query, req.id);
    // req.authInfo = { targetCubeName: cubeName, id: authenticatedEntityId };
    req.query = query;

    const cubeEndpoint = `${cubejsBasePath}/v1/load`;
    redirect(app, cubeEndpoint, req, res, (cubePayload) => {
      if (!cubePayload.results) return cubePayload;

      const {data} = cubePayload.results[0];
      return data.map(record => transformRecord(record));
    });
  } catch (e) {
    next(e)
  }
});

function transformRecord(record) {
  const oldKeys = Object.keys(record);
  const newKeys = oldKeys.map(key => _.last(key.split('.')));
  const transformed = {};
  newKeys.forEach((key, index) => {
    transformed[key] = record[oldKeys[index]]
  })
  return transformed;
}

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


// const searchParams = new URLSearchParams(
//     Object.keys(cubejsQuery)
//         .map(k => ({ [k]: typeof cubejsQuery[k] === 'object' ? JSON.stringify(cubejsQuery[k]) : cubejsQuery[k] }))
//         .reduce((a, b) => ({ ...a, ...b }), {})
// );
// const url = `${cubejsBasePath}/v1/load?${searchParams}`;


// new Transform({
//   objectMode,
//   highWaterMark,
//   transform(accountDoc, encoding, callback) {
//       this.push(transformed);
//       callback();
//   },
// })

//
// const readableStream = Readable.from(data);
// const transformedStream = new Transform({
//   objectMode: true,
//   highWaterMark: 1000,
//   transform(obj, encoding, callback) {
//     const oldKeys = Object.keys(obj);
//     const newKeys = oldKeys.map(key => _.last(key.split('.')));
//     const transformed = newKeys.reduce((t, c, index) => ({...t, [c]: obj[oldKeys[index]]}));
//     console.log(transformed)
//     this.push(transformed);
//     callback();
//   },
// })


