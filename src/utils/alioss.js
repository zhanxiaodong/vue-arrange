var OSS = require('ali-oss')
export function client () {
  var client = new OSS({
    region: 'oss-cn-shanghai',
    accessKeyId: 'LTAIgJdiL4H8BBMh',
    accessKeySecret: 'wXCuVOAjVawiLWuFEKPPq9YyBZyq8s',
    bucket: 'minianys'
  })
  return client
}
