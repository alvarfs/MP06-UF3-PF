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
        <aside className="sidebar card">
          
        </aside>
        <main className="main">
          <Card />
        </main>
      </userContext.Provider>
    </>
  );
}

// -------------- CARD SECTION -------------- //

function Card() {
  const {user} = React.useContext(userContext);

  return (
    <div className="card">
      <h1 id="mainTitle">
        {user.name ? `Tareas de ${user.name}` : "Seleccione un usuario"}
      </h1>
      <TaskSection/>
    </div>
  );
}

function TaskSection() {
  const {user, setUser} = React.useContext(userContext);
  const [input, setInput] = React.useState("");
  
  return (
    <div id="taskSection" className={!user.name ? "hidden" : ""}>
      <ul id="taskList">
        {user?.tasks?.map(task =>
          <Task task={task} />
        )}
      </ul>
      <input 
        type="text" 
        id="newTaskInput" 
        placeholder="Nueva tarea..." 
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={() => AddTask(input, user, setUser)}>Añadir Tarea</button>
    </div>
  );
}

function Task({task}) {
  const {user, setUser} = React.useContext(userContext);

  return(
    <li key={task.id} className={task.done ? "completed" : ""}>
      <span onClick={() => ToggleTask(task.id, user, setUser)}>{task.name}</span>
      <div className="actions">
        <button onClick={() => EditTask(task.id, user, setUser)}>✏️</button>
        <button onClick={() => DeleteTask(task.id, user, setUser)}>🗑️</button>
      </div>
    </li>
  );
}

// ------------ PANEL SECTION ------------- //

// ...

// ------------- CARD FUNCTIONS ------------- //

function AddTask(newName, user, setUser) {
  const taskList = [...user.tasks];
  if (newName.trim() === "") return;
      
  taskList.push({
    id: user.tasks.length + 1,
    name: newName,
    done: false
  });

  const updatedUser = {
    ...user,
    tasks: taskList
  };

  setUser(updatedUser);
}

function ToggleTask(id, user, setUser) {
  const taskList = user.tasks.map(task => {
    if (task.id === id) {
      return {
        id: task.id,
        name: task.name,
        done: !task.done
      }
    } else {
      return task;
    }
  });

  const updatedUser = {
    ...user,
    tasks: taskList
  };

  setUser(updatedUser);
}

function DeleteTask(id, user, setUser) {
  const updatedUser = {
    ...user,
    tasks: user.tasks.filter(task => 
      task.id !== id
    )
  };
  
  setUser(updatedUser);
}

function EditTask(id, user, setUser) {
  const selectedTask = user.tasks.find(task => task.id === id)
  const newTaskName = prompt("Editar tarea:", selectedTask.name);

  if (newTaskName !== null && newTaskName.trim() !== "") {
    const taskList = user.tasks.map(task => {
      if (task.id === id) {
        return {
          id: task.id,
          name: newTaskName,
          done: task.done
        }
      } else {
        return task;
      }
    });

    const updatedUser = {
      ...user,
      tasks: taskList
    };

    setUser(updatedUser);
  }
}

// ----------- PANEL FUNCTIONS ------------ //

// ...

// ------------------------------------------ //

const app = document.getElementById('app');
const root = ReactDOM.createRoot(app);
root.render(<App />);