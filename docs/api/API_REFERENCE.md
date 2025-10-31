## Classes

<dl>
<dt><a href="#DataphreakError">DataphreakError</a> ⇐ <code>Error</code></dt>
<dd><p>Custom error class for DATAPHREAK-specific errors</p>
</dd>
<dt><a href="#ErrorHandler">ErrorHandler</a></dt>
<dd><p>Centralized error handling with logging and user-friendly messages</p>
</dd>
<dt><a href="#Logger">Logger</a></dt>
<dd><p>Logger class for controlled, leveled logging</p>
</dd>
<dt><a href="#PerformanceMonitor">PerformanceMonitor</a></dt>
<dd><p>Performance monitoring class for tracking operation timing</p>
</dd>
</dl>

<a name="ErrorHandler"></a>

## ErrorHandler
Centralized error handling with logging and user-friendly messages

**Kind**: global class  

* [ErrorHandler](#ErrorHandler)
    * [.handle(error, [context])](#ErrorHandler.handle) ⇒ <code>Object</code>
    * [.getUserMessage(error)](#ErrorHandler.getUserMessage) ⇒ <code>string</code>
    * [.wrapAsync(fn, [context])](#ErrorHandler.wrapAsync) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.wrap(fn, [context])](#ErrorHandler.wrap) ⇒ <code>\*</code>

<a name="ErrorHandler.handle"></a>

### ErrorHandler.handle(error, [context]) ⇒ <code>Object</code>
Handle an error with logging and user notification

**Kind**: static method of [<code>ErrorHandler</code>](#ErrorHandler)  
**Returns**: <code>Object</code> - Structured error information  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| error | <code>Error</code> |  | The error to handle |
| [context] | <code>Object</code> | <code>{}</code> | Additional context about the error |

<a name="ErrorHandler.getUserMessage"></a>

### ErrorHandler.getUserMessage(error) ⇒ <code>string</code>
Get user-friendly error message for an error code

**Kind**: static method of [<code>ErrorHandler</code>](#ErrorHandler)  
**Returns**: <code>string</code> - User-friendly error message  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Error with code property |

<a name="ErrorHandler.wrapAsync"></a>

### ErrorHandler.wrapAsync(fn, [context]) ⇒ <code>Promise.&lt;\*&gt;</code>
Wrap an async function with error handling

**Kind**: static method of [<code>ErrorHandler</code>](#ErrorHandler)  
**Returns**: <code>Promise.&lt;\*&gt;</code> - Result of function or error info  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fn | <code>function</code> |  | Async function to wrap |
| [context] | <code>Object</code> | <code>{}</code> | Context for error handling |

<a name="ErrorHandler.wrap"></a>

### ErrorHandler.wrap(fn, [context]) ⇒ <code>\*</code>
Wrap a sync function with error handling

**Kind**: static method of [<code>ErrorHandler</code>](#ErrorHandler)  
**Returns**: <code>\*</code> - Result of function or error info  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fn | <code>function</code> |  | Function to wrap |
| [context] | <code>Object</code> | <code>{}</code> | Context for error handling |

<a name="Logger"></a>

## Logger
Logger class for controlled, leveled logging

**Kind**: global class  

* [Logger](#Logger)
    * [new Logger(options)](#new_Logger_new)
    * [.debug(...args)](#Logger+debug)
    * [.info(...args)](#Logger+info)
    * [.warn(...args)](#Logger+warn)
    * [.error(...args)](#Logger+error)
    * [.setLevel(level)](#Logger+setLevel)

<a name="new_Logger_new"></a>

### new Logger(options)
Create a new logger instance


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | Configuration options |
| [options.level] | <code>number</code> |  | Initial log level (defaults to DEBUG in dev, WARN in production) |
| [options.prefix] | <code>string</code> | <code>&quot;&#x27;[DATAPHREAK]&#x27;&quot;</code> | Prefix for log messages |
| [options.timestamp] | <code>boolean</code> | <code>true</code> | Whether to include timestamps |

<a name="Logger+debug"></a>

### logger.debug(...args)
Log debug message (only in DEBUG level)

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>\*</code> | Values to log |

<a name="Logger+info"></a>

### logger.info(...args)
Log info message (DEBUG and INFO levels)

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>\*</code> | Values to log |

<a name="Logger+warn"></a>

### logger.warn(...args)
Log warning message (DEBUG, INFO, and WARN levels)

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>\*</code> | Values to log |

<a name="Logger+error"></a>

### logger.error(...args)
Log error message (all levels except NONE)

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>\*</code> | Values to log |

<a name="Logger+setLevel"></a>

### logger.setLevel(level)
Set the minimum log level

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>number</code> | LogLevel value |

<a name="ErrorCodes"></a>

## ErrorCodes : <code>enum</code>
Standard error codes used throughout the application

**Kind**: global enum  
<a name="LogLevel"></a>

## LogLevel : <code>enum</code>
Log levels for controlling verbosity

**Kind**: global enum  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| DEBUG | <code>number</code> | <code>0</code> | All messages including debug |
| INFO | <code>number</code> | <code>1</code> | Info, warnings, and errors |
| WARN | <code>number</code> | <code>2</code> | Warnings and errors only |
| ERROR | <code>number</code> | <code>3</code> | Errors only |
| NONE | <code>number</code> | <code>4</code> | No logging |

