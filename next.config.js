require('dotenv').config()
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const path = require('path')

const withTM = require('next-transpile-modules')(['tailwindcss']);

module.exports = withTM(
    {
        exportTrailingSlash: true,
        webpack: function(cfg, { isServer }) {
            const originalEntry = cfg.entry

            // Fixes npm packages that depend on `fs` module
            if (!isServer) {
                cfg.node = {
                fs: 'empty'
                }
            }

            cfg.entry = async () => {
                const entries = await originalEntry()
    
                if (
                    entries['main.js'] &&
                    !entries['main.js'].includes('./lib/polyfills.js')
                ) {
                    entries['main.js'].unshift('./lib/polyfills.js')
                }
    
                return entries
            }
    
            cfg.plugins.push(new Dotenv({
                path: path.join(__dirname, '.env'),
                systemvars: true
            }))
            
            cfg.module.rules.push({
                test: /\.svg$/,
                issuer: {
                  test: /\.(js|ts)x?$/,
                },
                use: ['@svgr/webpack'],
            })
    
            return cfg
        }
    }
);