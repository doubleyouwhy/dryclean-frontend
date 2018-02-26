
import firebase from './firebaseConfig.js'
var serviceAccount = require('./key.json')


var database = firebase.database()

/// //////login, sign up and singout functions//////////

/// //////SIGN UP FUNCITON //////////

export function registerUser (email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(firebaseUser => {
      database.ref('/Merchants/' + firebaseUser.uid).set({
        merchantId: firebaseUser.uid,
        email: email

      })

      return { merchantId: firebaseUser.uid }
    })

    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.')
      } else {
        alert(errorMessage)
      }
      console.log(error)
    })
}

export function checkLogin () {
  var user = firebase.auth().currentUser
return {user}
}

/// /////LOGIN FUNCTION////////

export function login (email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(firebaseuser => {
      return { merchantId: firebaseuser.uid, firebaseuser }
    })

    // Handle Errors here.

    .catch(function (error) {
      var errorCode = error.code
      var errorMessage = error.message
      console.log(errorMessage)
      console.log(errorCode)
      if (errorCode == 'auth/user-not-found' || errorCode == 'auth/wrong-password') {
        alert('username or password incorrect')
      }
    })
}

/// ///////SIGN OUT FUNCTION/////////

export function signout () {
  firebase.auth().signOut().then(function () {
    console.log('sign out sucessful')
    // Sign-out successful.
  }).catch(function (error) {
    console.log('something bad')
    // An error happened.
  })
}

/// /////////REGSITER A MERCHANT///////////

export async function registerMerchant (merchantObj, priceObj) {
  // this is to write the data
  var merchantId = await merchantObj.merchantId
  console.log('here is merchant id', merchantObj.merchantId)

  var newMerchant = await database.ref('/Merchants/' + merchantId).set({
    merchantId: merchantId,
    merchantFullName: merchantObj.merchantFullName,
    merchantPersonalNumber: merchantObj.merchantPersonalNumber,
    businessName: merchantObj.businessName,
    businessAddress: merchantObj.businessAddress,
    city: merchantObj.city,
    province: merchantObj.province,
    postalCode: merchantObj.postalCode,
    businessPhoneNum: merchantObj.businessPhoneNum

  })

  console.log('merchant is registered')

  database.ref('/Merchants/' + merchantId + '/Prices/' + '/Regular/').set({
    trousers: priceObj.regular.trousers,
    suit: priceObj.regular.suit,
    overcoat: priceObj.regular.overcoat,
    ladiesSuit: priceObj.regular.ladiesSuit,
    dress: priceObj.regular.dress,
    skirt: priceObj.regular.skirt,
    jacket: priceObj.regular.jacket,
    blouse: priceObj.regular.blouse,
    shirt: priceObj.regular.shirt,
    tie: priceObj.regular.tie

  })

  console.log('regular prices are registered for user:', merchantId)

  database.ref('/Merchants/' + merchantId + '/Prices/' + '/Express/').set({
    trousers: priceObj.express.trousers,
    suit: priceObj.express.suit,
    overcoat: priceObj.express.overcoat,
    ladiesSuit: priceObj.express.ladiesSuit,
    dress: priceObj.express.dress,
    skirt: priceObj.express.skirt,
    jacket: priceObj.express.jacket,
    blouse: priceObj.express.blouse,
    shirt: priceObj.express.shirt,
    tie: priceObj.express.tie

  })

  console.log('express prices are registered for user:', merchantId)
}

/// ////// order related functions ///////

/// ///checks if phone number exits. if it does send obj//////

// this function checks to see if the phone number exists. if exits will return
// user object, if not will create a new user with this number

function getUser (snapshot) {
  let users = []
  snapshot.forEach(item => {
    users.push({ value: item.val(), userId: item.key })
  })
  return users.length > 0 ? users[0] : null
}

export async function checkPhoneNum (phoneNumber, merchantId) {
  console.log('merchant mrechant id that is in the back of checkphone', merchantId)

  var snapshot = await database.ref('/Merchants/' + merchantId + '/Users/')
    .orderByChild('phoneNumber')
    .equalTo(phoneNumber)
    .once('value')

  let user = getUser(snapshot)

  if (!user) {
    var newUser = await database.ref('/Merchants/' + merchantId + '/Users/').push()
    await newUser.set({
      phoneNumber: phoneNumber, merchantId: merchantId
    })

    return {
      status: 1,
      msg: 'User added!',
      userId: newUser.key,
      phoneNumber: phoneNumber,
      merchantId: merchantId
    }
  } else {
    return {
      status: 0,
      msg: 'User found!',
      userId: user.userId,
      clientName: user.value.clientName,
      clientAddress: user.value.clientAddress,
      clientCity: user.value.clientCity,
      clientProvinceState: user.value.clientProvinceState,
      clientPostalZip: user.value.clientPostalZip,
      phoneNumber: user.value.phoneNumber,
      merchantId: merchantId
    }
  }
}

/// //// adds user details if user is new, or updates info if necessary/////

export async function addUserDetails (userObj, merchantId) {
  var newClient = await database.ref('/Merchants/' + merchantId.merchantId + '/Users/' + userObj.userId).update({
    phoneNumber: userObj.phoneNumber,
    clientName: userObj.clientName,
    clientAddress: userObj.clientAddress,
    clientCity: userObj.clientCity,
    clientProvinceState: userObj.clientProvinceState,
    clientPostalZip: userObj.clientPostalZip,
    userId: userObj.userId

  })

  var snapshot = await database.ref('/Merchants/' + merchantId.merchantId + '/Prices/')
    .once('value')

  return { merchantId: merchantId.merchantId, prices: snapshot.val() }
}

/// ///a function to get prices of  merchants when you open a new order form/////

export async function getMerchantPrices (merchantObj) {
  var prices = await database.ref('Merchants/' + merchantObj.merchantId + '/Prices')
    .once('value')

  return {merchantId: merchantObj.merchantId, prices: prices.val()}
}

// this order creates a new orderID, generates a readable order number
// send the merchant ID and details, the current date and generates
// standard and express delivery dates

export async function createNewOrder (userId, merchantId) {
  console.log('create new order running on back')
  console.log('merchant id in create new order', merchantId)

  let ndate = new Date()  /// // give the curent that in time
  let year = ndate.getFullYear()
  let month = ndate.getMonth()
  let day = ndate.getDate()
  let date = month + ' ' + day + ', ' + year

  var newOrder = await database.ref('/Merchants/' + merchantId + '/Users/' + userId + '/Orders/').push(
    {
      orderNum: Math.floor((Math.random() * 1000) + 1),
      merchantId: merchantId,
      userId: userId,
      date: date,
      standardReady: 'current date + 3 days',
      expressReady: 'current date +1 day',
      orderStatus: 'open',
      orderDetails: {pants: +1, shirts: +2}
    }
  )
  // .once('value')

  var snapshot = await database.ref('/Merchants/' + merchantId)
    .once('value')

  return {merchantId: snapshot.val()
      // ,
      // newOrder: newOrder.val()
  }
}

/// /////////////DASHBOARD FUNCTIONS ///////////////////////

/// ////this function gets all of the orders for the requested merchant and is called //////

function makeOrdersArr (snapshot) {
  let users = []
  let usersOrders = []
  let allOrders = []
  let flatOrders = []

  snapshot.forEach(item => {
    users.push(item.val())
  })

  users.forEach(user => {
    usersOrders.push(user.Orders)
  })

  usersOrders.forEach(ordersObj => {
    allOrders.push(Object.values(ordersObj))
  })

  allOrders.forEach(item => {
    item.forEach(e => flatOrders.push(e))
  })

  return flatOrders
}
/// // open orders function//////

export async function getOpenOrders (merchantId) {
  var snapshot = await database.ref('/Merchants/' + merchantId.merchantId + '/Users/')
    .once('value')

  let openOrders = []
  let merchantOrders = makeOrdersArr(snapshot)

  merchantOrders.forEach(order => {
    if (order.orderStatus === 'open') {
      openOrders.push(order)
    }
  })

  return { openOrders: openOrders }
}
/// / closed order function/////
export async function getClosedOrders (merchantId) {
  var snapshot = await database.ref('/Merchants/' + merchantId.merchantId + '/Users/')
    .once('value')

  let closedOrders = []
  let merchantOrders = makeOrdersArr(snapshot)

  merchantOrders.forEach(order => {
    if (order.orderStatus === 'closed') {
      closedOrders.push(order)
    }
  })

  return { closedOrders: closedOrders }
}

/// //////past due function///////

export async function getPastDueOrders (merchantId) {
  var snapshot = await database.ref('/Merchants/' + merchantId.merchantId + '/Users/')
    .once('value')

  let pastDueOrders = []
  let merchantOrders = makeOrdersArr(snapshot)

  merchantOrders.forEach(order => {
    if (order.orderStatus === 'past due') {
      pastDueOrders.push(order)
    }
  })

  return { pastDueOrders: pastDueOrders }
}

/// /////////////CONFIRMATION PAGE FUNCTIONS////////////////////////////////

export async function getConfirmation () {

}
