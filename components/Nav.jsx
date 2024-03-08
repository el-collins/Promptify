// This directive is specific to Next.js, indicating that this file should run only on the client-side.
"use client";

// Import necessary modules and functions from Next.js and React
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

// Define the navigation component called Nav
const Nav = () => {
  // Use the useSession hook to get user session data
  const { data: session } = useSession();

  // State to store authentication providers
  const [providers, setProviders] = useState(null);

  // State to toggle the mobile dropdown menu
  const [toggleDropdown, setToggleDropdown] = useState(false);

  // useEffect hook to fetch authentication providers when the component mounts
  useEffect(() => {
    const setUpProviders = async () => {
      // Fetch authentication providers from the server
      const response = await getProviders();

      // Set the providers in the component state
      setProviders(response);
    };
    // Call the setup function
    setUpProviders();
  }, []);

  // Return the JSX structure of the navigation component
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      {/* Brand logo and name */}
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptify Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptify</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                alt="profile-image"
                width={37}
                height={37}
                className="rounded-full outline"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Moblie Navigation */}
      <div className="sm:hidden flex relative">
        {/* If user is authenticated, show profile-related links */}
        {session?.user ? (
          <div className="flex">
            {/* Display user profile image and toggle dropdown on click */}

            <Image
              src={session?.user.image}
              alt="profile-image"
              width={37}
              height={37}
              className="rounded-full outline"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {/* Display dropdown menu if toggleDropdown state is true */}

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profle
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* If user is not authenticated, show sign-in buttons for available providers */}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
