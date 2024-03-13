// Import required modules:
// - Schema: A Mongoose schema that defines the structure of a document
// - model: A constructor for creating models
// - models: An object containing all the currently defined models
import { Schema, model, models } from "mongoose";

// Define UserSchema
const UserSchema = new Schema({
  // email: A unique and required String field for the user's email
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  // username: A required String field for the user's username
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"
    ],
  },
  // password: A required String field for the user's password
  password: {
    type: "string",
    required: [true, "Username is required!"],
  },
  // image: An optional String field for the user's image URL
  image: {
    type: "String",
    default: "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/",
  },
});

// Define the User model
const User = models.User || model("User", UserSchema);

// Export the User model
export default User;