import { ADD_AUTHOR, REMOVE_AUTHOR, COMPLETE_AUTHOR } from '../constants';

const AUTHORS = {
    tasks: [],
}

const tasks = (state = AUTHORS.tasks, { id, name, isCompleted, type }) => {
    switch (type) {
        case ADD_AUTHOR:
            return [
                ...state,
                name,

            ];
        case REMOVE_AUTHOR:
            return [
                id,
                type
            ];
        case COMPLETE_AUTHOR:
            return [...state].map(task => {
                if (task.id === id) {
                    task.isCompleted = !task.isCompleted;
                }
                return task;
            });
        default:
            return state;
    }
}

export default tasks;