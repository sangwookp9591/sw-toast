import { Meta, StoryObj } from '@storybook/react-vite/*';
import { Toast, ToastType } from './Toast';

const meta: Meta = {
  title: 'components/toast',
  component: Toast,
};

export default meta;

type StoryToast = StoryObj<ToastType>;

export const Default: StoryToast = {};
