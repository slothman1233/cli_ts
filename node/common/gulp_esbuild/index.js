const { Transform } = require('stream')
const { build } = require('esbuild')
const PluginError = require('plugin-error')
const Vinyl = require('vinyl')
const { name: PLUGIN_NAME } = require('../../../package.json')

module.exports = function (options = {}) {
	const entryPoints = []

	return new Transform({
		objectMode: true,
		transform(file, _, cb) {
			if (!file.isBuffer()) {
				return cb(new PluginError(PLUGIN_NAME, new TypeError('file should be a buffer')))
			}

			entryPoints.push(file.path)
			cb(null)
		},
		async flush(cb) {
			const params = {
				logLevel: 'silent',
				...options,
				entryPoints,
				write: false,
			}

			// set outdir by default
			if (!options.outdir && !options.outfile) {
				params.outdir = '.'
			}

			let outputFiles

			try {
				({ outputFiles } = await build(params))
			} catch (err) {
				return cb(new PluginError(PLUGIN_NAME, err, {
					showProperties: false,
				}))
			}

			outputFiles.forEach(file => {
				this.push(new Vinyl({
					path: file.path,
					contents: Buffer.from(file.contents),
				}))
			})

			cb(null)
		},
	})
}

module.exports.createGulpEsbuild = function () {
	let promise

	return function (options = {}) {
		const entryPoints = []

		return new Transform({
			objectMode: true,
			transform(file, _, cb) {
				if (!file.isBuffer()) {
					return cb(new PluginError(PLUGIN_NAME, new TypeError('file should be a buffer')))
				}

				entryPoints.push(file.path)
				cb(null)
			},
			async flush(cb) {
				const params = {
					logLevel: 'silent',
					...options,
					entryPoints,
					write: false,
					incremental: true,
				}

				// set outdir by default
				if (!options.outdir && !options.outfile) {
					params.outdir = '.'
				}
				try {
					// if it's the first build
					// if (!promise) {
					// 	promise = await build(params)
					// }
					// // if it's > 1 build
					// else {
					// 	promise = await promise.rebuild()
					// }

					promise = await build(params)

				} catch (err) {
					return cb(new PluginError(PLUGIN_NAME, err, {
						showProperties: false,
					}))
				}

				promise.outputFiles.forEach(file => {
					this.push(new Vinyl({
						path: file.path,
						contents: Buffer.from(file.contents),
					}))
				})

				cb(null)
			},
		})
	}
}
