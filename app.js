function Main() {
  const {user} = React.useContext(userContext);

  return (
    <main className="main">
      <div className="card">
        <h1 id="mainTitle">
          {user.name ? `Tareas de ${user.name}` : "Seleccione un usuario"}
        </h1>
        {/* <TaskSection/> */}
      </div>
    </main>
  );
}

const userContext = React.createContext();

function App() {
  // const [user, setUser] = React.useState();
  const [user, setUser] = React.useState({
    name: "eilouX",
    tasks: []
  });

  return (
    <>
      <userContext.Provider value={{user, setUser}}>
        {/* <Sidebar/> */}
        <Main />
      </userContext.Provider>
    </>
  );
}

const app = document.getElementById('app');
const root = ReactDOM.createRoot(app);
root.render(<App />);