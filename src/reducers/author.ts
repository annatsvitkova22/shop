import { ADD_AUTHOR, REMOVE_AUTHOR, COMPLETE_AUTHOR } from '../constants';

interface task {
    id?: string,
    name?: string,
    type?: string;
}

const AUTHORS = {
    tasks: [],
}

const tasks = (state = AUTHORS.tasks, { id, name, type }: task) => {
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
            return [
                ...state,
        ];
        default:
            return state;
    }
}

export default tasks;