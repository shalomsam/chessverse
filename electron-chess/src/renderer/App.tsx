import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
// import icon from '../../assets/icon.svg';
import './App.css';
import ChessBoard from './components/ChessBoard';

export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<ChessBoard />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
