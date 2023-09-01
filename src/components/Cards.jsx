import Card from './Card';
import '../styles/styles.css';

export default function Cards(props) {
   const { characters, onClose } = props;

   return (
      <div className='wrapper'>
         {
            characters.map((character, i) => (
               <div key={character.id} className='box'>
                  <Card key={character.id}
                     character={character}
                     onClose={onClose}
                  />
               </div>
            ))
         }
      </div>
   );
}