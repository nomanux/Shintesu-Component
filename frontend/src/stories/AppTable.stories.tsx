import type { Meta, StoryObj } from '@storybook/react';
import AppTable from '../components/AppTable';
import type { AppColumn } from '../components/AppTable';

type DataType = {
  key: string | number;
  name: string;
  age: number;
  email: string;
  city: string;
};

const columns: AppColumn<DataType>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    defaultWidth: 120,
  },
  {
    key: 'age',
    title: 'Age',
    dataIndex: 'age',
    defaultWidth: 80,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    defaultWidth: 180,
  },
  {
    key: 'city',
    title: 'City',
    dataIndex: 'city',
    defaultWidth: 120,
  },
];

const generateData = (count: number): DataType[] =>
  Array.from({ length: count }, (_, i) => ({
    key: i,
    name: `User ${i + 1}`,
    age: Math.floor(Math.random() * 50) + 20,
    email: `user${i + 1}@example.com`,
    city: ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'][i % 5],
  }));

const meta = {
  title: 'Components/AppTable',
  component: AppTable,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof AppTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns,
    dataSource: generateData(10),
    height: 400,
  },
};

export const WithPagination: Story = {
  args: {
    columns,
    dataSource: generateData(10),
    height: 400,
    total: 100,
    page: 1,
    pageSize: 10,
    onPageChange: (page, pageSize) => {
      console.log(`Page changed to ${page}, Page size: ${pageSize}`);
    },
  },
};

export const FullHeight: Story = {
  args: {
    columns,
    dataSource: generateData(20),
    height: 600,
  },
};

export const LargeDataset: Story = {
  args: {
    columns,
    dataSource: generateData(50),
    height: 500,
    total: 500,
    page: 1,
    pageSize: 10,
  },
};
