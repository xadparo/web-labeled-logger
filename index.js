var CssStringSym = Symbol()

var __CssString__ = {
	iam: CssStringSym,
}

function CssString(style = {}) {
	var cssString = Object.create(__CssString__)
		, str = ""

	for(var key in style) {
		var value = style[key]
		str += `${key.replace(/[A-Z]/, char => '-' + char.toLowerCase())}:${value};`
	}

	cssString.value = str
	return cssString
}

function Log(...args) {
	var exp = ''

	args = args.flatMap((arg, idx, origin) => {
		var prv = idx > 0? origin[idx - 1]: void 0

		if((arg && arg.iam) === CssStringSym) {
			exp += '%c'
			return [arg.value]
		} else {
			if((prv && prv.iam) === CssStringSym) {
				exp += '%s'
				return [arg]
			} else {
				return [arg]
			}
		}
	})

	if(typeof this === 'function') {
		this(exp, ...args)
	} else {
		console.log(exp, ...args)
	}
}

var levels = [
	{
		name: 'info',
		bind: console.log,
		color1: '00C851',
		color2: '007E33',
	},
	{
		name: 'debug',
		bind: console.log,
		color1: '33b5e5',
		color2: '0099CC',
	},
	{
		name: 'warn',
		bind: console.warn,
		color1: 'ffbb33',
		color2: 'FF8800',
	},
	{
		name: 'error',
		bind: console.error,
		color1: 'ff4444',
		color2: 'CC0000',
	},
	{
		name: 'panic',
		bind: console.trace,
		color1: '111111',
		color2: '000000',
	},
]

levels.forEach(levelInfo => {
	var { name, bind, color1 } = levelInfo

	Log[name] = function(...args) {
		Log.apply(bind, [
			CssString({
				borderRadius: '100px',
				color: '#ffffdd',
				fontWeight: 'bolder',
				padding: '2.5px 5px',
				backgroundColor: '#' + color1,
			}),
			name.toUpperCase(),
			...args,
		])
	}
})

Log.CssString = CssString

module.exports = Log
