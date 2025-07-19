// Importa o hook e os componentes da interface.
import { useFlashcards } from './hooks/useFlashcards';
import FormularioFlashcard from './components/FormularioFlashcard';
import ListaFlashcards from './components/ListaFlashcards';

function App() {
  // Utiliza o hook para obter os estados e a função de busca.
  const { flashcards, carregando, obterFlashcards, erro } = useFlashcards();

  return (
    // Estrutura principal da página.
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 p-4 pt-10">
      
      {/* Título principal da aplicação */}
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
      
      {/* Renderiza o formulário, que agora não tem fundo próprio. */}
      <FormularioFlashcard aoGerar={obterFlashcards} carregando={carregando} />
      
      {/* A lista de flashcards virá naturalmente abaixo do formulário. */}
      <ListaFlashcards flashcards={flashcards} />
    </div>
  );
}

export default App;