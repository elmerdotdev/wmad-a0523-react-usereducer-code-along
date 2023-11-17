import { useEffect, useReducer } from "react"

const ACTIONS = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  UPDATE_NAME: 'updateNames',
  UPDATE_COLOR: 'updateColor',
  ADD_PRODUCTS: 'addProducts'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return {...state, count: state.count + 1 }
    case ACTIONS.DECREMENT:
      return {...state, count: state.count - 1 }
    case ACTIONS.UPDATE_NAME:
      return {...state, fullname: action.payload}
    case ACTIONS.UPDATE_COLOR:
      return {...state, background: !state.background}
    case ACTIONS.ADD_PRODUCTS:
      return {...state, products: action.payload}
    default:
      throw new Error()
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, { 
    count: 0,
    fullname: 'John',
    background: false,
    products: []
  })

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('//dummyjson.com/products')
      const data = await res.json()
      dispatch({ type: ACTIONS.ADD_PRODUCTS, payload: data.products })
    }

    fetchProducts()
  }, [])

  const updateBackground = () => {
    dispatch({ type: ACTIONS.UPDATE_COLOR })
  }

  return (
    <div style={{ backgroundColor: state.background ? 'grey' : 'black' }}>
      <h1>{state.count}</h1>
      <h2>{state.fullname}</h2>
      <button onClick={() => dispatch({ type: ACTIONS.INCREMENT })}>+</button>
      <button onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>-</button>
      <button onClick={updateBackground}>Change background</button>
      <input type="text" value={state.fullname} onChange={(e) => dispatch({ type: ACTIONS.UPDATE_NAME, payload: e.target.value })} />
      <div>
        <h2>Products</h2>
        <ul>
          {state.products.map(product => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App