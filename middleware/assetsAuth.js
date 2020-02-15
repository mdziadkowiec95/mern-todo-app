const Project = require('../models/Project')
const jwt = require('jsonwebtoken')
const config = require('config')

/**
 * @param {string} auth JWT auth token passed as query param to each project asset to protect unauthorized access.
 */
exports.protectProjectFiles = async (req, res, next) => {
    try {  
      const projectId = req.path.split('/')[1];
      const authToken = req.query.auth;

      if (!authToken) return res.status(401).json({ errors: [{
        msg: 'Unathorized access!'
      }]})

      const decodedJwt = jwt.verify(authToken, config.get('mySecretJwt'))

      const project = await Project.findOne({ _id: projectId, user: decodedJwt.user.id })
  
      if (!project || !project.user === decodedJwt.user.id) return res.status(401).json({ errors: [{
        msg: 'Unathorized access!'
      }]})
    
      next()
    } catch (error) {
      console.log(error.message)
  
      res.status(401).json({ errors: [{
        msg: 'Unathorized access!'
      }]})
    }
  }