import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { auth, onAuthStateChanged } from './firebase';
import { login, logout, selectUser } from './features/auth/userSlice';
import { Navbar } from './components/layouts/Navbar';
import { Dashboard } from './components/dashboard/Dashboard';
import { AddSong } from './components/addSong/AddSong';
import { SongsList } from './components/songsList/SongsList';
import { CustomLists } from './components/customLists/CustomLists';
import { SongsWithBPM } from './components/randoms/SongsWithBPM';
import { Videos } from './components/randoms/Videos';
import { Options } from './components/layouts/Options';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { InitialNavbar } from './components/layouts/InitialNavbar';

import { Welcome } from './components/welcome/Welcome';
import { SongSelected } from './components/songsList/SongSelected';
import { SongSelectedBPM } from './components/songsList/SongSelectedBPM';
import { CustomTempBPM } from './components/customLists/CustomTempBPM';
import { CustomTempVideo } from './components/customLists/CustomTempVideo';
import { LoadingAll } from './components/layouts/LoadingAll';
import { CustomSavedBPM } from './components/customLists/CustomSavedBPM';
import { CustomSavedVideo } from './components/customLists/CustomSavedVideo';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // console.log('esta registrado', auth);
        // console.log('esta registrado userAuth', userAuth);
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
        setIsLoading(false);
      } else {
        // console.log('No esta registrado', auth);

        dispatch(logout());
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <>
      <Options />
      {isLoading ? (
        <LoadingAll />
      ) : !user ? (
        <>
          <Router>
            <InitialNavbar />
            <Routes>
              <Route path='/' element={<Welcome />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </Router>
        </>
      ) : (
        <>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/add-song' element={<AddSong />} />
              <Route path='/songs-list' element={<SongsList />} />
              <Route path='/custom-lists' element={<CustomLists />} />
              <Route path='/random-songs-with-bpm' element={<SongsWithBPM />} />
              <Route path='/random-videos' element={<Videos />} />
              <Route path='/update/:id' element={<AddSong />} />
              {/* <Route path='/song/:id' element={<SongSelected />} /> */}
              <Route path='/video/:id' element={<SongSelected />} />
              <Route path='/bpm/:id' element={<SongSelectedBPM />} />
              <Route path='/bpm/temporal-list' element={<CustomTempBPM />} />
              <Route
                path='/video/temporal-list'
                element={<CustomTempVideo />}
              />
              <Route path='/bpm/saved-list' element={<CustomSavedBPM />} />
              <Route path='/video/saved-list' element={<CustomSavedVideo />} />
              <Route path='*' element={<Navigate to='/dashboard' replace />} />
            </Routes>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
