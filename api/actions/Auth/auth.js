import Passport from 'passport'
import {Strategy} from 'passport-local'
import User from '../../Model/UserModel'

// class Auth extends Passport {

//   constructor () {
//     super()
//     super.serializeUser(function (user, done) {
//     done(null, user.id)
//     })

//     super.deserializeUser(function (id, done) {
//       User.findById(id).then((user)=>{
//         done(null, user)
//       }, (error)=>{
//         done(error)
//       })
//     })
  
//     super.use(new Strategy({
//       usernameField: 'email',
//       passwordField: 'password'
//     },
//     function (email, password, done) {
//       User.findOne({
//         where: {
//           email: email
//         }
//       }).then((user)=>{
//         if (user === null) {
//           return done(null, false, {message: 'This email is not registered'})
//         }
  
//         if (!user.authenticate(password)) {
//           return done(null, false, {message: 'Invalid login or password'})
//         }
  
//         return done(null, user)
//       })
//     }))
//   }
  
// }

Passport.serializeUser(function (user, done) {
done(null, user.id)
})

Passport.deserializeUser(function (id, done) {
  User.findById(id).then((user)=>{
    done(null, user)
  }, (error)=>{
    done(error)
  })
})

Passport.use(new Strategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
function (email, password, done) {
  // User.findOne({
  //   where: {
  //     email: email
  //   }
  // }).then((user)=>{
  //   if (user === null) {
  //     return done(null, false, {message: 'This email is not registered'})
  //   }

  //   if (!user.authenticate(password)) {
  //     return done(null, false, {message: 'Invalid login or password'})
  //   }

  //   return done(null, user)
  // })
  done(null,user)
}))
    
export default Passport