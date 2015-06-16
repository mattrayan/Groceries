var ShoppingItem = require('./models/shoppingItem');

var getAllItems = function(res) {
	ShoppingItem.find(function(err, items) {
        if (err) {
    	    res.send(err);
	    } else {
            res.json(items);
	    }
    });
};

// Define and export all Express REST api routes
module.exports = function(app) {
	app.get('/api/items', function(req, res) {  // Return all shopping items
        getAllItems(res);
    });

    app.post('/api/items', function(req, res) {  // Save a shopping item
        // Create shopping item object and then return all
        ShoppingItem.create({
            text: req.body.text,
            done: false
        }, function(err, item) {
            if (err) {
                res.send(err);
		    } else {
	            getAllItems(res);
		    }
        });

     });

    app.delete('/api/items/:item_id', function(req, res) {  // Delete a shopping item
	    // Delete a shopping item and return all
        ShoppingItem.remove({
            _id : req.params.item_id
        }, function(err, item) {
            if (err) {
                res.send(err);
		    } else {
			    getAllItems(res);
		    }
        });
    });

    // Application
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');  // Load static app at localhost:8080
    });
};