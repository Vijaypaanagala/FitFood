import express from 'express';
import multer from "multer"
const router = express.Router();
import { carts,Food, Restaurant, Person } from '../models/foodlist.js';
import jwt from "jsonwebtoken";

const ctoken = (_id) => {
  return jwt.sign({ _id }, 'mhcvjmgkuhlihhvmhvjgkg', { expiresIn: '3d' });
};

const Storage = multer.memoryStorage();
const upload = multer({ storage: Storage });

// Route to create a new food item within a restaurant
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, protein, cal, price, user } = req.body;

    // Log the incoming request data
    console.log(req.body);
    console.log(req.file); // Check if the file is being received

    // Check for missing fields
    if (!title || !protein || !cal || !price || !user || !req.file) {
      return res.status(400).send("All fields are required, including the image");
    }

    // Image buffer from Multer
    const image = req.file.buffer;
    const newFoodItem = {
      title,
      image, // Save the image buffer in MongoDB
      protein,
      cal,
      price,
    };

    // Fetch the restaurant by user email and add the food item
    let restaurant = await Restaurant.findOne({ name: user });
    if (!restaurant) {
      restaurant = new Restaurant({ name: user, fooditems: [] });
    }

    // Add food item to restaurant
    restaurant.fooditems.push(newFoodItem);
    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
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



// Route to get all restaurants and their food items
router.get('/all-restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    // Convert image buffer to Base64 for each food item
    const result = restaurants.map(restaurant => {
      return {
        ...restaurant._doc, // Keep the structure of restaurant
        fooditems: restaurant.fooditems.map(food => {
          return {
            ...food._doc, // Keep the original food structure
            image: food.image ? food.image.toString('base64') : null, // Convert image buffer to Base64
          };
        }),
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).send('Internal Server Error');
  }
});






router.get('/:user', async (req, res) => {
  try {
    const user = req.params.user;

    const restaurant = await Restaurant.findOne({ name: user });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Convert image buffer to Base64 for each food item
    const fooditemsWithImages = restaurant.fooditems.map(food => {
      return {
        ...food._doc, // Spread original food item data
        image: food.image ? food.image.toString('base64') : null, // Convert image buffer to Base64
      };
    });

    res.status(200).json(fooditemsWithImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const fooditemimage ={

    ...foodItem._doc,
      image:foodItem.image?foodItem.image.toString('base64'):null
  }

    res.status(200).json(fooditemimage);
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
