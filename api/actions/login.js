import Passport from './Auth/auth'
import User from '../Model/UserModel'

export default function login(req) {
  console.log(JSON.stringify(req.body))
  Passport.authenticate('local',{failureRedirect: '/login', failureFlash: true }, afterLogin)
  
  function afterLogin(req, res) {
    // User.findById(req.user.dataValues.id).then((user)=>{
    //   user.update('lastConnection', new Date())
    //   req.flash('welcomeMessage', 'Welcome ' + user.name + '!')
    //   res.redirect('/')
    // })
    
    return Promise.resolve(req.body.email)
  }
}
