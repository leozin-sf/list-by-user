import { useTask } from '../../../contexts/taskContext';
import { useIsMobile } from '../../../hooks/useMobile';
import Container from '../../layout/Container';
import { Button } from '../../common/Button';
import { Pagination } from './Pagination/index';
import { TaskLoading } from './TaskLoading';
import {
  Content,
  Menu,
  LogoutButton,
  Wellcome,
  WellcomeText,
  UserNameText,
  ListContent,
  NewTaskDiv,
  AddTaskSticky,
  AddTask,
  Tasks,
  Task,
  TaskText,
  ShowByFilter,
  FilterSelect,
  UpdateContent,
  SaveButton,
} from './styles';

export function ToDoList() {
  const {
    tasks,
    tasksLoading,
    newTaskLoading,
    firstLoadingPage,
    userName,
    newTaskText,
    setNewTaskText,
    currentPage,
    setCurrentPage,
    showCompleted,
    setShowCompleted,
    addingTask,
    handleAddTask,
    deleteTask,
    toggleTask,
    handleUpdateTask,
    showUpdateTask,
    signOutApp,
    updateContent,
    editedText,
    setEditedText,
    updatedTaskText,
    editingTaskId,
  } = useTask();

  const isMobile = useIsMobile();

  const filteredTasks = tasks.filter(
    (task) => task.task_confirmed === showCompleted
  );
  const tasksPerPage = 10;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = isMobile
    ? filteredTasks
    : filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <Content>
      <Container>
        <Menu>
          <Wellcome>
            <WellcomeText>Olá, </WellcomeText>
            <UserNameText>{userName}</UserNameText>
          </Wellcome>
          <LogoutButton onClick={signOutApp}>Sair</LogoutButton>
        </Menu>
        <ListContent>
          <NewTaskDiv>
            <AddTaskSticky>
              <input
                type="textarea"
                placeholder="Adicionar tarefa"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddTask(e);
                }}
                disabled={!!editingTaskId}
              />
              <AddTask
                onClick={handleAddTask}
                addingTask={addingTask}
                disabled={!newTaskText.trim() || !!editingTaskId}
              />
            </AddTaskSticky>
          </NewTaskDiv>
          <ShowByFilter>
            <FilterSelect
              onClick={() => setShowCompleted(false)}
              isActive={!showCompleted}
              disabled={!!editingTaskId}
            >
              Pendentes
            </FilterSelect>
            <FilterSelect
              onClick={() => setShowCompleted(true)}
              isActive={showCompleted}
              disabled={!!editingTaskId}
            >
              Concluídas
            </FilterSelect>
          </ShowByFilter>
          <Tasks>
            {tasksLoading && firstLoadingPage ? (
              <>
                <TaskLoading />
                <TaskLoading />
                <TaskLoading />
              </>
            ) : (
              <>
                {newTaskLoading && <TaskLoading />}
                {currentTasks.map((task) => (
                  <Task key={task.list_id}>
                    {!updateContent[task.list_id] ? (
                      <>
                        <TaskText>{task.text}</TaskText>
                        <Button
                          buttonType="excludeTask"
                          onClick={() => deleteTask(task.list_id)}
                          disabled={!!editingTaskId}
                        />
                        <Button
                          buttonType="markTask"
                          onClick={() => toggleTask(task.list_id)}
                          disabled={!!editingTaskId}
                        />
                        <Button
                          buttonType="editTask"
                          onClick={() =>
                            showUpdateTask(task.list_id, task.text)
                          }
                          disabled={!!editingTaskId}
                        />
                      </>
                    ) : (
                      <UpdateContent>
                        <input
                          type="text"
                          defaultValue={task.text}
                          ref={updatedTaskText}
                          onChange={(e) =>
                            setEditedText((prev) => ({
                              ...prev,
                              [task.list_id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter')
                              handleUpdateTask(task.list_id);
                          }}
                        />
                        <SaveButton
                          onClick={() => handleUpdateTask(task.list_id)}
                        />
                      </UpdateContent>
                    )}
                  </Task>
                ))}
              </>
            )}
          </Tasks>
          {!isMobile && (
            <Pagination
              tasksPerPage={tasksPerPage}
              totalTasks={filteredTasks.length}
              paginate={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </ListContent>
      </Container>
    </Content>
  );
}
