import Flashcard from './Flashcard';

// Componente para exibir a lista de flashcards.
// Recebe a lista de `flashcards` como propriedade.
const ListaFlashcards = ({ flashcards }) => {
  // Não renderiza nada se não houver flashcards.
  if (flashcards.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-col md:flex-row md:flex-wrap gap-4 justify-center">
      {/* Mapeia a lista de flashcards, renderizando um componente `Flashcard` para cada item. */}
      {flashcards.map((flashcard) => (
        <Flashcard key={flashcard.id} {...flashcard} />
      ))}
    </div>

  );
};

export default ListaFlashcards;