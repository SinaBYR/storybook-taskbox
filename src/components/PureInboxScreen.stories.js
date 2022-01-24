import { PureInboxScreen } from "./InboxScreen";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import * as TaskListStories from './TaskList.stories';
import { fireEvent, within } from '@storybook/testing-library';

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

export const WithInteractions = Template.bind({});
WithInteractions.play = async ({ canvasElement }) => {
  // canvas is the element in which every story is displayed. (on the screen)
  const canvas = within(canvasElement);

  // Simulates pinning the first task
  // click on the element which has aria-label set to pinTask-1
  await fireEvent.click(canvas.getByLabelText('pinTask-1'));

  // Simulates pinning the third task
  // click on the element which has aria-label set to pinTask-3
  await fireEvent.click(canvas.getByLabelText('pinTask-3'));
}