import { connectRouter } from 'connected-react-router/immutable'
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory()

export default connectRouter(history)