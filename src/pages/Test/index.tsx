import { useReducer } from "react";

export default function Test() {
  const initData = [
    { name: "小满(只)", price: 100, count: 1, id: 1, isEdit: false },
    { name: "中满(只)", price: 200, count: 1, id: 2, isEdit: false },
    { name: "大满(只)", price: 300, count: 1, id: 3, isEdit: false },
  ];

  type initDataType = typeof initData;

  interface Action {
    type: "ADD" | "SUB" | "DELETE" | "EDIT" | "UPDATE_NAME";
    id: number;
    newName?: string;
  }

  const reducer = (state: initDataType, action: Action) => {
    const { type, id } = action;
    const item = state.find(item => item.id === id)!;
    switch (type) {
      case "ADD":
        item.count++;
        return [...state];

      case "SUB":
        item.count--;
        return [...state];

      case "DELETE":
        return state.filter(item => item.id !== id);

      case "EDIT":
        break;

      case "UPDATE_NAME":
        break;

      default:
        break;
    }

    return state;
  };

  const init = (data: initDataType) => {
    return data;
  };

  const [data, dispatch] = useReducer(reducer, initData, init);

  return (
    <>
      <table cellPadding={0} cellSpacing={0} width={600} border={1}>
        <thead>
          <tr>
            <th>物品</th>
            <th>单价</th>
            <th>数量</th>
            <th>总价</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => {
            return (
              <tr key={item.id}>
                <td align="center">
                  {item.isEdit ? (
                    <input
                      onBlur={() => dispatch({ type: "EDIT", id: item.id })}
                      onChange={e =>
                        dispatch({
                          type: "UPDATE_NAME",
                          id: item.id,
                          newName: e.target.value,
                        })
                      }
                      value={item.name}
                    />
                  ) : (
                    <span>{item.name}</span>
                  )}
                </td>
                <td align="center">{item.price}</td>
                <td align="center">
                  <button onClick={() => dispatch({ type: "SUB", id: item.id })}>-</button>
                  <span>{item.count}</span>
                  <button onClick={() => dispatch({ type: "ADD", id: item.id })}>+</button>
                </td>
                <td align="center">{item.price * item.count}</td>
                <td align="center">
                  <button onClick={() => dispatch({ type: "EDIT", id: item.id })}>编辑</button>
                  <button onClick={() => dispatch({ type: "DELETE", id: item.id })}>删除</button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}></td>
            <td align="center">
              总价:
              {data.reduce((prev, next) => prev + next.price * next.count, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
