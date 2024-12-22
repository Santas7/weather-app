import { merge } from 'webpack-merge';
import commonConfig from './webpack.config.common';

export default merge(commonConfig, {
    mode: 'production',
    devtool: 'source-map'
});
