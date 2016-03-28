// Author: Deen Aariff
// Date: Sat March 26, 2016
// Description: Routes All Rest APIS for server
// Dependendencies: App, Handlers (food,users)

init = false;
var _app;
var _handlers;
var _ObjectId;

exports.init = function (app, handlers) {
  _app = app;
  _handlers = handlers;
  init = true;
}

exports.foodSetup = function foodSetup () {
  _app.get('/api/v1/food/', _handlers.food.getAllFood);
	 _app.get('/api/v1/food/:id', _handlers.food.getFoodItem);
	 _app.post('/api/v1/food/addItem', _handlers.food.addFoodItem);
	 _app.put('/api/v1/food/update/:id', _handlers.food.updateFoodItem);
   _app.delete('/api/v1/food/delete/:id', _handlers.food.deleteFoodItem);
}

exports.userSetup = function userSetup () {
  _app.post('/api/v1/users/signIn', _handlers.users.addUser);
}

exports.buyerSetup = function () {
  _app.put('/api/v1/buyers/addRequest', _handlers.buyer.addRequest);
    _app.put('/api/v1/buyers/addPending',_handlers.buyer.addPending);
    _app.put('/api/v1/buyers/removePending',_handlers.buyer.removePending);
    _app.put('/api/v1/buyers/completeTransaction',_handlers.buyer.completeTransaction);
}
