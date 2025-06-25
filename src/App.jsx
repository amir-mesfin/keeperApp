import Header from './component/header/Header'
import Footer from './component/footer/Footer'
import './App.css'
import CreateNote from './component/body/CreateNote'
import ListNote from './component/body/ListNote'
function App() {

  return (
    <>
    <Header />
    <CreateNote />
    <ListNote />
    <Footer />
    </>
  )
}

export default App
