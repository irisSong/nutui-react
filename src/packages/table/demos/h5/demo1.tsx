import React, { useState } from 'react'
import { Table } from '@nutui/nutui-react'

interface TableColumnProps {
  key: string
  title?: string
  align?: string
  sorter?: ((a: any, b: any) => number) | boolean | string
  render?: (rowData: any, rowIndex: number) => string | React.ReactNode
  fixed?: 'left' | 'right'
  width?: number
}

const Demo1 = () => {
  const [columns] = useState<Array<TableColumnProps>>([
    {
      title: 'ID',
      key: 'id',
      render: (_record: any, index) => {
        return index + 1
      },
    },
    {
      title: '姓名',
      key: 'name',
    },
    {
      title: '性别',
      key: 'gender',
      render: (record: any) => {
        return (
          <span style={{ color: record.gender === '女' ? 'blue' : 'green' }}>
            {record.gender}
          </span>
        )
      },
    },
    {
      title: '学历',
      key: 'record',
    },
  ])

  const [data] = useState([
    {
      name: 'Tom',
      gender: '男',
      record: '小学',
    },
    {
      name: 'Lucy',
      gender: '女',
      record: '本科',
    },
    {
      name: 'Jack',
      gender: '男',
      record: '高中',
    },
  ])

  return <Table columns={columns} data={data} />
}
export default Demo1
