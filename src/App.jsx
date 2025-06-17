import Header from './component/header/Header'
import Footer from './component/footer/Footer'
import './App.css'
import Note from './component/body/Note'
import noteStore from './assets/storage/noteStore'

function App() {

  return (
    <>
    <Header />
    <div className='noteContainer'>
      {
         noteStore.map((note)=>(
         <Note 
           key={note.id}
           tittle={note.tittle}
            text={note.text}
         />
            
         ))
      }
     
    </div>
    <Footer />
       
    </>
  )
}

export default App
