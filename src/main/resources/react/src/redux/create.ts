import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./modules/reducer"; // 得到reducer
import { rootSaga } from "../sagas/sagas";

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware();

// 创建store的方法
// data是最原始的state
export default function myCreateStore(): any {
    // 创建store, 这里绑定了reducer和原始state
    const store = createStore(reducer, applyMiddleware(sagaMiddleware));

    sagaMiddleware.run(rootSaga);

    return store;
}