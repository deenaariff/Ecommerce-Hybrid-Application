angular.module('starter.controllers', [])

.controller('MenuCtrl', function($scope, $stateParams) {
    
    $scope.foodsToday = [ { name: 'Fried Rice' , 
                            price: '$9.00',
                            description: 'Warm Chicken Fried Rice',
                            chef: 'Bob Smith' , 
                            rating: '5'} , 
                         { name: 'Brownies' , 
                          price: '$3.00' , 
                          description: 'Warm 12 piece brownies',
                          chef: 'Ronald McDonald',
                          rating: '3'} , 
                         { name : 'Cake' , 
                          price: '$2.50',
                          description: 'Six piece Vanilla Cake',
                          chef: 'Jake Holding',
                          rating: '4'} , 
                        
                        ];
    
    $scope.foodsYesterday = [ { name: 'Lasagna' , 
                            price: '$7.00',
                            description: 'Fresh Vegetarian Lasagna',
                            chef: 'Alex Smith' , 
                            rating: '2'} , 
                         { name: 'Tacos' , 
                          price: '$3.00' , 
                          description: 'Four beef tacos with cheese',
                          chef: 'Tom Brady',
                          rating: '5'} , 
                         { name : 'Cake' , 
                          price: '$2.50',
                          description: 'Six slices of Chocolate Cake',
                          chef: 'Aaron Rodgers',
                          rating: '5'} , 
                        
                        ];
    
    
})

