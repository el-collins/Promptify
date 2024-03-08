import { connnectToDB } from "@utils/database";
import User from "@models/user";

export const POST = async (req) => {
  const { username, email, password } = await req.json();
  // const { username, email, password } = req.body;

  console.log({ username, email, password });
  try {
    await connnectToDB();
   
      await User.create({
        username: username,
        email: email,
        password: password,
      });
    
  } catch (error) {
    console.log(error);
  }
};
