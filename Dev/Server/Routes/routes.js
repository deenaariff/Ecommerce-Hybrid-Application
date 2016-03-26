// Author: Deen Aariff
// Date: Sat March 26, 2016
// Description: Routes All Rest APIS for server
// Dependendencies: App, Handlers (food,users)

var _app;
var _handlers;

exports.init = function (app, handlers) {
  _app = app;
  _handlers = handlers;
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
    _app.post('/api/v1/users/addRequested/:fid', _handlers.users.addReqPurchase);
    _app.put('/api/v1/users/addPending/:fid', _handlers.users.addPendPurchase);
    _app.delete('/api/v1/users/deletePending/:fid', _handlers.users.delPendPurchase);
}
