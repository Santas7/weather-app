import { merge } from 'webpack-merge';
import commonConfig from './webpack.config.common';

export default merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        hot: true,
        open: true,
    },
});
