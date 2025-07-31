import { Outlet } from 'react-router-dom'
import classes from './App.module.css'

function App() {
  return (
    <div className={classes.appContainer}>
      <main className={classes.app}>
        <header className={classes.header}>
          <h1 className={classes.title}>Search GitHub Users</h1>
          <p className={classes.subtitle}>Encontre perfis e repositórios</p>
        </header>
        
        <div className={classes.content}>
          <Outlet />
        </div>
      </main>
      
      <footer className={classes.footer}>
        <p>Desenvolvido por AugustoAlmondes © {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default App