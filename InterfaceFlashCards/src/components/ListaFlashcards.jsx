import Flashcard from './Flashcard';

const ListaFlashcards = ({ flashcards }) => {
  if (flashcards.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-col md:flex-row md:flex-wrap gap-4 justify-center">
      {flashcards.map((flashcard) => (
        <Flashcard key={flashcard.id} {...flashcard} />
      ))}
    </div>

  );
};

export default ListaFlashcards;