module.exports = ({server,docpad}) ->

  # As we are now running in an event,
  # ensure we are using the latest copy of the docpad configuraiton
  # and fetch our urls from it
  config = docpad.getConfig()

  server.use (req, res, next) ->
    if req.headers.host in ["allthingstalk.com"]
      to = config.templateData.site.url
      res.redirect(to, 301)
    else
      next()