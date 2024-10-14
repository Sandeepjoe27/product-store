const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect('mongodb://localhost:27017/sigupup-ecom', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(err);
  });

//  the Signup schema
const signupSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: { 
    type: String,
    required: true
  }
});

// Create the model
const SignupModel = mongoose.model('Signup', signupSchema);

//addproduct schema
const additemSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: { 
    type: Number,
    required: true
  }
});

// Create the model
const AdditemModel = mongoose.model('Additem', additemSchema);


// Signup route
app.post('/signup', async (req, res) => {
  const { email, password, confirmPassword } = req.body; // corrected variable name here

  try {
    // Validate password matching
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const newSignup = new SignupModel({ email, password, confirmPassword });
    await newSignup.save();
    
    // Send a response back to the client
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

//additem route
app.post('/additem', async (req, res) => {
  const { productname, category, price } = req.body; // corrected variable name here
  
  try {
    const newAdditem = new AdditemModel({ productname, category, price });
    await newAdditem.save();
    
    // Send a response back to the client
    res.status(201).json({ message: "Item added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


// get the item for login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;  
    
    try {
 
      const user = await SignupModel.findOne({ email: email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  

      if (user.password !== password) {
        return res.status(400).json({ message: "Invalid password" });
      }
  

      res.status(200).json({ message: "Login successful", user: user.email });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });
  
// search bar
app.post('/', async (req, res) => {
  const { category } = req.body; 
  try {
    const query = category ? { category } : {}; // Create query object
    const items = await AdditemModel.find(query); // Find items based on category
    res.status(200).json(items);  // Return the found items
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching items' });
  }
});



// wishlist collection
const wishlistSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: { 
    type: Number,
    required: true
  }
});

// Create the model
const WishlistModel = mongoose.model('Wishlist', wishlistSchema);

// adding items to wishlist
app.post('/wishlist', async (req, res) => { 
  const { productname, category, price } = req.body; 
  
  try {
    const newWishlist = new WishlistModel({ productname, category, price });
    await newWishlist.save();
    
  
    res.status(201).json({ message: "Item added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

//wishlist 
app.get('/wishlist', async (req, res) => {
  try {
    const items = await WishlistModel.find(); // Fetch all wishlist items
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching wishlist items' });
  }
});


//delete from wishlist
app.delete('/wishlist/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await WishlistModel.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting item' });
  }
});

//display for update
app.get('/additem', async (req, res) => {
  try {
    const items = await AdditemModel.find(); 
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete the item from additem
app.delete('/additem/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await AdditemModel.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting item' });
  }
});

// Update item price
app.put('/additem/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { price } = req.body;

    const updatedItem = await AdditemModel.findByIdAndUpdate(
      id,
      { price },
      { new: true } 
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: error.message });
  }
});


// Server setup
const port = 8000;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
