# Web Labeled Logger

Simply, Labeled logs for **web**

### How to use?

1. Use method
  ```javascript
  var LabeledLogger = require('web-labeled-logger')

  LabeledLogger.info('loading...')
  LabeledLogger.debug('a & b', {}, {})
  LabeledLogger.warn(`DO NOT CHEAT`)
  LabeledLogger.error(new Error('require option.range:[]'))
  LabeledLogger.panic('UNEXPECTED CASE!')
  ```
1. Use instance
  ```javascript
  var LabeledLogger = require('web-labeled-logger')

  // constructor(nativeLogger, defaultArguments[], defaultStyles[])
  var labeledLogger = new LabeledLogger(console.log, ['INFO'], [{ fontSize: '2em' }])
    , logger = labeledLogger.pluck()

  labeledLogger.log(1, 2, 3)
  logger(1, 2, 3)

  ```
