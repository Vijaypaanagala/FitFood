import express from 'express';
const router = express.Router();
import { carts,Food, Restaurant, Person } from '../models/foodlist.js';
import jwt from "jsonwebtoken";

// Function to create a token
const ctoken = (_id) => {
  return jwt.sign({ _id }, 'mhcvjmgkuhlihhvmhvjgkg', { expiresIn: '3d' });
};

// Route to create a new food item within a restaurant
router.post('/', async (req, res) => {
  try {
    const { title, protien, cal, price, rest } = req.body;
    if (!title || !protien || !cal || !price || !rest) {
      return res.status(499).send("Fill all fields");
    }

    const newFoodItem = {
      title,
      protien,
      cal,
      price
    };

    let restaurant = await Restaurant.findOne({ name: rest });
    if (!restaurant) {
      restaurant = new Restaurant({ name: rest, fooditems: [] });
    }

    restaurant.fooditems.push(newFoodItem);
    await restaurant.save();
    
    res.status(201).send(restaurant);
  } catch (error) {
    res.status(401).send(error.message);
  }
});
router.post('/addcart', async (req, res) => {
  try {
    const { email, id } = req.body;
    let cart = await carts.findOne({ email });

    if (!cart) {
      cart = new carts({ email: email, carted: [] });
    }

    cart.carted.push({ foodid: id });
    await cart.save();

    res.status(201).send(cart);
  } catch (error) {
    res.status(401).send(error.message);
  }
});
router.get('/getcart/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const usr = await carts.findOne({ email });
    if (!usr) {
      return res.status(404).send('No items found');
    }
    res.status(200).json(usr.carted);
  } catch (error) {
    res.status(500).send(error.message);
  }
});



router.get('/all-restaurants', async (req, res) => {
  try {
    // Find all restaurants and populate food items
    const restaurants = await Restaurant.find({}).select('name fooditems');
    
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).send(error.message);
  }
});





router.get('/:restaurantName', async (req, res) => {
  try {
    const restaurantName = req.params.restaurantName;

    const restaurant = await Restaurant.findOne({ name: restaurantName });

    if (!restaurant) {
      return res.status(404).send('Restaurant not found');
    }

    res.status(200).json(restaurant.fooditems);
  } catch (error) {
    res.status(500).send(error.message);
  }
});



router.get('/fooditem/:id', async (req, res) => {
  try {
    
    const foodItemId = req.params.id;

   
    const restaurant = await Restaurant.findOne({ 'fooditems._id': foodItemId });

 
    if (!restaurant) {
      return res.status(404).send('Food item not found');
    }

   
    const foodItem = restaurant.fooditems.id(foodItemId);

    res.status(200).json(foodItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.put('/fooditem/:id', async (req, res) => {
  try {
    const foodItemId = req.params.id;
    
    const restaurant = await Restaurant.findOne({ 'fooditems._id': foodItemId });

    if (!restaurant) {
      return res.status(404).send("Food item not found");
    }

    const foodItem = restaurant.fooditems.id(foodItemId);

    Object.assign(foodItem, req.body);
    await restaurant.save();

    return res.status(200).send("Food item updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.delete('/fooditem/:id', async (req, res) => {
  try {
    const foodItemId = req.params.id;

    
    const restaurant = await Restaurant.findOne({ 'fooditems._id': foodItemId });

    if (!restaurant) {
      return res.status(404).send("Restaurant or food item not found");
    }

    restaurant.fooditems = restaurant.fooditems.filter(item => item._id.toString() !== foodItemId);

    await restaurant.save();

    res.status(200).send("Food item deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.delete('/deletecartitem/:foodid', async (req, res) => {
  try {
    const foodid = req.params.foodid;
    const useremail = await carts.findOne({ 'carted.foodid': foodid });

    if (!useremail) {
      return res.status(404).send('User not found or no item in cart');
    }

    
    useremail.carted = useremail.carted.filter(item => item.foodid.toString() !== foodid);

    await useremail.save();

    res.status(200).send("Food item deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// User registration
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Person.signup(email, password);
    const token = ctoken(user._id);
    res.status(201).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Person.login(email, password);
    const token = ctoken(user._id);
    res.status(201).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
