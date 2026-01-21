import { useFlashcards } from './hooks/useFlashcards';
import FormularioFlashcard from './components/FormularioFlashcard';
import ListaFlashcards from './components/ListaFlashcards';

function App() {
  const { flashcards, carregando, obterFlashcards, erro } = useFlashcards();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 p-4 pt-10">
      <h1 className="text-5xl font-bold text-center mb-6 text-white shadow-lg">
        FlashCards AI
      </h1>

      {erro && (
        <div className="w-full max-w-3xl mt-4 p-4 bg-red-900 border border-red-700 text-red-200 rounded-lg text-center">
          <p>
            <strong>Ops, algo deu errado:</strong> {erro}
          </p>
        </div>
      )}
      <FormularioFlashcard aoGerar={obterFlashcards} carregando={carregando} />
      <ListaFlashcards flashcards={flashcards} />
    </div>
  );
}

export default App;