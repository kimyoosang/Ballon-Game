import BalloonGrid from './components/ballon-game/BalloonGrid';

function App() {
  return (
    <div className='flex min-h-screen flex-col items-center bg-gray-100 py-8'>
      <h1 className='mb-8 text-center text-3xl font-bold'>
        풍선 터트리기 게임
      </h1>
      <BalloonGrid />
    </div>
  );
}

export default App;
