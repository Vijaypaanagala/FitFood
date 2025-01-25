import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import validator from "validator";

// Schema for individual food items
const foodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image:{
    type:Buffer,
    contentType:String,
    
  },
  protein: {
    type: String, 
    
  },
  cal: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

// Schema for restaurants with an array of food items
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fooditems: [foodSchema]
});
const cartSchema= new mongoose.Schema({
  foodid:{
    type:String,
    required:true
  }
});
const emailcart=new mongoose.Schema({
  email:{
    type:String,
    required:true,

  },
  carted:[cartSchema]
})


// Schema for user registration (Person)
const registerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Static method for signing up a new user
registerSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("Email and password are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Enter a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Enter a strong password");
  }
  
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

// Static method for logging in a user
registerSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Email and password are required");
  }
  
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Invalid email");
  }
  
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid password");
  }
  
  return user;
};

export const Person = mongoose.model('Person', registerSchema);
export const Food = mongoose.model('Food', foodSchema);
export const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export const carts=mongoose.model('carted',emailcart)
