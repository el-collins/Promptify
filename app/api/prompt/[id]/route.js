import Prompt from "@models/prompt"; // Importing Prompt model to interact with the database
import { connectToDB } from "@utils/database"; // Importing connectToDB function to establish database connection

/**
* GET method to fetch a specific prompt based on the provided ID
* @param {object} request - Request object
* @param {object} { params } - Parameters object containing the prompt ID
* @returns {object} - Returns the prompt object or error response
*/
export const GET = async (request, { params }) => {
   try {
       // Connect to the database before performing any operation
       await connectToDB();

       // Fetch the prompt using the ID and populate the creator field
       const prompt = await Prompt.findById(params.id).populate("creator");

       // If the prompt is not found, return a 404 error
       if (!prompt) return new Response("Prompt Not Found", { status: 404 });

       // Return the prompt JSON along with a 200 status code
       return new Response(JSON.stringify(prompt), { status: 200 });

   } catch (error) {
       // Return an internal server error in case of any exceptions
       return new Response("Internal Server Error", { status: 500 });
   }
}

/**
* PATCH method to update an existing prompt with new data
* @param {object} request - Request object
* @param {object} { params } - Parameters object containing the prompt ID
* @returns {object} - Returns a success message or error response
*/
export const PATCH = async (request, { params }) => {
   const { prompt, tag } = await request.json(); // Extract the prompt and tag data from the request body

   try {
       // Connect to the database before performing any operation
       await connectToDB();

       // Find the existing prompt by ID
       const existingPrompt = await Prompt.findById(params.id);

       // If the prompt is not found, return a 404 error
       if (!existingPrompt) {
           return new Response("Prompt not found", { status: 404 });
       }

       // Update the prompt with new data
       existingPrompt.prompt = prompt;
       existingPrompt.tag = tag;

       // Save the updated prompt
       await existingPrompt.save();

       // Return a success message along with a 200 status code
       return new Response("Successfully updated the Prompts", { status: 200 });

   } catch (error) {
       // Return an error message in case of any exceptions
       return new Response("Error Updating Prompt", { status: 500 });
   }
}

/**
* DELETE method to remove a prompt by ID
* @param {object} request - Request object
* @param {object} { params } - Parameters object containing the prompt ID
* @returns {object} - Returns a success message or error response
*/
export const DELETE = async (request, { params }) => {
   try {
       // Connect to the database before performing any operation
       await connectToDB();

       // Find the prompt by ID and delete it
       await Prompt.findByIdAndDelete(params.id);

       // Return a success message along with a 200 status code
       return new Response("Prompt deleted successfully", { status: 200 });

   } catch (error) {
       // Return an error message in case of any exceptions
       return new Response("Error deleting prompt", { status: 500 });
   }
}