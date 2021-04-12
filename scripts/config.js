const path = require('path')
const node = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const typescript = require('rollup-plugin-typescript')

const resolve = p => {
    return path.resolve(__dirname, '../', p)
  }

const builds = {
    // Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify
    'cjs-dev': {
      dest: resolve('dist/particlejs.common.dev.js'),
      format: 'cjs',
      env: 'development',
    },
    'esm-dev': {
      dest: resolve('dist/particlejs.esm.dev.js'),
      format: 'es',
      env: 'development',
    },
    'umd-dev': {
      dest: resolve('dist/particlejs.umd.dev.js'),
      format: 'umd',
      env: 'development',
    },
    'cjs-prod': {
      dest: resolve('dist/particlejs.common.prod.js'),
      format: 'cjs',
      env: 'production',
    },
    'esm-prod': {
      dest: resolve('dist/particlejs.esm.prod.js'),
      format: 'es',
      env: 'production',
    },
    'umd-prod': {
      dest: resolve('dist/particlejs.umd.min.js'),
      format: 'umd',
      env: 'production',
    },
}

function genConfig (name) {
    const opts = builds[name]
    const config = {
      input: resolve('src/index'),
        plugins: [
            typescript(),
            node(),
            commonjs(),
            babel(),
      ],
      output: {
        file: opts.dest,
        format: opts.format,
        banner: opts.banner,
        name: opts.moduleName || 'ParticleJs'
      },
      onwarn: (msg, warn) => {
        if (!/Circular/.test(msg)) {
          warn(msg)
        }
      }
    }
  
    return config
  }

if (process.env.TARGET) {
    module.exports = genConfig(process.env.TARGET)
  } else {
    exports.getBuild = genConfig
    exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
  }