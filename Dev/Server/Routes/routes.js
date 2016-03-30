// Author: Deen Aariff
// Date: Sat March 26, 2016
// Description: Routes All Rest APIS for server
// Dependendencies: App, Handlers (transactions,users)

init = false;
var _app;
var _handlers;
var _ObjectId;

exports.init = function (app, handlers) {
  _app = app;
  _handlers = handlers;
  init = true;
}

exports.transactionsSetup = function transactionsSetup () {
  _app.get('/api/v1/transactions/', _handlers.transactions.getAllTransactions);
   _app.post('/api/v1/transactions/addItem', _handlers.transactions.addTransaction);
	 _app.get('/api/v1/transactions/:id', _handlers.transactions.getTransaction);
	 _app.put('/api/v1/transactions/update/:id', _handlers.transactions.updateTransactions);
   _app.put('/api/v1/transactions/update/quantity/:id/:num', _handlers.transactions.updateQuantity);
   _app.delete('/api/v1/transactions/delete/:id', _handlers.transactions.deleteTransaction);
}

exports.userSetup = function userSetup () {
  _app.post('/api/v1/users/addUser', _handlers.users.addUser);
    _app.delete('/api/v1/users/deleteUser', _handlers.users.deleteUser);
}

exports.buyerSetup = function buyerSetup () {
  _app.put('/api/v1/buyers/addRequest', _handlers.buyer.addRequest);
    _app.put('/api/v1/buyers/addPending',_handlers.buyer.addPending);
    _app.put('/api/v1/buyers/removePending',_handlers.buyer.removePending);
    _app.put('/api/v1/buyers/completeTransaction',_handlers.buyer.completeTransaction);
}
