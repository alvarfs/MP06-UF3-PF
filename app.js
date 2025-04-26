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
          <Panel />
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
  const [taskId, setTaskId] = React.useState(0);

  return (
    <div id="taskSection" className={!user.name ? "hidden" : ""}>
      <ul id="taskList">
        {user?.tasks?.map(task =>
          <Task key={task.id} task={task} />
        )}
      </ul>
      <input 
        type="text" 
        id="newTaskInput" 
        placeholder="Nueva tarea..." 
        onChange={e => setInput(e.target.value)}
        value={input}
      />
      <button onClick={() => AddTask()}>Añadir Tarea</button>
    </div>
  );

  function AddTask() {
    if (input.trim() == "") return;

    const taskList = [...user.tasks];
        
    taskList.push({
      id: taskId,
      name: input,
      done: false
    });
  
    const updatedUser = {
      ...user,
      tasks: taskList
    };
  
    setUser(updatedUser);
    setTaskId(taskId + 1);
    setInput("");
  }
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

function Panel() {
  const[theme, setTheme] = React.useState(true);

  const {user, setUser} = React.useContext(userContext);
  const [userList, setUserList] = React.useState([]);

  const [input, setInput] = React.useState("");
  const [userId, setUserId] = React.useState(0);

  return(
    <>
      <h2>Usuarios</h2>
      <ul id="taskList">
        {userList?.map((user, index) =>
          <User key={index} user={user} />
        )}
      </ul>
      <input 
        type="text" 
        id="newUserInput" 
        placeholder="Nuevo usuario..." 
        onChange={e => setInput(e.target.value)}
        value={input}
      />
      <button onClick={() => AddUser()}>Añadir Usuario</button>
      <button onClick={() => ToggleTheme(theme, setTheme)} style={{marginTop: "auto"}}>🌙/☀️ Tema</button>
    </>
  );

  function AddUser() {
    if (input.trim() == "") return;

    const currentList = [...userList];
        
    currentList.push({
      name: input,
      tasks: []
    });
  
    setUserList(currentList);
    setTaskId(taskId + 1);
    setInput("");
  }
}

function User({key, user}) {
  return (
    <h3>{user.name}</h3>
  )
}

// ------------- CARD FUNCTIONS ------------- //

function ToggleTask(id, user, setUser) {
  const taskList = user.tasks.map(task => {
    if (task.id == id) {
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
  const selectedTask = user.tasks.find(task => task.id == id)
  const newTaskName = prompt("Editar tarea:", selectedTask.name);

  if (newTaskName != null && newTaskName.trim() != "") {
    const taskList = user.tasks.map(task => {
      if (task.id == id) {
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

function ToggleTheme(theme, setTheme) {
  if (theme) {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
  } else {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
  }

  setTheme(!theme);
}

// ------------------------------------------ //

const app = document.getElementById('app');
const root = ReactDOM.createRoot(app);
root.render(<App />);