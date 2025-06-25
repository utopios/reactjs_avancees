import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { memo } from 'react';

const Titre = memo(({ texte }: { texte: string }) => {
  console.log("Titre rendu");
  return <h1>{texte}</h1>;
},(prevProps, nextProps) => {
  console.log("Comparaison des props", prevProps, nextProps);
  return prevProps.texte === nextProps.texte;
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Titre texte={`Mon Titre ${count}`} />
      <button onClick={() => setCount(count + 1)}>Incrémenter</button>
    </>
  )
}

export default App
