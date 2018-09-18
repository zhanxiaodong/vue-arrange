var OSS = require('ali-oss').Wrapper
export function client () {
  var client = new OSS({
    region: 'oss-cn-shanghai',
    accessKeyId: 'LTAI7A3I296wB5ZQ',
    accessKeySecret: 'ehnX6YmSBbirQAQbB9KyjF941mWs3i',
    bucket: 'minianys'
  })
  return client
}
