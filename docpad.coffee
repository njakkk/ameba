# Define the Configuration
docpadConfig = {

  documentsPaths: [  # default
    'errors'
    'documents']

  collections:
    featuredProjects: ->
      @getCollection("html").findAllLive({relativeOutDirPath: 'projects', isFeatured: true, isProject: true, isPublished: true}, [
        order: 1
      ])

    projects: ->
      @getCollection("html").findAllLive({relativeOutDirPath: 'projects', isProject: true, isPublished: true}, [
        order: 1
      ])

  templateData:
    site:
      url: "http://www.allthingstalk.com"

  environments:
    development:
      hostname: 'localhost'
      templateData:
        site:
          url: "http://localhost:9778"
    production:
      templateData:
        site:
          url: "http://ameba.one"
    staging:
      templateData:
        site:
          url: "http://dev.ameba.one/ameba"

  events:
    serverExtend: (opts) ->
      # Extract the server from the options
      {server} = opts
      docpad = @docpad

      # Include our custom routes
      require(__dirname + '/routes.coffee')({docpad, server})

}

# Export the Configuration
module.exports = docpadConfig