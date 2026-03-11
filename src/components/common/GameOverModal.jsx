
import { useNavigate } from 'react-router-dom';

const GameOverModal = ({ isWinner, solution, onRestart, onSettings, title = "FIN_DE_PARTIDA" }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm animate-in fade-in duration-300 z-9999 px-4">
      <div className="bg-white dark:bg-black p-10 border-4 border-black dark:border-white text-center scale-110 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] min-w-[450px] font-mono">
        <h2 className="text-4xl font-black mb-3 uppercase tracking-tighter">
          {isWinner ? '¡VICTORIA!' : 'DERROTA'}
        </h2>

        <p className="text-sm font-bold mb-8 border-b-2 border-black dark:border-white pb-3 uppercase italic opacity-70">
          {isWinner ? 'PRECISIÓN ABSOLUTA' : 'PARTIDA FINALIZADA'}
        </p>

        {solution && (
          <div className="mb-10 space-y-2">
            <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">La respuesta correcta era:</p>
            <p className="text-2xl font-black tracking-[0.2em]">{solution.toUpperCase()}</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <button
            onClick={onRestart}
            className="w-full px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-black uppercase transition-all active:scale-95 border-2 border-black dark:border-white hover:bg-transparent hover:text-black dark:hover:text-white text-lg"
          >
            REINTENTAR_PARTIDA
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onSettings}
              className="px-6 py-3 border-2 border-black dark:border-white font-black uppercase text-xs transition-all hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-95"
            >
              AJUSTES
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 border-2 border-black dark:border-white font-black uppercase text-xs transition-all hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-95"
            >
              VOLVER_AL_INICIO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
