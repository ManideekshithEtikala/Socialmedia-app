import { getProviders, signIn } from 'next-auth/react';
import { useCallback } from 'react';

const SignIn = ({ providers }) => {
  const handleSignIn = useCallback((providerId) => {
    signIn(providerId, { callbackUrl: '/' });
  }, [signIn]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-green-200">
      <h1 className="font-bold font-serif text-3xl my-3">SignIn Choices</h1>
      {Object.entries(providers).map(([providerId, provider]) => (
        <div key={providerId} className="flex justify-center hover:bg-white rounded-md">
          <img
            src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-pks9lbdv.png"
            alt={provider.name}
            className="w-16 h-16 rounded-full"
          />
          <button
            onClick={() => handleSignIn(providerId)}
            className="text-green-800 p-2 text-lg rounded-full font-sans font-semibold"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default SignIn;