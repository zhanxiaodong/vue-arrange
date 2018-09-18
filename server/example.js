module.exports.test = (req, res) => {
  res.send({
    code: '1',
    desc: 'ok',
    result: {
      text: 'hello vue-express-framework'
    }
  })
}
