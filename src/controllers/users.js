module.exports = {
  profile(request, response) {
    response.send('Hello from controller')
  },
  login(request, response) {
    response.send('Login from controller')
  },
}
