import { PureInboxScreen } from "./InboxScreen";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import * as TaskListStories from './TaskList.stories';

// A super-simple mock of a redux store
const MockStore = configureStore({
  reducer: {
    tasks: createSlice({
      name: 'tasks',
      initialState: TaskListStories.Default.args.tasks,
      reducers: {
        updateTaskState: (state, action) => {
          const { id, newTaskState } = action.payload;
          const task = state.findIndex((task) => task.id === id);
          if (task >= 0) {
            state[task].state = newTaskState;
          }
        }
      },
    }).reducer
  }
})

export default {
  title: 'PureInboxScreen',
  component: PureInboxScreen,
  decorators: [(story) => <Provider store={MockStore}>{story()}</Provider>]
}

const Template = args => <PureInboxScreen {...args}/>

export const Default = Template.bind({});
// By default, Default.args.error is set to null because of PureInboxScreen.defaultProps

export const Error = Template.bind({});
Error.args = {
  error: 'Some error message'
}