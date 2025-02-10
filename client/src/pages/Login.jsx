// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     setError('');

//     if (!username || !password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:3001/login', {
//         username,
//         password
//       });
//       console.log('Login successful:', response.data);
//       // Here you can also set token received to localStorage/sessionStorage
//       navigate('/'); // Redirect to the home page
//     } catch (error) {
//       setError('Login failed. ' + (error.response?.data || 'Please try again.'));
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900">
//       <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 text-white rounded-xl shadow-2xl transform transition-all hover:scale-105">
//         <div>
//           <h2 className="text-center text-3xl font-extrabold">Sign in to your account</h2>
//           {error && <p className="mt-2 text-center text-red-500">{error}</p>}
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleLogin}>
//           <input type="hidden" name="remember" value="true" />
//           <div className="rounded-md shadow-sm">
//             <div>
//               <label htmlFor="username" className="sr-only">Username</label>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 autoComplete="username"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 mb-3 border border-gray-700 bg-gray-700 text-white placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);  // Set loading to true

    if (!username || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password
      });
      console.log('Login successful:', response.data);
      login(response.data.token);
      navigate('/');
    } catch (error) {
      setError('Login failed. ' + (error.response?.data.message || 'Please try again.'));
      setLoading(false);  // Reset loading state on error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 text-white rounded-xl shadow-2xl transform transition-all hover:scale-105">
        <div>
          <h2 className="text-center text-3xl font-extrabold">Sign in to your account</h2>
          {error && <p className="mt-2 text-center text-red-500">{error}</p>}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <input
                id="username"
                type="text"
                autoComplete="username"
                required
                className="rounded-none relative block w-full px-3 py-2 mb-3 border border-gray-700 bg-gray-700 text-white placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}  // Disable input when loading
              />
            </div>
            <div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}  // Disable input when loading
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
              disabled={loading}  // Disable button when loading
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
