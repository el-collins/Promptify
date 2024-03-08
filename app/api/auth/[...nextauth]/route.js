import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/user";

import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  async session({ session }) {
    //To get the data about the user everytime to keep an existing and running session
    const sessionUser = await User.findOne({ email: session.user.email });

    // Update user id
    session.user.id = sessionUser._id.toString();

    return session;
  },

  async signIn({ profile }) {
    try {
      // Connects to MongoDB database
      await connectToDB();

      // check if a user already exists
      const userExists = await User.findOne({ email: profile.email });

      // if not, create a new user and save it to the database
      
      // First Approach
      // If you need to perform additional operations or validations before saving the user to the database
      // if (!userExists) {
      //   let newUser = new User(profile);
      //   newUser = await newUser.save();
      // }

      // Second Approach
      // If you simply want to create a new user in the database without any additional processing
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
          // bio: `I am ${profile.name}.`,
        });
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async signUp(req, res) {},
});

export { handler as GET, handler as POST };

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "email", type: "email", placeholder: "email" },
//         username: {
//           label: "username",
//           type: "text",

//           placeholder: "username",
//         },
//         password: {
//           label: "password",
//           type: "password",

//           placeholder: "password",
//         },
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session }) {
//       // store the user id from MongoDB to session
//       const sessionUser = await User.findOne({ email: session.user.email });
//       session.user.id = sessionUser._id.toString();

//       return session;
//     },

//     async googleSignIn({ account, profile, user, credentials }) {
//       try {
//         await connectToDB();

//         // check if user already exists
//         const userExists = await User.findOne({ email: profile.email });

//         // if not, create a new document and save user in MongoDB
//         if (!userExists) {
//           const generatedPassword =
//             Math.random().toString(36).slice(-8) +
//             Math.random().toString(36).slice(-8);
//           await User.create({
//             email: profile.email,
//             username: profile.name.replace(" ", "").toLowerCase(),
//             password: generatedPassword,
//             image: profile.picture,
//           });
//         }

//         return true;
//       } catch (error) {
//         console.log("Error checking if user exists: ", error.message);
//         return false;
//       }
//     },
//     async signUp(req, res) {
//       const { username, email, password } = req.body;
//       const newUser = new User({ username, email, password });
//       try {
//         await newUser.save();
//         res.status(201).json("User created successfully");
//       } catch (error) {
//         next(error);
//       }
//     },
//   },
// });

// export { handler as GET, handler as POST };
