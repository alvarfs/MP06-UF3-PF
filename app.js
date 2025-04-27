const userContext = React.createContext();
const userListContext = React.createContext();

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [userList, setUserList] = React.useState([]);

  return (
    <>
      <userContext.Provider value={{currentUser, setCurrentUser}}>
        <userListContext.Provider value={{userList, setUserList}}>
          <aside className="sidebar card">
            <Panel />
          </aside>
          <main className="main">
            <Card />
          </main>
        </userListContext.Provider>
      </userContext.Provider>
    </>
  );
}

// -------------- CARD SECTION -------------- //

function Card() {
  const {currentUser} = React.useContext(userContext);

  return (
    <div className="card">
      <h1 id="mainTitle">
        {currentUser.name ? `Tareas de ${currentUser.name}` : "Seleccione un usuario"}
      </h1>
      <TaskSection/>
    </div>
  );
}

function TaskSection() {
  const {currentUser, setCurrentUser} = React.useContext(userContext);
  const [input, setInput] = React.useState("");
  const [taskId, setTaskId] = React.useState(0);

  return (
    <div id="taskSection" className={!currentUser.name ? "hidden" : ""}>
      <ul id="taskList">
        {currentUser?.tasks?.map(task =>
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

    const taskList = [...currentUser.tasks];
        
    taskList.push({
      id: taskId,
      name: input,
      done: false
    });
  
    const updatedUser = {
      ...currentUser,
      tasks: taskList
    };
  
    setCurrentUser(updatedUser);
    setTaskId(taskId + 1);
    setInput("");
  }
}

function Task({task}) {
  const {currentUser, setCurrentUser} = React.useContext(userContext);

  return(
    <li key={task.id} className={task.done ? "completed" : ""}>
      <span onClick={() => ToggleTask(task.id, currentUser, setCurrentUser)}>{task.name}</span>
      <div className="actions">
        <button onClick={() => EditTask(task.id, currentUser, setCurrentUser)}>✏️</button>
        <button onClick={() => DeleteTask(task.id, currentUser, setCurrentUser)}>🗑️</button>
      </div>
    </li>
  );
}

// ------------ PANEL SECTION ------------- //

function Panel() {
  const {currentUser, setCurrentUser} = React.useContext(userContext);
  const {userList, setUserList} = React.useContext(userListContext);
  const [userId, setUserId] = React.useState(0);

  const [input, setInput] = React.useState("");
  const [theme, setTheme] = React.useState(true);

  console.log(currentUser)
  console.log(userList)

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
      <UserInfo />
      <button onClick={() => ToggleTheme(theme, setTheme)} style={{marginTop: "auto"}}>
        🌙/☀️ Tema
      </button>
    </>
  );

  function AddUser() {
    if (input.trim() == "") return;

    const currentList = [...userList];
        
    currentList.push({
      id: userId,
      name: input,
      tasks: []
    });
  
    setUserList(currentList);
    setUserId(userId + 1);
    setInput("");
  }
}

function User({user}) {
  const {currentUser, setCurrentUser} = React.useContext(userContext);
  const {userList, setUserList} = React.useContext(userListContext);

  return (
    <li onClick={() => SelectUser()}>
      {user.name}
    </li>
  )

  function SelectUser() {
    if (user.id == currentUser.id) return;

    const updatedList = userList.map(user => {
      if (currentUser.id == user.id) {
        return currentUser;
      }
      return user;
    })

    setUserList(updatedList);
    setCurrentUser(user);
  }
}

function UserInfo() {
  const {currentUser, setCurrentUser} = React.useContext(userContext);
  const {userList, setUserList} = React.useContext(userListContext);
  const doneTasks = currentUser?.tasks?.filter(t => t.done).length;

  return (
    <div id="userInfo" className={!currentUser.name ? "hidden" : ""}>
      <hr></hr>
      <p id="userName">{currentUser?.name}</p>
      <p id="userStats">{`Tareas: ${doneTasks} / ${currentUser?.tasks?.length} completadas`}</p>
      <button onClick={() => DeselectUser()}>Deseleccionar</button>
    </div>
  );

  function DeselectUser() {
    const updatedList = userList.map(user => {
      if (currentUser.id == user.id) {
        return currentUser;
      }
      return user;
    })

    setUserList(updatedList);
    setCurrentUser({});
  }
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