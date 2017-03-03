export default function clientMiddleware(client) {

  // 这里接收client对象,返回一个中间件实例
  return ({dispatch, getState}) => {
    return (next) => {
      console.info('-- call next');
      return (action) => {
        // 如果action是函数,那么直接执行
        if (typeof action === 'function') {
          return action(dispatch, getState);
        }

        const {promise, types, ...rest} = action;
        if (!promise) {
          return next(action);
        }

        const [REQUEST, SUCCESS, FAILURE] = types;

        // 包装成一个新的action,交给next处理
        next({
          ...rest,
          type: REQUEST
        });

        // 包装出一个异步promise,然后处理
        const actionPromise = promise(client);
        actionPromise
          .then(
            (result) => {
              console.info('执行成功');
              next({...rest, result, type: SUCCESS});
            },
            (error) => {
              console.info('执行失败');
              console.info(error);
              next({...rest, error, type: FAILURE});
            }
          )
          .catch((error) => {
            console.error('MODDLEWARE ERROR: ', error);
            next({...rest, error, type: FAILURE});
          });

        return actionPromise;
      };
    };
  };
}
