// Import required modules
import { Schema, model, models } from "mongoose";

// Define PromptSchema
const PromptSchema = new Schema({
  // creator: ObjectId referencing the User model
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // prompt: required String field for the prompt content
  prompt: {
    type: String,
    required: [true, 'Prompt is Required.']
  },
  // tag: required String field for the prompt tag
  tag: {
    type: String,
    required: [true, 'Tag is Required.']
  }
});

// Define the Prompt model
const Prompt = models.Prompt || model('Prompt', PromptSchema);

// Export the Prompt model
export default Prompt;