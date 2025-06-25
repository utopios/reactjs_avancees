import { use, useCallback, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { memo } from 'react';


const Utilisateurs = ({ utilisateurs }: { utilisateurs: string[] }) => {
  const utilisateursFiltres = useMemo(() => 
    utilisateurs.filter((user) => user.startsWith("A")), [utilisateurs]);
  return (
    <ul>
      {utilisateursFiltres.map((user, index) => (
        <li key={index}>{user}</li>
      ))}
    </ul>
  );
};

const Titre = ({ texte }: { texte: string }) => {
  const [updateText, setUpdateText] = useState(texte);
  const toCapitalize = useMemo(() => {
    setUpdateText(updateText.toUpperCase());
    console.log("Titre rendu");
    return <h1>{updateText}</h1>;
  }, [updateText]);

  return toCapitalize;
};

function App() {
  const [count, setCount] = useState(0);
  // const handleSubmit = useCallback(({user}: string) => {
  //     console.log("Form submitted with user:", user);
  //     dispatch(addUser(user));
  // }, [dispacth]);
  const incrementer = useCallback(() => setCount(count + 1), [count]);
  
  return (
    <>
      <Utilisateurs utilisateurs={["Alice", "Bob", "Charlie", "David", "Eve", "Frank"]} />
      <Titre texte={`Mon Titre ${count}`} />
      <button onClick={incrementer}>Incrémenter</button>
    </>
  )
}

export default App
