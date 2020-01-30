var _ = require('lodash')

function StyleMap2CssString(styleMap) {
	var cssString = ``

	for(var key in styleMap) {
		var value = styleMap[key]

		cssString += `${key.replace(/[A-Z]/, char => '-' + char.toLowerCase())}:${value};`
	}

	return cssString
}

class StyledLogger {
	constructor(nativeLogger, defaultArguments, defaultStyles) {
		this.nativeLogger = nativeLogger || console.log
		this.defaultArguments = _.castArray(defaultArguments || [])
		this.defaultStyles = _.castArray(defaultStyles || []).map(StyleMap2CssString)
	}
	expression(...args) {
		var { defaultArguments, defaultStyles } = this

		args = [...defaultArguments, ...args]

		var newArgs = [`%c%s`.repeat(defaultStyles.length)]

		for(var i = 0; i < args.length; i++) {
			if(defaultStyles[i]) {
				newArgs.push(defaultStyles[i])
			}
			newArgs.push(args[i])
		}

		return newArgs
	}
	log(...args) {
		return this.nativeLogger.apply(null, this.expression(...args))
	}
	pluck() {
		var _this = this
		return (...args) => _this.log(...args)
	}
}

var DefaultStyles = [
	{ name: 'info', nativeLogger: console.log, backgroundColor: '00C851', borderColor: '007E33' },
	{ name: 'debug', nativeLogger: console.log, backgroundColor: '33b5e5', borderColor: '0099CC' },
	{ name: 'warn', nativeLogger: console.warn, backgroundColor: 'ffbb33', borderColor: 'FF8800' },
	{ name: 'error', nativeLogger: console.error, backgroundColor: 'ff4444', borderColor: 'CC0000' },
	{ name: 'panic', nativeLogger: console.trace, backgroundColor: '111111', borderColor: '000000' },
]

DefaultStyles.forEach(defaultStyle => {
	var { name, nativeLogger, backgroundColor, borderColor } = defaultStyle || {}

	StyledLogger[name] = (new StyledLogger(nativeLogger, [name.toUpperCase()], [
		{
			padding: '.25em .75em',
			border: `1px solid #${borderColor}`,
			borderRadius: '1em',

			color: '#FFFFFF',
			backgroundColor: `#${backgroundColor}`,
		},
	])).pluck()
})

module.exports = StyledLogger
