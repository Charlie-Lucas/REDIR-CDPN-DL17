/**
 * User Entity
 */

var User = mongoose.model('User', {
    email: String,
    password: String
});